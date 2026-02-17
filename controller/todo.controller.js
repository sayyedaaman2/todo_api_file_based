import {readDB,writeDB} from '../lib/index.js'
import {createTodo, updateTodo,} from '../model/todo.model.js'


export async function postTodo(req, res, next) {
  try {
    const todoItem = createTodo(req.body);

    const db = await readDB();       // { todos: [] }

    db.todos.push(todoItem);         // <-- THIS is the add

    await writeDB(db);

    res.status(201).json({
      success: true,
      message: "Todo added successfully",
      data: todoItem,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateTodoById(req, res, next) {
  try {
    const id = req.params.id;
    const payload = req.body;
    console.log(id,payload)
    const db = await readDB();          // { todos: [] }
    const index = db.todos.findIndex(todo => todo.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    const updatedTodo = updateTodo(db.todos[index], payload);

    db.todos[index] = updatedTodo;

    await writeDB(db);

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (err) {
    next(err);
  }
}
export async function getTodo(req, res, next) {
  try {
    const { id } = req.params;
    const { completed, search } = req.query;

    const db = await readDB(); // { todos: [] }
    let todos = db.todos;

    // 1️⃣ Get by ID: /todos/:id
    if (id) {
      const todo = todos.find(t => t.id === id);

      if (!todo) {
        return res.status(404).json({
          success: false,
          message: "Todo not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Todo fetched successfully",
        data: todo,
      });
    }

    // 2️⃣ Filter by completed: /todos?completed=true
    if (completed !== undefined) {
      const isCompleted = completed === "true";
      todos = todos.filter(t => t.completed === isCompleted);
    }

    // 3️⃣ Search by title/description: /todos?search=learn
    if (search) {
      const keyword = search.toLowerCase();
      todos = todos.filter(
        t =>
          t.title.toLowerCase().includes(keyword) ||
          t.description.toLowerCase().includes(keyword)
      );
    }

    // 4️⃣ Return list
    res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      data: todos,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteTodoById(req, res, next) {
  try {
    const { id } = req.params;

    const db = await readDB(); // { todos: [] }

    const index = db.todos.findIndex(todo => todo.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    const deletedTodo = db.todos[index];

    db.todos.splice(index, 1);

    await writeDB(db);

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: deletedTodo,
    });
  } catch (err) {
    next(err);
  }
}
