describe('Task Manager Application', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); // Adjust the URL as needed  
    });
  
    it('should display the application header', () => {
      cy.get('header').should('be.visible');
      cy.contains('Task Manager').should('be.visible');
    });
  
    it('should add a new task', () => {
      const taskTitle = 'Test New Task';
      const taskDescription = 'This is a test task';
  
      cy.get('input[name="title"]').type(taskTitle);
      cy.get('textarea[name="description"]').type(taskDescription);
      cy.get('select[name="status"]').select('pending');
      cy.contains('button', 'Add Task').click({multiple:true});
  
      cy.contains(taskTitle).should('be.visible');
      cy.contains(taskDescription).should('be.visible');
    });
  
    it('should edit an existing task', () => {
      cy.fixture('tasks').then((tasks) => {
       // cy.createTask(tasks[0]); 
       // cy.visit('/');          
  
        cy.get('button[class*="text-blue-500"]').first().click(); 
  
        cy.get('input[name="title"]').clear().type('Updated Task Title');
        cy.get('textarea[name="description"]').clear().type('Updated description');
        
      });
    });
});