import type { InputHTMLAttributes } from 'react';
import { StyledInput } from './Input.styles';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
  return <StyledInput {...props} />;
};