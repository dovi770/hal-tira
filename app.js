// ====== ניהול מוזיקה ואפקטים ======
function playSound(type) {
    try {
        if(type === 'pop') {
            const pop = document.getElementById('sound-pop');
            pop.currentTime = 0;
            pop.play();
        }
    } catch(e) {}
}

const bgMusic = document.getElementById('background-music');
const toggleMusicBtn = document.getElementById('toggle-music');
let isMusicPlaying = false;

toggleMusicBtn.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        toggleMusicBtn.textContent = '▶️';
    } else {
        bgMusic.play();
        toggleMusicBtn.textContent = '⏸️';
    }
    isMusicPlaying = !isMusicPlaying;
    playSound('pop');
});

// ====== ניווט מסכים ======
function navigateTo(screenId, backScreenId = null) {
    playSound('pop');
    
    // שמירת היסטוריית חזרה למסכי קריאה
    if(screenId === 'reader-screen' && backScreenId) {
        document.getElementById('reader-back-btn').setAttribute('onclick', `navigateTo('${backScreenId}')`);
    }

    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        screen.classList.remove('animate-slide');
    });

    const target = document.getElementById(screenId);
    target.classList.add('active');
    setTimeout(() => target.classList.add('animate-slide'), 10);
}

// ====== משחק: איקס עיגול ======
const cells = document.querySelectorAll('.tic-tac-toe-cell');
const statusText = document.getElementById('tic-tac-toe-status');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winConditions = [
    [0,1,2], [3,4,5], [6,7,8], // שורות
    [0,3,6], [1,4,7], [2,5,8], // עמודות
    [0,4,8], [2,4,6]           // אלכסונים
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function handleCellClick(e) {
    const idx = e.target.getAttribute('data-cell-index');
    if (board[idx] !== '' || !gameActive) return;

    board[idx] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer.toLowerCase());
    playSound('pop');
    checkWin();
}

function checkWin() {
    let won = false;
    for (let condition of winConditions) {
        if (board[condition[0]] && board[condition[0]] === board[condition[1]] && board[condition[1]] === board[condition[2]]) {
            won = true; break;
        }
    }

    if (won) {
        statusText.textContent = `המנצח: ${currentPlayer}! 🎉`;
        gameActive = false;
    } else if (!board.includes('')) {
        statusText.textContent = 'תיקו! 🤝';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `תורו של: ${currentPlayer}`;
    }
}

function resetTicTacToe() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = `תורו של: X`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    playSound('pop');
}

// ====== חידונים ======
function loadTrivia(type) {
    const container = document.getElementById('trivia-container');
    const title = document.getElementById('trivia-title');
    container.innerHTML = '';
    
    let questions = type === 'trivia' ? triviaQuestions : bekiutQuestions;
    title.textContent = type === 'trivia' ? 'טריוויה לפסח' : 'חידון בקיאות לפסח';

    questions.forEach((q, idx) => {
        const div = document.createElement('div');
        div.className = 'trivia-item';
        div.innerHTML = `<h4 class="font-bold text-slate-700">${q.q}</h4><div class="trivia-answer">${q.a}</div>`;
        div.onclick = () => {
            playSound('pop');
            const ans = div.querySelector('.trivia-answer');
            if (ans.style.display === 'block') {
                ans.style.display = 'none';
                div.classList.remove('active');
            } else {
                ans.style.display = 'block';
                div.classList.add('active');
            }
        };
        container.appendChild(div);
    });
}

// ====== טעינת סיפורים ושער הביטחון ======
function initMenus() {
    const storiesList = document.getElementById('stories-list');
    storiesData.forEach(story => {
        const btn = document.createElement('button');
        btn.className = 'w-full text-right cute-card p-4 bg-white btn-press font-bold text-lg text-indigo-700';
        btn.textContent = "📖 " + story.title;
        btn.onclick = () => loadReader(story.title, story.content, 'stories-menu');
        storiesList.appendChild(btn);
    });

    const bitachonList = document.getElementById('bitachon-list');
    bitachonData.forEach(chapter => {
        const btn = document.createElement('button');
        btn.className = 'w-full text-right cute-card p-4 bg-white btn-press font-bold text-lg text-amber-700';
        btn.textContent = "🛡️ " + chapter.title;
        btn.onclick = () => loadReader(chapter.title, chapter.content, 'bitachon-menu');
        bitachonList.appendChild(btn);
    });
}

// ====== מסך קריאה דינמי + שינוי גודל פונט ======
let currentFontSize = 18; // גודל התחלתי

function loadReader(title, content, backScreen) {
    document.getElementById('reader-title').textContent = title;
    const contentDiv = document.getElementById('reader-content');
    contentDiv.innerHTML = content;
    currentFontSize = 18; // איפוס גודל
    contentDiv.style.fontSize = currentFontSize + 'px';
    
    navigateTo('reader-screen', backScreen);
}

function changeFontSize(change) {
    playSound('pop');
    currentFontSize += (change * 2);
    // הגבלת הגודל כדי שלא יהיה קטן/גדול מדי
    if (currentFontSize < 14) currentFontSize = 14;
    if (currentFontSize > 32) currentFontSize = 32;
    document.getElementById('reader-content').style.fontSize = currentFontSize + 'px';
}

// אתחול התפריטים בטעינת הדף
document.addEventListener('DOMContentLoaded', initMenus);
