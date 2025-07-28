/* global zxcvbn */

// Get all necessary DOM elements
const pw = document.getElementById('pw');
const meter = document.getElementById('meter');
const label = document.getElementById('label');
const crack = document.getElementById('crack');
const warningEl = document.getElementById('warning');
const suggBox = document.getElementById('suggestions');
const themeToggle = document.getElementById('themeToggle');
const togglePasswordButton = document.getElementById('togglePassword');

// --- Password Visibility Toggle ---
if (togglePasswordButton && pw) {
    const eyeIcon = togglePasswordButton.querySelector('.eye-icon');
    togglePasswordButton.addEventListener('click', function () {
        const type = pw.getAttribute('type') === 'password' ? 'text' : 'password';
        pw.setAttribute('type', type);
        if (eyeIcon) {
            eyeIcon.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        }
        this.setAttribute('aria-label', type === 'password' ? 'Show password' : 'Hide password');
    });
} else {
    console.warn("Password input or toggle button not found. Password visibility feature disabled.");
}

// --- Theme Toggle Functionality ---
const colors = [
    '#dc3545', // red - Very weak
    '#ff6b6b', // light red - Weak
    '#ffc107', // yellow - Moderate/Fair
    '#28a745', // green - Strong
    '#20c997'  // teal - Very strong
];

function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

(function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let initialTheme = 'light';

    if (savedTheme) {
        initialTheme = savedTheme;
    } else if (systemPrefersDark) {
        initialTheme = 'dark';
    }

    document.documentElement.setAttribute('data-theme', initialTheme);
    updateThemeIcon(initialTheme);
})();

themeToggle.addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// --- Password Strength Checking ---
function render() {
    const val = pw.value;
    if (!val) {
        meter.value = 0;
        label.textContent = 'Strength: —';
        label.style.color = '';
        crack.textContent = '';
        warningEl.textContent = '';
        suggBox.innerHTML = '';
        return;
    }

    try {
        const z = zxcvbn(val);
        const score = z.score;
        const strengthLabels = [
            'Very Weak', 
            'Weak', 
            'Fair', 
            'Strong', 
            'Very Strong'
        ];
        
        meter.value = score;
        label.textContent = `Strength: ${strengthLabels[score]}`;
        label.className = `score-${score}`;

        crack.textContent = `Estimated time to crack: ${z.crack_times_display.offline_slow_hashing_1e4_per_second}`;
        warningEl.textContent = z.feedback.warning || '';

        const suggestions = z.feedback.suggestions || [];
        if (suggestions.length > 0 && val.length > 0) {
            const items = suggestions
                .filter(s => s && s.trim() !== '')
                .map(s => `<li>${s}</li>`)
                .join('');
            
            suggBox.innerHTML = items ? `<strong>Suggestions to improve:</strong><ul>${items}</ul>` : '';
        } else {
            suggBox.innerHTML = '';
        }

    } catch (e) {
        console.error("Error calculating password strength:", e);
        label.textContent = 'Strength: Error';
        label.className = 'score-0';
        crack.textContent = '';
        warningEl.textContent = 'An error occurred while analyzing the password.';
        suggBox.innerHTML = '';
    }
}

if (pw) {
    pw.addEventListener('input', render);
} else {
    console.error("Password input field with ID 'pw' not found.");
}
