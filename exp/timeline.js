// timeline.js
"use strict";

const jsPsych = initJsPsych({
    show_progress_bar: true,
    message_progress_bar: "Completion Progress",
    auto_update_progress_bar: false,
});

const preload = {
    type: jsPsychPreload,
    images: [outcome, stim],
    show_detailed_errors: true,
    on_success: function (file) {
        console.log("File successfully preloaded:", file);
    },
    on_error: function (file) {
        console.error("Error preloading file:", file);
    },
    on_complete: function (data) {
        console.log("Preloading completed");
    },
};

let timeline = [];

switch (enableTouch) {
    case false:
        $.getScript("exp/timeline-keyboard.js");
        break;
    case true:
        $.getScript("exp/timeline-touch.js");
        break;
}
