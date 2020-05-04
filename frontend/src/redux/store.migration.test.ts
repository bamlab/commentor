import { storeMigrations } from './store.migration';
import {
  version0InitialState,
  version1InitialState,
  version2InitialState,
  version3InitialState,
  version4InitialState,
  version5InitialState,
} from './initialStateHistory';
import { CURRENT_STORE_VERSION } from './store';

describe('it should apply correctly version state', () => {
  it('should match currentState', () => {
    expect(CURRENT_STORE_VERSION).toEqual(5);
  });

  it('version 4 -> 5', () => {
    const result = storeMigrations[5](version4InitialState);
    expect(result).toEqual(version5InitialState);
  });

  it('version 3 -> 4', () => {
    const result = storeMigrations[4](version3InitialState);
    expect(result).toEqual(version4InitialState);
  });

  it('version 2 -> 3', () => {
    const result = storeMigrations[3](version2InitialState);
    expect(result).toEqual(version3InitialState);
  });

  it('version 1 -> 2', () => {
    const result = storeMigrations[2](version1InitialState);
    expect(result).toEqual(version2InitialState);
  });

  it('version 0 -> 1', () => {
    const result = storeMigrations[1](version0InitialState);
    expect(result).toEqual(version1InitialState);
  });
});
