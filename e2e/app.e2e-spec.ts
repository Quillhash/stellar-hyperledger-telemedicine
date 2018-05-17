import { HealthFrontPage } from './app.po';

describe('health-front App', function() {
  let page: HealthFrontPage;

  beforeEach(() => {
    page = new HealthFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
