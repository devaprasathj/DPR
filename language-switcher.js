(function () {
    'use strict';

    const LANGUAGE_KEY = 'dpr_language';
    const THEME_KEY = 'dpr_theme';
    const USERS_KEY = 'dpr_users_v2';
    const translations = {
        en: { language: 'Language', dashboard: 'Dashboard', createDpr: 'Create DPR', assessment: 'Assessments', risk: 'Risk analysis', compliance: 'Compliance', analytics: 'Analytics', online: 'System online', signOut: 'Sign out', profile: 'My profile', verified: 'Verified account', theme: 'Change theme', title: 'MDoNER DPR Portal', subtitle: 'Project appraisal & monitoring', details: 'Account details', fullName: 'Full name', email: 'Official email', organisation: 'Organisation', designation: 'Designation', role: 'Access role', phone: 'Mobile number', photo: 'Change photo', removePhoto: 'Remove', close: 'Close', loginTitle: 'Sign in to your account', loginSubtitle: 'Use your registered official credentials', password: 'Password', signIn: 'Sign in securely' },
        hi: { language: 'भाषा', dashboard: 'डैशबोर्ड', createDpr: 'डीपीआर बनाएँ', assessment: 'मूल्यांकन', risk: 'जोखिम विश्लेषण', compliance: 'अनुपालन', analytics: 'विश्लेषिकी', online: 'सिस्टम ऑनलाइन', signOut: 'साइन आउट', profile: 'मेरी प्रोफ़ाइल', verified: 'सत्यापित खाता', theme: 'थीम बदलें', title: 'पूर्वोत्तर क्षेत्र विकास मंत्रालय डीपीआर पोर्टल', subtitle: 'परियोजना मूल्यांकन और निगरानी', details: 'खाता विवरण', fullName: 'पूरा नाम', email: 'आधिकारिक ईमेल', organisation: 'संगठन', designation: 'पदनाम', role: 'पहुँच भूमिका', phone: 'मोबाइल नंबर', photo: 'फ़ोटो बदलें', removePhoto: 'हटाएँ', close: 'बंद करें', loginTitle: 'अपने खाते में साइन इन करें', loginSubtitle: 'अपने पंजीकृत आधिकारिक प्रमाण-पत्र का उपयोग करें', password: 'पासवर्ड', signIn: 'सुरक्षित साइन इन' },
        as: { language: 'ভাষা', dashboard: 'ডেশ্বব’ৰ্ড', createDpr: 'ডিপিআৰ সৃষ্টি কৰক', assessment: 'মূল্যায়ন', risk: 'বিপদ বিশ্লেষণ', compliance: 'অনুপালন', analytics: 'বিশ্লেষণ', online: 'ছিষ্টেম অনলাইন', signOut: 'ছাইন আউট', profile: 'মোৰ প্ৰফাইল', verified: 'সত্যাপিত একাউণ্ট', theme: 'থীম সলনি কৰক', title: 'এমড’নাৰ ডিপিআৰ প’ৰ্টেল', subtitle: 'প্ৰকল্প মূল্যায়ন আৰু নিৰীক্ষণ', details: 'একাউণ্টৰ বিৱৰণ', fullName: 'সম্পূৰ্ণ নাম', email: 'চৰকাৰী ইমেইল', organisation: 'সংস্থা', designation: 'পদবী', role: 'প্ৰৱেশ ভূমিকা', phone: 'ম’বাইল নম্বৰ', photo: 'ফটো সলনি কৰক', removePhoto: 'আঁতৰাওক', close: 'বন্ধ কৰক', loginTitle: 'আপোনাৰ একাউণ্টত ছাইন ইন কৰক', loginSubtitle: 'পঞ্জীয়নভুক্ত চৰকাৰী পৰিচয় ব্যৱহাৰ কৰক', password: 'পাছৱৰ্ড', signIn: 'সুৰক্ষিত ছাইন ইন' }
    };

    function readUsers() { try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {}; } catch (_) { return {}; } }
    function session() { return window.getCurrentUser ? window.getCurrentUser() : null; }
    function currentLanguage() { const value = localStorage.getItem(LANGUAGE_KEY) || localStorage.getItem('selectedLanguage') || 'en'; return translations[value] ? value : 'en'; }
    function text() { return translations[currentLanguage()]; }

    function ensureStyles() {
        if (document.querySelector('link[href="app-shell.css"]')) return;
        const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'app-shell.css'; document.head.appendChild(link);
    }

    function applyTheme(theme) {
        const dark = theme === 'dark'; document.documentElement.dataset.theme = dark ? 'dark' : 'light'; document.body.classList.toggle('dark-mode', dark);
        const button = document.getElementById('modeChangeBtn');
        if (button) { button.innerHTML = `<span class="material-icons">${dark ? 'light_mode' : 'dark_mode'}</span>`; button.setAttribute('aria-label', dark ? 'Use light theme' : 'Use dark theme'); button.title = text().theme; }
    }

    function ensureControls() {
        const controls = document.querySelector('.header-controls');
        let language = document.getElementById('languageSelect');
        if (!language && controls) {
            const wrapper = document.createElement('div'); wrapper.className = 'language-selector'; wrapper.innerHTML = '<span class="material-icons">language</span><select id="languageSelect" aria-label="Language"></select>'; controls.prepend(wrapper); language = wrapper.querySelector('select');
        }
        if (language) {
            language.innerHTML = '<option value="en">English</option><option value="hi">हिन्दी</option><option value="as">অসমীয়া</option>'; language.value = currentLanguage(); language.setAttribute('aria-label', text().language);
            if (!language.dataset.ready) { language.addEventListener('change', () => { localStorage.setItem(LANGUAGE_KEY, language.value); localStorage.setItem('selectedLanguage', language.value); applyLanguage(); }); language.dataset.ready = 'true'; }
        }

        let mode = document.getElementById('modeChangeBtn');
        if (!mode && controls) { mode = document.createElement('button'); mode.id = 'modeChangeBtn'; mode.className = 'mode-toggle'; controls.insertBefore(mode, controls.querySelector('#logoutButton')); }
        if (mode && !mode.dataset.ready) { mode.addEventListener('click', () => { const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem(THEME_KEY, next); applyTheme(next); }); mode.dataset.ready = 'true'; }
        if (controls && session()) ensureProfile(controls);
    }

    function userDetails() { const active = session() || {}; const stored = readUsers()[active.email] || {}; return { ...stored, ...active, email: active.email || stored.email || '', designation: stored.designation || 'Project Officer', phone: stored.phone || 'Not provided', organisation: active.organisation || stored.organisation || 'MDoNER', role: active.role || stored.role || 'project_officer', photo: stored.photo || '' }; }
    function initials(user) { return (user.name || user.email || 'U').split(/\s+/).slice(0, 2).map(value => value[0]).join('').toUpperCase(); }
    function avatarMarkup(user, className) { return user.photo ? `<img class="${className}" src="${user.photo}" alt="${user.name || 'User'} profile photo">` : `<span class="${className} avatar-fallback">${initials(user)}</span>`; }

    function ensureProfile(controls) {
        const oldChip = controls.querySelector('.user-chip'); if (oldChip) oldChip.remove();
        let button = document.getElementById('userProfileButton');
        if (!button) {
            button = document.createElement('button'); button.type = 'button'; button.id = 'userProfileButton'; button.className = 'profile-trigger';
            const logout = document.getElementById('logoutButton'); controls.insertBefore(button, logout || null);
            button.addEventListener('click', event => { event.stopPropagation(); document.getElementById('profilePanel')?.classList.toggle('open'); });
            document.addEventListener('click', event => { if (!event.target.closest('.profile-area')) document.getElementById('profilePanel')?.classList.remove('open'); });
        }
        if (!button.closest('.profile-area')) { const area = document.createElement('div'); area.className = 'profile-area'; button.replaceWith(area); area.appendChild(button); area.insertAdjacentHTML('beforeend', '<div class="profile-panel" id="profilePanel"></div>'); }
        renderProfile();
    }

    function renderProfile() {
        const user = userDetails(), button = document.getElementById('userProfileButton'), panel = document.getElementById('profilePanel'); if (!button || !panel) return;
        button.innerHTML = `${avatarMarkup(user, 'profile-avatar')}<span class="profile-trigger-copy"><strong>${escapeHtml(user.name || 'Portal user')}</strong><small>${escapeHtml(user.designation)}</small></span><span class="material-icons profile-chevron">expand_more</span>`;
        panel.innerHTML = `<div class="profile-panel-head">${avatarMarkup(user, 'profile-avatar profile-avatar-large')}<div><strong>${escapeHtml(user.name || 'Portal user')}</strong><span><span class="material-icons">verified</span>${text().verified}</span></div></div><div class="profile-fields"><p><span>${text().email}</span><strong>${escapeHtml(user.email)}</strong></p><p><span>${text().organisation}</span><strong>${escapeHtml(user.organisation)}</strong></p><p><span>${text().designation}</span><strong>${escapeHtml(user.designation)}</strong></p><p><span>${text().role}</span><strong>${escapeHtml(String(user.role).replaceAll('_', ' '))}</strong></p><p><span>${text().phone}</span><strong>${escapeHtml(user.phone)}</strong></p></div><div class="profile-photo-actions"><label class="profile-photo-button"><span class="material-icons">add_a_photo</span>${text().photo}<input id="profilePhotoInput" type="file" accept="image/png,image/jpeg,image/webp" hidden></label>${user.photo ? `<button type="button" id="removeProfilePhoto">${text().removePhoto}</button>` : ''}</div><p class="photo-help" id="photoHelp">JPG, PNG or WebP · max 1 MB</p>`;
        panel.querySelector('#profilePhotoInput').addEventListener('change', savePhoto); panel.querySelector('#removeProfilePhoto')?.addEventListener('click', removePhoto);
    }

    function savePhoto(event) {
        const file = event.target.files[0], help = document.getElementById('photoHelp'); if (!file) return;
        if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size > 1024 * 1024) { help.textContent = 'Choose a JPG, PNG or WebP image under 1 MB.'; help.classList.add('error'); return; }
        const reader = new FileReader(); reader.onload = () => { const active = session(), users = readUsers(); if (!active || !users[active.email]) return; users[active.email].photo = reader.result; localStorage.setItem(USERS_KEY, JSON.stringify(users)); renderProfile(); }; reader.readAsDataURL(file);
    }
    function removePhoto() { const active = session(), users = readUsers(); if (!active || !users[active.email]) return; delete users[active.email].photo; localStorage.setItem(USERS_KEY, JSON.stringify(users)); renderProfile(); }
    function escapeHtml(value) { const node = document.createElement('span'); node.textContent = value || ''; return node.innerHTML; }

    function applyLanguage() {
        const t = text(); document.documentElement.lang = currentLanguage();
        document.querySelectorAll('[data-translate-key],[data-i18n]').forEach(element => { const key = element.dataset.translateKey || element.dataset.i18n; if (!t[key]) return; const icon = element.querySelector('.material-icons'); element.textContent = `${t[key]} `; if (icon) element.appendChild(icon); });
        const heading = document.querySelector('.main-header .header-title'); if (heading) { const h1 = heading.querySelector('h1'), p = heading.querySelector('p'); if (h1) h1.textContent = t.title; if (p) p.textContent = t.subtitle; }
        const brand = document.querySelector('.brand-info'); if (brand) { const strong = brand.querySelector('strong'), small = brand.querySelector('small'); if (strong) strong.textContent = t.title; if (small) small.textContent = t.subtitle; }
        const loginForm = document.getElementById('loginForm'); if (loginForm && !loginForm.hidden) { document.getElementById('authTitle').textContent = t.loginTitle; document.getElementById('authSubtitle').textContent = t.loginSubtitle; const emailLabel = document.querySelector('label[for="email"]'), passwordLabel = document.querySelector('label[for="password"]'), submitCopy = loginForm.querySelector('.submit-btn span:first-child'); if (emailLabel) emailLabel.textContent = t.email; if (passwordLabel) passwordLabel.textContent = t.password; if (submitCopy) submitCopy.textContent = t.signIn; }
        const navMap = { 'main dashboard.html': 'dashboard', 'upload DPR page.html': 'createDpr', 'Assessment page.html': 'assessment', 'Risk Analysis page.html': 'risk', 'compilance page.html': 'compliance', 'Analytics page.html': 'analytics' };
        document.querySelectorAll('.nav-tabs a').forEach(link => { const file = decodeURIComponent(link.getAttribute('href').split('?')[0]); if (navMap[file]) link.textContent = t[navMap[file]]; });
        const status = document.querySelector('.system-status'); if (status) status.innerHTML = `<span class="status-indicator online"></span> ${t.online}`;
        const logout = document.getElementById('logoutButton'); if (logout) logout.innerHTML = `${t.signOut}<span class="material-icons">logout</span>`;
        const selector = document.getElementById('languageSelect'); if (selector) { selector.value = currentLanguage(); selector.setAttribute('aria-label', t.language); }
        renderProfile(); applyTheme(localStorage.getItem(THEME_KEY) || localStorage.getItem('dprTheme') || 'light');
    }

    window.applyDprLanguage = applyLanguage;
    function init() { ensureStyles(); ensureControls(); applyLanguage(); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}());
