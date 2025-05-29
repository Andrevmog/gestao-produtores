import type { ButtonHTMLAttributes } from 'react';
import { StyledButton } from './Button.styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export const Button = ({ variant = 'primary', children, ...props }: ButtonProps) => {
  return (
    <StyledButton $variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};