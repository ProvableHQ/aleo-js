import unfetch from 'unfetch';
import {Account} from '../src/index.js';



describe("hola", () => {
  it("say hola", () => {
    expect(new Account()).toEqual("hola");
  });
});
