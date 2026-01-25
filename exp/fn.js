"use strict";

function businessLogic() {
    let data = jsPsych.data.get().last(1).values(); // Assuming this is async
    let response = data[0].response;
    //console.log(response);
    let highestProbabilityIndex;

    // performance-independent reversal every 40 trials
    if (
        trialIterator === 1 * (totalTrials / blocks) ||
        trialIterator === 3 * (totalTrials / blocks)
    ) {
        //let highestProbabilityIndex;

        do {
            highestProbabilityIndex = currentProbability.indexOf(
                Math.max(...currentProbability)
            );
            currentProbability = shuffleArray(currentProbability);
        } while (
            currentProbability.indexOf(Math.max(...currentProbability)) ===
            highestProbabilityIndex
        );

        streak = 0;
        strike = 0;
    }

    // contingency shift
    if (trialIterator === 2 * (totalTrials / blocks)) {
        //let highestProbabilityIndex;
        do {
            highestProbabilityIndex = currentProbability.indexOf(
                Math.max(...currentProbability)
            );
            currentProbability = shuffleArray([...phaseProbabilities[1]]);
        } while (
            currentProbability.indexOf(Math.max(...currentProbability)) ===
            highestProbabilityIndex
        );

        streak = 0;
        strike = 0;
    }

    // performance-dependent reversal every nine out of 10 consecutive selection of 'high' probability deck
    if (currentProbability[response - 1] === Math.max(...currentProbability)) {
        streak++;
        if (streak >= maxStreaks) {
            //let highestProbabilityIndex;
            do {
                highestProbabilityIndex = currentProbability.indexOf(
                    Math.max(...currentProbability)
                );
                currentProbability = shuffleArray(currentProbability);
            } while (
                currentProbability.indexOf(Math.max(...currentProbability)) ===
                highestProbabilityIndex
            );

            streak = 0;
            strike = 0;
        }
    } else {
        if (strike < maxStrikes) {
            strike++;
        } else {
            streak = 0;
            strike = 0;
        }
    }

    // logic to sample deck with respective reward probability
    let observedOutcome;

    //console.log(currentProbability);

    // logic to sample deck with respective reward probability
    // 'response - 1' will give position of probability value within currentProbability vector (index)
    // note: users can input 1,2,3 but we index by 0,1,2 so 1->0, 2->1, 3->2
    if (Math.random() <= currentProbability[response - 1]) {
        // observedOutcome = outcome[0]; // output win (100) card
        observedOutcome = `stim/${version}/outcome/scaled_win.png`;
        win = true;
    } else {
        // observedOutcome = outcome[1]; // output lose (-50) card
        observedOutcome = `stim/${version}/outcome/scaled_lose.png`;
        win = false;
    }

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

    // store relevant variables in the object to print a nice output
    // jsPsych.getCurrentTrial().data.win = win;
    // response = jsPsych.data.get().last(1).values()[0].response;

    return html;
}

function feedbackLogic(data) {
    let rt = jsPsych.data.get().last(2).values()[0].rt;
    let response = jsPsych.data.get().last(2).values()[0].response;
    writeCandidateKeys(data);
    // removeOutputVariables(data, [ // not working
    //     "stimulus",
    //     "trial_type",
    //     "internal_node_id",
    // ]);
    data.difficulty = difficulty;
    data.stimuliSet = stimuliSet;
    data.max_strikes = maxStrikes;
    data.max_streaks = maxStreaks;
    data.index = trialIterator;
    data.first_half_probabilities = phaseProbabilities[0];
    data.second_half_probabilities = phaseProbabilities[1];
    data.deck_probabilities = `[${String(currentProbability)}]`;
    data.streak = streak;
    data.strike = strike;
    data.response = response;
    data.rt = rt;
    data.key_press =
        response == 1 ? 49 : response == 2 ? 50 : response == 3 ? 51 : null;
    //console.log(win);
    data.reward_type = win;
    // initialize constants to represent trials that we are comparing
    const previousTrial = jsPsych.data.get().last(4).values()[0]; // current trial (.last(1))
    const currentTrial = jsPsych.data.get().last(1).values()[0]; // previous trial (.last(4))

    // check if the deck probabilities on current and previous trials are the same
    if (previousTrial.index !== undefined) {
        // compare previous and current trials after the first trial
        data.reversal_type =
            previousTrial.deck_probabilities === currentTrial.deck_probabilities
                ? false
                : true; // if probabilities are different, reversal occurred (= true)
        console.log(data.reversal_type);
    } else {
        data.reversal_type = false; // first trial reversal always undefined
        console.log(data.reversal_type);
    }
    // How to compute performance-dependent reversals from `reversal_type` (previously known as `trial_type`)?: Substract trials indexed of 40,80, and 120.
    data.reward_tally = score;
}
