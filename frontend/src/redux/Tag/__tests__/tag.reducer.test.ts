import { loadTags, selectTag, addTag, deleteTag, updateTag } from '../tag.actions';
import reducer from '../tag.reducer';

const tag0 = {
  id: 0,
  code: 'refacto',
  description: 'this is refacto done with mistake',
  creationDate: new Date(),
};

const tag1 = {
  id: 1,
  code: 'readable',
  description: 'This is elegant but remove it ',
  creationDate: new Date(),
};

const newTag = {
  id: 2,
  code: 'code',
  description: 'description',
  creationDate: new Date(),
};

describe('Actions test', () => {
  describe('Request test', () => {
    const initialState = {
      tags: [tag0, tag1],
      isLoading: false,
      tagError: null,
      selectedTagId: null,
    };
    test.each`
      action                                                                        | expectedState
      ${selectTag.request({ tagId: 12 })}                                           | ${{ ...initialState, selectedTagId: 12 }}
      ${addTag.request({ code: 'code', description: 'description' })}               | ${{ ...initialState, isLoading: true }}
      ${loadTags.request({})}                                                       | ${{ ...initialState, isLoading: true }}
      ${deleteTag.request({ tagId: 1 })}                                            | ${{ ...initialState, isLoading: true }}
      ${updateTag.request({ tagId: 12, code: 'code', description: 'description' })} | ${{ ...initialState, isLoading: true }}
    `(
      'should the expected value',

      ({ action, expectedState }) => {
        expect(reducer(initialState, action)).toEqual(expectedState);
      },
    );
  });

  describe('Success test', () => {
    const initialState = {
      tags: [tag0, tag1],
      isLoading: true,
      tagError: 'some eroor',
      selectedTagId: null,
    };
    const updatedTag1 = { ...tag1, code: 'code', description: 'description' };

    test.each`
      action                                     | expectedState
      ${addTag.success({ tag: newTag })}         | ${{ ...initialState, tags: [tag0, tag1, newTag], isLoading: false, tagError: null }}
      ${loadTags.success({ tags: [newTag] })}    | ${{ ...initialState, tags: [newTag], isLoading: false, tagError: null }}
      ${deleteTag.success({ tagId: 0 })}         | ${{ ...initialState, tags: [tag1], isLoading: false, tagError: null }}
      ${updateTag.success({ tag: updatedTag1 })} | ${{ ...initialState, tags: [tag0, updatedTag1], isLoading: false, tagError: null }}
    `(
      'should the expected value',

      ({ action, expectedState }) => {
        expect(reducer(initialState, action)).toEqual(expectedState);
      },
    );
  });

  describe('Failure test', () => {
    const initialState = {
      tags: [tag0, tag1],
      isLoading: true,
      tagError: null,
      selectedTagId: null,
    };
    test.each`
      action                                          | expectedState
      ${addTag.failure({ errorMessage: 'error' })}    | ${{ ...initialState, tags: [tag0, tag1], isLoading: false, tagError: 'error' }}
      ${loadTags.failure({ errorMessage: 'error' })}  | ${{ ...initialState, tags: [tag0, tag1], isLoading: false, tagError: 'error' }}
      ${deleteTag.failure({ errorMessage: 'error' })} | ${{ ...initialState, tags: [tag0, tag1], isLoading: false, tagError: 'error' }}
      ${updateTag.failure({ errorMessage: 'error' })} | ${{ ...initialState, tags: [tag0, tag1], isLoading: false, tagError: 'error' }}
    `(
      'should the expected value',

      ({ action, expectedState }) => {
        expect(reducer(initialState, action)).toEqual(expectedState);
      },
    );
  });
});
