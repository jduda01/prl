// GRAVEYARD OF CODE REMOVED FROM PRL BY JESSIE IN JANUARY 2026. CREATES 3-ARMED BANDIT WITH VARYING VOLATILITY LEVELS.

// FN.JS

//Removed from fn.js line 49.
//     // performance-independent reversal every 40 trials
//     if (
//         trialIterator === 1 * (totalTrials / blocks) ||
//         trialIterator === 3 * (totalTrials / blocks)
//     ) {
//         //let highestProbabilityIndex;

//         do {
//             highestProbabilityIndex = currentProbability.indexOf(
//                 Math.max(...currentProbability)
//             );
//             currentProbability = shuffleArray(currentProbability);
//         } while (
//             currentProbability.indexOf(Math.max(...currentProbability)) ===
//             highestProbabilityIndex
//         );
// // Jessie commented out 1/25/26
//         // streak = 0; 
//         // strike = 0;
//     }

// JD commented out on 1/26/26 because replacing with reversalRanges
//     // contingency shift
//     if (trialIterator === 2 * (totalTrials / blocks)) {
//         //let highestProbabilityIndex;
//         do {
//             highestProbabilityIndex = currentProbability.indexOf(
//                 Math.max(...currentProbability)
//             );
//             currentProbability = shuffleArray([...phaseProbabilities[1]]);
//         } while (
//             currentProbability.indexOf(Math.max(...currentProbability)) ===
//             highestProbabilityIndex
//         );
// // Jessie commented out 1/25/26
//         // streak = 0;
//         // strike = 0;
//         nextReversalAt = null; // JD added 1/25/26 to ensure no double reversal
//     }

// Jessie commented out 1/25/26
    // // performance-dependent reversal every nine out of 10 consecutive selection of 'high' probability deck
    // if (currentProbability[response - 1] === Math.max(...currentProbability)) {
    //     streak++;
    //     if (streak >= maxStreaks) {
    //         //let highestProbabilityIndex;
    //         do {
    //             highestProbabilityIndex = currentProbability.indexOf(
    //                 Math.max(...currentProbability)
    //             );
    //             currentProbability = shuffleArray(currentProbability);
    //         } while (
    //             currentProbability.indexOf(Math.max(...currentProbability)) ===
    //             highestProbabilityIndex
    //         );

    //         streak = 0;
    //         strike = 0;
    //     }
    // } else {
    //     if (strike < maxStrikes) {
    //         strike++;
    //     } else {
    //         streak = 0;
    //         strike = 0;
    //     }
    // }


    // // Removed variables from saving
    // data.max_strikes = maxStrikes; // Jessie commented out 1/26/26
    // data.max_streaks = maxStreaks; // Jessie commented out 1/26/26
    // data.first_half_probabilities = phaseProbabilities[0]; // Jessie commented out 1/26/26, replace with more meaningful output
    // data.second_half_probabilities = phaseProbabilities[1]; // Jessie commented out 1/26/26, replace with more meaningful output
    // data.streak = streak; // Jessie commented out 1/26/26
    // data.strike = strike; // Jessie commented out 1/26/26