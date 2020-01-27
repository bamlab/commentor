import { configure } from '@storybook/react';
import requireContext from 'require-context.macro';
import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withConsole } from '@storybook/addon-console';
import { setConsoleOptions } from '@storybook/addon-console';

setConsoleOptions({
  panelExclude: [],
});

const req = requireContext('../src/components', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withInfo);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));

configure(loadStories, module);
