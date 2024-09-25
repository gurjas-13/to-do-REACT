import React, { useState,useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import Navbar from './components/Navbar'

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);



  // add todo
  const handleAddTodo = ()=>{
    if (newTodo.trim()) {
      if (isEditing) {
        
        const updatedTodos = todos.map((todo) =>
            todo.id === editId ? { ...todo, text: newTodo } : todo
          )
        setTodos(updatedTodos);
        saveToLS(updatedTodos);
        setIsEditing(false);
        setEditId(null);
      } else {
        const newTodos = [...todos, { id: Date.now(), text: newTodo, completed: false }];
        setTodos(newTodos);
        saveToLS(newTodos);
      } 
      setNewTodo('');

     
      
    }  
     
  };
  //edit
  const handleEditTodo = (todo) => {
    setIsEditing(true);
    setNewTodo(todo.text);
    setEditId(todo.id);
  };
  //delete todo
  const handleDeleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos); // Update state
    saveToLS(filteredTodos);
   
  };

 
  const toggleCompleted = (id) => {
    
    const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    setTodos(updatedTodos);
    saveToLS(updatedTodos); 
  };

  const saveToLS = (todos)=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  return (
    <>
      <Navbar />
      <div className="mx-3 md:container bg-teal-50 md:mx-auto my-5 p-5 min-h-[80vh] rounded-xl md:w-1/2">
      <h1 className='font-bold text-center text-2xl'>iTask - Manage your Todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold px-2">Add Todo</h2>
          <div className="flex">
          <input onChange={(e) => setNewTodo(e.target.value)} type="text" className="w-full rounded-lg px-3 py-2" value={newTodo}></input>
          <button onClick={handleAddTodo} className="bg-teal-700 hover:bg-teal-900 text-white p-4 py-2 text-sm font-bold rounded-full mx-6 w-50 text-centre">Save</button>
          </div>

        </div>
        <h2 className="text-lg font-bold px-2">Your Todos</h2>
        {todos.map((todo) => ( 
        <div div key={todo.id} className="todos">
          <div className="todo flex md:w-1/2 my-3">
            <input type="checkbox" className="mr-2" checked={todo.completed} onChange={() => toggleCompleted(todo.id)}/>
            <span className={`${todo.completed ? "line-through text-gray-500" : ""}`}>
              {todo.text}
            </span>
            <div className="buttons flex h-full">
              <button onClick={() => handleEditTodo(todo)} className="bg-teal-700 hover:bg-teal-900 text-white p-2 py-1 text-sm font-bold rounded-md mx-2">
              <FaEdit /></button>
              <button onClick={() => handleDeleteTodo(todo.id)} className="bg-teal-700 hover:bg-teal-900 text-white p-2 py-1 text-sm font-bold rounded-md mx-2">
              <FaTrashAlt /> </button>
            </div>
          </div>
        </div>
        ))}
      </div>
    </>
  );
}

export default App

