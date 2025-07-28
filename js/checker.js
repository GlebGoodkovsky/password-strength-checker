/* global zxcvbn */

// Get all necessary DOM elements
const pw = document.getElementById('pw');
const meter = document.getElementById('meter');
const label = document.getElementById('label');
const crack = document.getElementById('crack');
const suggBox = document.getElementById('suggestions');
const themeToggle = document.getElementById('themeToggle');
const togglePasswordButton = document.getElementById('togglePassword'); // Assuming this ID exists in your HTML

// --- Password Visibility Toggle ---
// Ensure the toggle button and password field exist
if (togglePasswordButton && pw) {
    togglePasswordButton.addEventListener('click', function () {
        // Toggle between password and text types
        const type = pw.getAttribute('type') === 'password' ? 'text' : 'password';
        pw.setAttribute('type', type);

        // Update button text/emoji for visual feedback
        // Use closed eye for hidden password, open eye for visible
        this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        this.setAttribute('aria-label', type === 'password' ? 'Show password' : 'Hide password');
    });
} else {
    console.warn("Password input or toggle button not found. Password visibility feature disabled.");
}

// --- Theme Toggle Functionality ---
// Strength meter color mapping (from your original code)
const colors = [
    '#dc3545', // red - Very weak
    '#ff6b6b', // light red - Weak
    '#ffc107', // yellow - Moderate/Fair
    '#28a745', // green - Strong
    '#20c997'  // teal - Very strong
];

// Update theme icon based on current theme
function updateThemeIcon(theme) {
    // Use moon for light mode (switching TO dark), sun for dark mode (switching TO light)
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Set initial theme based on saved preference or system preference
(function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let initialTheme = 'light'; // Default

    if (savedTheme) {
        initialTheme = savedTheme;
    } else if (systemPrefersDark) {
        initialTheme = 'dark';
    }

    document.documentElement.setAttribute('data-theme', initialTheme);
    updateThemeIcon(initialTheme);
})();

// Toggle theme when button is clicked
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
        suggBox.innerHTML = '';
        return;
    }

    try {
        const z = zxcvbn(val);
        const score = z.score;

        meter.value = score;
        // Use the text labels from your original code
        const strengthLabels = ['Very weak', 'Weak', 'Moderate', 'Strong', 'Very strong'];
        label.textContent = `Strength: ${strengthLabels[score]}`;
        label.style.color = colors[score];

        // Use the crack time calculation from your original code
        crack.textContent = `Estimated crack time: ${z.crack_times_display.offline_slow_hashing_1e4_per_second}`;

        // Process suggestions, filtering out empty ones
        const items = (z.feedback.suggestions || [])
            .filter(s => s.trim() !== '')
            .map(s => `<li>${s}</li>`)
            .join('');

        // Display suggestions or a default message
        suggBox.innerHTML = items || '<li>No specific suggestions. Keep your password unique!</li>';
    } catch (e) {
        console.error("Error calculating password strength:", e);
        // Optionally, display an error message in the UI
        label.textContent = 'Strength: Error';
        label.style.color = colors[0]; // Red for error
        crack.textContent = '';
        suggBox.innerHTML = '<li>Error analyzing password. Please try again.</li>';
    }
}

// Attach the render function to the password input's 'input' event
if (pw) {
    pw.addEventListener('input', render);
} else {
    console.error("Password input field with ID 'pw' not found.");
}
