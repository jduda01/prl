"use strict";

/*define welcome message*/
const welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[0],
    choice: "NO_KEYS",
    on_load: toggleDebugMode,
};

/*define task instructions*/
const instruction1 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[1],
    choices: ["0"],
};

/*define task instructions*/
const instruction2 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[2],
    choices: ["0"],
};

/*define task instructions*/
const instruction3 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[3],
    choices: ["1"],
};

/*define task instructions*/
const instruction4 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[4],
    choices: ["2"],
};

/*define task instructions*/
const instruction5 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[5],
    choices: ["3"],
};

/*define task instructions*/
const instruction6 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[6],
    choices: ["0"],
};

/*define task instructions*/
const instruction7 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[7],
    choices: ["0"],
};

/*define task instructions*/
const instruction8 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[8],
    choices: ["0"],
};

/*define task instructions*/
const instruction9 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[9],
    choices: ["0"],
};

const instructionSet = [
    instruction1,
    instruction2,
    instruction3,
    instruction4,
    instruction5,
    instruction6,
    instruction7,
    instruction8,
    instruction9,
];

const endPracticeInstructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[10],
    choices: ["0"],
    on_load: () => {
        // Make visible progress bar to screen
        document.getElementById(
            "jspsych-progressbar-container"
        ).style.visibility = "visible";
    },
};

/*add fixation*/
const fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<div style='font-size:40px'>+</div>",
    trial_duration: 500,
    response_ends_trial: false,
};

/*initialize the trials array with the instructions trial and loop through each stroop variable defined in stroop variable, also add the fixation trial to the trials array for each stroop variable*/
const cues = {
    type: jsPsychHtmlKeyboardResponse,
    response_ends_trial: true,
    choices: ["1", "2", "3"], // Initially, there may be no keys allowed if you want to start in a "disabled" state
    stimulus: () => {
        return `
            <div class='image-container'>
                <img class='stimuli-left' src='${stim[0]}'>
                <img class='stimuli-middle' src='${stim[1]}'>
                <img class='stimuli-right' src='${stim[2]}'>
            </div>`;
    },
};

/*initialize the trials array with the instructions trial and loop through each stroop variable defined in stroop variable, also add the confidence rating to the trials array for each stroop variable*/
const cues_confidence = {
    type: jsPsychHtmlKeyboardResponse,
    response_ends_trial: true,
    choices: ["1", "2", "3"], // Initially, there may be no keys allowed if you want to start in a "disabled" state
    stimulus: () => {
        // JD added 2.21.26 to log performance
        const start = performance.now();
        requestAnimationFrame(() => {
            const delay = performance.now() - start;
            console.log("Cue render delay (ms):", delay.toFixed(2));
        });
        // End JD added 2.21.26 to log performance

        return `
            <div class='image-container'>
                <img class='stimuli-left' src='${stim[0]}'>
                <img class='stimuli-middle' src='${stim[1]}'>
                <img class='stimuli-right' src='${stim[2]}'>
            </div>`;
    },
};

// practice trials
let practiceOutcomes = shuffleArray([ // JD added to track whether win shown
        'stim/loss/outcome/squared_win.png',
        'stim/loss/outcome/squared_win.png',
        'stim/loss/outcome/squared_lose.png']);

const practiceFeedback = {
    type: jsPsychHtmlKeyboardResponse,
    response_ends_trial: false,
    trial_duration: 1000,
    choices: ["1", "2", "3"],
    stimulus: () => {
        let data = jsPsych.data.get().last(1).values(); // Assuming this is async
        let response = data[0].response;
        // console.log(response);

        let html;
        let currentOutcome = practiceOutcomes.shift();

        if (response === "1") {
            html = `
                <div class='image-container'>
                    <img class='stimuli-left' src='${currentOutcome}'>
                    <img class='stimuli-middle' src='${stim[1]}'>
                    <img class='stimuli-right' src='${stim[2]}'>
                </div>`;
                console.log(currentOutcome)
        } else if (response === "2") {
            html = `
                <div class='image-container'>
                    <img class='stimuli-left' src='${stim[0]}'>
                    <img class='stimuli-middle' src='${currentOutcome}'>    
                    <img class='stimuli-right' src='${stim[2]}'>
                </div>`;
                console.log(currentOutcome)
        } else if (response === "3") {
            html = `
                <div class='image-container'>
                    <img class='stimuli-left' src='${stim[0]}'>
                    <img class='stimuli-middle' src='${stim[1]}'>
                    <img class='stimuli-right' src='${currentOutcome}'>
                </div>`;
                console.log(currentOutcome)
        }
        return html;
    },
};

// main trials, with embedded probabilistic reversal learning logic
const trialFeedback = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ["1", "2", "3"],

    // track choices on each trial
    stimulus: businessLogic, // Display the cards face down
    response_ends_trial: false,
    trial_duration: 1000,
    on_finish: feedbackLogic, // Turn the picked card face up
};

// const practiceTrial = {
//     timeline: [fixation, cues, practiceFeedback],
//     repetitions: 3,
// };

const practiceTrial = {
    timeline: [fixation, cues_confidence, practiceFeedback],
    repetitions: 3,
};

// Present progress report messages at every quarter (%) trial
const conditionalProgressMessage = {
    timeline: [
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: () => {
                let percentComplete = calculatePercentComplete();
                // Create a progress message trial
                return `You are ${percentComplete}% done with the experiment. Please press the (0) key to proceed.`;
            },
            on_finish: () => {
                let percentComplete = calculatePercentComplete();
                jsPsych.setProgressBar(percentComplete / 100); // set progress bar to percentComplete full.
            },
            choices: ["0"],
        },
    ],
    conditional_function: shouldShowProgressMessage,
};

// const procedureTrial = {
//     timeline: [fixation, cues, trialFeedback, conditionalProgressMessage],
//     repetitions: getRepetitions(), // toggle between debug and production mode
// };

const procedureTrial = {
    timeline: [
        fixation,
        cues_confidence,
        trialFeedback,
        conditionalProgressMessage,
    ],
    repetitions: getRepetitions(), // toggle between debug and production mode
};

const dataSave = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: dataSaveAnimation(),
    choices: "NO_KEYS",
    trial_duration: 5000,
    on_finish: async (data) => {
        // Calculate the final rounded bonus value
        switch (version) {
            case "gain":
                earnings = parseFloat(
                    (gainStartingPoints + score) / pointsPerDollar
                ).toFixed(2);
                console.log(earnings);
                break;
            case "loss":
                earnings = parseFloat(
                    (lossStartingPoints + score) / pointsPerDollar
                ).toFixed(2);
                console.log(earnings);
                break;
            default:
                earnings = 0;
        }

        // Store earnings with dollar sign and two decimal places
        data.total_earnings = `$${earnings}`;

        // Now call writeCsvRedirect with both score and earnings
        await writeCsvRedirect();
    },
};

// Load and execute "exp/main.js" using jQuery's $.getScript method.
$.getScript("exp/main.js");
