import clsx from 'clsx';

interface CardProps {
  size?: 'sm' | 'md' | 'lg';
  theme?: 'fortress';
  className?: string;
  children: React.ReactNode;
}

export default function Card1({
  size = 'md',
  theme = 'fortress',
  className,
  children,
}: CardProps) {
  return (
    <div className={clsx(
      'card',
      size && `card-${size}`,
      theme && `card-${theme}`,
      className
    )}>
      {children}
    </div>
  );
}
