import clsx from 'clsx';

interface CardProps {
  size?: 'sm' | 'md' | 'lg';
  theme?: 'card2';
  className?: string;
  children: React.ReactNode;
  clickable?: boolean;
  foregroundColor?: string; // allow customization of --_fg
}

export default function Card2({
  size = 'md',
  theme = 'card2',
  className,
  children,
  clickable = true,
  foregroundColor,
}: CardProps) {
  return (
    <div
      className={clsx(
        'card',
        size && `card-${size}`,
        theme && `card-${theme}`,
        !clickable && 'card-nonclickable',
        className
      )}
      style={
        foregroundColor
          ? { ['--_fg' as any]: foregroundColor }
          : undefined
      }
    >
      {children}
    </div>
  );
}
