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
let version; // Version defined by modulus in var.js
const modulus = 4; //JD: Pasted from redirect.js 
const versionByModulus = counterbalanceParticipants(subjectId, modulus);

// JD - when running both gain and loss, add 4 instances here with gain
switch (versionByModulus){
    case 0: // "stable-stable"
        version = "loss";
        break;
    case 1: // "stable-volatile":
        version = "loss";
        break;
    case 2: // "volatile-stable":
        version = "loss";
        break;
    case 3: //"volatile-volatile":
        version = "loss";
        break;
};

const counterbalance = false;

// hard coding a phase will override the randomization
let phase = undefined;

// General Settings
const experimentName = "Probabilistic Reversal Learning Task";
const experimentAlias = `prl_${version}`;
const language = "english";
const theme = "light";

// Trial Settings
let difficulty; // difficulty now set in var.js switch function
// const difficulty = "stable-stable"; // Options: "easy-easy", "easy-hard", "hard-easy", "hard-hard"
const trials = debug ? 1 : 40;
const blocks = 4; //JD: blocks as defined by original PRL (every 40 trials)
const totalTrials = trials * blocks;
const trialsPerLargeBlock = 2 * trials; // JD added 1/25/26 to set blocks to twice as large as the traditional 40-trial blocks 
const currentStimulusSet = 8; // JD added 1/26/26 to make stimulus set a modifiable constant

// Point Settings
let winPoints = 100;
let losePoints = -50;

switch (version) {
    case "loss":
        winPoints = 0;
        losePoints = -50;
        break;
    case "gain":
        winPoints = 50;
        losePoints = 0;
        break;
    // 'deck', 'avatar', 'sabotage' cases use default values
}

// Reward Settings
const bonus = 2.0; // Bonus amount in dollars
const percentile = 25; // Cut-off performance percentile for receiving a bonus
const reward = "points"; // Options: "points", "$"
const lossStartingPoints = 8000;
const gainStartingPoints = 0;
const pointsPerDollar = 2000;

// Repetitions
const repetitions = {
    production: totalTrials,
    debug: 1,
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

// Qualtrics Survey Configuration

const consentLink =
    "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_9H0WmX4yKv4jz4a";

// Redirect Configuration (Daisy Chaining)
const urlConfig = {
    // redirect only
    default: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_bErtyAFIwnwDhWu",
    // auto-counterbalance
    // When running both gain and loss, update the modulus to 8 in var and replace 0 with 0-3 and 1 with 4-7
    // gain: { 
    //     0: "https://belieflab.yale.edu/arclab/prlLoss/", // loss
    //     1: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_82Ll88zGoFlwIaq", // questionnaires
    // },
    // loss: {
    //     0: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_82Ll88zGoFlwIaq", // questionnaires
    //     1: "https://belieflab.yale.edu/arclab/prlGain/", // gain
    // },
    gain: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_82Ll88zGoFlwIaq",
    loss: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_82Ll88zGoFlwIaq"
}