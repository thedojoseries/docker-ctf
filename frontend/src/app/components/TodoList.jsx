import React from 'react';
import { ConnectedUsernameDisplay } from './UsernameDisplay';
import { Link } from 'react-router-dom';
import './App.scss';

export const TodoItem = ({todo}) => {
  const todoDetail = {
    pathname: `/task/${todo._id}`,
    todo: todo
  }
  return (
   
      <div className="card todo-card p-2 mt-2">
          <div className="todo-card-details">
              <span><span className="label">Title : </span> <Link to={todoDetail} ><span>{todo.name} {todo.isComplete ? `✓` : null}</span></Link></span>
              <span><span className="label">Description : </span> <span>{todo.description}</span></span>
              <span><span className="label">ETA : </span> <span>{todo.ETA}</span></span>
          </div>
      </div>
  );
}
  
export const TodoList = ({todos}) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<TodoItem todo={todo} key={todo._id} />)
  });
  return (
      <div className="col">
        <h1 className="header">{todos[0].status}</h1>
        {todoNode}
      </div>
  );
}