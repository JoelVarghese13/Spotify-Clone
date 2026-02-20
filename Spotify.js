// Spotify Clone - UI features controller

// FEATURE 1: INITIALIZE NAVIGATION WITH ACTIVE STATES
function initializeNavigation() {
    const homeText = document.querySelector('.house-text');
    const searchText = document.querySelector('.search-text');

    const activeNav = localStorage.getItem('activeNav') || 'home';
    if (activeNav === 'search') {
        if (searchText) searchText.classList.add('active-nav');
    } else {
        if (homeText) homeText.classList.add('active-nav');
    }

    if (homeText && searchText) {
        homeText.addEventListener('click', () => {
            homeText.classList.add('active-nav');
            searchText.classList.remove('active-nav');
            localStorage.setItem('activeNav', 'home');
            showToast('Navigated to Home');
        });

        searchText.addEventListener('click', () => {
            searchText.classList.add('active-nav');
            homeText.classList.remove('active-nav');
            localStorage.setItem('activeNav', 'search');
            showToast('Navigated to Search');
        });
    }
}

// FEATURE 2: PLAY BUTTON INTERACTIONS
function initializePlayButtons() {
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.animation = 'none';
                setTimeout(() => (icon.style.animation = 'pulse-icon 0.8s ease-in-out'), 10);
            }
            showToast('▶ Playing song...');
        });
    });
}

// FEATURE 3: TOAST NOTIFICATION
function showToast(message, duration = 3000) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }

    const closeBtn = document.createElement('button');
    closeBtn.className = 'toast-close';
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', () => toast.classList.remove('show'));

    toast.innerHTML = `<div class="toast-content"><span class="toast-message">${message}</span></div>`;
    toast.appendChild(closeBtn);
    toast.classList.add('show');

    setTimeout(() => toast.classList.remove('show'), duration);
}

// FEATURE 4: THEME TOGGLE
function initializeThemeToggle() {
    const themeBtn = document.getElementById('themeToggle');
    if (!themeBtn) return;

    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    document.body.classList.add(savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
        const newTheme = currentTheme === 'dark-theme' ? 'light-theme' : 'dark-theme';
        document.body.classList.replace(currentTheme, newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        showToast(`Switched to ${newTheme === 'dark-theme' ? 'Dark' : 'Light'} Mode`);
    });
}

function updateThemeIcon(theme) {
    const themeBtn = document.getElementById('themeToggle');
    if (!themeBtn) return;
    const icon = themeBtn.querySelector('i');
    if (!icon) return;
    icon.className = theme === 'dark-theme' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
}

// FEATURE 5: AUTH MODAL
function showAuthModal(type = 'login') {
    const modal = document.getElementById('authModal');
    if (!modal) return;
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const signupTab = document.getElementById('signupTab');
    const loginTab = document.getElementById('loginTab');

    if (type === 'signup') {
        if (loginForm) loginForm.style.display = 'none';
        if (signupForm) signupForm.style.display = 'flex';
        if (signupTab) signupTab.classList.add('active');
        if (loginTab) loginTab.classList.remove('active');
    } else {
        if (loginForm) loginForm.style.display = 'flex';
        if (signupForm) signupForm.style.display = 'none';
        if (loginTab) loginTab.classList.add('active');
        if (signupTab) signupTab.classList.remove('active');
    }

    modal.classList.add('active');
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (!modal) return;
    modal.classList.remove('active');
}

function initializeAuthModal() {
    const signupBtn = document.querySelector('.signupbtn');
    const loginBtn = document.querySelector('.loginbtn');
    const closeBtn = document.querySelector('.modal-close');
    const overlay = document.querySelector('.modal-overlay');

    if (signupBtn) signupBtn.addEventListener('click', (e) => { e.preventDefault(); showAuthModal('signup'); });
    if (loginBtn) loginBtn.addEventListener('click', (e) => { e.preventDefault(); showAuthModal('login'); });
    if (closeBtn) closeBtn.addEventListener('click', (e) => { e.preventDefault(); closeAuthModal(); });
    if (overlay) overlay.addEventListener('click', closeAuthModal);

    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm('login')) { showToast('✓ Login successful!'); closeAuthModal(); loginForm.reset(); }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm('signup')) { showToast('✓ Account created successfully!'); closeAuthModal(); signupForm.reset(); }
        });
    }

    const signupTab = document.getElementById('signupTab');
    const loginTab = document.getElementById('loginTab');
    if (signupTab) signupTab.addEventListener('click', () => showAuthModal('signup'));
    if (loginTab) loginTab.addEventListener('click', () => showAuthModal('login'));
}

// FEATURE 6: FORM VALIDATION
function validateForm(formType) {
    let isValid = true;
    const errors = [];
    const form = formType === 'login' ? document.getElementById('loginForm') : document.getElementById('signupForm');
    if (!form) return false;

    const email = form.querySelector('input[type="email"]');
    const password = form.querySelector('input[type="password"]');

    if (email && !email.value) { errors.push('Email is required'); isValid = false; }
    else if (email && !isValidEmail(email.value)) { errors.push('Invalid email format'); isValid = false; }

    if (password && !password.value) { errors.push('Password is required'); isValid = false; }
    else if (password && password.value.length < 6) { errors.push('Password must be at least 6 characters'); isValid = false; }

    if (formType === 'signup') {
        const name = form.querySelector('input[type="text"]');
        if (name && !name.value) { errors.push('Name is required'); isValid = false; }
    }

    if (!isValid) showToast(errors.join(' | '));
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// FEATURE 7: PLAYBAR CONTROLS
function initializePlaybarControls() {
    const backBtn = document.querySelector('.control-btn:nth-of-type(1)');
    const playBtn = document.querySelector('.control-btn:nth-of-type(2)');
    const nextBtn = document.querySelector('.control-btn:nth-of-type(3)');

    if (backBtn) backBtn.addEventListener('click', () => showToast('⏮ Previous track'));
    if (playBtn) playBtn.addEventListener('click', () => {
        const icon = playBtn.querySelector('i');
        if (!icon) return;
        if (icon.classList.contains('fa-play')) { icon.classList.replace('fa-play', 'fa-pause'); showToast('▶ Now playing'); }
        else { icon.classList.replace('fa-pause', 'fa-play'); showToast('⏸ Paused'); }
    });
    if (nextBtn) nextBtn.addEventListener('click', () => showToast('⏭ Next track'));
}

// FEATURE 8: VISIT COUNTER
function initializeVisitCounter() {
    let visits = localStorage.getItem('visits') || 0;
    visits = parseInt(visits, 10) + 1;
    localStorage.setItem('visits', visits);
    console.log(`Page visits: ${visits}`);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializePlayButtons();
    initializeThemeToggle();
    initializeAuthModal();
    initializePlaybarControls();
    initializeVisitCounter();
});
