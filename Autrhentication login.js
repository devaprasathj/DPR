document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const authMessage = document.getElementById('authMessage');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    const toggleToSignup = document.getElementById('toggleToSignup');
    const toggleToLogin = document.getElementById('toggleToLogin');
    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');

    // Check if the user is already authenticated on the login page
    if (loginForm && localStorage.getItem('dpr_token')) {
        window.location.href = 'main dashboard.html';
        return;
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Local sign-in using stored accounts
            const users = JSON.parse(localStorage.getItem('dpr_users') || '{}');
            const storedPassword = users[email];
            if (!storedPassword || storedPassword !== password) {
                authMessage.textContent = 'Invalid email or password.';
                authMessage.classList.add('error');
                authMessage.style.display = 'block';
                return;
            }

            localStorage.setItem('dpr_token', 'local-token-' + Date.now());
            authMessage.classList.remove('error');
            authMessage.textContent = 'Login successful. Redirecting...';
            authMessage.style.display = 'block';

            setTimeout(() => {
                window.location.href = 'main dashboard.html';
            }, 400);
        });
    }

    // Sign Up flow
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirm = document.getElementById('signupConfirm').value;

            if (!email || !password || !confirm) {
                authMessage.textContent = 'Please fill in all fields.';
                authMessage.classList.add('error');
                authMessage.style.display = 'block';
                return;
            }

            if (password !== confirm) {
                authMessage.textContent = 'Passwords do not match.';
                authMessage.classList.add('error');
                authMessage.style.display = 'block';
                return;
            }

            const users = JSON.parse(localStorage.getItem('dpr_users') || '{}');
            if (users[email]) {
                authMessage.textContent = 'Account already exists. Please sign in.';
                authMessage.classList.add('error');
                authMessage.style.display = 'block';
                return;
            }

            users[email] = password; // Note: For demo only. Do NOT store plaintext passwords in production.
            localStorage.setItem('dpr_users', JSON.stringify(users));

            authMessage.classList.remove('error');
            authMessage.textContent = 'Account created. You can sign in now.';
            authMessage.style.display = 'block';

            // Switch to login
            if (showLogin) showLogin.click();
        });
    }

    // Toggle between Sign In and Sign Up
    function showSignupView() {
        if (!loginForm || !signupForm) return;
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        toggleToSignup.style.display = 'none';
        toggleToLogin.style.display = 'block';
        authTitle.textContent = 'Create Account';
        authSubtitle.textContent = 'Sign up to access the MDONER DPR Assessment System';
        authMessage.style.display = 'none';
    }

    function showLoginView() {
        if (!loginForm || !signupForm) return;
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        toggleToSignup.style.display = 'block';
        toggleToLogin.style.display = 'none';
        authTitle.textContent = 'Welcome Back';
        authSubtitle.textContent = 'Sign in to access the MDONER DPR Assessment System';
        authMessage.style.display = 'none';
    }

    if (showSignup) showSignup.addEventListener('click', (e) => { e.preventDefault(); showSignupView(); });
    if (showLogin) showLogin.addEventListener('click', (e) => { e.preventDefault(); showLoginView(); });

    // Exported function for use by other pages
    window.checkAuth = function() {
        const token = localStorage.getItem('dpr_token');
        if (!token) {
            window.location.href = 'login page.html'; // Redirect to login
            return false;
        }
        return token;
    };

    window.logout = function() {
        localStorage.removeItem('dpr_token');
        window.location.href = 'login page.html';
    };

    // Attach logout functionality if button exists (e.g., on dashboard)
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', window.logout);
    }
});
