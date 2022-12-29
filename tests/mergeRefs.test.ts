import mergeRefs from '../src/utils/mergeRefs';

describe('mergeRefs', () => {
  it('should merge refs', () => {
    const ref1 = jest.fn();
    const ref2 = jest.fn();
    const ref3 = jest.fn();
    const ref = mergeRefs([ref1, ref2, ref3]);
    ref('test');
    expect(ref1).toHaveBeenCalledWith('test');
    expect(ref2).toHaveBeenCalledWith('test');
    expect(ref3).toHaveBeenCalledWith('test');
  });
});
