/* global zxcvbn */
const pw = document.getElementById('pw');
const meter = document.getElementById('meter');
const label = document.getElementById('label');
const crack = document.getElementById('crack');
const suggBox = document.getElementById('suggestions');

const texts = [
  'Very weak',
  'Weak',
  'Moderate',
  'Strong',
  'Very strong'
];

const colors = [
  '#dc3545', // red
  '#ff6b6b', // light red
  '#ffc107', // yellow
  '#28a745', // green
  '#20c997'  // teal
];

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

  const z = zxcvbn(val);
  const score = z.score;
  
  meter.value = score;
  label.textContent = `Strength: ${texts[score]}`;
  label.style.color = colors[score];
  
  crack.textContent = `Estimated crack time: ${z.crack_times_display.offline_slow_hashing_1e4_per_second}`;
  
  const items = (z.feedback.suggestions || [])
    .filter(s => s.trim() !== '')
    .map(s => `<li>${s}</li>`)
    .join('');
    
  suggBox.innerHTML = items || '<li>No specific suggestions. Keep your password unique!</li>';
}

pw.addEventListener('input', render);

// Dark/light toggle
const toggle = document.getElementById('themeToggle');
toggle.onclick = () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', nextTheme);
  toggle.textContent = nextTheme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', nextTheme);
};

// Initialize theme
(function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  toggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
})();
