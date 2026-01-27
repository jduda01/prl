"use strict";

let trialIterator = 0; // first trial will increment from 0 to 1
let nextReversalAt = null; // JD added 1/25/26 to track reversals

// JD commented this section out - 1/26/26 - manually choose stimulus set instead
/**
 * Function to determine stimulus set based on visit/week index
 * @returns {string|null} The stimulus set name or null if not available
 */
// function getStimulusSet() {
//     let setIndex = null;
//     let visitOrWeekValue = null;

//     if (
//         (visit === null && week === null) ||
//         (typeof visit === "undefined" && typeof week === "undefined")
//     ) {
//         setIndex = 0;
//     }

//     // Check if visit is defined and valid
//     if (typeof visit !== "undefined" && visit !== null) {
//         visitOrWeekValue = parseInt(visit);

//         // Check if this visit number exists in the intake.visits array
//         if (
//             typeof intake !== "undefined" &&
//             intake.visits &&
//             intake.visits.length > 0
//         ) {
//             // Get the specific index for this visit in the array
//             const visitIndex = intake.visits.indexOf(visitOrWeekValue);

//             if (visitIndex !== -1) {
//                 setIndex = visitIndex;
//                 console.log(
//                     `Visit ${visit} found at index ${visitIndex} in intake.visits`
//                 );
//             } else {
//                 // This is critical - the visit number doesn't exist in the allowed visits
//                 console.error(
//                     `Visit ${visit} not found in allowed visits: ${intake.visits.join(
//                         ", "
//                     )}`
//                 );
//                 setIndex = null; // Explicitly set to null to indicate error
//             }
//         }
//     }

//     // Check if week is defined and valid (only if visit wasn't valid)
//     if (setIndex === null && typeof week !== "undefined" && week !== null) {
//         visitOrWeekValue = parseInt(week);

//         // Check if this week number exists in the intake.weeks array
//         if (
//             typeof intake !== "undefined" &&
//             intake.weeks &&
//             intake.weeks.length > 0
//         ) {
//             // Get the specific index for this week in the array
//             const weekIndex = intake.weeks.indexOf(visitOrWeekValue);

//             if (weekIndex !== -1) {
//                 setIndex = weekIndex;
//                 console.log(
//                     `Week ${week} found at index ${weekIndex} in intake.weeks`
//                 );
//             } else {
//                 // This is critical - the week number doesn't exist in the allowed weeks
//                 console.error(
//                     `Week ${week} not found in allowed weeks: ${intake.weeks.join(
//                         ", "
//                     )}`
//                 );
//                 setIndex = null; // Explicitly set to null to indicate error
//             }
//         }
//     }

    // Available stimulus sets (0-7)
    const availableSets = ["0", "1", "2", "3", "4", "5", "6", "7"];

//     // If no valid visit/week was found, or if the index is out of bounds
//     if (setIndex === null || setIndex >= availableSets.length) {
//         // Create detailed error message
//         let errorMessage = "";

//         if (setIndex === null) {
//             // Invalid visit/week
//             if (typeof visit !== "undefined" && visit !== null) {
//                 errorMessage = `Error: Visit ${visit} is not in the allowed visits: ${intake.visits.join(
//                     ", "
//                 )}`;
//             } else if (typeof week !== "undefined" && week !== null) {
//                 errorMessage = `Error: Week ${week} is not in the allowed weeks: ${intake.weeks.join(
//                     ", "
//                 )}`;
//             } else {
//                 errorMessage = "Error: No valid visit or week specified";
//             }
//         } else {
//             // Valid visit/week but no corresponding stimulus set
//             errorMessage = `Error: No stimulus set available for ${
//                 visit ? "visit " + visit : ""
//             }${week ? "week " + week : ""} (index: ${setIndex})`;
//         }

//         console.error(errorMessage);

//         // ENHANCED ERROR DISPLAY - THIS IS THE KEY FIX
//         const errorHTML = `
//             <div style="
//                 position: fixed;
//                 top: 0;
//                 left: 0;
//                 width: 100%;
//                 height: 100%;
//                 background: white;
//                 z-index: 9999;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 font-family: Arial, sans-serif;
//             ">
//                 <div style="
//                     text-align: center;
//                     max-width: 600px;
//                     padding: 40px;
//                     border: 2px solid #ff0000;
//                     border-radius: 10px;
//                     background: #fff;
//                     box-shadow: 0 4px 8px rgba(0,0,0,0.1);
//                 ">
//                     <h2 style="color: #ff0000; margin-top: 0;">Stimulus Set Not Found</h2>
//                     <p style="font-size: 16px; margin: 20px 0;">${errorMessage}</p>
//                     <p style="margin: 15px 0;">Only sets 0-7 are available for this experiment.</p>
//                     <p style="margin: 15px 0;"><strong>Available visits:</strong> ${
//                         intake.visits ? intake.visits.join(", ") : "None"
//                     }</p>
//                     <p style="margin: 15px 0;"><strong>Available weeks:</strong> ${
//                         intake.weeks ? intake.weeks.join(", ") : "None"
//                     }</p>
//                     <p style="margin: 20px 0;">Please contact the administrator at: <a href="mailto:${adminEmail}" style="color: #0066cc;">${adminEmail}</a></p>
        
//                 </div>
//             </div>
//         `;

//         // Try multiple methods to ensure the error displays
//         document.body.innerHTML = errorHTML;

//         // Throw an error to stop execution
//         throw new Error("Required stimulus set not available");
//     }

//     // If we get here, the set is available
//     const stimulusSet = availableSets[setIndex];
//     console.log("Using stimulus set:", stimulusSet, "(index:", setIndex, ")");
//     return stimulusSet;
// }

// // CALL getStimulusSet() AT TOP LEVEL - NOT INSIDE TRY-CATCH
// // This ensures error is displayed properly like in Kamin
// const currentStimulusSet = getStimulusSet();

// // Only proceed if we got a valid stimulus set
// if (!currentStimulusSet) {
//     // This should never happen because getStimulusSet throws an error
//     throw new Error("No stimulus set available");
// }

// Build stimulus arrays for each version immediately after getting the set
let stimArrayDeck = [];
let stimArrayAvatar = [];
let stimArrayLoss = [];
let stimArrayGain = [];
let stimArraySabotage = [];

// Deck version - all sets use same file names
stimArrayDeck = [
    `stim/deck/${currentStimulusSet}/black.jpg`,
    `stim/deck/${currentStimulusSet}/blue.jpg`,
    `stim/deck/${currentStimulusSet}/red.jpg`,
];

// Avatar version - each set has different file names
const avatarFiles = {
    0: ["black.png", "blue.png", "red.png"],
    1: ["green.png", "orange.png", "purple.png"],
    2: ["darkred.png", "darkteal.png", "orange.png"],
    3: ["brown.png", "lavender.png", "lightblue.png"],
    4: ["lightyellow.png", "mudbrown.png", "turquoise.png"],
    5: ["darkblue.png", "lightturquoise.png", "rose.png"],
    6: ["lavender.png", "red.png", "turquoise.png"],
    7: ["gray.png", "maroon.png", "pinkorange.png"],
    8: ["cat.jpg", "dog.jpg", "rabbit.jpg"],
};

stimArrayAvatar = avatarFiles[currentStimulusSet].map(
    (file) => `stim/avatar/${currentStimulusSet}/${file}`
);

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
    8: ["cat.jpg", "dog.jpg", "rabbit.jpg"],
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
    8: ["cat.jpg", "dog.jpg", "rabbit.jpg"],
};

stimArrayGain = gainFiles[currentStimulusSet].map(
    (file) => `stim/gain/${currentStimulusSet}/${file}`
);

// Sabotage version (uses same files as avatar)
stimArraySabotage = stimArrayAvatar.map((path) =>
    path.replace("/avatar/", "/sabotage/")
);

console.log("Generated stimulus arrays for set:", currentStimulusSet);

// Create win as global variable so we use it in feedback and printing csv
let win;

// Add set to js set so we add it into the timeline feedback csv output
let stimuliSet = parseInt(currentStimulusSet);

let score = 0; // score accumulated throughout the experiment
let earnings = 0; // earnings accumulated throughout the experiment

// Build the stim array for the current version - this is what lang.js will reference
let stim;
switch (version) {
    case "deck":
        stim = shuffleArray(stimArrayDeck);
        break;
    case "avatar":
        stim = shuffleArray(stimArrayAvatar);
        break;
    case "sabotage":
        stim = shuffleArray(stimArraySabotage);
        break;
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
    `stim/${version}/outcome/squared_win.png`,
    `stim/${version}/outcome/squared_lose.png`,
];

console.log("Final stim array for version", version, ":", stim);

// PRL-specific variables
// let phaseProbabilities = []; // JD removed 1/26/26 - replaced with reversalRanges
let reversalRanges = [];
let currentProbability = [0.8, 0.4, 0.2]; // Since no contingency shift, hard coded as hard version

// Create variables with initial values for streak and strike
let streak = 0; 
let strike = 0; 

// Jessie commented out 1/26/26
// // How many continuous correct choices to the best deck until changing best deck location
// const maxStreaks = 9;
// const maxStrikes = 2;

// Switch easy-easy, easy-hard, hard-easy, hard-hard Jessie commented out 1/26/26
// switch (difficulty) {
//     case "easy-easy":
//         phaseProbabilities.push([0.9, 0.5, 0.1], [0.9, 0.5, 0.1]);
//         break;
//     case "easy-hard":
//         phaseProbabilities.push([0.9, 0.5, 0.1], [0.8, 0.4, 0.2]);
//         break;
//     case "hard-easy":
//         phaseProbabilities.push([0.8, 0.4, 0.2], [0.9, 0.5, 0.1]);
//         break;
//     case "hard-hard":
//         phaseProbabilities.push([0.8, 0.4, 0.2], [0.8, 0.4, 0.2]);
//         break;
// }

// JD: instead of modulating noise for difficulty, we use volatility level 
switch (versionByModulus){
    case 0: 
        difficulty = "stable-stable";
        reversalRanges.push([15, 20], [15, 20]);
        break;
    case 1:
        difficulty = "stable-volatile";
        reversalRanges.push([15, 20], [30, 40]);
        break;
    case 2:
        difficulty = "volatile-stable";
        reversalRanges.push([30, 40], [15, 20]);
        break;
    case 3: 
        difficulty = "volatile-volatile";
        reversalRanges.push([30, 40], [30, 40]);
        break;
};

// JD commented out because no contingency shift
// // Randomize initial reward probability set at start of experiment
// currentProbability = shuffleArray([...phaseProbabilities[0]]);