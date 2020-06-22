import initStoryshots, { Stories2SnapsConverter } from '@storybook/addon-storyshots';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';

/**
 * this is used to split shapshot to different files
 * @todo  Use screenshot instead of snapshot ( or at least mount, but absolute filename breaks our ci)
 *  */
initStoryshots({
  test: ({ story, context }) => {
    const converter = new Stories2SnapsConverter();
    const snapshotFilename = converter.getSnapshotFileName(context);
    const storyElement = story.render();

    const tree = render(storyElement);

    expect(toJson(tree)).toMatchSpecificSnapshot(snapshotFilename);
  },
  // other options here
});
