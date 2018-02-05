const reducer = require('./reducer');

describe('store/rootReducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, { type: 'UNKNOWN' })).toMatchSnapshot();
  });
});
