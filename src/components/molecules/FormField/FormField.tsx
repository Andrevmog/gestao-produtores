import { Input } from '../../atoms/Input/Input';
import { Text } from '../../atoms/Typography/Text';

type FormFieldProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormField = ({ label, ...inputProps }: FormFieldProps) => {
  return (
    <div>
      <Text as="label" style={{ display: 'block', marginBottom: '4px' }}>
        {label}
      </Text>
      <Input {...inputProps} />
    </div>
  );
};