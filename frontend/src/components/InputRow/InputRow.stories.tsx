import React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, object, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import InputRow from './InputRow';

const defaultLabel = 'Label';
const defaultField = {
  name: text('name', 'Name'),
  onBlur: action('onBlur'),
  onChange: action('onChange'),
  value: text('value', 'value'),
};

storiesOf('InputRow', module)
  .addDecorator(withKnobs)

  .add('label', () => (
    <InputRow
      label={text('label', defaultLabel)}
      field={defaultField}
      type={text('type', 'text')}
    />
  ))
  .add('error', () => (
    <InputRow
      field={defaultField}
      type={text('type', 'text')}
      error={text('error', 'error message')}
    />
  ))
  .add('type', () => (
    <>
      <div>type = text</div>
      <InputRow type={text('type', 'text')} field={defaultField} />
      <div>type = password</div>
      <InputRow type={text('typePass', 'password')} field={defaultField} />
    </>
  ))
  .add('disabled', () => (
    <InputRow
      disabled={boolean('disabled', true)}
      field={defaultField}
      type={text('type', 'text')}
    />
  ))
  .add('placeholder', () => (
    <InputRow
      placeholder={text('placeholder', 'placeholder here')}
      field={{ ...defaultField, value: '' }}
      type={text('type', 'text')}
    />
  ))
  .add('field', () => (
    <InputRow field={object('field', defaultField)} type={text('type', 'text')} />
  ))

  .add('playground', () => (
    <InputRow
      label={text('label', 'example')}
      placeholder={text('placeholder', 'placeholder here')}
      disabled={boolean('disabled', true)}
      type={text('type', 'text')}
      error={text('error', 'error')}
      field={object('field', defaultField)}
    />
  ));

interface Props {
  label?: string | null;
  error?: string | null;
  type: string;
  disabled?: boolean;
  placeholder?: string;
  field: {
    name?: string;
    onBlur?: () => void;
    onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => void;
    value?: string;
  };
}
