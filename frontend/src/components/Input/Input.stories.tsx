import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, withKnobs, text } from '@storybook/addon-knobs';
import Input from './Input';

storiesOf('Input', module)
  .addDecorator(withKnobs)

  .add('hasError', () => <Input hasError={boolean('hasError', true)} />)
  .add('CheckBox', () => <Input type={text('checkbox', 'checkbox')} />)
  .add('Color', () => <Input type={text('color', 'color')} />)
  .add('Date:', () => <Input type={text('date', 'date')} />)
  .add('Datetime-local', () => <Input type={text('datetime-local', 'datetime-local')} />)
  .add('Email', () => <Input type={text('email', 'email')} />)
  .add('File', () => <Input type={text('file', 'file')} />)
  .add('Hidden', () => <Input type={text('hidden', 'hidden')} />)
  .add('Image', () => <Input type={text('image', 'image')} />)
  .add('Month', () => <Input type={text('month', 'month')} />)
  .add('Number', () => <Input type={text('number', 'number')} />)
  .add('Password', () => <Input type={text('password', 'password')} />)
  .add('Radio', () => <Input type={text('radio', 'radio')} />)
  .add('Range', () => <Input type={text('range', 'range')} />)
  .add('Reset', () => <Input type={text('reset', 'reset')} />)
  .add('Search', () => <Input type={text('search', 'search')} />)
  .add('Submit', () => <Input type={text('submit', 'submit')} />)
  .add('Tel', () => <Input type={text('tel', 'tel')} />)
  .add('Text', () => <Input type={text('text', 'text')} />)
  .add('Time', () => <Input type={text('time', 'time')} />)
  .add('Url', () => <Input type={text('url', 'url')} />)
  .add('Week', () => <Input type={text('week', 'week')} />)

  .add('playground', () => (
    <Input hasError={boolean('hasError', true)} type={text('type', 'text')} />
  ));
