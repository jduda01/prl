"use strict";

function businessLogic() {
    
    const currentBlock = Math.ceil((trialIterator + 1) / trialsPerLargeBlock); // Determine current block. trials indexed at 0 so add 1 to determine current block
    console.log("Current block " + currentBlock) // NOTE: Remove before final launching
    let data = jsPsych.data.get().last(1).values(); // Assuming this is async
    let response = data[0].response; // Detemrine response
    // let highestProbabilityIndex; // Initialize variable for highest probability index
   
    // Log trial information
    console.log("Trial is " + (trialIterator + 1)) // trials indexed at 0 so add 1. NOTE: Remove before launching.
    console.log("response is "+response)

    // Reverse at start of every block except the first
    if  (trialIterator !== 0 && trialIterator % trialsPerLargeBlock === 0
    ){
     let highestProbabilityIndex;
        do {
            highestProbabilityIndex = currentProbability.indexOf(
                Math.max(...currentProbability)
            );
            currentProbability = shuffleArray(currentProbability);
        } while (
            currentProbability.indexOf(Math.max(...currentProbability)) ===
            highestProbabilityIndex
        );
        console.log("Reversal triggered from new block")
    }
    
   // Determine next reversal at start of block based on reversal ranges
    if (trialIterator === 0 || // First trial, indexes at 0. So, current block must be converted 1->0, 2->1, etc.
        trialIterator % trialsPerLargeBlock === 0 // After each 80 trials
    ) {
        console.log("Reversals ranges are " + reversalRanges[currentBlock-1]) // NOTE: Remove before final launching. Appears after any reversals but before feedback.
        const [minReversals, maxReversals] = reversalRanges[currentBlock-1];
        nextReversalAt =
            trialIterator +
            Math.floor(Math.random() * (maxReversals - minReversals + 1)) + minReversals;
            console.log("Next reversal is " + (nextReversalAt + 1)) //Adding 1 to the trial iterator since 0 = trial 1
            console.log("Trials between reversal:", nextReversalAt - trialIterator);
    }

    // Trigger reversal based on reversal ranges, unless first trial of block (otherwise triggered elsewhere)
    if (trialIterator === nextReversalAt && 
         trialIterator % trialsPerLargeBlock !== 0 // Trigger reversal at planned next reversal or at start of next block
    ) {
        let highestProbabilityIndex;
        do {
            highestProbabilityIndex = currentProbability.indexOf(
                Math.max(...currentProbability)
            );
            currentProbability = shuffleArray(currentProbability);
        } while (
            currentProbability.indexOf(Math.max(...currentProbability)) ===
            highestProbabilityIndex
        );
        console.log("Reversal triggered from reversal ranges")

        // schedule next reversal
        const [minReversals, maxReversals] = reversalRanges[currentBlock-1];
        nextReversalAt =
            trialIterator +
            Math.floor(Math.random() * (maxReversals - minReversals + 1)) + minReversals;
            console.log("Next reversal is " + (nextReversalAt + 1))
            console.log("Trials between reversal:", nextReversalAt - trialIterator);
    }

    console.log("Current probabilities are " + currentProbability); // NOTE: remove before launching. Shows the probabilities for each stimulus


    // logic to sample deck with respective reward probability
    // 'response - 1' will give position of probability value within currentProbability vector (index)
    // note: users can input 1,2,3 but we index by 0,1,2 so 1->0, 2->1, 3->2
    let observedOutcome;
    if (Math.random() <= currentProbability[response - 1]) {
        // observedOutcome = outcome[0]; // output win (50 - gain version, 0 - loss version) card
        observedOutcome = `stim/${version}/outcome/squared_win.png`; 
        win = true;
    } else {
        // observedOutcome = outcome[1]; // output lose (-50 - loss version, 0 - gain version) card
        observedOutcome = `stim/${version}/outcome/squared_lose.png`; 
        win = false;
    }
    console.log("win? "+win) // Print outcome to console


    // calculates total points earned
    let points = win ? winPoints : losePoints;
    score += points;

    // Maps reward probability for each response
    let html;
    if (response == "1") {
        html = `
            <div class='image-container'>
                <img class='stimuli-left' src='${observedOutcome}'>
                <img class='stimuli-middle' src='${stim[1]}'>
                <img class='stimuli-right' src='${stim[2]}'>
            </div>`;
    } else if (response == "2") {
        html = `
            <div class='image-container'>
                <img class='stimuli-left' src='${stim[0]}'>
                <img class='stimuli-middle' src='${observedOutcome}'>
                <img class='stimuli-right' src='${stim[2]}'>
            </div>`;
    } else if (response == "3") {
        html = `
            <div class='image-container'>
                <img class='stimuli-left' src='${stim[0]}'>
                <img class='stimuli-middle' src='${stim[1]}'>
                <img class='stimuli-right' src='${observedOutcome}'>
            </div>`;
    }

    trialIterator++; // accumulating trials

    return html;
}
 
function feedbackLogic(data) {
    let rt = jsPsych.data.get().last(2).values()[0].rt;
    let response = jsPsych.data.get().last(2).values()[0].response;
    writeCandidateKeys(data);
    data.difficulty = difficulty;
    data.stimulus_set = stimulusSet;

    // add stimulus order and shorten name for readability
    jsPsych.data.addProperties({ stim_order });
        console.log(stim_order)

    // save which stimulus was selected based on the response (JD added 1/29/26)
    selected_stim = stim_order[response - 1];
        console.log(selected_stim)
    data.selected_stim = selected_stim;
    data.index = trialIterator;
    data.deck_probabilities = `[${String(currentProbability)}]`;
    data.response = response;
    data.rt = rt;
    data.key_press =
        response == 1 ? 49 : response == 2 ? 50 : response == 3 ? 51 : null;
    data.reward_type = win;

    // initialize constants to represent trials that we are comparing
    const previousTrial = jsPsych.data.get().last(4).values()[0]; //  previous trial (.last(4))
    const currentTrial = jsPsych.data.get().last(1).values()[0]; // current trial (.last(1))

    // check if the deck probabilities on current and previous trials are the same
    if (previousTrial.index !== undefined) {
        // compare previous and current trials after the first trial
        data.reversal_type =
            previousTrial.deck_probabilities === currentTrial.deck_probabilities
                ? false
                : true; // if probabilities are different, reversal occurred (= true)
        console.log("Reversal? "+data.reversal_type); 
    } else {
        data.reversal_type = false; // first trial reversal always undefined
        console.log("Reversal? "+data.reversal_type);
    }
    
    data.reward_tally = score;
    data.phase = phase;
}
