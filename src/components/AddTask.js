import { useState } from "react"
const AddTask = ({onAdd}) => {
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [reminder,setReminder] = useState(false)

    const onSubmit = (e)=> {
        e.preventDefault()
        if ( !name){
            alert("write text")
            return 
        }
        onAdd({name, description, reminder})
        setName("")
        setDescription("")
        setReminder(false)
    }
        return (
            <form className='add-form' onSubmit={onSubmit} >
                <div className='form-control'>
                    <label>task name</label>
                    <input 
                        type={"text"}
                        placeholder='Add task name'
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                    >
                    </input>
                </div>
                <div className='form-control'>
                    <label>task description</label>
                    <input 
                        type={"text"} 
                        placeholder='Add task description'
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                    >
                    </input>
                </div>
                <div className='form-control form-control-check'>
                    <label>set Reminder</label>
                    <input 
                        type={"checkbox"} 
                        checked= {reminder}
                        value={reminder}
                        onChange={(e)=> setReminder(e.currentTarget.checked)}
                        
                >
                    </input>
                </div>        
                <input type={"submit"} value={"Save Task"} className='btn btn-block'/> 
        </form>            
)
}

export default AddTask
