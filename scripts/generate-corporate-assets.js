import fs from 'node:fs';
import path from 'node:path';

const teamDir = path.resolve('public/assets/team');
const certsDir = path.resolve('public/assets/certs');
if (!fs.existsSync(teamDir)) fs.mkdirSync(teamDir, { recursive: true });
if (!fs.existsSync(certsDir)) fs.mkdirSync(certsDir, { recursive: true });

function createAvatarSvg(name, title, color = '#168C28', bgGradient = ['#173B24', '#0d2215']) {
  const initials = name.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" width="100%" height="100%">
    <defs>
      <linearGradient id="bg_${initials}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgGradient[0]}"/>
        <stop offset="100%" stop-color="${bgGradient[1]}"/>
      </linearGradient>
      <linearGradient id="suitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#2a382e"/>
        <stop offset="100%" stop-color="#141c16"/>
      </linearGradient>
      <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#8d5524"/>
        <stop offset="100%" stop-color="#5a3313"/>
      </linearGradient>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.35"/>
      </filter>
    </defs>
    <!-- Background Studio Backdrop -->
    <rect width="400" height="480" fill="url(#bg_${initials})"/>
    <circle cx="200" cy="180" r="160" fill="#ffffff" opacity="0.04" filter="blur(20px)"/>
    
    <!-- Torso / Professional Suit & Lab Coat / Corporate Blazer -->
    <g filter="url(#softShadow)">
      <!-- Shoulders -->
      <path d="M 50 480 Q 70 340 130 310 L 270 310 Q 330 340 350 480 Z" fill="url(#suitGrad)"/>
      <!-- Inner White Shirt -->
      <path d="M 160 310 L 200 400 L 240 310 Z" fill="#ffffff"/>
      <!-- Tie -->
      <path d="M 194 310 L 206 310 L 210 390 L 200 415 L 190 390 Z" fill="${color}"/>
      <!-- Collar -->
      <path d="M 155 310 L 190 335 L 200 310 Z" fill="#eef3ef"/>
      <path d="M 245 310 L 210 335 L 200 310 Z" fill="#eef3ef"/>
      <!-- Neck -->
      <rect x="175" y="250" width="50" height="70" rx="8" fill="url(#skinGrad)"/>
      <!-- Head / Face -->
      <ellipse cx="200" cy="200" rx="65" ry="80" fill="url(#skinGrad)"/>
      <!-- Hair Silhouette -->
      <path d="M 130 180 Q 130 115 200 115 Q 270 115 270 180 Q 255 130 200 130 Q 145 130 130 180 Z" fill="#151210"/>
      <!-- Glasses / Features subtle outline -->
      <circle cx="178" cy="195" r="14" fill="none" stroke="#e0e8e2" stroke-width="2.5" opacity="0.6"/>
      <circle cx="222" cy="195" r="14" fill="none" stroke="#e0e8e2" stroke-width="2.5" opacity="0.6"/>
      <line x1="192" y1="195" x2="208" y2="195" stroke="#e0e8e2" stroke-width="2.5" opacity="0.6"/>
    </g>

    <!-- Professional Name Ribbon at Bottom -->
    <rect x="25" y="405" width="350" height="55" rx="10" fill="#0c1a11ee" stroke="#26943a40" stroke-width="1"/>
    <text x="200" y="430" text-anchor="middle" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800">${name}</text>
    <text x="200" y="448" text-anchor="middle" fill="#9ec5a4" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600">${title}</text>
  </svg>`;
}

// Generate Team Profiles
const people = [
  { file: 'ceo.svg', name: 'Dr. Michael C. Uche', title: 'Managing Director & CEO', color: '#168C28', bg: ['#173B24', '#0a1a0f'] },
  { file: 'exec-medical.svg', name: 'Dr. (Mrs) Ngozi Eze', title: 'Chief Medical & Quality Director', color: '#26943A', bg: ['#1d3d29', '#0d2215'] },
  { file: 'exec-supply.svg', name: 'Engr. Kenneth Obi', title: 'VP, Nationwide Supply Chain', color: '#168C28', bg: ['#1c3825', '#0f2014'] },
  { file: 'exec-regulatory.svg', name: 'Pharm. Bamidele Adeleke', title: 'Head, Regulatory Affairs & Pharmacovigilance', color: '#E83D36', bg: ['#223528', '#101c14'] },
  { file: 'exec-commercial.svg', name: 'Chinyere Danjuma', title: 'Director of Commercial Operations', color: '#26943A', bg: ['#173523', '#0b1c10'] },
  
  // Branch Managers
  { file: 'manager-lagos.svg', name: 'Pharm. Emeka Nwosu', title: 'Lagos Central & Western Operations', color: '#168C28', bg: ['#1b3a26', '#0e2316'] },
  { file: 'manager-abuja.svg', name: 'Hajiya Fatima Bello', title: 'Abuja Regional Distribution Depot', color: '#26943A', bg: ['#183624', '#0d1e13'] },
  { file: 'manager-ph.svg', name: 'Engr. Tari Briggs', title: 'Port Harcourt South-South Hub', color: '#168C28', bg: ['#1a3725', '#0c1b11'] },
  { file: 'manager-onitsha.svg', name: 'Chinedu Okeke', title: 'Onitsha Commercial Distribution Center', color: '#26943A', bg: ['#1c3927', '#0f2216'] },
  { file: 'manager-kano.svg', name: 'Mallam Ibrahim Garba', title: 'Kano Northern Regional Depot', color: '#168C28', bg: ['#173422', '#0d1d12'] },
  { file: 'manager-ibadan.svg', name: 'Pharm. Folake Adebayo', title: 'Ibadan Western Distribution Hub', color: '#26943A', bg: ['#1a3826', '#0e1f14'] },
  
  // Clinical Specialists / Testimonials
  { file: 'specialist-1.svg', name: 'Dr. Adebayo Ogunlesi', title: 'Chief Clinical Pharmacist, Apex Medical Center', color: '#168C28', bg: ['#173B24', '#0a1a0f'] },
  { file: 'specialist-2.svg', name: 'Dr. Amina Yusuf', title: 'Consultant Pediatrician, National Health Hub', color: '#26943A', bg: ['#1e402c', '#0f2519'] },
  { file: 'specialist-3.svg', name: 'Pharm. Donald Kalu', title: 'Director of Pharmacy Services, Metro Hospitals', color: '#168C28', bg: ['#1c3a27', '#0e2216'] }
];

for (const p of people) {
  fs.writeFileSync(path.join(teamDir, p.file), createAvatarSvg(p.name, p.title, p.color, p.bg));
}

// Generate Logo SVG
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 90" width="100%" height="100%">
  <defs>
    <linearGradient id="logoGreen" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#22A838"/>
      <stop offset="100%" stop-color="#147B23"/>
    </linearGradient>
    <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FF6B65"/>
      <stop offset="65%" stop-color="#E83D36"/>
      <stop offset="100%" stop-color="#A51812"/>
    </radialGradient>
    <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.15"/>
    </filter>
  </defs>
  
  <!-- Outer Oval Ring -->
  <ellipse cx="170" cy="45" rx="160" ry="38" fill="none" stroke="#26943A" stroke-width="4.5" filter="url(#logoShadow)"/>
  
  <g transform="translate(18, 12)">
    <!-- V I T B -->
    <text x="18" y="47" fill="url(#logoGreen)" font-family="'Arial Black', Impact, sans-serif" font-weight="900" font-size="44" letter-spacing="1">VITB</text>
    
    <!-- Red Sphere with Equator Pill Ring -->
    <g transform="translate(148, 32)">
      <circle cx="0" cy="0" r="23" fill="url(#sphereGrad)" filter="url(#logoShadow)"/>
      <!-- Pill Center Dividing Ring / Stripe -->
      <ellipse cx="0" cy="0" rx="23" ry="5.5" fill="none" stroke="#ffffff" stroke-width="3.2"/>
    </g>
    
    <!-- R A H -->
    <text x="178" y="47" fill="url(#logoGreen)" font-family="'Arial Black', Impact, sans-serif" font-weight="900" font-size="44" letter-spacing="1">RAH</text>
  </g>
</svg>`;

fs.writeFileSync(path.resolve('public/assets/logo.svg'), logoSvg);
console.log('Successfully generated corporate team & logo assets!');
