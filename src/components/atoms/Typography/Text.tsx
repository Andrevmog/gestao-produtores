import type { HTMLAttributes } from 'react';
import styled from 'styled-components';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div' | 'label';
  variant?: 'large' |'body' | 'caption' | 'small';
  children: React.ReactNode;
}

const StyledText = styled.p<{ $variant: 'large' |'body' | 'caption' | 'small' }>`
  margin: 0 0 0.5rem 0;
  line-height: 1.5;
  color: #fff;

  ${({ $variant }) => {
    switch ($variant) {
      case 'body': return 'font-size: 1rem;';
      case 'caption': return 'font-size: 0.875rem; color: #666;';
      case 'small': return 'font-size: 0.75rem; color: #888;';
       case 'large': return `
        font-size: 1.5rem;
        font-weight: 600;
        line-height: 1.3;
        font-size: 50px;
      `;
      default: return 'font-size: 1rem;';
    }
  }}
`;

export const Text = ({ 
  as = 'p', 
  variant = 'body', 
  children, 
  ...props 
}: TextProps) => {
  return (
    <StyledText as={as} $variant={variant} {...props}>
      {children}
    </StyledText>
  );
};