import { Page, Locator } from '@playwright/test';

export class TodoPage {
    readonly page: Page;
    readonly header: Locator;
    readonly inputField: Locator;
    readonly todoList: Locator;
    readonly todoItem: Locator;
    readonly todoCount: Locator;
    readonly deleteTodoItem: Locator;
    readonly todoAppUi: Locator;

    //Dynamic Locator
    readonly markAsCompletedButton = (todoText: string) => this.page.locator(`//label[.="${todoText}"]/preceding-sibling::input`);
    readonly markAsCompletedTodoItem = (todoText: string) => this.page.locator(`//label[.="${todoText}"]/ancestor::li`);
    readonly editTodoItem = (todoText: string) => this.page.locator(`//input[@value='${todoText}']`);


    constructor(page: Page) {
        this.page = page;

        this.header = page.getByRole('heading', { name: 'todos' });
        this.inputField = page.getByPlaceholder('What needs to be done?');
        this.todoList = page.getByTestId('todo-list');
        this.todoItem = page.getByTestId('todo-item-label');
        this.todoCount = page.locator('.todo-count');
        this.deleteTodoItem = page.getByRole('button', { name: '×' });
        this.todoAppUi = page.locator('.todoapp');
    }

    async addTodoItem(todoText: string): Promise<void> {
        await this.inputField.fill(todoText);
        await this.inputField.press('Enter');
    }

    async getTodoItems(): Promise<string[]> {
        return await this.todoList.locator('li').allTextContents();
    }

    async assertTodoItemExists(todoText: string): Promise<void> {
        await this.page.getByText(todoText).waitFor();
    }

    async hoverOnTodoItem(todoText: string): Promise<void> {
        await this.todoItem.getByText(todoText, { exact: true }).hover();
    }

    async markAsCompleted(todoText: string): Promise<void> {
        await this.markAsCompletedButton(todoText).click();
    }

    async doubleClickOnTodoItem(todoText: string): Promise<void> {
        await this.todoItem.filter({ hasText: todoText }).dblclick();
    }

    async editTodoItemText(todoText: string, newTodoText: string): Promise<void> {
        await this.editTodoItem(todoText).fill(newTodoText);
        await this.editTodoItem(todoText).press('Enter');
    }

    async clickOnDeleteTodoItem(): Promise<void> {
        await this.deleteTodoItem.click();
    }
}
