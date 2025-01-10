import { test, expect } from '@playwright/test';
import { TodoPage } from '../page-object/todo-page';

test.describe('Positive Scenario of Todo Mvc', () => {
  test('Verify that the user can add a todo', async ({ page }) => {

    const todoPage = new TodoPage(page);
    await page.goto('');

    await expect(todoPage.header).toHaveText('todos');

    const todoItems = 'buy fruits';
    await todoPage.addTodoItem(todoItems);

    await expect(todoPage.todoItem).toHaveText(todoItems);

    await expect(todoPage.todoCount).toHaveText('1 item left!');
  });

  test('Verify that the user can mark a todo as completed', async ({ page }) => {

    const todoPage = new TodoPage(page);
    await page.goto('');

    const todoItems = 'mark as completed';
    await todoPage.addTodoItem(todoItems);

    await expect(todoPage.todoItem).toHaveText(todoItems);

    await expect(todoPage.todoCount).toHaveText('1 item left!');

    await todoPage.markAsCompleted(todoItems);

    await expect(todoPage.todoCount).toHaveText('0 items left!');

    await expect(todoPage.markAsCompletedTodoItem(todoItems)).toHaveClass('completed');
  });

  test('Verify that the user can edit a existing todo item', async ({ page }) => {

    const todoPage = new TodoPage(page);
    await page.goto('');

    const todoItems = 'add todo item';
    await todoPage.addTodoItem(todoItems);

    await expect(todoPage.todoItem).toHaveText(todoItems);

    await expect(todoPage.todoCount).toHaveText('1 item left!');

    await todoPage.doubleClickOnTodoItem(todoItems);

    const todoItemsUpdate = 'update todo item';

    await todoPage.editTodoItemText(todoItems, todoItemsUpdate);

    await expect(todoPage.todoItem).toHaveText(todoItemsUpdate);

    await expect(todoPage.todoItem).not.toHaveText(todoItems);
  });

  test('Verify that the user can delete existing todo item', async ({ page }) => {

    const todoPage = new TodoPage(page);
    await page.goto('');

    const todoItems = 'delete todo item';
    await todoPage.addTodoItem(todoItems);

    await expect(todoPage.todoItem).toHaveText(todoItems);

    await expect(todoPage.todoCount).toHaveText('1 item left!');

    await todoPage.hoverOnTodoItem(todoItems);

    await todoPage.clickOnDeleteTodoItem();

    await expect(todoPage.todoItem).toBeHidden();
  });
})

test.describe('Negative Scenario of Todo Mvc', () => {
  test('Verify that the user add blank space in todo input field should not be added', async ({ page }) => {

    const todoPage = new TodoPage(page);
    await page.goto('');

    await expect(todoPage.header).toHaveText('todos');

    const todoItems = ' ';
    await todoPage.addTodoItem(todoItems);

    await expect(todoPage.todoItem).toBeHidden();
  });

  test('Verify that if user added only one chacter in todo input field should not be added', async ({ page }) => {

    const todoPage = new TodoPage(page);
    await page.goto('');

    await expect(todoPage.header).toHaveText('todos');

    const todoItems = 'h';
    await todoPage.addTodoItem(todoItems);

    await expect(todoPage.todoItem).toBeHidden();
  });

  test('Verify that if user added html chacter in todo input field it should add the todo item', {
    annotation: [
      { type: 'issue', description: 'When a user adds HTML characters in the todo input field, the todo item should be added but not exactly what the user has provided' },
    ]
  }, async ({ page }) => {

    const todoPage = new TodoPage(page);
    await page.goto('');

    await expect(todoPage.header).toHaveText('todos');

    const todoItems = '<b>test</b>';
    await todoPage.addTodoItem(todoItems);

    await expect(todoPage.todoItem).toHaveText(todoItems);
  });

  test('Verify that trim functionality is working fine or not', async ({ page }) => {

    const todoPage = new TodoPage(page);
    await page.goto('');

    await expect(todoPage.header).toHaveText('todos');

    const todoItems = '    buy subscription    ';
    await todoPage.addTodoItem(todoItems);

    await expect(todoPage.todoItem).toHaveText(todoItems);
  });
})

test.describe('Area snapshot assertion of Todo Mvc', () => {

  test('Verify todo mvc ui snapshot', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await page.goto('');
    const todoItems = 'buy fruits';
    await todoPage.addTodoItem(todoItems);
    await expect(todoPage.todoAppUi).toMatchAriaSnapshot(`
      - heading "todos" [level=1]
      - textbox "New Todo Input"
      - text: New Todo Input
      - main:
        - checkbox "❯ Toggle All Input"
        - text: ❯ Toggle All Input
        - list:
          - listitem:
            - checkbox: "on"
            - text: ${todoItems}
      - text: 1 item left!
      - list:
        - listitem:
          - link "All"
        - listitem:
          - link "Active"
        - listitem:
          - link "Completed"
      - button "Clear completed" [disabled]
    `);
  })
})


