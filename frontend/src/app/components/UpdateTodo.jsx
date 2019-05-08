import React from 'react';
import { TodoForm } from './TodoForm'

export class UpdateTodo extends React.Component{

    render() {
        const todo = this.props.location.todo;
        return (
            <div className="flex flex-column todo-form">
            </div>
            
        )
    }
}