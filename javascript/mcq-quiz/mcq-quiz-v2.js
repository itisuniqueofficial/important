document.addEventListener("DOMContentLoaded", function () {
  const e = document.querySelectorAll(".option"),
    s = new Set;

  let totalQuestions = 0,
    correctAnswers = 0;

  function updateCounts(correct) {
    totalQuestions++;
    if (correct) {
      correctAnswers++;
    }
  }

  function finishQuiz() {
    e.forEach(option => {
      option.removeEventListener("click", handleOptionClick);
      option.style.pointerEvents = "none";
    });
  }

  function handleOptionClick(event) {
    const target = event.target,
      questionId = target.getAttribute("data-question"),
      isCorrect = target.getAttribute("data-correct") === "true";

    if (!s.has(questionId)) {
      e.forEach(option => {
        if (option.getAttribute("data-question") === questionId) {
          option.classList.remove("selected", "correct", "wrong");
          if (option === target) {
            option.classList.add("selected");
            if (isCorrect) {
              option.classList.add("correct");
            } else {
              option.classList.add("wrong");
            }
            updateCounts(isCorrect);
            s.add(questionId);
          }
        }
      });

      const explanation = document.querySelector(`.explanation[data-question="${questionId}"]`);
      if (explanation) {
        explanation.style.display = "block";
      }
    }
  }

  const questions = Array.from(document.querySelectorAll(".question"));
  const shuffledQuestions = (questions => {
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
  })(questions);

  shuffledQuestions.forEach((question, index) => {
    question.style.order = index + 1;
  });

  e.forEach(option => {
    option.addEventListener("click", handleOptionClick);
  });
});
