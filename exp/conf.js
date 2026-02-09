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
// Options: "deck", "avatar", "sabotage", "gain", "loss"
let version; 
const modulus = 4; //Update to 8 to run gain and loss combined version 
const phase = counterbalanceParticipants(subjectId, modulus); // set phase = modulus to allow for printing to URL and file name
console.log("Phase is " + phase)

// JD - when running both gain and loss, add 4 instances here with gain
switch (phase){
    case 0: case 1: case 2: case 3: // loss stable-stable, stable-volatile, volatile-stable, volatile-volatile
        version = "loss";
        break;
    case 4: case 5: case 6: case 7: // gain stable-stable, stable-volatile, volatile-stable, volatile-volatile
        version = "gain";
        break;
};

const counterbalance = false;

// // hard coding a phase will override the randomization 
// let phase = undefined;

// General Settings
const experimentName = "Probabilistic Reversal Learning Task";
const experimentAlias = `prl_${version}`;
const language = "english";
const theme = "light";

// Trial Settings
let difficulty; // difficulty now set in var.js switch function. Options: stable-stable, stable-volatile, volatile-stable, volatile-volatile
const trials = debug ? 1 : 40; // Note: can switch debug mode to e.g., 20 trials (rather than 1) for fuller piloting
const blocks = 4; //JD note: blocks as defined by original PRL (every 40 trials), see "trialsPerLargeBlock" for complete block
const totalTrials = trials * blocks;
const trialsPerLargeBlock = 2 * trials; // JD added 1/25/26 to set blocks to twice as large as the traditional 40-trial blocks 
const currentStimulusSet = 8; // JD added 1/26/26 to make stimulus set a modifiable constant

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

// Contact Information
const adminEmail = undefined;

// Intake Settings
const intake = {
    subject: {
        minLength: 7,
        maxLength: 7,
        prefix: "VIP",
    },
    sites: ["Vanderbilt"], // Add your sites here
    phenotypes: ["sz"], // Add your phenotypes here
    visits: [1, 3], // Define which visits are allowed (maps to stimulus sets 0, 1)
    weeks: [], // Define which weeks are allowed if using weeks instead of visits
    nih: false, // Set to true if this is an NIH study requiring GUID
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
        4: "https://belieflab.yale.edu/arclab/prlLoss/", // loss
        5: "https://belieflab.yale.edu/arclab/prlLoss/", // loss
        6: "https://belieflab.yale.edu/arclab/prlLoss/", // loss
        7: "https://belieflab.yale.edu/arclab/prlLoss/", // loss
    },
    loss: {
        // If running both gain and loss, uncomment the following lines
        0: "https://belieflab.yale.edu/arclab/prlGain/", // gain
        1: "https://belieflab.yale.edu/arclab/prlGain/", // gain
        2: "https://belieflab.yale.edu/arclab/prlGain/", // gain
        3: "https://belieflab.yale.edu/arclab/prlGain/", // gain
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