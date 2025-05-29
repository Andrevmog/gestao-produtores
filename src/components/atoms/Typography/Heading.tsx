import type { HTMLAttributes } from 'react';
import styled from 'styled-components';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h3: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h4: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h5: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h6: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    }
  }
}

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
  children: React.ReactNode;
}

const StyledHeading = styled.h1<{ $level: HeadingLevel }>`
  margin: 0 0 1rem 0;
  font-weight: bold;
  line-height: 1.2;
  color: #333;

  ${({ $level }) => {
    switch ($level) {
      case 1: return 'font-size: 2.5rem;';
      case 2: return 'font-size: 2rem;';
      case 3: return 'font-size: 1.75rem;';
      case 4: return 'font-size: 1.5rem;';
      case 5: return 'font-size: 1.25rem;';
      case 6: return 'font-size: 1rem;';
      default: return 'font-size: 1.5rem;';
    }
  }}
`;

export const Heading = ({ level, children, ...props }: HeadingProps) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <StyledHeading as={HeadingTag} $level={level} {...props}>
      {children}
    </StyledHeading>
  );
};