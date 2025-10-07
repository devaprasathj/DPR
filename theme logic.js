/**
 * Applies the selected theme by adding/removing a class to the body.
 * @param {string} theme - The theme to set ('light' or 'dark').
 */
function applyTheme(theme) {
    const themeToggleButton = document.getElementById('themeToggle');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggleButton) themeToggleButton.innerHTML = '<span class="material-icons">light_mode</span>';
    } else {
        document.body.classList.remove('dark-mode');
        if (themeToggleButton) themeToggleButton.innerHTML = '<span class="material-icons">dark_mode</span>';
    }
}

/**
 * Toggles the theme between light and dark and saves the preference.
 */
function toggleTheme() {
    const currentTheme = localStorage.getItem('dprTheme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('dprTheme', newTheme);
    applyTheme(newTheme);
}

/**
 * Initializes the theme switcher functionality.
 */
function initThemeSwitcher() {
    const themeToggleButton = document.getElementById('themeToggle');
    
    // Set the initial theme based on user's saved preference or default to light
    const savedTheme = localStorage.getItem('dprTheme') || 'light';
    applyTheme(savedTheme);

    // Add click event listener to the toggle button
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }
}
