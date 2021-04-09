export class AppPage {
  getAppLogo() {
    return cy.get('.app-logo');
  }
  navigateTo() {
    return cy.visit('/');
  }

  getAppTitle() {
    return cy.get('.app-title');
  }

  getSidenavButton() {
    return cy.get('.sidenav-button');
  }

  getSidenav() {
    return cy.get('.sidenav');
  }

  getNavLink(navOption: 'Home' | 'Context Packs') {
    return cy.contains('[routerlink] > .mat-list-item-content', `${navOption}`);
  }
}
