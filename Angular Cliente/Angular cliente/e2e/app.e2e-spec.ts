import { AngularEjemploPage } from './app.po';

describe('angular-ejemplo App', () => {
  let page: AngularEjemploPage;

  beforeEach(() => {
    page = new AngularEjemploPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
