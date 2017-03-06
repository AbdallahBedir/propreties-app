import { PropretiesAppPage } from './app.po';

describe('propreties-app App', () => {
  let page: PropretiesAppPage;

  beforeEach(() => {
    page = new PropretiesAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
