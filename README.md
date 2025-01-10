# TodoMVC Test Suite with Playwright

## **Setup Instructions**

### **Prerequisites**

1. Node.js (version 16 or higher)
2. npm or yarn

### **Installation**

1. Clone this repository:
   ```bash
   git clone https://github.com/mohitpatwari08/todo-mvc
   ```
2. Navigate to the project directory:
   ```bash
   cd todomvc-playwright-tests
   ```
3. Install dependencies:
   ```bash
   npm ci
   ```
4. Install browsers
   ```bash
   npx playwright install --with-deps
   ```

### **Running Tests**

To run the test suite, use the following command:

```bash
npx playwright test
```

To view detailed test results:

```bash
npx playwright show-report
```

---

## **Test Cases**

### **Positive Scenarios**

1. **Add a Todo Item**
   - Verifies that users can add a new todo item.
2. **Mark a Todo as Completed**
   - Ensures users can mark a todo as completed.
3. **Edit an Existing Todo**
   - Checks that users can edit a todo item.
4. **Delete a Todo Item**
   - Confirms that users can delete a todo item.

### **Negative Scenarios**

1. **Adding Blank Space**
   - Ensures blank spaces cannot be added as a todo.
2. **Single Character Input**
   - Verifies that single-character inputs are not accepted.
3. **HTML Characters**
   - Tests that HTML characters are added as plain text.
4. **Trimming Input**
   - Confirms that leading and trailing spaces are trimmed.

### **Snapshot Testing**

- Validates the UI layout and structure to catch unintended changes.

---

## **Page Object Model (POM)**

The `TodoPage` class encapsulates interactions with the TodoMVC application. This makes tests:

- **Reusable**: Methods can be reused across multiple test cases.
- **Maintainable**: UI changes can be managed by updating the locators in one place.
