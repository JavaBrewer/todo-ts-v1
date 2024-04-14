import React, { useRef, useState } from "react";

const App: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  // const [isComposing, setIsComposing] = useState<boolean>(false);

  const addTodo = () => {
    if (input.trim() !== "") {
      setTodos([...todos, input]);
      setInput("");
    }
  };

  const removeTodo = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  // const deleteTodo = (id: number) => {
  //   setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  // };

  // !isComposing [ComposingEvent]
  // event.nativeEvent.isComposing : 한글 입력시 중복 입력 오류 방지 [nativeEvent]
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.nativeEvent.isComposing === false) {
      addTodo();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // 엔터 키를 눌렀을 때 비밀번호 입력창으로 포커스 이동
      passwordRef.current?.focus();
    }
  };

  const handleClick = () => {
    setError(!error);
  };

  return (
    <div>
      <h2>Todo</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a new todo"
        // onCompositionStart={() => setIsComposing(true)}
        // onCompositionEnd={() => setIsComposing(false)}
      />
      <input type="text" placeholder="Id" onKeyDown={handleKeyPress} />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        ref={passwordRef}
      />
      <button onClick={addTodo}>Add</button>
      <button onClick={handleClick}>toggle</button>
      {!error && <div>toggle</div>}
      {error ? <div style={{ color: "blue" }}>참</div> : <div>거짓</div>}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button
              onClick={() => {
                removeTodo(index);
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
