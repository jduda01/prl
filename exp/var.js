"use strict";

let trialIterator = 0; // first trial will increment from 0 to 1
let nextReversalAt = null; // JD added 1/25/26 to track reversals
let selected_stim = []; // JD added 1/29/26 to save which stimulus was selected
let reversalRanges = [];
// Randomize initial reward probability set at start of experiment
let taskProbabilities = [0.9, 0.5, 0.1]; // Since no contingency shift, hard code as easier (90-50-10) or harder (80-40-20)
let currentProbability = shuffleArray(taskProbabilities);


// JD removed the logic to pick stimulus set based on visit. Manually choose stimulus set instead
/**
 * @returns {string|null} The stimulus set name or null if not available
 */

// Build stimulus arrays for each version immediately after getting the set
let stimArrayLoss = [];
let stimArrayGain = [];

// Loss version - note set 0 has "blu.jpg" instead of "blue.jpg"
const lossFiles = {
    0: ["black.jpg", "blu.jpg", "red.jpg"],
    1: ["black.jpg", "blue.jpg", "red.jpg"],
    2: ["black.jpg", "blue.jpg", "red.jpg"],
    3: ["black.jpg", "blue.jpg", "red.jpg"],
    4: ["black.jpg", "blue.jpg", "red.jpg"],
    5: ["black.jpg", "blue.jpg", "red.jpg"],
    6: ["black.jpg", "blue.jpg", "red.jpg"],
    7: ["black.jpg", "blue.jpg", "red.jpg"],
    8: ["catsquare.jpg", "dogsquare.jpg", "rabbitsquare.jpg"],
};

stimArrayLoss = lossFiles[currentStimulusSet].map(
    (file) => `stim/loss/${currentStimulusSet}/${file}`
);

// Gain version - note set 0 has "blu.jpg" instead of "blue.jpg"
const gainFiles = {
    0: ["black.jpg", "blu.jpg", "red.jpg"],
    1: ["black.jpg", "blue.jpg", "red.jpg"],
    2: ["black.jpg", "blue.jpg", "red.jpg"],
    3: ["black.jpg", "blue.jpg", "red.jpg"],
    4: ["black.jpg", "blue.jpg", "red.jpg"],
    5: ["black.jpg", "blue.jpg", "red.jpg"],
    6: ["black.jpg", "blue.jpg", "red.jpg"],
    7: ["black.jpg", "blue.jpg", "red.jpg"],
    8: ["catsquare.jpg", "dogsquare.jpg", "rabbitsquare.jpg"],
};

stimArrayGain = gainFiles[currentStimulusSet].map(
    (file) => `stim/gain/${currentStimulusSet}/${file}`
);


console.log("Generated stimulus arrays for set:", currentStimulusSet);

// Create win as global variable so we use it in feedback and printing csv
let win;

// Add set to js so we add it into the timeline feedback csv output
let stimulusSet = parseInt(currentStimulusSet);

let score = 0; // score accumulated throughout the experiment (in loss version, this is added from the lossStartingPoints [subtracted because negative])
let earnings = 0; // earnings accumulated throughout the experiment

// Build the stim array for the current version - this is what lang.js will reference
let stim;
switch (version) {
    case "loss":
        stim = shuffleArray(stimArrayLoss);
        break;
    case "gain":
        stim = shuffleArray(stimArrayGain);
        break;
    default:
        stim = shuffleArray(stimArrayDeck);
        break;
}

// Outcome vector for lang.js to reference
const outcome = [
    `stim/${version}/outcome/scaled_win.png`,
    `stim/${version}/outcome/scaled_lose.png`,
];

console.log("Final stim array for version", version, ":", stim);

// save stimulus order as a variable so it can be referenced later
const stim_order = stim.map(path =>
    path.match(/(cat|dog|rabbit)square/i)?.[1] ?? "unknown"
);


// Create variables with initial values for streak and strike
let streak = 0; 
let strike = 0; 


// JD: instead of modulating noise for difficulty, we use volatility level 
switch (phase){
    case 0: case 4: 
        difficulty = "stable-stable";
        reversalRanges.push([30, 40], [30, 40]);
        break;
    case 1: case 5:
        difficulty = "stable-volatile";
        reversalRanges.push([30, 40], [15, 20]);
        break;
    case 2: case 6:
        difficulty = "volatile-stable";
        reversalRanges.push([15, 20], [30, 40]);
        break;
    case 3: case 7: 
        difficulty = "volatile-volatile";
        reversalRanges.push([15, 20], [15, 20]);
        break;
};


