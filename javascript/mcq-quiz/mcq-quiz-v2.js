const options = document.querySelectorAll('.option');
let totalQuestions = 0;
const attemptedQuestions = new Set();

options.forEach(option => {
    option.addEventListener('click', () => {
        const questionId = option.getAttribute('data-question');
        if (!attemptedQuestions.has(questionId)) {
            options.forEach(o => {
                if (o.getAttribute('data-question') === questionId) {
                    o.classList.remove('selected');
                    if (o === option) {
                        o.classList.add('selected');
                    }
                    totalQuestions++;
                    attemptedQuestions.add(questionId);
                }
            });
        }
        const explanation = document.querySelector(`.explanation[data-question="${questionId}"]`);
        if (explanation) {
            explanation.style.display = 'block';
        }
    });
});
