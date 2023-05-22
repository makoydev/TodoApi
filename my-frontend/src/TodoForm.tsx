import { useState } from "react";
import { debounce } from "lodash";

interface TodoFormProps {
  onSubmit: (title: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSubmit(inputValue);
    setInputValue("");
  };

  const handleInputChange = debounce((value: string) => {
    setInputValue(value);
  }, 300);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new Todo"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
      />

      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
