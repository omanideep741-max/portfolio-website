// ==========================================
// PORTFOLIO SERVICES DATA ENGINE
// ==========================================

const servicesData = {
    "network_vapt": {
        id: "network_vapt",
        title: "Network Penetration Testing",
        icon: "fa-solid fa-network-wired",
        summary: "Comprehensive network infrastructure auditing, port scanning, service version enumeration, firewall policy testing, and vulnerability identification.",
        howIPerform: [
            {
                step: "01. Reconnaissance & Host Discovery",
                desc: "Identify live target hosts, active subnets, and network perimeter devices using advanced Nmap and Masscan host discovery scans."
            },
            {
                step: "02. Port & Service Enumeration",
                desc: "Probe open TCP/UDP ports to detect exact service versions, operating system fingerprints, and exposed admin panels (SSH, FTP, SMB, RDP)."
            },
            {
                step: "03. Vulnerability Assessment & Analysis",
                desc: "Combine automated vulnerability scanning (Nessus, OpenVAS) with manual validation to discover outdated software, default credentials, and misconfigurations."
            },
            {
                step: "04. Safe Exploitation & Risk PoC",
                desc: "Perform controlled, non-disruptive vulnerability verification to demonstrate potential security impact without disturbing production uptime."
            },
            {
                step: "05. Remediation & Hardening Report",
                desc: "Deliver a structured technical report containing CVSS 3.1 risk scores, proof-of-concept steps, and patch/firewall rule recommendations."
            }
        ],
        requirements: [
            "Target IP addresses, subnets, or CIDR blocks in scope.",
            "Signed Authorization Letter / Rules of Engagement (RoE).",
            "Approved testing timeframe (e.g., standard business hours or off-peak window).",
            "Emergency contact details of system administrator."
        ],
        deliverables: [
            "Executive Summary for technical lead & management",
            "Detailed CVSS-rated Vulnerability Breakdown",
            "Step-by-step Proof of Concept (PoC) validation",
            "Actionable firewall hardening & patching guide",
            "1 Free re-test verification scan"
        ],
        tools: ["Nmap", "Nessus", "Wireshark", "Metasploit", "Netcat", "OpenVAS"]
    },
    "web_vapt": {
        id: "web_vapt",
        title: "Web Application Penetration Testing",
        icon: "fa-solid fa-shield-halved",
        summary: "In-depth web security auditing aligned with OWASP Top 10 guidelines to discover SQL Injection, XSS, CSRF, IDOR, and authentication flaws.",
        howIPerform: [
            {
                step: "01. Application Crawling & Scope Mapping",
                desc: "Map the application attack surface, parameter inputs, hidden endpoints, cookies, and API endpoints using Burp Suite Professional and OWASP ZAP."
            },
            {
                step: "02. Authentication & Session Security Audit",
                desc: "Test authentication logic, session management, JWT token security, multi-tenant isolation, and privilege escalation vectors."
            },
            {
                step: "03. OWASP Top 10 Manual Payload Testing",
                desc: "Perform hands-on manual injection testing for SQLi, Cross-Site Scripting (XSS), SSRF, IDOR, Broken Access Control, and RCE flaws."
            },
            {
                step: "04. API & Business Logic Bypass Analysis",
                desc: "Analyze REST/GraphQL API contracts and test for business logic flaws, unauthorized data exposure, and parameter tampering."
            },
            {
                step: "05. PoC Report & Remediation Advisory",
                desc: "Compile clear, reproducible exploit steps alongside exact code-level fix guidelines matching OWASP remediation standards."
            }
        ],
        requirements: [
            "Target Web Application URL(s) and staging environment access.",
            "Test credentials for various roles (e.g., Admin account, Regular User account).",
            "API documentation (Swagger / Postman collection if applicable).",
            "Written Permission / Scope agreement document."
        ],
        deliverables: [
            "Comprehensive Web VAPT Security Audit Report",
            "OWASP Top 10 Risk Matrix & CVSS 3.1 Severity Ratings",
            "Reproducible Proof-of-Concept (PoC) Exploit Steps",
            "Developer-ready Code Fix Recommendations",
            "Complimentary Re-audit scan after vulnerability patching"
        ],
        tools: ["Burp Suite Pro", "OWASP ZAP", "Sqlmap", "Postman", "Gobuster", "Python Scripts"]
    },
    "mobile_vapt": {
        id: "mobile_vapt",
        title: "Mobile Application Security Testing",
        icon: "fa-solid fa-mobile-screen-button",
        summary: "Static and dynamic security analysis of Android (APK) and iOS (IPA) applications to secure mobile traffic, storage, and API communications.",
        howIPerform: [
            {
                step: "01. Static Application Security Testing (SAST)",
                desc: "Decompile binary packages (APK/IPA) using JADX-GUI and MobSF to inspect source code, hardcoded API keys, and AndroidManifest permissions."
            },
            {
                step: "02. Dynamic Interception & Traffic Audit",
                desc: "Intercept HTTPS requests between mobile client and backend server using custom CA certificates and proxy tools (Burp Suite)."
            },
            {
                step: "03. Local Data Storage & Keychain Inspection",
                desc: "Examine local device storage (SQLite DBs, SharedPreferences, Keychain) to ensure sensitive user tokens and credentials are encrypted."
            },
            {
                step: "04. SSL Pinning & Runtime Integrity Testing",
                desc: "Test certificate pinning protections, root/jailbreak detection, and memory tampering resistance using Frida and Objection."
            },
            {
                step: "05. Comprehensive Technical Reporting",
                desc: "Document findings, insecure API endpoints, missing mobile protections, and provide actionable security remediation steps."
            }
        ],
        requirements: [
            "Mobile Application binary file (.apk for Android or .ipa for iOS).",
            "Valid test account login credentials.",
            "Staging backend API URL and server endpoint details.",
            "Written authorization for security testing."
        ],
        deliverables: [
            "Mobile VAPT Analysis & Risk Assessment Report",
            "Static (SAST) & Dynamic (DAST) Security Breakdown",
            "Insecure API & Local Storage Vulnerability PoCs",
            "Mobile Security Best Practices & Code Fix Guide",
            "1 Free re-test verification scan"
        ],
        tools: ["MobSF", "JADX-GUI", "Frida", "Objection", "Burp Suite Pro", "ADB Utility"]
    }
};
