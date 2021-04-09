import { AppPage } from '../support/app.po';

const page = new AppPage();

describe('App', () => {
  beforeEach(() => page.navigateTo());

  it('Verifies the title logo', () => {
      cy.get('.app-logo').should('be.visible');
  });

  it('The sidenav should open, navigate to "Context Packs" and back to "Home"', () => {
    // Before clicking on the button, the sidenav should be hidden
    page.getSidenav()
      .should('be.hidden');


    page.getSidenavButton().click()
      .should('be.visible');

    page.getNavLink('Context Packs').click();
    cy.url().should('match', /\/contextpacks$/);
    page.getSidenav()
      .should('be.hidden');

    page.getSidenavButton().click();
    page.getNavLink('Home').click();
    cy.url().should('match', /^https?:\/\/[^\/]+\/?$/);
    page.getSidenav()
      .should('be.hidden');
  });

});
