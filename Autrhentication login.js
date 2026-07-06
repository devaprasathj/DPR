(function () {
    'use strict';
    const KEYS = { users: 'dpr_users_v2', session: 'dpr_session' };
    const SESSION_HOURS = 8;

    function readJSON(key, fallback) {
        try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (_) { return fallback; }
    }

    async function hashPassword(password) {
        if (!window.crypto || !window.crypto.subtle) return `demo-${btoa(unescape(encodeURIComponent(password)))}`;
        const data = new TextEncoder().encode(password);
        const digest = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(digest), value => value.toString(16).padStart(2, '0')).join('');
    }

    async function ensureDemoUser() {
        const users = readJSON(KEYS.users, {});
        if (!users['demo@mdoner.gov.in']) {
            users['demo@mdoner.gov.in'] = { name: 'Demo Project Officer', organisation: 'MDoNER', designation: 'Project Officer', role: 'project_officer', phone: '9876543210', passwordHash: await hashPassword('demo123'), approved: true };
            localStorage.setItem(KEYS.users, JSON.stringify(users));
        }
    }

    function getSession() {
        const raw = sessionStorage.getItem(KEYS.session) || localStorage.getItem(KEYS.session);
        try {
            const session = JSON.parse(raw);
            if (!session || Date.now() > session.expiresAt) return null;
            return session;
        } catch (_) { return null; }
    }

    window.checkAuth = function () {
        const session = getSession();
        if (!session) {
            sessionStorage.removeItem(KEYS.session); localStorage.removeItem(KEYS.session);
            const returnTo = encodeURIComponent(location.pathname.split('/').pop() + location.search);
            location.replace(`login page.html?returnTo=${returnTo}`);
            return false;
        }
        return session;
    };

    window.getCurrentUser = getSession;
    window.logout = function () {
        sessionStorage.removeItem(KEYS.session); localStorage.removeItem(KEYS.session);
        localStorage.removeItem('dpr_token'); localStorage.removeItem('dpr_user_email');
        location.replace('login page.html');
    };

    document.addEventListener('DOMContentLoaded', async function () {
        const loginForm = document.getElementById('loginForm');
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) logoutButton.addEventListener('click', window.logout);
        if (!loginForm) return;
        await ensureDemoUser();
        if (getSession()) { location.replace('main dashboard.html'); return; }

        const signupForm = document.getElementById('signupForm');
        const message = document.getElementById('authMessage');
        const title = document.getElementById('authTitle');
        const subtitle = document.getElementById('authSubtitle');
        const icon = document.getElementById('authIcon');
        const toggleSignup = document.getElementById('toggleToSignup');
        const toggleLogin = document.getElementById('toggleToLogin');

        function showMessage(text, type) { message.textContent = text; message.className = `message-box ${type}`; message.style.display = 'block'; }
        function setView(signup) {
            loginForm.hidden = signup; signupForm.hidden = !signup;
            toggleSignup.hidden = signup; toggleLogin.hidden = !signup;
            title.textContent = signup ? 'Request your account' : 'Sign in to your account';
            subtitle.textContent = signup ? 'Register with verified official details' : 'Use your registered official credentials';
            icon.textContent = signup ? 'person_add' : 'login'; message.style.display = 'none';
            window.applyDprLanguage?.();
        }

        document.getElementById('showSignup').addEventListener('click', e => { e.preventDefault(); setView(true); });
        document.getElementById('showLogin').addEventListener('click', e => { e.preventDefault(); setView(false); });
        document.getElementById('forgotPassword').addEventListener('click', e => { e.preventDefault(); showMessage('Contact your portal administrator to verify your identity and reset access.', 'info'); });
        document.querySelectorAll('.password-toggle').forEach(button => button.addEventListener('click', () => {
            const input = document.getElementById(button.dataset.target); const visible = input.type === 'text';
            input.type = visible ? 'password' : 'text'; button.firstElementChild.textContent = visible ? 'visibility' : 'visibility_off';
        }));

        loginForm.addEventListener('submit', async e => {
            e.preventDefault();
            if (!loginForm.checkValidity()) { loginForm.reportValidity(); return; }
            const email = document.getElementById('email').value.trim().toLowerCase();
            const users = readJSON(KEYS.users, {}); const user = users[email];
            if (!user || user.passwordHash !== await hashPassword(document.getElementById('password').value)) { showMessage('The email or password is incorrect.', 'error'); return; }
            if (!user.approved) { showMessage('Your account is awaiting administrator approval.', 'info'); return; }
            const session = { email, name: user.name, organisation: user.organisation, role: user.role, expiresAt: Date.now() + SESSION_HOURS * 3600000 };
            const storage = document.getElementById('rememberMe').checked ? localStorage : sessionStorage;
            storage.setItem(KEYS.session, JSON.stringify(session));
            showMessage('Signed in. Opening your workspace…', 'success');
            const params = new URLSearchParams(location.search); const target = params.get('returnTo');
            const safeTarget = target && /^[\w%().+ -]+\.html(?:\?[^#]*)?$/.test(target) && !target.toLowerCase().includes('login') ? target : 'main dashboard.html';
            setTimeout(() => location.replace(safeTarget), 350);
        });

        signupForm.addEventListener('submit', async e => {
            e.preventDefault();
            if (!signupForm.checkValidity()) { signupForm.reportValidity(); return; }
            const password = document.getElementById('signupPassword').value;
            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(password)) { showMessage('Use at least 8 characters with uppercase, lowercase and a number.', 'error'); return; }
            if (password !== document.getElementById('signupConfirm').value) { showMessage('Passwords do not match.', 'error'); return; }
            const email = document.getElementById('signupEmail').value.trim().toLowerCase(); const users = readJSON(KEYS.users, {});
            if (users[email]) { showMessage('An account already exists for this email.', 'error'); return; }
            users[email] = { name: document.getElementById('signupName').value.trim(), designation: document.getElementById('signupDesignation').value.trim(), organisation: document.getElementById('signupOrganisation').value.trim(), role: document.getElementById('signupRole').value, phone: document.getElementById('signupPhone').value, passwordHash: await hashPassword(password), approved: true };
            localStorage.setItem(KEYS.users, JSON.stringify(users)); signupForm.reset(); setView(false);
            showMessage('Account created. You can sign in now.', 'success'); document.getElementById('email').value = email;
        });
    });
}());
