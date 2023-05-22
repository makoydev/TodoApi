import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import TodoForm from "./TodoForm";

interface TodoType {
  id: number;
  title: string;
  completed: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<Array<TodoType>>([]);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<TodoType | null>(null);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5258/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleUpdateTodo = async () => {
    if (!currentTodo) return;

    try {
      await axios.put(
        `http://localhost:5258/api/todos/${currentTodo.id}`,
        currentTodo
      );
      setTodos(
        todos.map((todo) => {
          if (todo.id === currentTodo.id) {
            return currentTodo;
          }
          return todo;
        })
      );
      setIsEditing(false);
      setCurrentTodo(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleSubmit = async (title: string) => {
    if (!title.trim()) return;

    if (isEditing) {
      if (currentTodo) {
        setCurrentTodo({
          ...currentTodo,
          title: title,
        });
        setShouldUpdate(true);
      }
    } else {
      try {
        const response = await axios.post("http://localhost:5258/api/todos", {
          title: title,
          completed: false,
        });
        setTodos([...todos, response.data]);
      } catch (error) {
        console.error("Error creating todo:", error);
      }
    }
  };

  useEffect(() => {
    if (isEditing && currentTodo && shouldUpdate) {
      handleUpdateTodo();
      setShouldUpdate(false);
    }
  }, [currentTodo]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5258/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleEditClick = (todo: TodoType) => {
    setIsEditing(true);
    setCurrentTodo(todo);
  };

  return (
    <div className="app-container">
      <div className="App">
        <h1>Todo List</h1>
        <TodoForm
          onSubmit={handleSubmit}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          isEditing={isEditing}
        />
        <ul>
          {todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              <li>{todo.title}</li>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
              <button onClick={() => handleEditClick(todo)}>Edit</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
