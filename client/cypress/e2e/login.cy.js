describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173')
    cy.get('button[aria-label="account of current user"]').click();
    cy.get('input[name="email"]').type("josh@mail.com");
    // cy.get('span').contains('Behavioral').parent().parent().parent().parent().click();
    cy.get('button[aria-label="toggle password visibility"]').click();
    cy.get('input[name="password"]').type("Trying a wrong password");
    cy.get('button').contains('Sign In').click();
    // cy.get('span').contains('Book an Appointment').click()
    // cy.contains('h6','COTTON').parent().parent().parent().click();
    // cy.contains('button','Next').click();
    // cy.get('span').contains('Behavioral').parent().parent().parent().parent().click();
    // cy.get('span').contains('Fever').click();
    // cy.get('span').contains('Scaling').click();
    // cy.get('span').contains('Lethargy').click();
    // cy.get('span').contains('Coughing').click();
    // cy.get('span').contains('Itching').click();
    // cy.get('span').contains('Coughing').click();
    // cy.contains('button','Next').click();
    // cy.contains('button','Next').click();
    // cy.contains('button','sanjida akter').next().contains('button', 'Details').click();
    // cy.contains('div','Book an Appointment').click();
  })
})