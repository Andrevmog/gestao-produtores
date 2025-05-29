import styled from 'styled-components';

export const StyledButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background-color: ${({ $variant }) => $variant === 'primary' ? '#4CAF50' : '#f44336'};
  color: white;
  font-weight: bold;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
