// Global state
let currentView = 'home';
let selectedTopic = null;
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let currentQuestions = [];
let showResults = false;

// Page navigation functions
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

// Render topics grid
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

// Select topic and start quiz
function selectTopic(topicId) {
    selectedTopic = topicId;
    currentQuestions = questionsData[topicId] || [];
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    showResults = false;
    showQuiz();
}

// Start quiz
function startQuiz() {
    if (!currentQuestions.length) {
        alert('No questions available for this topic!');
        showTopics();
        return;
    }
    
    renderQuestion();
}

// Render current question
function renderQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    
    // Update progress
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = Math.round(progress) + '% Complete';
    document.getElementById('questionCounter').textContent = 
        `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
    
    // Update question
    document.getElementById('questionText').textContent = question.question;
    
    // Update options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.innerHTML = `<strong>${String.fromCharCode(65 + index)}.</strong> ${option}`;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
}

// Handle answer selection
function selectAnswer(answerIndex) {
    const question = currentQuestions[currentQuestionIndex];
    const buttons = document.querySelectorAll('.option-btn');
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    // Show correct/incorrect
    buttons[answerIndex].classList.add(answerIndex === question.correct ? 'correct' : 'incorrect');
    if (answerIndex !== question.correct) {
        buttons[question.correct].classList.add('correct');
    }
    
    // Update score
    if (answerIndex === question.correct) {
        score++;
    }
    
    userAnswers[currentQuestionIndex] = answerIndex;
    
    // Move to next question after delay
    setTimeout(() => {
        if (currentQuestionIndex < currentQuestions.length - 1) {
            currentQuestionIndex++;
            renderQuestion();
        } else {
            // Update topic completion
            const topic = topics.find(t => t.id === selectedTopic);
            if (topic) {
                topic.completed = Math.max(topic.completed, currentQuestions.length);
            }
            showResultsPage();
        }
    }, 1500);
}

// Render quiz results
function renderResults() {
    const percentage = Math.round((score / currentQuestions.length) * 100);
    
    document.getElementById('scorePercentage').textContent = percentage + '%';
    document.getElementById('scoreText').textContent = 
        `Your Score: ${score}/${currentQuestions.length}`;
    
    // Render stars based on percentage
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

// Render dashboard
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

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    showHome();
});