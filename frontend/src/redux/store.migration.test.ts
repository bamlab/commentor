import { storeMigrations } from './store.migration';
import { version0InitialState, version1InitialState } from './initialStateHistory';
import { CURRENT_STORE_VERSION } from './store';

describe('it should apply correctly version state', () => {
  it('should match currentState', () => {
    expect(CURRENT_STORE_VERSION).toEqual(1);
  });

  it('version 0 -> 1', () => {
    const result = storeMigrations[0](version0InitialState);
    expect(result).toEqual(version1InitialState);
  });
});
