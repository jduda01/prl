//***********************************//
//   EXPERIMENT CONFIGURATION FILE   //
//***********************************//

"use strict";

// Debug Mode
// IMPORTANT: Set to false for production
const debug = true;

// enable touch screen compatibility and adjusts instruction for touch
const enableTouch = false;

// Experiment Version
let version; 

// Modulus and phase normally controlled by getRedirectLink() in redirect.js but can hard code them here instead if needed.
const modulus = 8; //Update to 8 to run gain and loss combined version 
const phase = counterbalanceParticipants(subjectId, modulus);
console.log("Phase is " + phase)

switch (phase){
    case 0: case 1: case 2: case 3: // loss: stable-stable, stable-volatile, volatile-stable, volatile-volatile
        version = "loss";
        break;
    case 4: case 5: case 6: case 7: // gain: stable-stable, stable-volatile, volatile-stable, volatile-volatile
        version = "gain";
        break;
};

const counterbalance = false;

// General Settings
const experimentName = "Probabilistic Reversal Learning Task";
const experimentAlias = `prl_${version}`;
const language = "english";
const theme = "light";

// Trial Settings
let difficulty; // difficulty set in var.js. Options: stable-stable, stable-volatile, volatile-stable, volatile-volatile
const trials = debug ? 1 : 40; // Can change first number to pilot more or fewer trials (must set debug = TRUE above)
const blocks = 4; // Blocks are defined as 40 trials by original PRL. Use "trialsPerLargeBlock" for complete 80-trial block
const totalTrials = trials * blocks;
const trialsPerLargeBlock = 2 * trials; // Stores 80-trial blocks
const currentStimulusSet = 8; // See stimulus sets in var.js

// Point Settings
let winPoints = [];
let losePoints = [];

switch (version) {
    case "loss":
        winPoints = 0;
        losePoints = -50;
        break;
    case "gain":
        winPoints = 50;
        losePoints = 0;
        break;
}

// Reward Settings
const reward = "points"; // Options: "points", "$"
const lossStartingPoints = 8000;
const gainStartingPoints = 0;
const pointsPerDollar = 2000;

// Repetitions
const repetitions = {
    production: totalTrials,
    debug: totalTrials, 
};

// Redirect Configuration (Daisy Chaining)
const urlConfig = {
    // When running both gain and loss: modulus 8, if just loss: 0-3; just gain: 4-7
    gain: { 
        //If running both gain and loss, uncomment the following lines
        0: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_bymyWUKFinbQkFE", // questionnaires
        1: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_bymyWUKFinbQkFE", // questionnaires
        2: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_bymyWUKFinbQkFE", // questionnaires
        3: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_bymyWUKFinbQkFE", // questionnaires
        4: "https://belieflab.yale.edu/arclab/stableVolatilePrl/", // loss
        5: "https://belieflab.yale.edu/arclab/stableVolatilePrl/", // loss
        6: "https://belieflab.yale.edu/arclab/stableVolatilePrl/", // loss
        7: "https://belieflab.yale.edu/arclab/stableVolatilePrl/", // loss
    },
    loss: {
        // If running both gain and loss, uncomment the following lines
        0: "https://belieflab.yale.edu/arclab/stableVolatilePrl2/", // 2nd block task, will be gain in 8-modulus version
        1: "https://belieflab.yale.edu/arclab/stableVolatilePrl2/", // 2nd block task, will be gain in 8-modulus version
        2: "https://belieflab.yale.edu/arclab/stableVolatilePrl2/", // 2nd block task, will be gain in 8-modulus version
        3: "https://belieflab.yale.edu/arclab/stableVolatilePrl2/", // 2nd block task, will be gain in 8-modulus version
        4: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_bymyWUKFinbQkF", // questionnaires
        5: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_bymyWUKFinbQkF", // questionnaires
        6: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_bymyWUKFinbQkF", // questionnaires
        7: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_bymyWUKFinbQkF", // questionnaires

        // //If running just loss, uncomment the following lines
        //     0: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_bymyWUKFinbQkF", // questionnaires
        //     1: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_bymyWUKFinbQkF", // questionnaires
        //     2: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_bymyWUKFinbQkF", // questionnaires
        //     3: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_bymyWUKFinbQkF", // questionnaires
    },
}