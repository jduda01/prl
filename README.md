# 🃏 Probabilistic Reversal Learning Task

Welcome to the Probabilistic Reversal Learning Task! This exciting experiment challenges participants to navigate uncertain environments and adapt their decision-making strategies. Whether you're choosing from decks of cards, selecting project partners, or navigating office politics, your goal is to maximize rewards in a constantly changing landscape.

Key Features:
- 🔄 Dynamic reward probabilities
- 🧠 Tests adaptive learning and decision-making
- 🌟 Multiple versions: cards, avatars, and office scenarios
- 🔍 Explores both expected and unexpected uncertainty

Dive in and see how well you can adapt to the ever-shifting odds!

## 🚀 Getting Started

### Clone the Repository

```bash
git clone --recurse-submodules -j4 git@github.com:jduda01/prl.git && cd prl &&
git submodule foreach --recursive 'git checkout $(git config -f $toplevel/.gitmodules submodule.$name.branch || echo main)'
```

> 💡 This will initialize the `wrap` submodule

### Stay Updated

When pulling changes, run:

```bash
./sync.sh
```

> 🔄 This ensures the `wrap` submodule is up-to-date

### ⚙️ Configuration

Modify `exp/conf.js` to customize your experiment. Key options include:

```javascript
// Debug Mode
const debug = true;

// Experiment Version
const version = "deck"; // Options: "deck", "avatar", "sabotage", "gain", "loss"

// URL Configuration
const urlConfig = {
    default: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_bErtyAFIwnwDhWu",
    loss: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_8qsU4yfds5mH6Pc",
    gain: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_8qsU4yfds5mH6Pc",
};

// Intake Variables (for in-person experiments)
const intake = {
    subject: {
        minLength: 5,
        maxLength: 5,
    },
    sites: ["Vanderbilt"],
    phenotypes: ["hc"],
    visits: [1,2]
};
```

### 🌐 Online Administration

For platforms like PROLIFIC, CloudResearch, MTurk, or Connect, use:

```
https://web-url-of-your-website.com/study-name/prl
```

## 🧠 Task Versions

### 🃏 Deck Scenario
Participants choose from three decks with varying reward probabilities. These probabilities change over time, requiring adaptive strategies.

### 👥 Avatar Scenario
A social version where participants select project partners based on reliability.

### 🏢 Sabotage Scenario
Navigate office dynamics by choosing colleagues to impress the boss.

## 🎭 Types of Uncertainty

### Expected Uncertainty
Known variability within the task.

### Unexpected Uncertainty
Unforeseen changes in reward probabilities:
- 🔄 Shifts: Mid-experiment probability changes
- 🔀 Reversals: 
  - Performance-independent: Fixed changes
  - Performance-dependent: Variable changes based on participant choices

## Task Info
- 160 trials

## 🛠 Development Guide

### Dependencies
- PHP version 8.x
- jsPsych version 7.x

### XAMPP Setup
1. [Download XAMPP](https://www.apachefriends.org/download.html)
2. Start XAMPP and services
3. Clone the repository into htdocs
4. Modify permissions
5. Launch the experiment

## 📊 Output Variables

We're working on including:
- start_time, end_time
- browser details
- deck information (color, position, probabilities, contingencies)
- response details
- reward_type
- trial_type (now called reversal_type)

## 🚧 To-Do
- Implement image preloading in version 7

---

🃏 Ready to dive in? Let's explore decision-making under uncertainty! 🧠🔍
