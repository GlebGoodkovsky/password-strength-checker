# Password Strength Checker 🔒

A privacy-first, client-side password analyzer that evaluates password strength locally in your browser. No network calls, no data collection - your passwords never leave your device.

[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://glebgoodkovsky.github.io/password-strength-checker/)
---

## ⚠️ Important Security Information

### Privacy Assurance

- **Zero Network Communication** - All password analysis happens locally in your browser
- **No Tracking** - No analytics, cookies, or telemetry
- **No Server Processing** - Your passwords never touch any server
- **Self-Contained** - All dependencies are bundled locally

### Limitations

While this tool provides password strength estimates:
- **Not a Security Guarantee** - Password strength is an estimate, not a guarantee
- **Offline Analysis Only** - Doesn't check against known breach databases
- **Dictionary Limits** - Uses built-in dictionaries, not comprehensive lists

---

## ✨ Features

- **Real-time Strength Analysis** - Instant feedback as you type
- **Strength Meter** - Visual 0-4 score with color-coded indicators
- **Crack Time Estimate** - Shows how long it would take to brute-force your password
- **Actionable Suggestions** - Specific tips to improve weak passwords
- **Dark/Light Mode** - Automatic theme switching based on system preference
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Accessible UI** - Proper ARIA labels and keyboard navigation

---

## 🛠️ How It Works (Tech Stack)

The password analysis happens entirely in your browser using fundamental web technologies:

- **HTML5** - Page structure and semantic markup
- **CSS3** - Styling with CSS variables for theming
- **JavaScript (Vanilla JS)** - Core application logic
- **[zxcvbn](https://github.com/dropbox/zxcvbn)** - Dropbox's password strength estimation library (MIT licensed)
- **GitHub Pages** - Static hosting with automatic SSL

---

## 🚀 How to Use

1. **Visit the [Live Demo](https://glebgoodkovsky.github.io/password-strength-checker/)**
2. **Type or paste a password** in the input field
3. **View real-time analysis**:
   - Strength level (0-4)
   - Estimated crack time
   - Specific improvement suggestions
4. **Toggle theme** using the 🌗/☀️ button
5. **Experiment freely** - nothing is saved or transmitted

> **Note**: For maximum security, consider disconnecting from the internet before testing real passwords

---

## 💻 Running Locally

To run this project on your own machine:

```bash
# Clone repository
git clone https://github.com/GlebGoodkovsky/password-strength-checker.git

# Navigate to project directory
cd password-strength-checker

# Install live server (one-time)
npm install -g live-server

# Start local development server
live-server
```

Your browser will automatically open: `http://localhost:8080`

---

## 🌐 Deploying to GitHub Pages

1. Create a new repository named `password-strength-checker`
2. Push your code:
```bash
git init
git add .
git commit -m "Initial password strength checker"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/password-strength-checker.git
git push -u origin main
```
3. Enable GitHub Pages:
   - Go to Repository Settings → Pages
   - Source: Deploy from branch → main → / (root)
   - Click Save

Your site will be live at:  
`https://YOUR_USERNAME.github.io/password-strength-checker/`

---

## 🤝 Contributing

Suggestions and improvements are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a pull request with a detailed description

---

## A Note on the Learning Process

This project was developed as a practical exploration of client-side security applications. It demonstrates core concepts of privacy-focused web development, including zero-backend architecture, client-side processing, and security considerations. The implementation involved using AI assistance as a learning tool to understand and implement the zxcvbn library while ensuring all code remains original and purpose-built for this specific application. The goal was to create a tool that respects user privacy while providing valuable security feedback.

---
