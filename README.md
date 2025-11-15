# Password Strength Analyzer

**Mission Tomorrow Career Exploration Event hosted by Chamber RVA**  
*Presented to 11,000+ eighth graders in Richmond*  
*Volunteered for IEEE Region 3 Richmond*

---

An interactive web application that analyzes password strength in real-time using entropy calculations, character set analysis, and estimated crack times. Learn about cybersecurity and how to create strong passwords!

## About This Project

This project was created for the **Mission Tomorrow Career Exploration Event** — a career awareness initiative by Chamber RVA for eighth-grade students in Richmond. The project teaches practical cybersecurity concepts through an engaging, interactive tool.

### Learning Objectives

Through this project, students explore:
- **Cybersecurity Fundamentals**: Why strong passwords matter
- **Entropy & Randomness**: How to measure password strength scientifically
- **Character Sets & Combinations**: Understanding password space
- **Brute Force Attacks**: Estimating how long it takes to crack passwords
- **Career Paths**: Cybersecurity analyst, security engineer, penetration tester
- **Real-world Applications**: Password managers, authentication systems

### Why Password Strength Matters

Strong passwords are your first line of defense against:
- **Account takeovers** — Hackers gaining access to your accounts
- **Identity theft** — Criminals stealing personal information
- **Data breaches** — Unauthorized access to sensitive company data
- **Financial fraud** — Unauthorized transactions and money theft
- **Privacy violations** — Exposure of personal communications

## Features

- **Real-time Analysis**: Instant feedback as you type
- **Entropy Calculation**: Scientific measurement of password randomness (in bits)
- **Strength Categories**: Very Weak → Weak → Reasonable → Strong → Very Strong
- **Crack Time Estimation**: Time to crack at 5 different attack speeds:
  - Slow online (1e3/s): Typical web login with rate limiting
  - Typical online (1e4/s): Faster web service
  - Single GPU (1e8/s): Single graphics processor
  - Cluster/offline (1e10/s): Offline attack scenario
  - Very large cluster (1e12/s): Extreme computational attack
- **Character Class Analysis**: Detection of uppercase, lowercase, digits, symbols
- **Actionable Suggestions**: Specific recommendations to improve password strength
- **Color-Coded Feedback**: Visual strength indicators (🔴🟠🟡🟢💪)
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Privacy-First**: All processing happens locally in your browser — no data sent to servers!

## Strength Categories & Entropy Ranges

| Category | Emoji | Entropy | Crack Time (Offline) | Use Case |
|----------|-------|---------|----------------------|----------|
| Very Weak | 🔴 | < 28 bits | Seconds | Never use |
| Weak | 🟠 | 28-36 bits | Minutes | Risky |
| Reasonable | 🟡 | 36-60 bits | Hours to days | Acceptable |
| Strong | 🟢 | 60-128 bits | Months to years | Recommended |
| Very Strong | 💪 | 128+ bits | 1000+ years | Excellent |

## Quick Start

### 🚀 Option 1: Using Demo Script (Recommended)

The easiest way to run the application with automatic server management:

```bash
# Navigate to the demo folder
cd password-strength-analyzer/demo

# Make the script executable (first time only)
chmod +x password-analyzer.sh

# Run the demo script
./password-analyzer.sh
```

**What the script does:**
- Starts a Python HTTP server on port 8000
- Automatically opens your default web browser
- Cleans up any stuck processes
- Frees port 8000 if already in use
- Displays the server URL
- Gracefully stops when you press Ctrl+C

**Requirements:**
- Python 3 installed
- Web browser (Chrome, Firefox, Safari, Edge, etc.)
- Linux/Mac/WSL on Windows (or Windows PowerShell)

### Online Demo (Direct File)
Simply open `index.html` directly in your web browser:
```bash
# Navigate to the project directory
cd password-strength-analyzer

# Open in your default browser
open index.html
# Or on Windows:
start index.html
# Or on Linux:
xdg-open index.html
```

### Local Server (Manual)
For development or testing:
```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if installed)
npx http-server
```

Then visit: `http://localhost:8000`

## How to Use

1. **Click "Enter Password"** button to enable password input
2. **Type a password** in the input field
3. **Watch real-time analysis** as you type:
   - Strength bar fills up based on entropy
   - Color changes reflect password strength
   - Emoji moves along the strength bar
   - Cards update with detailed metrics
4. **Review the analysis cards**:
   - **Strength Info**: Category, entropy (bits), length
   - **Basic Info**: Character classes, charset size, estimated guesses
   - **Crack Times**: Time to crack at different attack speeds
   - **Suggestions**: Actionable recommendations
5. **Implement suggestions** to improve your password
6. **Click "Reload page"** to try a new password and clear previous entries

## Understanding the Metrics

### Entropy (Bits)
- **Formula**: Length × log₂(charset size)
- **Meaning**: Measure of randomness/unpredictability
- **Example**: 
  - "abc" = 3 chars × log₂(26) ≈ 14 bits (Very weak)
  - "Coffee!Mars@2024" = 16 chars × log₂(94) ≈ 105 bits (Strong)

### Character Classes
- **Lowercase**: a-z (26 chars)
- **Uppercase**: A-Z (26 chars)
- **Digits**: 0-9 (10 chars)
- **Symbols**: !@#$%^&*()_+-=[]{}|;:'",.<>?/ (32+ chars)

### Charset Size
- Password space = (number of character classes)^(length)
- Larger character set = exponentially stronger password
- Using all 4 classes is much better than using 1-2

### Estimated Guesses
- Average number of attempts needed with brute force
- Formula: (charset size^length) / 2
- More guesses = more secure

### Crack Times
Based on different attack speeds:
- **Slow online**: Web login with rate limiting (1,000 guesses/sec)
- **Typical online**: Faster web service (10,000 guesses/sec)
- **GPU**: Single graphics processor (100M guesses/sec)
- **Offline**: Pre-computed hash tables (10B guesses/sec)
- **Massive cluster**: Extreme attack (1T guesses/sec)

## Password Strength Best Practices

### DO:
1. **Make it long** — Aim for 12+ characters (20+ is even better)
2. **Use all character types** — Mix uppercase, lowercase, digits, symbols
3. **Use unpredictable phrases** — "coffee-wagon-silver" is better than "P@ssw0rd123"
4. **Use password managers** — Unique, long password for each account
5. **Avoid personal information** — Names, birthdays, addresses
6. **Update regularly** — Change passwords after breaches

### DON'T:
1. **Use dictionary words** — "dragon" or "password" are easily cracked
2. **Reuse passwords** — One breach compromises all accounts
3. **Use predictable patterns** — "123", "abc", sequences
4. **Use personal info** — Pet names, birthdates, addresses
5. **Share passwords** — Even with trusted people
6. **Write passwords down** — Unless in a secure, locked location

### Password Strength Examples

| Password | Strength | Why |
|----------|----------|-----|
| "password" | 🔴 Very Weak | Dictionary word, only lowercase |
| "Password1" | 🟠 Weak | Still a dictionary word, even with number |
| "Tr0p!cal" | 🟡 Reasonable | Short, but has all character types |
| "Coffee!Mars@2024" | 🟢 Strong | Long, all character types, passphrases |
| "Xy9#mK@pL2zR*qN5w8vH$t" | 💪 Very Strong | Random, long, all character types |

## Real-World Security Context

### Common Attack Scenarios

**Scenario 1: Online Brute Force**
- Attacker tries passwords against a website
- Rate: ~1,000 guesses/second (limited by server)
- **128-bit password**: 1 trillion years to crack

**Scenario 2: GPU Attack**
- Attacker uses graphics processor for offline attack
- Rate: ~100 million guesses/second
- **128-bit password**: 1+ years to crack (impractical)

**Scenario 3: Data Breach**
- Company database with hashed passwords is stolen
- Attacker can compute hashes offline, very fast
- **128-bit password**: Still secure, but weak passwords become vulnerable

**Scenario 4: Social Engineering**
- Attacker tricks user into revealing password
- No password strength matters here!
- **Defense**: Never share passwords, verify before providing info

## Teaching Guide

### For Educators
This tool is perfect for teaching:
- Information security concepts
- Mathematical foundations (entropy, logarithms)
- Real-world cybersecurity practices
- Career paths in security

### Discussion Prompts
1. "Why is length more important than complexity?"
2. "What makes a password truly random?"
3. "Why can't we just make passwords arbitrarily long?"
4. "How do password managers help?"
5. "What's the difference between hacking and social engineering?"

### Activities
1. **Password Audit**: Test common passwords ("admin", "123456", etc.)
2. **Phrase Building**: Create strong passphrases together
3. **Attack Simulation**: Discuss different attack vectors
4. **Career Research**: Investigate security careers on job sites

## Project Structure

```
password-strength-analyzer/
├── index.html                 # Main HTML structure and UI
├── script.js                  # JavaScript: real-time analysis logic
├── style.css                  # CSS: styling and responsive layout
├── LICENSE                    # MIT License file
├── README.md                  # This documentation file
├── demo/                      # Demo scripts for easy launching
│   └── password-analyzer.sh   # Shell script: auto-starts server & browser
├── images/                    # Background and card images
│   ├── ieee-connector-bg.jpg  # Main glassmorphism background
└── .gitignore                 # (optional) Git ignore file
```

### Demo Script (`demo/password-analyzer.sh`)

The included shell script provides an all-in-one launch solution:

**Features:**
- Automatically starts Python HTTP server on port 8000
- Opens default web browser to localhost:8000
- Cleans up stuck Firefox processes
- Frees port 8000 if already in use
- Shows server URL and process ID
- Graceful shutdown with Ctrl+C

**Usage:**
```bash
cd password-strength-analyzer/demo
chmod +x password-analyzer.sh
./password-analyzer.sh
```

**Cross-Platform Support:**
- Linux (uses xdg-open)
- macOS (uses open)
- Windows (via WSL/PowerShell)

## Technical Details

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Flexbox, gradients, transitions, backdrop filters
- **JavaScript (ES6+)**: Real-time analysis, DOM manipulation

### Key Algorithms

**Entropy Calculation**
```javascript
entropy = length × log₂(charset_size)
```

**Guess Estimation**
```javascript
average_guesses = (charset_size ^ length) / 2
```

**Crack Time**
```javascript
time_seconds = average_guesses / attack_speed
```

### Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Fully responsive

### Privacy & Security
- **No data collection**: Passwords never leave your computer
- **No server communication**: All processing is local
- **No cookies/tracking**: Pure client-side application
- **Open source**: Code is transparent and auditable
- **No installation required**: Works in any modern browser

## Career Connections

### Cybersecurity Roles That Use This Knowledge
- **Security Analyst**: Analyzing password policies
- **Penetration Tester**: Testing password strength
- **Security Engineer**: Designing authentication systems
- **System Administrator**: Enforcing password requirements
- **Compliance Officer**: Ensuring security standards

### Learning Resources
- **NIST Password Guidelines**: https://pages.nist.gov/800-63-3/
- **OWASP Top 10**: https://owasp.org/www-project-top-ten/
- **Cybrary Free Courses**: https://www.cybrary.it/
- **CompTIA Security+**: Industry standard certification

## Notes

- Entropy calculation assumes random character distribution
- Actual password strength depends on randomness quality
- Patterns reduce effective entropy significantly
- Password managers should be used for storing passwords
- Two-factor authentication adds additional security layer

## Troubleshooting

### Password Display Not Showing
- Ensure JavaScript is enabled in your browser
- Try refreshing the page
- Check browser console for errors (F12 → Console tab)

### Colors Not Updating
- Clear browser cache (Ctrl+Shift+Delete)
- Try a different browser
- Ensure CSS file is loading

### Attack Speed Values Seem Off
- Values represent theoretical limits
- Real-world attacks are slower due to:
  - Network latency
  - Server rate limiting
  - Hash algorithm complexity
  - Security countermeasures

## Support & Feedback

For issues or questions:
1. Check the FAQ section above
2. Review the "How to Use" guide
3. Try clearing cache and reloading
4. Test in a different browser

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) file for full details.

**MIT License Summary**: You are free to use, modify, and distribute this software for any purpose, provided you include the original license and copyright notice.

## Credits & Acknowledgments

**Created for**: IEEE Mission Tomorrow Career Exploration Event  
**Event**: Hosted by Chamber RVA for 11,000+ eighth graders in Richmond  
**Presented by**: IEEE Region 3 Richmond

**Learning Inspiration**:
- NIST Cybersecurity guidelines
- OWASP security best practices
- Password strength research

**Special Thanks**:
- IEEE Region 3 Richmond for volunteering
- Chamber RVA for organizing Mission Tomorrow
- All educators supporting STEM and cybersecurity education

---

**Last Updated**: November 2025  
**Version**: 1.0  
**Type**: Interactive Web Application  
**Use Case**: Cybersecurity Education & Password Strength Analysis  
**Privacy**: Client-side processing only — No data sent anywhere
