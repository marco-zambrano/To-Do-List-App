# To-Do-List-App 📝
You have two sections, the categories and the task.
- You can divide your tasks by categories.
- In each category your tasks will be devided by it's importance level.
- The importance level are: normal, important, urgent; in that order.
- Delete any task with the delete button at the right of each task.
## Category Section. 🏷️
You can create a new category using the button with the + sign, then simply add its name and accept.
## Ad Task Section. ✏️
To create a task you can press any of the buttons that say + new task or the button with the + sign found in the header.
When adding the task you have different options:
- Task name 
- Importance of the task
- Add a deadline (optional)
- Select which category it belongs to

## ‼️ How to Run the Project Correctly
This project uses **JavaScript modules (`type="module"`)** and fetches **local files**, which can cause issues if run directly using `file://`.  
To avoid CORS errors and browser restrictions, **you must run it using a local server**.

### ✅ Option 1: Use Live Server (Recommended)
If you use **VS Code**, follow these steps:
1. Install the **Live Server** extension if you haven't already.
2. Open the project in VS Code.
3. Right-click on `index.html` and select **"Open with Live Server"**.
4. The project will open at `http://127.0.0.1:5500/` without issues.

### ✅ Option 2: Start a Server with Python
If you don’t use Live Server, you can start a simple server using Python:
1. Open the terminal in the project folder.
2. Run the following command:
   ```sh
   python -m http.server 5500

