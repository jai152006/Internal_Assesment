const questions = [
    {
        question: "Which language is used for data science?",
        options: ["Python", "HTML", "CSS", "SQL"],
        answer: "Python"
    },
    {
        question: "Which keyword defines a function in Python?",
        options: ["function", "def", "func", "define"],
        answer: "def"
    },
    {
        question: "Which language is used for web page structure?",
        options: ["Python", "HTML", "Java", "C++"],
        answer: "HTML"
    },
    {
        question: "Which symbol is used for comments in Python?",
        options: ["//", "#", "/*", "--"],
        answer: "#"
    },
    {
        question: "Which technology is used for styling web pages?",
        options: ["HTML", "CSS", "Python", "SQL"],
        answer: "CSS"
    }
];

let currentQuestion = 0;
let score = 0;

function showQuestion() {
    const question = questions[currentQuestion];

    document.getElementById("question").textContent =
        question.question;

    const options = document.getElementById("options");
    options.innerHTML = "";

    question.options.forEach(function(option) {
        const button = document.createElement("button");

        button.textContent = option;

        button.onclick = function() {
            if (option === question.answer) {
                score++;
            }

            nextQuestion();
        };

        options.appendChild(button);
    });
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        document.getElementById("question").textContent =
            "Quiz Completed!";

        document.getElementById("options").innerHTML = "";

        document.getElementById("score").textContent =
            "Your Score: " + score + "/" + questions.length;
    }
}

showQuestion();