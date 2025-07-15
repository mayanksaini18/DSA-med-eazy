let currentView = 'home';
let selectedTopic = null;
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let currentQuestions = [];
let showResults = false;

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    currentView = pageId.replace('Page', '');
}

function showHome() {
    showPage('homePage');
}

function showTopics() {
    showPage('topicsPage');
    renderTopics();
}

function showQuiz() {
    showPage('quizPage');
    startQuiz();
}

function showResultsPage() {
    showPage('resultsPage');
    renderResults();
}

function showDashboard() {
    showPage('dashboardPage');
    renderDashboard();
}

function renderTopics() {
    const topicsGrid = document.getElementById('topicsGrid');
    topicsGrid.innerHTML = '';

    topics.forEach(topic => {
        const topicCard = document.createElement('div');
        topicCard.className = 'topic-card';
        topicCard.onclick = () => selectTopic(topic.id);

        const progressPercentage = Math.round((topic.completed / topic.questions) * 100);

        topicCard.innerHTML = `
            <div class="topic-header">
                <div class="topic-info">
                    <div class="topic-icon">${topic.icon}</div>
                    <div>
                        <div class="topic-title">${topic.name}</div>
                        <div class="topic-subtitle">${topic.questions} questions</div>
                    </div>
                </div>
                <div class="difficulty-badge difficulty-${topic.difficulty.toLowerCase()}">
                    ${topic.difficulty}
                </div>
            </div>
            <div class="topic-progress">
                <div class="progress-info">
                    <span>Progress</span>
                    <span>${topic.completed}/${topic.questions}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                </div>
            </div>
        `;
        topicsGrid.appendChild(topicCard);
    });
}

function selectTopic(topicId) {
    selectedTopic = topicId;
    currentQuestions = questionsData[topicId] || [];
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    showResults = false;
    showQuiz();
}

function startQuiz() {
    if (!currentQuestions.length) {
        alert('No questions available!');
        showTopics();
        return;
    }
    renderQuestion();
}

function renderQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;

    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = Math.round(progress) + '% Complete';
    document.getElementById('questionCounter').textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
    document.getElementById('questionText').textContent = question.question;

    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.innerHTML = `<strong>${String.fromCharCode(65 + index)}.</strong> ${option}`;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });

    document.getElementById('explanationText').classList.add('hidden');
    document.getElementById('explanationText').textContent = '';

    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.style.display = 'none';
}

function selectAnswer(answerIndex) {
    const question = currentQuestions[currentQuestionIndex];
    const buttons = document.querySelectorAll('.option-btn');

    // Prevent double-answering
    if (userAnswers[currentQuestionIndex] !== undefined) return;

    buttons.forEach(btn => btn.disabled = true);

    if (answerIndex === question.correct) {
        buttons[answerIndex].classList.add('correct');
        score++;
    } else {
        buttons[answerIndex].classList.add('incorrect');
        buttons[question.correct].classList.add('correct');
    }

    userAnswers[currentQuestionIndex] = answerIndex;
    // Show explanation
    const explanation = question.explanation || "Explanation not available.";
    const explanationText = document.getElementById("explanationText");
    explanationText.textContent = explanation;
    explanationText.classList.remove("d-none");


    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.style.display = 'inline-block';
}

function goToNext() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        const topic = topics.find(t => t.id === selectedTopic);
        if (topic) {
            topic.completed = Math.max(topic.completed, currentQuestions.length);
        }
        showResultsPage();
    }
}

function renderResults() {
    const percentage = Math.round((score / currentQuestions.length) * 100);
    document.getElementById('scorePercentage').textContent = percentage + '%';
    document.getElementById('scoreText').textContent = `Your Score: ${score}/${currentQuestions.length}`;

    const starsContainer = document.getElementById('starsContainer');
    starsContainer.innerHTML = '';
    const starCount = Math.floor(percentage / 20);

    for (let i = 0; i < 5; i++) {
        const star = document.createElement('span');
        star.className = i < starCount ? 'star' : 'star empty';
        star.textContent = '⭐';
        starsContainer.appendChild(star);
    }
}

function renderDashboard() {
    const topicProgress = document.getElementById('topicProgress');
    if (!topicProgress) return;

    topicProgress.innerHTML = '';

    topics.forEach(topic => {
        const progressItem = document.createElement('div');
        progressItem.className = 'topic-progress-item';

        const progressPercentage = Math.round((topic.completed / topic.questions) * 100);

        progressItem.innerHTML = `
            <div class="topic-progress-info">
                <span class="topic-icon">${topic.icon}</span>
                <div>
                    <div class="topic-title">${topic.name}</div>
                    <div class="topic-subtitle">${topic.completed}/${topic.questions} completed</div>
                </div>
            </div>
            <div class="topic-progress-stats">
                <div class="topic-progress-bar">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                    </div>
                </div>
                <div class="difficulty-badge difficulty-${topic.difficulty.toLowerCase()}">
                    ${topic.difficulty}
                </div>
            </div>
        `;
        topicProgress.appendChild(progressItem);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    showHome();
});
