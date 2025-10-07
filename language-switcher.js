<script>
document.addEventListener('DOMContentLoaded', () => {
    console.log("Language switcher script loaded.");

    const translations = {
        en: {
            // Login Page
            welcomeBack: "Welcome Back",
            signInToAccess: "Sign in to access the MDONER DPR Assessment System",
            emailLabel: "Email",
            passwordLabel: "Password",
            signInButton: "Sign In",
            noAccount: "Don't have an account?",
            signUpLink: "Sign up",
            // Main App Header & Nav
            systemTitle: "MDONER DPR Quality Assessment System",
            systemSubtitle: "AI-Powered Project Evaluation & Risk Analysis",
            logout: "Logout",
            systemOnline: "System Online",
            dashboard: "Dashboard",
            uploadDPR: "Upload DPR",
            assessment: "Assessment",
            riskAnalysis: "Risk Analysis",
            compliance: "Compliance",
            analytics: "Analytics"
        },
        hi: {
            welcomeBack: "वापसी पर स्वागत है",
            signInToAccess: "MDONER DPR मूल्यांकन प्रणाली तक पहुँचने के लिए साइन इन करें",
            emailLabel: "ईमेल",
            passwordLabel: "पासवर्ड",
            signInButton: "साइन इन करें",
            noAccount: "खाता नहीं है?",
            signUpLink: "साइन अप करें",
            systemTitle: "एमडीओएनईआर डीपीआर गुणवत्ता मूल्यांकन प्रणाली",
            systemSubtitle: "एआई-संचालित परियोजना मूल्यांकन और जोखिम विश्लेषण",
            logout: "लॉग आउट",
            systemOnline: "सिस्टम ऑनलाइन",
            dashboard: "डैशबोर्ड",
            uploadDPR: "डीपीआर अपलोड करें",
            assessment: "मूल्यांकन",
            riskAnalysis: "जोखिम विश्लेषण",
            compliance: "अनुपालन",
            analytics: "एनालिटिक्स"
        },
        as: {
            welcomeBack: "পুনৰ স্বাগতম",
            signInToAccess: "MDONER DPR মূল্যায়ন ব্যৱস্থালৈ প্ৰৱেশ কৰিবলৈ ছাইন ইন কৰক",
            emailLabel: "ইমেইল",
            passwordLabel: "পাছৱৰ্ড",
            signInButton: "ছাইন ইন কৰক",
            noAccount: "একাউণ্ট নাই?",
            signUpLink: "ছাইন আপ কৰক",
            systemTitle: "MDONER DPR গুণমান মূল্যায়ন ব্যৱস্থা",
            systemSubtitle: "AI-চালিত প্ৰকল্প মূল্যায়ন আৰু ঝুঁকি বিশ্লেষণ",
            logout: "লগআউট",
            systemOnline: "চিস্টেম অনলাইন",
            dashboard: "ড্যাশবোর্ড",
            uploadDPR: "DPR আপলোড কৰক",
            assessment: "মূল্যায়ন",
            riskAnalysis: "ঝুঁকি বিশ্লেষণ",
            compliance: "অনুগত্য",
            analytics: "বিশ্লেষণ"
        },
        ta: {
            welcomeBack: "மீண்டும் வருக",
            signInToAccess: "MDONER DPR மதிப்பீட்டு அமைப்பை அணுக உள்நுழைக",
            emailLabel: "மின்னஞ்சல்",
            passwordLabel: "கடவுச்சொல்",
            signInButton: "உள்நுழைக",
            noAccount: "கணக்கு இல்லையா?",
            signUpLink: "பதிவு செய்க",
            systemTitle: "MDONER DPR தர மதிப்பீட்டு அமைப்பு",
            systemSubtitle: "AI இயக்கும் திட்ட மதிப்பீடு மற்றும் அபாய பகுப்பாய்வு",
            logout: "வெளியேறு",
            systemOnline: "கணினி இயக்கத்தில் உள்ளது",
            dashboard: "முகப்பு",
            uploadDPR: "DPR பதிவேற்று",
            assessment: "மதிப்பீடு",
            riskAnalysis: "அபாய பகுப்பாய்வு",
            compliance: "இணக்கம்",
            analytics: "பகுப்பாய்வு"
        },
        ml: {
            welcomeBack: "വീണ്ടും സ്വാഗതം",
            signInToAccess: "MDONER DPR അസസ്മെന്റ് സിസ്റ്റം ആക്സസ് ചെയ്യാൻ സൈൻ ഇൻ ചെയ്യുക",
            emailLabel: "ഇമെയിൽ",
            passwordLabel: "പാസ്വേഡ്",
            signInButton: "സൈൻ ഇൻ ചെയ്യുക",
            noAccount: "അക്കൗണ്ട് ഇല്ലേ?",
            signUpLink: "സൈൻ അപ്പ് ചെയ്യുക",
            systemTitle: "MDONER DPR ഗുണനിലവാര മൂല്യനിർണയ സംവിധാനം",
            systemSubtitle: "AI പ്രവർത്തിപ്പിക്കുന്ന പദ്ധതി മൂല്യനിർണയും റിസ്ക് വിശകലനം",
            logout: "ലോഗൗട്ട്",
            systemOnline: "സിസ്റ്റം ഓൺലൈൻ",
            dashboard: "ഡാഷ്ബോർഡ്",
            uploadDPR: "DPR അപ്‌ലോഡ് ചെയ്യുക",
            assessment: "മൂല്യനിർണയം",
            riskAnalysis: "റിസ്ക് വിശകലനം",
            compliance: "അനുസരണം",
            analytics: "വിശകലനം"
        },
        te: {
            welcomeBack: "తిరిగి స్వాగతం",
            signInToAccess: "MDONER DPR అసెస్‌మెంట్ సిస్టమ్‌ను యాక్సెస్ చేయడానికి సైన్ ఇన్ చేయండి",
            emailLabel: "ఇమెయిల్",
            passwordLabel: "పాస్వర్డ్",
            signInButton: "సైన్ ఇన్ చేయండి",
            noAccount: "ఖాతా లేదా?",
            signUpLink: "నమోదు చేసుకోండి",
            systemTitle: "MDONER DPR నాణ్యత అంచనా వ్యవస్థ",
            systemSubtitle: "AI ఆధారిత ప్రాజెక్ట్ మూల్యాంకనం & రిస్క్ విశ్లేషణ",
            logout: "లాగ్ అవుట్",
            systemOnline: "సిస్టమ్ ఆన్‌లైన్‌లో ఉంది",
            dashboard: "డాష్‌బోర్డ్",
            uploadDPR: "DPR అప్లోడ్ చేయండి",
            assessment: "మూల్యాంకనం",
            riskAnalysis: "రిస్క్ విశ్లేషణ",
            compliance: "కంప్లయన్స్",
            analytics: "విశ్లేషణ"
        },
        kn: {
            welcomeBack: "ಮರಳಿ ಸ್ವಾಗತ",
            signInToAccess: "MDONER DPR ಮೌಲ್ಯಮಾಪನ ವ್ಯವಸ್ಥೆಯನ್ನು ಪ್ರವೇಶಿಸಲು ಸೈನ್ ಇನ್ ಮಾಡಿ",
            emailLabel: "ಇಮೇಲ್",
            passwordLabel: "ಪಾಸ್ವರ್ಡ್",
            signInButton: "ಸೈನ್ ಇನ್ ಮಾಡಿ",
            noAccount: "ಖಾತೆ ಇಲ್ಲವೆ?",
            signUpLink: "ಸೈನ್ ಅಪ್ ಮಾಡಿ",
            systemTitle: "MDONER DPR ಗುಣಮಟ್ಟ ಮೌಲ್ಯಮಾಪನ ವ್ಯವಸ್ಥೆ",
            systemSubtitle: "AI ಚಾಲಿತ ಯೋಜನೆ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ಅಪಾಯ ವಿಶ್ಲೇಷಣೆ",
            logout: "ಲಾಗ್ ಔಟ್",
            systemOnline: "ಸಿಸ್ಟಮ್ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಇದೆ",
            dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
            uploadDPR: "DPR ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
            assessment: "ಮೌಲ್ಯಮಾಪನ",
            riskAnalysis: "ಅಪಾಯ ವಿಶ್ಲೇಷಣೆ",
            compliance: "ಅನುಸರಣಾ",
            analytics: "ವಿಶ್ಲೇಷಣೆ"
        }
    };

    const languageSelector = document.getElementById('languageSelect');

    if (!languageSelector) {
        console.error("Error: Language selector with id 'languageSelect' not found.");
        return;
    }

    function updateLanguage(lang) {
        console.log(`Attempting to switch language to: ${lang}`);
        const translation = translations[lang];

        if (!translation) {
            console.error(`Error: No translations found for language code '${lang}'.`);
            return;
        }

        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.getAttribute('data-translate-key');
            if (translation[key]) {
                // This logic handles buttons that have text and an icon inside
                const icon = element.querySelector('.material-icons');
                if (icon) {
                    element.textContent = translation[key] + ' ';
                    element.appendChild(icon);
                } else {
                    element.textContent = translation[key];
                }
            } else {
                // This message helps find missing translation keys
                // console.warn(`Warning: No translation for key '${key}' in language '${lang}'.`);
            }
        });
    }

    const setInitialLanguage = () => {
        const savedLang = localStorage.getItem('selectedLanguage') || 'en';
        languageSelector.value = savedLang;
        updateLanguage(savedLang);
    };

    languageSelector.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        localStorage.setItem('selectedLanguage', selectedLang);
        updateLanguage(selectedLang);
    });

    setInitialLanguage();
});
</script>