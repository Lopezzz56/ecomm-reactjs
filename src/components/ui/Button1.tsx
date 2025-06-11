import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function FortressButton({
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={clsx('btn btn-fortress', className)} {...props}>
      {children}
    </button>
  );
}
