/* global zxcvbn */
const pw = document.getElementById('pw');
const result = document.getElementById('result');
const meter = document.getElementById('meter');
const label = document.getElementById('label');
const crack = document.getElementById('crack');
const suggestions = document.getElementById('suggestions');
const themeToggle = document.getElementById('themeToggle');
const togglePassword = document.getElementById('togglePassword');

// Password visibility toggle
togglePassword.addEventListener('click', function() {
    // Toggle between password and text types
    const type = pw.getAttribute('type') === 'password' ? 'text' : 'password';
    pw.setAttribute('type', type);
    
    // Update button text for accessibility
    this.textContent = type === 'password' ? '👁' : '🚫';
    this.setAttribute('aria-label', type === 'password' ? 'Show password' : 'Hide password');
});

// Theme toggle functionality (existing code)
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? '' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Password strength checking (existing code)
pw.addEventListener('input', () => {
    if (pw.value) {
        const feedback = zxcvbn(pw.value);
        meter.value = feedback.score;
        label.textContent = `Strength: ${['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'][feedback.score]}`;
        
        if (feedback.crack_times_display) {
            crack.textContent = `Estimated time to crack: ${feedback.crack_times_display.offline_fast_hashing_1e10_per_second}`;
        }
        
        suggestions.innerHTML = '';
        if (feedback.feedback && feedback.feedback.suggestions) {
            feedback.feedback.suggestions.forEach(suggestion => {
                const li = document.createElement('li');
                li.textContent = suggestion;
                suggestions.appendChild(li);
            });
        }
    } else {
        meter.value = 0;
        label.textContent = 'Strength: —';
        crack.textContent = '';
        suggestions.innerHTML = '';
    }
});

// Initialize theme from localStorage (existing code)
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}
