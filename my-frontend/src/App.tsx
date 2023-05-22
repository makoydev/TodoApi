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

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleSubmit = async (title: string) => {
    if (!title.trim()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/todos", {
        title: title,
        completed: false,
      });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoForm onSubmit={handleSubmit} />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
