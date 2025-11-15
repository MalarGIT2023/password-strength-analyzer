/*
  Password Strength Analyzer — JavaScript Logic
  
  Real-time password strength analysis using entropy calculations,
  character set detection, and crack time estimation.
  
  Created for IEEE Volunteered Mission Tomorrow Career Exploration Event
  Copyright (c) 2025 MalarGIT2023
  
  Key Features:
  - Entropy-based strength calculation
  - Dynamic color-coded feedback
  - Crack time estimation at multiple attack speeds
  - Character class analysis
  - Actionable security suggestions
  - Privacy-first: all processing is local
*/

// ============================================================================
// DOM Element References
// ============================================================================

// Password input element
const pwEl = document.getElementById('pw');

// Toggle button to enable/disable input
const btnToggle = document.getElementById('btnToggle');

// Display elements for live password feedback
const typedPwEl = document.getElementById('typedPw');
const fillEl = document.getElementById('strengthFill');
const emojiEl = document.getElementById('strengthEmoji');
const percentEl = document.getElementById('strengthPercent');

// Display elements for analysis metrics
const catEl = document.getElementById('cat');           // Strength category
const entEl = document.getElementById('ent');           // Entropy (bits)
const lenEl = document.getElementById('len');           // Password length
const classesEl = document.getElementById('classes');   // Character classes used
const charsetEl = document.getElementById('charset');   // Charset size
const guessesEl = document.getElementById('guesses');   // Average guesses to crack

// Crack time display elements (array for different attack speeds)
const ctEls = [
  document.getElementById('ct1'),  // Slow online (1e3/s)
  document.getElementById('ct2'),  // Typical online (1e4/s)
  document.getElementById('ct3'),  // Single GPU (1e8/s)
  document.getElementById('ct4'),  // Cluster/offline (1e10/s)
  document.getElementById('ct5')   // Very large cluster (1e12/s)
];

// Suggestions list element
const suggestionsEl = document.getElementById('suggestions');

// Card elements for styling
const cardCategory = document.getElementById('cardCategory');
const cardBasic = document.getElementById('cardBasic');
const cardCrack = document.getElementById('cardCrack');
const cardSuggest = document.getElementById('cardSuggest');
const passwordCard = document.getElementById('passwordCard');

// ============================================================================
// Constants
// ============================================================================

// Character set sizes
const LOWER = 26;      // Lowercase letters (a-z)
const UPPER = 26;      // Uppercase letters (A-Z)
const DIGITS = 10;     // Digits (0-9)
const SYMBOLS = 32;    // Common symbols (!@#$%^&*()_+-=[]{}|;:'",.<>?/)

// Attack speeds in guesses per second
const ATTACK_SPEEDS = [
  1e3,    // Slow online: 1,000 guesses/sec (typical web login with rate limiting)
  1e4,    // Typical online: 10,000 guesses/sec (faster web service)
  1e8,    // Single GPU: 100,000,000 guesses/sec (single graphics processor)
  1e10,   // Cluster/offline: 10 billion guesses/sec (offline attack)
  1e12    // Very large cluster: 1 trillion guesses/sec (extreme attack)
];

// ============================================================================
// UI State Management
// ============================================================================

// Initially disable password input
pwEl.disabled = true;
pwEl.focus();

// Track whether input is currently enabled
let inputEnabled = false;

// Button click handler: toggle between input mode and reload
btnToggle.addEventListener('click', () => {
  if(!inputEnabled){
    // Enable password input mode
    pwEl.disabled = false;
    pwEl.focus();
    inputEnabled = true;
    btnToggle.textContent = "Reload page";
  } else {
    // Reload page to reset everything
    location.reload();
    pwEl.disabled = true;
    pwEl.focus();
    inputEnabled = false;
  }
});

// ============================================================================
// Event Listeners
// ============================================================================

// Listen for password input and analyze when typing
pwEl.addEventListener('input', () => {
  if(inputEnabled) analyze(pwEl.value);
});

// ============================================================================
// Main Analysis Function
// ============================================================================

/**
 * Analyze password strength using entropy and character set analysis
 * Updates all UI elements with real-time feedback
 * 
 * @param {string} pw - The password to analyze
 */
function analyze(pw){
  // Update password display (shows what user is typing)
  typedPwEl.textContent = pw || "Your password will appear here";

  // ========== Character Class Detection ==========
  // Check which character types are present
  const hasLower = /[a-z]/.test(pw);      // Lowercase letters
  const hasUpper = /[A-Z]/.test(pw);      // Uppercase letters
  const hasDigit = /\d/.test(pw);         // Digits (0-9)
  const hasSymbol = /[^a-zA-Z0-9]/.test(pw); // Symbols (anything not letter/digit)

  // ========== Charset Calculation ==========
  // Calculate total character pool size based on which types are used
  let charset = 0;
  if(hasLower) charset += LOWER;
  if(hasUpper) charset += UPPER;
  if(hasDigit) charset += DIGITS;
  if(hasSymbol) charset += SYMBOLS;
  charset = charset || 1; // Minimum of 1 to avoid division by zero

  // ========== Entropy Calculation ==========
  // Entropy = length × log2(charset)
  // Represents bits of randomness in the password
  const length = pw.length;
  const entropy = length * Math.log2(charset);
  
  // ========== Crack Time Calculation ==========
  // Average guesses needed = (charset^length) / 2
  // Based on brute force attack model
  const guesses = Math.pow(charset, length)/2;

  // ========== Strength Categorization ==========
  // Map entropy ranges to strength categories with visual feedback
  let category='Unknown', color='#bbc3d6', emoji='⚪', textColor='white';
  
  if(entropy<28){
    category='Very Weak';
    color='#e74c3c';    // Red
    emoji='🔴';
    textColor='white';
  }
  else if(entropy<36){
    category='Weak';
    color='#f39c12';    // Orange
    emoji='🟠';
    textColor='white';
  }
  else if(entropy<60){
    category='Reasonable';
    color='#f1c40f';    // Yellow
    emoji='🟡';
    textColor='#222';
  }
  else if(entropy<128){
    category='Strong';
    color='#2ecc71';    // Green
    emoji='🟢';
    textColor='white';
  }
  else {
    category='Very Strong';
    color='#18a689';    // Teal
    emoji='💪';
    textColor='white';
  }

  // ========== Strength Bar Visualization ==========
  // Scale entropy to 0-100% (128 bits = 100%)
  const frac = Math.min(entropy/128,1)*100;
  fillEl.style.width = frac+'%';
  fillEl.style.background=`linear-gradient(90deg, ${color}, ${shadeColor(color,-10)})`;
  emojiEl.textContent = emoji;
  emojiEl.style.left=`calc(${frac}% )`;
  percentEl.textContent=`${Math.round(frac)}%`;

  // ========== Update Strength Info Card ==========
  catEl.textContent = `${category} ${emoji}`;
  entEl.textContent = isFinite(entropy)? entropy.toFixed(2)+' bits':'—';
  lenEl.textContent = length;

  // ========== Update Basic Info Card ==========
  classesEl.textContent = [
    hasLower&&'lowercase',
    hasUpper&&'uppercase',
    hasDigit&&'digits',
    hasSymbol&&'symbols'
  ].filter(Boolean).join(', ')||'none';
  charsetEl.textContent = charset;
  guessesEl.textContent = humanNumber(guesses);

  // ========== Update Crack Times Card ==========
  // For each attack speed, calculate time to crack
  ATTACK_SPEEDS.forEach((spd,i)=>{ 
    ctEls[i].textContent=formatTime(guesses/spd); 
  });

  // ========== Generate Suggestions ==========
  // Provide actionable feedback to improve password
  const suggestions=[];
  
  if(length<12) 
    suggestions.push('Increase length — aim 12+ chars.');
  else 
    suggestions.push('Good length — longer passphrase is better.');
  
  if(!hasLower) 
    suggestions.push('Include lowercase letters.');
  if(!hasUpper) 
    suggestions.push('Include uppercase letters.');
  if(!hasDigit) 
    suggestions.push('Include digits.');
  if(!hasSymbol) 
    suggestions.push('Include symbols (!@#$%).');
  
  suggestions.push("Use unrelated words for passphrase (e.g., 'coffee-wagon-silver').");
  suggestions.push('Avoid dictionary words or predictable substitutions.');
  suggestions.push('Use a password manager for unique long passwords.');
  
  // Render suggestions list
  suggestionsEl.innerHTML=suggestions.map(s=>`<li>${s}</li>`).join('');

  // ========== Update Card Colors ==========
  // Color code all cards based on strength
  passwordCard.style.background = shadeColor(color,10);
  passwordCard.style.color=textColor;
  
  [cardCategory,cardBasic,cardCrack,cardSuggest].forEach((card,i)=>{
    card.style.background = shadeColor(color,20-10*i);
    card.style.color=textColor;
  });

  // ========== Emoji Position Clamping ==========
  // Keep emoji within visible bounds (5%-95% to avoid clipping)
  const emojiOffset = Math.min(Math.max(frac, 5), 95);
  emojiEl.style.left = `${emojiOffset}%`;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Format large numbers for human readability
 * Converts 1000000 to "1.00M", 1500000 to "1.50M", etc.
 * 
 * @param {number} n - Number to format
 * @returns {string} Formatted number with K/M/B/T/P/E suffix
 */
function humanNumber(n){
  if(!isFinite(n)) return '∞';
  if(n<1000) return Math.round(n).toString();
  
  const units=['','K','M','B','T','P','E'];
  let i=0;
  while(n>=1000 && i<units.length-1){
    n/=1000;
    i++;
  }
  return n.toFixed(2)+units[i];
}

/**
 * Format seconds into human-readable time string
 * Examples: "5.2 s", "3.4 min", "2.1 h", "1.5 d", "42.3 y"
 * 
 * @param {number} sec - Time in seconds
 * @returns {string} Formatted time string
 */
function formatTime(sec){
  if(!isFinite(sec)||sec>1e30)return'∞';
  if(sec<1)return(sec*1000).toFixed(1)+' ms';
  
  const minute=60,hour=3600,day=86400,year=31557600;
  if(sec<minute)return sec.toFixed(1)+' s';
  if(sec<hour)return (sec/minute).toFixed(1)+' min';
  if(sec<day)return(sec/hour).toFixed(1)+' h';
  if(sec<year)return(sec/day).toFixed(1)+' d';
  if(sec<1000*year)return(sec/year).toFixed(1)+' y';
  return(sec/year).toExponential(2)+' y';
}

/**
 * Adjust color brightness by a percentage
 * Positive percent = lighter, negative = darker
 * Used to create color gradients for card backgrounds
 * 
 * @param {string} hex - Hex color code (#RRGGBB)
 * @param {number} percent - Adjustment percentage (-100 to 100)
 * @returns {string} Modified hex color code
 */
function shadeColor(hex,percent){
  const c=hex.replace('#','');
  const num=parseInt(c,16);
  
  // Extract and adjust RGB components
  let r=(num>>16)+Math.round(255*percent/100);
  let g=((num>>8)&0x00FF)+Math.round(255*percent/100);
  let b=(num&0x0000FF)+Math.round(255*percent/100);
  
  // Clamp values to valid 0-255 range
  r=Math.min(255,Math.max(0,r));
  g=Math.min(255,Math.max(0,g));
  b=Math.min(255,Math.max(0,b));
  
  // Convert back to hex format
  return'#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
}
