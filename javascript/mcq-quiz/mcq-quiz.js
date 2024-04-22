const options = document.querySelectorAll('.option');
const attemptedCount = document.getElementById('attemptedCount');
const correctCount = document.getElementById('correctCount');
const wrongCount = document.getElementById('wrongCount');
const percentage = document.getElementById('percentage');

let totalQuestions = 0;
let correctAnswers = 0;
const attemptedQuestions = new Set();

options.forEach(option => {
    option.addEventListener('click', () => {
        const questionId = option.getAttribute('data-question');
        const isCorrect = option.getAttribute('data-correct') === 'true';

        if (!attemptedQuestions.has(questionId)) {
            options.forEach(o => {
                if (o.getAttribute('data-question') === questionId) {
                    o.classList.remove('selected', 'correct', 'wrong');
                    if (o === option) {
                        o.classList.add('selected');
                        if (isCorrect) {
                            o.classList.add('correct');
                            correctAnswers++;
                        } else {
                            o.classList.add('wrong');
                            options.forEach(correctOption => {
                                if (
                                    correctOption.getAttribute('data-question') === questionId &&
                                    correctOption.getAttribute('data-correct') === 'true'
                                ) {
                                    correctOption.classList.add('correct');
                                }
                            });
                        }
                        totalQuestions++;
                        attemptedQuestions.add(questionId);
                    }
                }
            });
        }

        // Show explanation
        const explanation = document.querySelector(`.explanation[data-question="${questionId}`);
        if (explanation) {
            explanation.style.display = 'block';
        }
        attemptedCount.textContent = totalQuestions;
        correctCount.textContent = correctAnswers;
        wrongCount.textContent = totalQuestions - correctAnswers;
        percentage.textContent = ((correctAnswers / totalQuestions) * 100).toFixed(2) + '%';
    });
});
