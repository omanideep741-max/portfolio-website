# Cybersecurity & Web Penetration Testing Portfolio

> A modern, responsive, developer-focused personal portfolio website designed for Cybersecurity enthusiasts, Penetration Testers, and Security Engineers. Features interactive project showcase modals, dark cyber-orange aesthetic, responsive mobile drawer navigation, live contact form, and an interactive HTML/PDF resume.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Project Architecture & File Structure](#project-architecture--file-structure)
- [Pages & Navigation](#pages--navigation)
- [Featured Projects Showcase](#featured-projects-showcase)
- [Customization Guide](#customization-guide)
  - [1. Adding / Updating Projects](#1-adding--updating-projects)
  - [2. Editing About Me & Experience](#2-editing-about-me--experience)
  - [3. Updating Resume Content](#3-updating-resume-content)
- [Installation & Local Development](#installation--local-development)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Author](#author)

---

## 🔎 Overview

This portfolio website serves as an interactive professional showcase for **O. Manideep Reddy**, focusing on Web Application Security, Network Penetration Testing, and Vulnerability Assessment. 

Built with clean HTML5, custom vanilla CSS (Cyber Orange Developer theme), and lightweight ES6 JavaScript, the site requires no external frameworks or build tooling. It delivers fast load times, smooth micro-animations, fluid typography (`clamp()`), complete mobile responsiveness, and an integrated resume printing/downloading system.

---

## ✨ Key Features

- **Dark Cyber-Orange Design System**: Built with modern CSS variables, glassmorphism backdrop filters, custom scrollbars, and neon orange accent highlights.
- **Dynamic Projects Engine**: Interactive category cards (`Network & Vulnerability Tools`, `Website Test Tools`, `Audits`) powered by `js/projectsData.js` that open modular project preview dialogs.
- **Integrated Resume System**: Separate HTML resume ([`Manideep_Reddy_Resume.html`](Manideep_Reddy_Resume.html)) with `@media print` rules, top action bar (`Download / Save as PDF`), and query parameter auto-print triggers (`?download=true`).
- **Fluid & Fully Mobile Responsive**: Engineered with fluid typography (`clamp()`) and adaptive grid breakpoints (`@media (max-width: 768px)`) to render cleanly across all screen sizes (desktop, tablet, mobile).
- **Mobile Navigation Drawer**: Smooth slide-over side menu with active state tracking and tap-to-close listeners.
- **Working Contact Form Integration**: Web3Forms post endpoint integration with instant email notifications for visitor inquiries.
- **SEO & Accessibility Optimized**: Semantic HTML5 elements (`<nav>`, `<section>`, `<footer>`), structured ARIA labels, meta viewport tags, and security headers.

---

## 📁 Project Architecture & File Structure

```text
Portfolio/
├── assets/                          # Images, logos, and background graphics
│   ├── background.png               # Main hero section background image
│   ├── dragon_background.png        # Cyber aesthetic graphics
│   ├── logo.png                     # Site brand logo icon
│   └── user.png                     # Profile picture
│
├── js/                              # JavaScript Logic Modules
│   ├── main.js                      # Core UI scripts, modal manager, event handlers
│   ├── projectsData.js              # Projects data store (JSON-like structure)
│   └── servicesData.js              # Security services scope & modal descriptions
│
├── index.html                       # Main Portfolio Homepage (About, Skills, Services, Projects, Contact)
├── projects.html                    # Dedicated Projects Showcase Page
├── project-detail.html              # Individual Project Documentation Page template
├── services.html                    # Services Overview Page (redirects to #services)
├── style.css                        # Global CSS stylesheet & design tokens
├── Manideep_Reddy_Resume.html       # Web-viewable and printable HTML Resume
├── Manideep_Reddy_Resume.md         # Markdown version of Resume
├── How_To_Edit.txt                  # Simple editing instructions reference text
└── README.md                        # Documentation & setup guide
```

---

## 🌐 Pages & Navigation

1. **Homepage (`index.html`)**:
   - **Hero Banner**: Intro greeting, availability status badge, fluid title text, tech stack tags, and Download Resume CTA button.
   - **About Me**: Intro biography, tabbed content switcher (`Skills`, `Education`, `Experience`).
   - **Interactive Projects Grid**: Category blocks dynamically rendered from `js/projectsData.js`.
   - **Services Section**: Interactive cards detailing Network VAPT, Web VAPT, and Mobile Security Testing scopes.
   - **Contact Form**: Form input fields linked to Web3Forms API endpoint.

2. **Projects Page (`projects.html`)**:
   - Dedicated page presenting full security tool category blocks and repository links.

3. **Resume Pages (`Manideep_Reddy_Resume.html` / `.md`)**:
   - Clean, ATS-friendly resume layout with top action buttons to save as PDF or navigate back to the portfolio.

---

## 🚀 Featured Projects Showcase

The portfolio currently highlights key cybersecurity tools including:

1. **Automated Network Vulnerability Scanner**:
   - Python-based CLI security tool automating Nmap discovery, NSE script execution, XML output parsing, vulnerability severity ranking (Critical to Info), and interactive HTML dashboard reporting.
   - Repository Link: [`github.com/omanideep741-max/network-vulnerability-scanner`](https://github.com/omanideep741-max/network-vulnerability-scanner)

2. **Web Vulnerability Scanner Tool**:
   - Python utility designed to scan web applications for common header misconfigurations and security vulnerabilities.

3. **OWASP Top 10 Audit Kit & Reports**:
   - Security auditing methodology checklists and remediation documentation.

---

## 🛠️ Customization Guide

### 1. Adding / Updating Projects
To add or modify projects on the website, open `js/projectsData.js` and edit the JS object:

```javascript
const projectsData = {
    "network_vulnerability_tools": {
        categoryTitle: "Network and Vulnerability Test Tools",
        description: "Port scanning, service enumeration, Nmap scripts...",
        icon: "fa-solid fa-network-wired",
        items: [
            {
                title: "My New Security Tool",
                description: "Description of your tool...",
                icon: "fa-solid fa-shield",
                link: "https://github.com/your-username/repo-name"
            }
        ]
    }
};
```

### 2. Editing About Me & Experience
Open `index.html` and locate the tab contents:
- **Education**: `<div class="tab-contents" id="education-tab">`
- **Experience**: `<div class="tab-contents" id="experience-tab">`

### 3. Updating Resume Content
Update both:
1. `Manideep_Reddy_Resume.html` (for browser view & PDF generation).
2. `Manideep_Reddy_Resume.md` (for raw text / Markdown repositories).

---

## 💻 Installation & Local Development

No Node.js or build steps required. Simply open `index.html` in any web browser or serve locally:

### Option 1: Double-Click
Open `index.html` directly in Chrome, Firefox, Edge, or Safari.

### Option 2: Live Server (VS Code Extension)
Right-click `index.html` in VS Code and select **Open with Live Server**.

### Option 3: Python Simple HTTP Server
```bash
cd Portfolio
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000` in your browser.

---

## ⚙️ Technologies Used

- **HTML5**: Semantic web markup and accessibility structure.
- **Vanilla CSS3**: CSS custom variables, Flexbox, CSS Grid, media queries, keyframe animations, `@media print`.
- **JavaScript (ES6+)**: Modal state management, dynamic DOM rendering, event listeners, URL parameter parsing.
- **FontAwesome 6**: Iconography for skills, tools, and social links.
- **Google Fonts**: `Inter`, `Outfit`, `Plus Jakarta Sans`, and `Fira Code`.

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

## 👤 Author

**O. Manideep Reddy**
- **GitHub**: [@omanideep741-max](https://github.com/omanideep741-max)
- **LinkedIn**: [Manideep Reddy](https://linkedin.com/in/manideep-reddy-19a9a4327)
- **Email**: omanideep741@gmail.com
