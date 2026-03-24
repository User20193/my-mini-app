// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();
tg.setHeaderColor('#667eea');
tg.setBackgroundColor('#764ba2');

// Состояние приложения
let gameState = {
    coins: 0,
    totalCoins: 0,
    energy: 100,
    maxEnergy: 100,
    perTap: 1,
    passiveIncome: 0,
    empireLevel: 1,
    empireTitle: 'Новичок',
    comboStreak: 0,
    lastTapTime: 0,
    upgrades: [],
    storyProgress: 0,
    dailyClaimed: false
};

// Улучшения
const UPGRADES = [
    { id: 1, name: 'Мощный Коготь', icon: '🐱', category: 'tap', baseCost: 100, effect: 1, maxLevel: 50 },
    { id: 2, name: 'Стальные Когти', icon: '🐾', category: 'tap', baseCost: 500, effect: 2, maxLevel: 40 },
    { id: 3, name: 'Алмазные Когти', icon: '💎', category: 'tap', baseCost: 2000, effect: 5, maxLevel: 30 },
    { id: 4, name: 'Энергетический Бак', icon: '⚡', category: 'energy', baseCost: 200, effect: 10, maxLevel: 30 },
    { id: 5, name: 'Котячий Кофеин', icon: '☕', category: 'energy', baseCost: 500, effect: 1, maxLevel: 20 },
    { id: 6, name: 'Сонный Доход', icon: '😴', category: 'passive', baseCost: 300, effect: 10, maxLevel: 50 },
    { id: 7, name: 'Котячий Бизнес', icon: '💼', category: 'passive', baseCost: 1500, effect: 50, maxLevel: 40 },
    { id: 8, name: 'Магнит для Монет', icon: '🧲', category: 'special', baseCost: 2000, effect: 5, maxLevel: 20 },
];

// Сюжетные главы
const STORY_CHAPTERS = [
    {
        chapter: 1,
        title: '🐱 Пробуждение',
        scene: '┌─────────────────────────────────┐\n│ 🌅 Рассвет в кошачьем мире │\n├─────────────────────────────────┤\n│ │\n│ 😺 ← Ты │\n│ /\\ │\n│ / \\ │\n│ 🐱 Мяу! │\n│ │\n└─────────────────────────────────┘',
        text: 'Ты открываешь глаза и видишь маленького котёнка...\n\n«Мяу!» — говорит он. — «Ты наконец-то проснулся!»',
        requiredTaps: 0,
        reward: 100
    },
    {
        chapter: 2,
        title: '🐾 Первые шаги',
        scene: '┌─────────────────────────────────┐\n│ 🏚️ Заброшенный домик │\n├─────────────────────────────────┤\n│ 🐱 🐱 🐱 │\n│ \\|/ │\n│ 🏠 → 🏡 │\n│ /|\\ │\n│ 💰 💰 💰 │\n└─────────────────────────────────┘',
        text: 'Котёнок приводит тебя к заброшенному домику.\n\n«Здесь будет наша штаб-квартира!»',
        requiredTaps: 100,
        reward: 500
    },
    {
        chapter: 3,
        title: '😺 Новые друзья',
        scene: '┌─────────────────────────────────┐\n│ 🐱🐱🐱🐱🐱🐱🐱 │\n├─────────────────────────────────┤\n│ 🐱 🐱 🐱 │\n│ 🐱 🏠 🐱 │\n│ 🐱 🐱 🐱 │\n│ │\n│ 💰💰💰💰💰💰💰 │\n└─────────────────────────────────┘',
        text: 'К твоему домику подходят другие котики.\n\n«Мы слышали, что здесь появился добрый повелитель!»',
        requiredTaps: 500,
        reward: 1000
    },
    {
        chapter: 4,
        title: '🏰 Строительство империи',
        scene: '┌─────────────────────────────────┐\n│ 🏰 ИМПЕРИЯ КОТИКОВ │\n├─────────────────────────────────┤\n│ 🐱👑🐱 │\n│ 🏰🏰🏰 │\n│ 🐱🛏️🐱🍽️🐱 │\n│ 🐱🧸🐱🧶🐱 │\n│ 💎💎💎💎💎 │\n└─────────────────────────────────┘',
        text: 'Твой домик превращается в замок!\n\n«Ты лучший повелитель!» — мурлычут они.',
        requiredTaps: 2000,
        reward: 5000
    },
    {
        chapter: 5,
        title: '👑 Легенда',
        scene: '┌─────────────────────────────────┐\n│ 🌍 МИРОВАЯ ИМПЕРИЯ │\n├─────────────────────────────────┤\n│ 🐱👑🐱👑🐱 │\n│ 🏰🌍🏰🌍🏰 │\n│ 🐱🐱🐱🐱🐱🐱🐱 │\n│ 🐱🐱🐱🐱🐱🐱🐱 │\n│ 🎉🎊🎉🎊🎉🎊🎉 │\n└─────────────────────────────────┘',
        text: 'Твоя слава разнеслась по всему миру!\n\n«Да здравствует император!» 🎉',
        requiredTaps: 10000,
        reward: 10000
    }
];

// DOM элементы
const screens = document.querySelectorAll('.screen');
const navBtns = document.querySelectorAll('.nav-btn');
const catFace = document.querySelector('.cat-face');
const coinsDisplay = document.getElementById('coins');
const shopCoinsDisplay = document.getElementById('shop-coins');
const energyFill = document.getElementById('energy-fill');
const energyText = document.getElementById('energy-text');
const perTapDisplay = document.getElementById('per-tap');
const comboIndicator = document.getElementById('combo-indicator');
const comboMultiplier = document.getElementById('combo-multiplier');
const upgradesList = document.getElementById('upgrades-list');
const storyContent = document.getElementById('story-content');
const notification = document.getElementById('notification');

// Навигация
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetScreen = btn.dataset.screen;
        switchScreen(targetScreen);
    });
});

function switchScreen(screenId) {
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');

    navBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.screen === screenId) {
            btn.classList.add('active');
        }
    });

    // Обновляем контент при переключении
    if (screenId === 'shop-screen') renderUpgrades();
    if (screenId === 'profile-screen') updateProfile();
    if (screenId === 'story-screen') renderStory();
}

// Тапание
catFace.addEventListener('click', (e) => {
    if (gameState.energy <= 0) {
        showNotification('⚡ Нет энергии! Подожди восстановления', true);
        return;
    }

    // Тап
    gameState.energy--;
    const earned = gameState.perTap;
    gameState.coins += earned;
    gameState.totalCoins += earned;

    // Комбо
    const now = Date.now();
    if (now - gameState.lastTapTime < 5000) {
        gameState.comboStreak++;
        if (gameState.comboStreak >= 10) {
            const comboBonus = Math.floor(earned * (1 + gameState.comboStreak * 0.1));
            gameState.coins += comboBonus;
            gameState.totalCoins += comboBonus;
            showCombo();
        }
    } else {
        gameState.comboStreak = 1;
    }
    gameState.lastTapTime = now;

    // Анимация
    createTapEffect(e, earned);
    updateUI();
});

function createTapEffect(e, amount) {
    const effect = document.createElement('div');
    effect.className = 'tap-effect';
    effect.textContent = `+${amount} 💰`;
    effect.style.left = e.clientX + 'px';
    effect.style.top = e.clientY + 'px';
    document.body.appendChild(effect);
    setTimeout(() => effect.remove(), 1000);
}

function showCombo() {
    comboIndicator.classList.add('active');
    comboMultiplier.textContent = Math.floor(1 + gameState.comboStreak * 0.1);
    setTimeout(() => comboIndicator.classList.remove('active'), 2000);
}

// Магазин
function renderUpgrades(category = 'tap') {
    const filtered = UPGRADES.filter(u => u.category === category);
    upgradesList.innerHTML = filtered.map(upgrade => {
        const userLevel = gameState.upgrades.find(u => u.id === upgrade.id)?.level || 0;
        const cost = Math.floor(upgrade.baseCost * Math.pow(1.15, userLevel));
        const canAfford = gameState.coins >= cost;
        const maxed = userLevel >= upgrade.maxLevel;

        return `
            <div class="upgrade-card">
                <div class="upgrade-info">
                    <div class="upgrade-icon">${upgrade.icon}</div>
                    <div class="upgrade-details">
                        <h3>${upgrade.name}</h3>
                        <p>+${upgrade.effect} за уровень</p>
                        <div class="upgrade-level">Уровень: ${userLevel}/${upgrade.maxLevel}</div>
                    </div>
                </div>
                <button class="upgrade-btn ${maxed ? 'maxed' : ''}" 
                        onclick="buyUpgrade(${upgrade.id})"
                        ${!canAfford || maxed ? 'disabled' : ''}>
                    ${maxed ? '✅ MAX' : `💰 ${cost.toLocaleString()}`}
                </button>
            </div>
        `;
    }).join('');
}

// Категории магазина
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderUpgrades(btn.dataset.category);
    });
});

function buyUpgrade(upgradeId) {
    const upgrade = UPGRADES.find(u => u.id === upgradeId);
    const userUpgrade = gameState.upgrades.find(u => u.id === upgradeId);
    const currentLevel = userUpgrade?.level || 0;
    const cost = Math.floor(upgrade.baseCost * Math.pow(1.15, currentLevel));

    if (gameState.coins < cost || currentLevel >= upgrade.maxLevel) return;

    gameState.coins -= cost;

    if (userUpgrade) {
        userUpgrade.level++;
    } else {
        gameState.upgrades.push({ id: upgradeId, level: 1 });
    }

    // Применяем эффект
    applyUpgradeEffect(upgrade, currentLevel + 1);

    showNotification(`✅ ${upgrade.name} улучшен!`);
    renderUpgrades(document.querySelector('.category-btn.active').dataset.category);
    updateUI();
}

function applyUpgradeEffect(upgrade, level) {
    if (upgrade.category === 'tap') {
        gameState.perTap = 1 + upgrade.effect * level;
    } else if (upgrade.category === 'energy') {
        gameState.maxEnergy = 100 + upgrade.effect * level;
    } else if (upgrade.category === 'passive') {
        gameState.passiveIncome = upgrade.effect * level;
    }
}

// Профиль
function updateProfile() {
    document.getElementById('profile-name').textContent = tg.initDataUnsafe.user?.first_name || 'Котик';
    document.getElementById('profile-title').textContent = gameState.empireTitle;
    document.getElementById('profile-coins').textContent = gameState.coins.toLocaleString();
    document.getElementById('profile-total').textContent = gameState.totalCoins.toLocaleString();
    document.getElementById('profile-energy').textContent = gameState.maxEnergy;
    document.getElementById('profile-passive').textContent = gameState.passiveIncome;

    const rewardBtn = document.getElementById('claim-reward');
    if (gameState.dailyClaimed) {
        rewardBtn.disabled = true;
        rewardBtn.textContent = '✅ Награда получена';
    } else {
        rewardBtn.disabled = false;
        rewardBtn.textContent = '📅 Забрать ежедневную награду';
    }
}

document.getElementById('claim-reward').addEventListener('click', () => {
    if (gameState.dailyClaimed) return;

    const streak = Math.floor(Math.random() * 7) + 1;
    const reward = [100, 200, 300, 500, 700, 1000, 2000][streak - 1];

    gameState.coins += reward;
    gameState.totalCoins += reward;
    gameState.dailyClaimed = true;

    showNotification(`🎉 +${reward.toLocaleString()} монет! (Серия ${streak} дней)`);
    updateProfile();
    updateUI();
});

// Сюжет
function renderStory() {
    storyContent.innerHTML = STORY_CHAPTERS.map(chapter => {
        const unlocked = gameState.totalCoins >= chapter.requiredTaps;
        const completed = gameState.storyProgress >= chapter.chapter;

        if (!unlocked) {
            return `
                <div class="story-chapter">
                    <div class="chapter-locked">
                        🔒 Глава ${chapter.chapter}: ${chapter.title}
                        <br><small>Нужно ${chapter.requiredTaps.toLocaleString()} монет</small>
                    </div>
                </div>
            `;
        }

        return `
            <div class="story-chapter">
                <div class="chapter-header">
                    <div class="chapter-title">${chapter.title}</div>
                </div>
                <div class="chapter-scene">${chapter.scene}</div>
                <div class="chapter-text">${chapter.text}</div>
                ${!completed ? `
                    <button class="upgrade-btn" onclick="completeChapter(${chapter.chapter}, ${chapter.reward})">
                        📖 Прочитать (+${chapter.reward.toLocaleString()} 💰)
                    </button>
                ` : `
                    <div class="chapter-reward">✅ Прочитано</div>
                `}
            </div>
        `;
    }).join('');
}

function completeChapter(chapterNum, reward) {
    if (gameState.storyProgress >= chapterNum) return;

    gameState.storyProgress = chapterNum;
    gameState.coins += reward;
    gameState.totalCoins += reward;

    showNotification(`📖 Глава ${chapterNum} прочитана! +${reward.toLocaleString()} 💰`);
    renderStory();
    updateUI();
}

// Уведомления
function showNotification(message, isError = false) {
    notification.textContent = message;
    notification.className = 'notification show' + (isError ? ' error' : '');
    setTimeout(() => notification.classList.remove('show'), 3000);
}

// Обновление UI
function updateUI() {
    coinsDisplay.textContent = gameState.coins.toLocaleString();
    shopCoinsDisplay.textContent = gameState.coins.toLocaleString();
    energyFill.style.width = (gameState.energy / gameState.maxEnergy * 100) + '%';
    energyText.textContent = `${gameState.energy}/${gameState.maxEnergy}`;
    perTapDisplay.textContent = `${gameState.perTap} 💰`;

    // Обновляем титул
    if (gameState.totalCoins >= 1000000) gameState.empireTitle = 'Легенда Империи';
    else if (gameState.totalCoins >= 200000) gameState.empireTitle = 'Император';
    else if (gameState.totalCoins >= 50000) gameState.empireTitle = 'Повелитель Котов';
    else if (gameState.totalCoins >= 10000) gameState.empireTitle = 'Кошатник';
    else if (gameState.totalCoins >= 1000) gameState.empireTitle = 'Котятник';

    document.getElementById('empire-title').textContent = gameState.empireTitle;
}

// Восстановление энергии
setInterval(() => {
    if (gameState.energy < gameState.maxEnergy) {
        gameState.energy++;
        updateUI();
    }
}, 30000);

// Пассивный доход
setInterval(() => {
    if (gameState.passiveIncome > 0) {
        gameState.coins += gameState.passiveIncome;
        gameState.totalCoins += gameState.passiveIncome;
        updateUI();
    }
}, 3600000); // Каждый час

// Инициализация
updateUI();
renderUpgrades();

// Отправка данных боту при закрытии
window.addEventListener('beforeunload', () => {
    tg.sendData(JSON.stringify(gameState));
});

console.log('🐱 Cat Empire Tap загружен!');