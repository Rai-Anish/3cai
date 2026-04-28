interface LogoProps {
  size?: number | string; // Changed 'width' to 'size' since it's now square
  className?: string;
}

const Logo = ({ size = 60, className = "" }: LogoProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="255 85 142 170" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>3CAI mark</title>
    
    <g transform="translate(340, 170)">
      {/* Outer hex ring */}
      <polygon 
        points="0,-80 69,-40 69,40 0,80 -69,40 -69,-40" 
        stroke="#e9ffb9" strokeWidth="1" opacity="0.15" 
      />

      {/* Outer dots */}
      {[
        [0, -80], [69, -40], [69, 40], [0, 80], [-69, 40], [-69, -40]
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5" fill="#e9ffb9" opacity="0.2" />
      ))}

      {/* Mid hex ring */}
      <polygon 
        points="0,-50 43,-25 43,25 0,50 -43,25 -43,-25" 
        stroke="#e9ffb9" strokeWidth="0.8" opacity="0.1" 
      />

      {/* Triangles */}
      <polygon points="0,-54 32,-27 -32,-27" fill="#e9ffb9" /> 
      <polygon points="0,54 -32,27 32,27" fill="#e9ffb9" opacity="0.3" /> 
      <polygon points="48,-16 48,16 16,0" fill="#ac89ff" opacity="0.8" /> 
      <polygon points="-48,16 -48,-16 -16,0" fill="#e9ffb9" opacity="0.18" /> 

      {/* Center diamond */}
      <polygon points="0,-22 22,0 0,22 -22,0" fill="#e9ffb9" />
      <circle cx="0" cy="0" r="7" fill="none" /> 

      {/* Pink accent */}
      <line x1="38" y1="-46" x2="55" y2="-63" stroke="#ff6b98" strokeWidth="3" strokeLinecap="round" />
      <circle cx="55" cy="-63" r="4" fill="#ff6b98" />

      {/* Spokes */}
      <line x1="0" y1="-22" x2="0" y2="-54" stroke="#e9ffb9" strokeWidth="0.8" opacity="0.3" />
      <line x1="22" y1="0" x2="48" y2="0" stroke="#ac89ff" strokeWidth="0.8" opacity="0.4" />
      <line x1="-22" y1="0" x2="-48" y2="0" stroke="#e9ffb9" strokeWidth="0.8" opacity="0.2" />
      <line x1="0" y1="22" x2="0" y2="54" stroke="#e9ffb9" strokeWidth="0.8" opacity="0.25" />
    </g>
  </svg>
);

export default Logo;


