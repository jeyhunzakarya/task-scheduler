import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask,setShowAddTask ]= useState(true) 
  const [tasks, setTasks] = useState([])
  
  useEffect(()=>{
    const getTasks = async ()=> {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    } 
    getTasks()  
  },[])
    
  const fetchTasks = async() => {
      const res = await fetch('http://localhost:3000/tasks')
      const data = await res.json()
      return data
    }

  const fetchTask = async(id) => {
    const res = await fetch(`http://localhost:3000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  const addTask = async (task)=> {
    const newTask = await fetch(`http://localhost:3000/tasks/`, 
    {method:"POST",
    headers: {"Content-type": "application/json"},
    body : JSON.stringify(task)
      })      
    const res = await newTask.json()
    setTasks([...tasks, res])
    }
  
  const deleteTask = async (id) =>{
    await fetch(`http://localhost:3000/tasks/${id}`, {method:"DELETE"})      
    setTasks(tasks.filter(task=>task.id !== id))
  }
  
  const toggleTask = async (id)=> {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const newTask = await fetch(`http://localhost:3000/tasks/${id}`, 
    {method:"PUT",
    headers: {"Content-type": "application/json"},
    body : JSON.stringify(updatedTask)
      })      
    const res = await newTask.json()      
    setTasks(tasks.map((task) => task.id=== id? {...task, reminder : res.reminder} :task ))
  }

  
  return (
    <div className="container">
      <Header 
        title = "task tracker "
        onAdd = {()=>setShowAddTask(!showAddTask)} 
        showAdd = { showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask}/>}
      { tasks.length > 0 ?  (<Tasks tasks = {tasks} onDelete  = {deleteTask} onToggle= {toggleTask}/>):"No tasks" }
    </div>
  );
}

export default App;
