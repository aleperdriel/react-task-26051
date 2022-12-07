import React, {useState, useRef, useEffect} from 'react';
import {v4 as uuid} from 'uuid';
import './App.css';
import TodoList from './TodoList';

const LOCAL_STORAGE_KEY = 'todoApp.todos'
function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos);
    
  }, [])
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if(name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuid(), name: name, complete: false}]
    })
    console.log(name);
    todoNameRef.current.value = null;
  }

  function handleClearTodo() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  return (
    <div className='todo-container'>
      <div className='todo-inputs'>

        <input ref={todoNameRef} type="text" />
        <div className="todo-buttons">
          <button onClick={handleAddTodo}>Add todo</button>
          <button onClick={handleClearTodo}>Clear completed todos</button>
        </div>
      </div>
      <div className="warning">{todos.filter(todo => !todo.complete).length} left to do</div>
      <TodoList todos={todos} checked={toggleTodo}/>

    </div>
  );
}

export default App;
