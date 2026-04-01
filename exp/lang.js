"use strict";

// Translation
// This file contains the instructions for the experiment,
// which will be translated to the language specified in exp/conf.js

let instructions = [];

// Define the instructions for each language
// Function to shuffle the keys of an object randomly while preserving corresponding values
// order of keys in object must be randomized, but we need to keep values associated with each key are still linked/mapped
/**
 * Translates the text of consent-related buttons based on the selected language.
 * Defaults to English if the selected language is unsupported.
 *
 * @param {string} language - The selected language for translation.
 * @param {array} instructions - An array of instructions specified to be translated.
 */

var english0 = `
        <p>Welcome to the experiment!</p>
        <p>Press any key to begin.</p>`;

var englishTouch0 = `
        <p>Welcome to the experiment!</p>
        <p>Please tap the screen to begin.</p>`;

switch (version) {
    case "loss":
        var english0 = `
        <div style="background-color:red; padding:10px ">
        <p style="color:white">Welcome to the experiment!</p>
        <p style="color:white">Press any key to begin.</p>
        </div>`;

        var english1 = `
        <p>You will now play several rounds of a game.</p> 
        <p>You will be given a starting pool of <b> ${lossStartingPoints} </b> points and your goal is to avoid losing points during the rounds.</p>
        <p>Please press the zero (0) key to continue.</p>`;
        console.log(version);

        var english2 = `
        <p>Your points will be converted to a final bonus of <b> $1 </b> per every <b> ${pointsPerDollar} </b> points, so please do your best. </p> 
        <p>You can earn a maximum bonus of <b> $${
            lossStartingPoints / pointsPerDollar
        } </b> at the end of these rounds.</p> 
        <p>Please press the zero (0) key to continue.</p>`;
       
        // Uncomment when running both versions
        // "and $${
        //     (lossStartingPoints * 2) / pointsPerDollar
        // } total across the two blocks"

        var english3 = `
        <p>In this game, you will see three card decks. On each turn you will pick one of them.</p>
        <p>You can select a deck using the <i>1</i>, <i>2</i>, or <i>3</i> keys on your keyboard to pick the <i>left</i>, <i>middle</i>, or <i>right</i> deck respectively.</p>
        <p>Let's practice selecting a deck.</p>
        <p>Pick the <strong>left</strong> deck by pressing the <strong>1</strong> key.
        <div class='image-container'>
            <img class='stimuli-left' src='${stim[0]}'>
            <img class='stimuli-middle' src='${stim[1]}'>
            <img class='stimuli-right' src='${stim[2]}'>
        </div>`;

        var english4 = `
        <p>Great! Now pick the <strong>middle</strong> deck by pressing the <strong>2</strong> key.</p>
        <div class='image-container'>
            <img class='stimuli-left' src='${stim[0]}'>
            <img class='stimuli-middle' src='${stim[1]}'>
            <img class='stimuli-right' src='${stim[2]}'>
        </div>`;

        var english5 = `
        <p>Excellent! Now pick the <strong>right</strong> deck by pressing the <strong>3</strong> key.</p>
        <div class='image-container'>
            <img class='stimuli-left' src='${stim[0]}'>
            <img class='stimuli-middle' src='${stim[1]}'>
            <img class='stimuli-right' src='${stim[2]}'>
        </div>`;

        var english6 = `
        <p>Good job! You have successfully practiced selecting decks.</p>
        <p>Some decks lead to a better outcome than others.</p>
        <p>A deck can either take away <b> ${losePoints} </b> points or allow you to <b> keep </b> points.</p>
        <p>Below you can see what those outcomes look like:</p>
        <div class='outcome-container'>
        <img class='outcome-right' src='stim/${version}/outcome/scaled_lose.png'>
        <img class='outcome-left' src='stim/${version}/outcome/scaled_win.png'>
        </div>
        <p>Please press the zero (0) key to continue.</p>`;
        
        var english7 = `
        <p>Your job is to figure out which deck is the best choice, so that you can keep as many points as possible.</p>
        <p>Your remaining points will be converted to a final bonus of <b> $1 </b> per every <b> ${pointsPerDollar} </b> points at the end of the game.</p>
        <p>Please press the zero (0) key to continue.</p>`;

        var english8 = `
        <p>However, there is one final catch:</p>
        <p><b>There may be times when the best deck will change!</b></p>
        <p>If you think the best deck has changed from what it was before, then try to find out the new best deck to avoid losing points.</p>
        <p>Please press the zero (0) key to continue.`;

        var english9 = `
        <p>The following is a practice round of just 3 turns.<p>
        <p>The points you get here won’t change your final score, and the best deck will change between the practice round and when the real game starts.</p>
        <p>Please press the zero (0) key to start the practice round.</p>`;

        var english10 = `
        <p>You have now completed the practice round.</p>
        <p>You will now begin the main task, which will take approximately 10 minutes.</p>
        <p>You will be given <b> 8000 </b> points and should attempt to retain points as you select decks.</p>
        <p>As a reminder, your remaining points will be converted to a final bonus of <b> $1 </b> per every <b> ${pointsPerDollar} </b> points at the end of the game.</p>
        <p>Please press the zero (0) key whenever you are ready to start the task.</p>`;

        var english11 = (score, earnings) => {
            return `
                <div class="body-white-theme">
                    <p>Thank you!</p>
                    <p>You have successfully completed this task and your data has been saved.</p>
                    <p>Your final score is ${
                        lossStartingPoints + score
                    }. This is equivalent to a bonus of $${earnings}.</p>
                    ${
                        !src_subject_id
                            ? `<p>You will be redirected to the next part of the experiment. If you are not redirected, please click <a href="${redirectLink}">here</a>.</p>`
                            : ""
                    }
                </div>`;
        };
        break;

    case "gain":
        var english0 = `
        <div style="background-color:green; padding:10px ">
        <p style="color:white">Welcome to the experiment!</p>
        <p style="color:white">Press any key to begin.</p>
        </div>`;

        var english1 = `
        <p>You will now play several rounds of a card game.</p> 
        <p>You will be given a starting pool of ${gainStartingPoints} points and your goal is to gain as many points as possible during the rounds.</p>
        <p>Please press the zero (0) key to continue.</p>`;
        console.log(version);

        var english2 = `
        <p>Your points will be converted to a final bonus of <b> $1 </b> per every <b> ${pointsPerDollar} </b> points, so please do your best. </p> 
        <p>You can earn a maximum bonus of <b> $${
            (winPoints * blocks * trials) / pointsPerDollar
        } </b> at the end of these rounds. </p> 
        <p>Please press the zero (0) key to continue.</p>`;
       
        // JD removed the below from line ~485; add back when administering both gain and loss
        // and $${
        //     (winPoints * blocks * trials * 2) / pointsPerDollar
        // } across the two blocks

        var english3 = `
        <p>In this game, you will see three kinds of decks. On each turn you will pick one of them.</p>
        <p>You can select a deck using the <i>1</i>, <i>2</i>, or <i>3</i> keys on your keyboard to choose the <i>left</i>, <i>middle</i>, or <i>right</i> deck respectively.</p>
        <p>Let's practice selecting a deck.</p>
        <p>Pick the <strong>left</strong> deck by pressing the <strong>1</strong> key.
        <div class='image-container'>
            <img class='stimuli-left' src='${stim[0]}'>
            <img class='stimuli-middle' src='${stim[1]}'>
            <img class='stimuli-right' src='${stim[2]}'>
        </div>`;

        var english4 = `
        <p>Great! Now pick the <strong>middle</strong> deck by pressing the <strong>2</strong> key.</p>
        <div class='image-container'>
            <img class='stimuli-left' src='${stim[0]}'>
            <img class='stimuli-middle' src='${stim[1]}'>
            <img class='stimuli-right' src='${stim[2]}'>
        </div>`;

        var english5 = `
        <p>Excellent! Now pick the <strong>right</strong> deck by pressing the <strong>3</strong> key.</p>
        <div class='image-container'>
            <img class='stimuli-left' src='${stim[0]}'>
            <img class='stimuli-middle' src='${stim[1]}'>
            <img class='stimuli-right' src='${stim[2]}'>
        </div>`;

        var english6 = `
        <p>Good job! You have successfully practiced selecting decks.</p>
        <p>Some decks lead to a better outcome than others.</p>
        <p>A deck can either give you <b> ${winPoints} </b> points or <b> no points. </b> </p>
        <p>Below you can see what those outcomes look like:</p>
        <div class='outcome-container'>
        <img class='outcome-left' src='stim/${version}/outcome/scaled_win.png'>
        <img class='outcome-right' src='stim/${version}/outcome/scaled_lose.png'>
        </div>
        <p>Please press the zero (0) key to continue.</p>`;

        var english7 = `
        <p>Your job is to figure out which deck is the best choice, so that you can gain as many points as possible.</p>
        <p>Your total points will be converted to a final bonus of <b> $1 </b> per every <b> ${pointsPerDollar} </b> points at the end of the game.</p>
        <p>Please press the zero (0) key to continue.</p>`;

        var english8 = `
        <p>However, there is one final catch:</p>
        <p><b>There may be times when the best deck will change!</b></p>
        <p>If you think the best deck has changed from what it was before, then try to find out the new best deck to gain more points.</p>
        <p>Please press the zero (0) key to continue.</p>`;

        var english9 = `
        <p>The following is a practice round of just 3 turns.<p>
        <p>The points you get here won’t change your final score, and the best deck will change between the practice round and when the real game starts.</p>
        Please press the zero (0) key to start the practice round.`;

        var english10 = `
        <p>You have now completed the practice round.</p>
        <p>You will now begin the main task, which will take approximately 10 minutes.</p>
        <p>You will be given an opportunity to gain points as you select decks.</p>
        <p>As a reminder, your total points will be converted to a final bonus of <b> $1 </b> per every <b> ${pointsPerDollar} </b> points at the end of the game.</p>
        <p>Please press the zero (0) key whenever you are ready to start the task.</p>`;

        var english11 = (score, earnings) => {
            return `
                <div class="body-white-theme">
                    <p>Thank you!</p>
                    <p>You have successfully completed this task and your data has been saved.</p>
                    <p>Your final score is ${
                        gainStartingPoints + score
                    }. This is equivalent to a bonus of $${earnings}.</p>
                    ${
                        !src_subject_id
                            ? `<p>You will be redirected to the next part of the experiment. If you are not redirected, please click <a href="${redirectLink}">here</a>.</p>`
                            : ""
                    }
                </div>`;
        };
        break;
}

// Aggregate the instructions of your language choice
switch (language) {
    case "english":
        switch(enableTouch){
            case false:
                instructions = [
                    english0,
                    english1,
                    english2,
                    english3,
                    english4,
                    english5,
                    english6,
                    english7,
                    english8,
                    english9,
                    english10,
                    (score, earnings) => english11(score, earnings), // Store it as a function that accepts score
                ];
                break;
            case true:
                instructions = [
                    englishTouch0,
                    englishTouch1,
                    englishTouch2,
                    englishTouch3,
                    englishTouch4,
                    englishTouch5,
                    englishTouch6,
                    englishTouch7,
                    englishTouch8,
                    englishTouch9,
                    englishTouch10,
                    (score, earnings) => english11(score, earnings), // Store it as a function that accepts score
                ];
                break;
        }
        break;
}

// Translate the instructions to the specified language
translate(language, ...instructions);