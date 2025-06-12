
**English Learning App for Kids 🐱📚**
=======================

A child-friendly web app for learning English vocabulary through interactive word-image matching quizzes.

**Table of Contents**
-----------------

* [Overview](#overview)
* [Features](#features)
* [Technical Stack](#technical-stack)
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)

**Overview**
------------

This app allows parents to input word-image pairs and children to complete quizzes with visual feedback. The app retains data across sessions using browser localStorage.

**🎯 Features**
------------

* Parent Input Page: Add word-image pairs using text inputs.
* Quiz Page: Match words to images with drag-and-drop or click-to-select.
* Visual Feedback: Green ✔️ for correct matches, Red ❌ for incorrect ones.
* Persistent Data: All word-image pairs are saved in localStorage.
* Hello Kitty Style: Pastel colors, rounded fonts, and playful animations. 

**🛠️ Technical Stack**
-----------------

* Frontend: React.js + Tailwind CSS
* State Management: React hooks (useState, useEffect)
* Drag-and-Drop: React DnD or custom SVG line-drawing
* Storage: localStorage for saving word-image pairs

**Installation**
------------

1. Clone the repository: `git clone https://github.com/castroi/hello-kitty-english.git`
2. Navigate to the project directory: `cd hello-kitty-english`
3. Install dependencies: `npm install`
4. Start the app: `npm start`

**Usage**
-----

1. Open the app in a web browser: `http://localhost:3000`
2. Input word-image pairs on the parent input page
3. Navigate to the quiz page and complete the quiz
4. Review results and reset the quiz as needed

**Contributing**
------------

Contributions are welcome! Please submit a pull request with a clear description of changes.

**License**
-------

This project is licensed under the MIT License.

**Acknowledgments**
---------------

* Inspired by Hello Kitty's playful design
* Built with React.js and Tailwind CSS

**GitHub Repository**
-------------------

https://github.com/castroi/english-learning-app
