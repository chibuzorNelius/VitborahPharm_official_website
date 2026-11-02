import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('public/assets/products');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function createBoxSvg(opts) {
  const { title, subtitle, color, accentColor, type, iconText } = opts;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#f3f6f4"/>
      </linearGradient>
      <linearGradient id="boxShade" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="85%" stop-color="#f8faf8"/>
        <stop offset="100%" stop-color="#e0e8e2"/>
      </linearGradient>
      <filter id="dropShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#0e2316" flood-opacity="0.12"/>
      </filter>
    </defs>
    <rect width="400" height="400" fill="transparent"/>
    
    <!-- Shadow Floor -->
    <ellipse cx="200" cy="350" rx="140" ry="24" fill="#0c1f13" opacity="0.1" filter="blur(8px)"/>
    
    <!-- 3D Medicine Box Body -->
    <g filter="url(#dropShadow)">
      <!-- Main Front Face -->
      <rect x="75" y="70" width="250" height="250" rx="12" fill="url(#boxShade)" stroke="#d9e2db" stroke-width="2"/>
      
      <!-- Top Brand Header Bar -->
      <path d="M 75 82 Q 75 70 87 70 L 313 70 Q 325 70 325 82 L 325 110 L 75 110 Z" fill="${color}"/>
      <text x="90" y="96" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" letter-spacing="2">VITBORAH PHARMA</text>
      <circle cx="305" cy="90" r="8" fill="${accentColor || '#E83D36'}"/>
      <circle cx="305" cy="90" r="3" fill="#ffffff"/>
      
      <!-- Accent Stripe -->
      <rect x="75" y="110" width="250" height="6" fill="${accentColor || '#E83D36'}"/>
      
      <!-- Product Graphic / Badge -->
      <rect x="95" y="135" width="210" height="58" rx="8" fill="#f4f8f5" stroke="#e1ebe3" stroke-width="1.5"/>
      <text x="110" y="170" fill="${color}" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="900">${title}</text>
      
      <!-- Strength & Subtitle -->
      <text x="95" y="215" fill="#202820" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700">${subtitle}</text>
      
      <!-- Dosage form pill -->
      <rect x="95" y="235" width="110" height="26" rx="13" fill="${color}15" stroke="${color}40" stroke-width="1"/>
      <text x="150" y="252" fill="${color}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700">${type}</text>
      
      <!-- Quality Stamp / hologram -->
      <g transform="translate(235, 235)">
        <circle cx="20" cy="20" r="18" fill="#e8f5ec" stroke="${color}" stroke-width="1.5" stroke-dasharray="2,2"/>
        <text x="20" y="18" text-anchor="middle" fill="${color}" font-family="system-ui, -apple-system, sans-serif" font-size="8" font-weight="800">cGMP</text>
        <text x="20" y="27" text-anchor="middle" fill="#555" font-family="system-ui, -apple-system, sans-serif" font-size="7">PASSED</text>
      </g>
      
      <!-- Bottom Regulatory / Details Line -->
      <line x1="95" y1="285" x2="305" y2="285" stroke="#e0e8e2" stroke-width="1.5"/>
      <text x="95" y="304" fill="#6c7870" font-family="system-ui, -apple-system, sans-serif" font-size="9.5" font-weight="600">Prescription Healthcare Formulation</text>
      <text x="305" y="304" text-anchor="end" fill="${color}" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="800">WHO-STD</text>
    </g>
  </svg>`;
}

function createBottleSvg(opts) {
  const { title, subtitle, capColor, labelColor, accentColor, strength, pillCount } = opts;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <defs>
      <linearGradient id="bottleShine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="30%" stop-color="#fdfdfd"/>
        <stop offset="70%" stop-color="#edf2ee"/>
        <stop offset="100%" stop-color="#d4dfd6"/>
      </linearGradient>
      <linearGradient id="capShade" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${capColor}"/>
        <stop offset="50%" stop-color="#ffffff" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="${capColor}"/>
      </linearGradient>
      <filter id="bottleShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="16" stdDeviation="15" flood-color="#0a1d11" flood-opacity="0.14"/>
      </filter>
    </defs>
    <rect width="400" height="400" fill="transparent"/>
    
    <!-- Base Shadow -->
    <ellipse cx="200" cy="358" rx="115" ry="20" fill="#08170e" opacity="0.12" filter="blur(7px)"/>
    
    <g filter="url(#bottleShadow)">
      <!-- Ribbed Cap -->
      <rect x="135" y="45" width="130" height="40" rx="8" fill="${capColor}" stroke="#102b17" stroke-width="1.5"/>
      <!-- Cap Ridges -->
      <line x1="148" y1="45" x2="148" y2="85" stroke="#ffffff" stroke-width="1.5" opacity="0.3"/>
      <line x1="162" y1="45" x2="162" y2="85" stroke="#ffffff" stroke-width="1.5" opacity="0.3"/>
      <line x1="176" y1="45" x2="176" y2="85" stroke="#ffffff" stroke-width="1.5" opacity="0.3"/>
      <line x1="190" y1="45" x2="190" y2="85" stroke="#ffffff" stroke-width="1.5" opacity="0.3"/>
      <line x1="204" y1="45" x2="204" y2="85" stroke="#ffffff" stroke-width="1.5" opacity="0.3"/>
      <line x1="218" y1="45" x2="218" y2="85" stroke="#ffffff" stroke-width="1.5" opacity="0.3"/>
      <line x1="232" y1="45" x2="232" y2="85" stroke="#ffffff" stroke-width="1.5" opacity="0.3"/>
      <line x1="246" y1="45" x2="246" y2="85" stroke="#ffffff" stroke-width="1.5" opacity="0.3"/>
      
      <!-- Security Seal Ring -->
      <rect x="140" y="85" width="120" height="12" rx="3" fill="#ffffff" stroke="#c0cec3" stroke-width="1"/>
      <text x="200" y="94" text-anchor="middle" fill="#758879" font-family="system-ui, sans-serif" font-size="7" font-weight="700">SEALED FOR PROTECTION</text>

      <!-- Bottle Neck -->
      <path d="M 148 97 L 252 97 L 265 125 L 135 125 Z" fill="url(#bottleShine)" stroke="#cdd9d0" stroke-width="1.5"/>

      <!-- Bottle Main Cylindrical Body -->
      <rect x="110" y="125" width="180" height="215" rx="28" fill="url(#bottleShine)" stroke="#cbd7ce" stroke-width="1.5"/>

      <!-- Premium Wrap-Around Label -->
      <rect x="114" y="145" width="172" height="175" rx="8" fill="#ffffff" stroke="#e3ece5" stroke-width="1"/>
      
      <!-- Label Header Banner -->
      <rect x="114" y="145" width="172" height="34" rx="4" fill="${labelColor}"/>
      <text x="125" y="167" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="900" font-style="italic">New AGE</text>
      <circle cx="265" cy="162" r="9" fill="${accentColor || '#E83D36'}"/>
      <text x="265" y="166" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-size="9" font-weight="900">+</text>

      <!-- Main Product Name -->
      <text x="200" y="206" text-anchor="middle" fill="#1b241c" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="900">${title}</text>
      
      <!-- Strength Highlight Tag -->
      <rect x="145" y="220" width="110" height="24" rx="6" fill="${labelColor}15" stroke="${labelColor}50" stroke-width="1"/>
      <text x="200" y="236" text-anchor="middle" fill="${labelColor}" font-family="system-ui, sans-serif" font-size="12" font-weight="800">${strength}</text>

      <!-- Benefit Subtitle -->
      <text x="200" y="265" text-anchor="middle" fill="#4d5a50" font-family="system-ui, sans-serif" font-size="10" font-weight="600">${subtitle}</text>

      <!-- Pill Count and Footer -->
      <rect x="135" y="285" width="130" height="22" rx="11" fill="#f4f7f5" stroke="#dfe6e0" stroke-width="1"/>
      <text x="200" y="300" text-anchor="middle" fill="#303b32" font-family="system-ui, sans-serif" font-size="10" font-weight="800">${pillCount}</text>
    </g>
  </svg>`;
}

// Generate Therapeutic SVGs
const therList = [
  { file: 'artborah.png', title: 'ARTBORAH', subtitle: 'Artemether + Lumefantrine 20/120', color: '#168C28', accentColor: '#E83D36', type: '18 Tablets' },
  { file: 'vitboter.png', title: 'VITBOTER', subtitle: 'Artemether Injection 80mg/ml', color: '#173B24', accentColor: '#26943A', type: '6 Ampoules' },
  { file: 'boraflox.png', title: 'BORAFLOX 500', subtitle: 'Ciprofloxacin Tablets USP 500mg', color: '#168C28', accentColor: '#E83D36', type: '100 Tablets' },
  { file: 'vitboram.png', title: 'VITBORAM', subtitle: 'Ceftriaxone Sodium 1g Powder', color: '#173B24', accentColor: '#E83D36', type: 'Vial + Diluent' },
  { file: 'venita.png', title: 'VENITA', subtitle: 'Gentamicin Sulfate 80mg/2ml', color: '#26943A', accentColor: '#173B24', type: '10 Ampoules' },
  { file: 'ors.png', title: 'VITBORAH ORS', subtitle: 'Reduced Osmolarity Oral Salts', color: '#E88B16', accentColor: '#168C28', type: '50 Sachets' },
  { file: 'staxim.png', title: 'STAXIM', subtitle: 'Cefixime Trihydrate 100mg/5ml', color: '#7E22CE', accentColor: '#168C28', type: 'Oral Suspension' },
  { file: 'levotreat.png', title: 'LEVOTREAT 500', subtitle: 'Levofloxacin Tablets 500mg', color: '#0284C7', accentColor: '#E83D36', type: '10 Tablets' },
  { file: 'metronidazole.png', title: 'VITBORAH METRO', subtitle: 'Metronidazole Tablets 400mg', color: '#168C28', accentColor: '#26943A', type: '100 Tablets' },
  { file: 'artesunate.png', title: 'ARTESUNATE-AM', subtitle: 'Artesunate + Amodiaquine Tabs', color: '#DC2626', accentColor: '#168C28', type: '6 Tablets' },
  { file: 'paracetamol-infusion.png', title: 'VITBORAH PARA', subtitle: 'Paracetamol IV Infusion 1000mg', color: '#0D9488', accentColor: '#168C28', type: '100ml Infusion' },
  { file: 'diclofenac.png', title: 'DICLOFENAC SR', subtitle: 'Diclofenac Sodium SR 100mg', color: '#D97706', accentColor: '#168C28', type: '100 Tablets' }
];

// Generate Supplement SVGs
const suppList = [
  { file: 'supp-omega3.png', title: 'OMEGA-3', subtitle: 'Cardiovascular Support', capColor: '#0284C7', labelColor: '#0369A1', accentColor: '#F59E0B', strength: '1000mg Fish Oil', pillCount: '100 Softgels' },
  { file: 'supp-coq10.png', title: 'Co.Q10', subtitle: 'Cellular ATP & Heart Energy', capColor: '#168C28', labelColor: '#15803D', accentColor: '#DC2626', strength: '200mg Bio-Active', pillCount: '60 Softgels' },
  { file: 'supp-magnesium.png', title: 'MAGNESIUM', subtitle: 'Nerve, Bone & Muscle Comfort', capColor: '#168C28', labelColor: '#166534', accentColor: '#E83D36', strength: '400mg Glycinate', pillCount: '90 Tablets' },
  { file: 'supp-timolol.png', title: 'TIMOLOL BP', subtitle: 'Ophthalmic Eye Drops 0.5%', capColor: '#DC2626', labelColor: '#991B1B', accentColor: '#168C28', strength: '0.5% w/v Solution', pillCount: '10ml Dropper' },
  { file: 'supp-glutathione.png', title: 'GLUTATHIONE', subtitle: 'Master Cellular Antioxidant', capColor: '#9333EA', labelColor: '#7E22CE', accentColor: '#F43F5E', strength: '500mg Reduced', pillCount: '60 Capsules' },
  { file: 'supp-vitaminc.png', title: 'C-1000 COMPLEX', subtitle: 'With Rose Hips & Bioflavonoids', capColor: '#EA580C', labelColor: '#C2410C', accentColor: '#F59E0B', strength: '1000mg Ascorbic', pillCount: '100 Tablets' },
  { file: 'supp-probiotic.png', title: 'WOMEN’S PROBIOTIC', subtitle: '14 Strains + Cranberry', capColor: '#D97706', labelColor: '#B45309', accentColor: '#DB2777', strength: '55 Billion CFU', pillCount: '60 DR-Caps' },
  { file: 'supp-collagen.png', title: 'SUPER COLLAGEN+C', subtitle: 'Type 1 & 3 Bioactive Peptides', capColor: '#F97316', labelColor: '#EA580C', accentColor: '#EC4899', strength: 'Hydrolyzed Peptides', pillCount: '60 Tablets' },
  { file: 'supp-berberine.png', title: 'BERBERINE HCl', subtitle: 'Metabolic & Blood Glucose', capColor: '#111827', labelColor: '#1F2937', accentColor: '#168C28', strength: '600mg Pure Extract', pillCount: '60 Capsules' },
  { file: 'supp-vitamine.png', title: 'VITAMIN E', subtitle: 'Natural d-Alpha Tocopherol', capColor: '#F59E0B', labelColor: '#D97706', accentColor: '#168C28', strength: '400 IU Natural', pillCount: '100 Softgels' }
];

for (const item of therList) {
  // Save as SVG content (Vite and browsers render .svg directly, and we can also save both .png and .svg or point to .svg)
  const svg = createBoxSvg(item);
  fs.writeFileSync(path.join(outDir, item.file.replace('.png', '.svg')), svg);
}

for (const item of suppList) {
  const svg = createBottleSvg(item);
  fs.writeFileSync(path.join(outDir, item.file.replace('.png', '.svg')), svg);
}

console.log('Successfully generated all product visual assets!');
