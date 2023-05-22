import { useState, useEffect } from "react";

interface TodoFormProps {
  onSubmit: (title: string) => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  isEditing: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  inputValue,
  onInputChange,
  isEditing,
}) => {
  const [debouncedInputValue, setDebouncedInputValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!debouncedInputValue.trim()) return;
    onSubmit(debouncedInputValue);
    onInputChange("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new Todo"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
      />
      <button type="submit">{isEditing ? "Update" : "Add Todo"}</button>
    </form>
  );
};

export default TodoForm;
