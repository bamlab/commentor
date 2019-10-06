import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, withKnobs, text } from '@storybook/addon-knobs';
import Input from './Input';

storiesOf('Input', module)
  .addDecorator(withKnobs)

  .add('hasError', () => <Input hasError={boolean('hasError', true)} />)
  .add('CheckBox', () => <Input type={text('type', 'checkbox')} />)
  .add('Color', () => <Input type={text('type', 'color')} />)
  .add('Date:', () => <Input type={text('type', 'date')} />)
  .add('Datetime-local', () => <Input type={text('type', 'datetime-local')} />)
  .add('Email', () => <Input type={text('type', 'email')} />)
  .add('File', () => <Input type={text('type', 'file')} />)
  .add('Hidden', () => <Input type={text('type', 'hidden')} />)
  .add('Image', () => <Input type={text('type', 'image')} />)
  .add('Month', () => <Input type={text('type', 'month')} />)
  .add('Number', () => <Input type={text('type', 'number')} />)
  .add('Password', () => <Input type={text('type', 'password')} />)
  .add('Radio', () => <Input type={text('type', 'radio')} />)
  .add('Range', () => <Input type={text('type', 'range')} />)
  .add('Reset', () => <Input type={text('type', 'reset')} />)
  .add('Search', () => <Input type={text('type', 'search')} />)
  .add('Submit', () => <Input type={text('type', 'submit')} />)
  .add('Tel', () => <Input type={text('type', 'tel')} />)
  .add('Text', () => <Input type={text('type', 'text')} />)
  .add('Time', () => <Input type={text('type', 'time')} />)
  .add('Url', () => <Input type={text('type', 'url')} />)
  .add('Week', () => <Input type={text('type', 'week')} />)

  .add('playground', () => (
    <Input hasError={boolean('hasError', true)} type={text('type', 'text')} />
  ));
