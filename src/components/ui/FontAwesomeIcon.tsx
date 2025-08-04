import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface FontAwesomeIconProps {
  icon: IconProp;
  className?: string;
  size?: 'xs' | 'sm' | 'lg' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';
  color?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function FontAwesomeIcon({ 
  icon, 
  className = '', 
  size = '1x', 
  color,
  onClick,
  style 
}: FontAwesomeIconProps) {
  return (
    <FAIcon
      icon={icon}
      className={className}
      size={size}
      color={color}
      onClick={onClick}
      style={style}
    />
  );
} 