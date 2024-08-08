import { IsPizzaPipe } from './is-pizza.pipe';

describe('IsPizzaPipe', () => {
  it('create an instance', () => {
    const pipe = new IsPizzaPipe();
    expect(pipe).toBeTruthy();
  });
});
