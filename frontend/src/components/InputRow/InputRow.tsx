import React, { ChangeEvent } from 'react';
import Input from 'components/Input';
import { Label, Error, Row } from './InputRow.style';
import { TextArea } from '../Input/Input';

interface PropsType {
  label?: string | null;
  error?: string | null;
  type: string;
  disabled?: boolean;
  placeholder?: string;
  field: {
    name?: string;
    onBlur?: () => void;
    rows: number;
    onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => void;
    value?: string;
  };
}

const InputRow: React.FunctionComponent<PropsType> = props => {
  const { error, field, label, disabled, type, placeholder } = props;
  const hasError = !!error;

  return (
    <Row>
      {label && <Label>{label}</Label>}
      {type === 'area' ? (
        <TextArea disabled={disabled} placeholder={placeholder} hasError={hasError} {...field} />
      ) : (
        <Input
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          hasError={hasError}
          {...field}
        />
      )}
      {hasError && <Error>{error}</Error>}
    </Row>
  );
};

export default InputRow;
