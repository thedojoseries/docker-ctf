import React from 'react';
import { TodoList} from './TodoList';
import axios from 'axios';
import './App.scss';
import { Link } from 'react-router-dom';

// Contaner Component
// Todo Id
window.id = 1;
export class TodoApp extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      tasks: []
    }
    this.apiUrl = `http://__BACKEND_IP__:7777`;
  }


  // Handle remove

   // Lifecycle method
  componentDidMount(){
    // Make HTTP reques with Axios
    axios.get(this.apiUrl + '/tasks')
      .then((res) => {
        // Set state with result
        this.setState({tasks: this.groupTasks(res.data)});
      });
  }

  groupTasks(tasks) {
    var groups =  tasks.reduce((tasksSoFar, task) => {
      if (!tasksSoFar[task.status]) tasksSoFar[task.status] = [];
      tasksSoFar[task.status].push(task);
      return tasksSoFar;
    }, []);
    return groups;
  } 

  render(){
    // Render JSX
    return (
      <div className="flex-column board-dimentions">
        <Link className="flex-end" to="/addTodo">Add a Task</Link>
        <div className="flex scroll"> 
          {Object.entries(this.state.tasks).map(group =>
            <TodoList className="col"
                todos={group[1]}/>
          )}
        </div>
      </div>
    )
  }
  
}

