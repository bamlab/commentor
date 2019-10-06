import { configure } from '@storybook/react';
import requireContext from 'require-context.macro';
import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

const req = requireContext('../src/components', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withInfo);
configure(loadStories, module);
