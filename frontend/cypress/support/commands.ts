Cypress.Commands.add('createTask', (task) => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/tasks',
      body: task,
    });
  });

Cypress.Commands.add('deleteAllTasks', () => {
    cy.request('GET', 'http://localhost:5000/api/tasks').then((response) => {
      if (response.body.length > 0) {
        response.body.forEach((task: any) => {
          cy.request('DELETE', `http://localhost:5000/api/tasks/${task._id}`);
        });
      }
    });
  });
  
  
  declare global {
    namespace Cypress {
      interface Chainable {
        createTask(task: any): Chainable<any>;
        deleteAllTasks(): Chainable<any>;
      }
    }
  }