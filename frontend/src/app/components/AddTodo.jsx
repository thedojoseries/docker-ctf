import React from 'react';
import { TodoForm } from './TodoForm'
import { Link } from 'react-router-dom';

export const AddTodo = () => {
  return (
    <div className="flex flex-column todo-form">
      <TodoForm/>
    </div>
  )
}