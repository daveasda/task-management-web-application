import {useState, useEffect} from 'react';

function Input({status}) {

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const userId = localStorage.getItem('userId');

    const handleInputSubmit = async (e) => {
        e.preventDefault();

        const task ={
            title: taskTitle,
            description: taskDescription,
            status: {status},
            created_by: userId,
            assigned_to: userId,
            created_at: new Date(),        
        }

        console.log(task);


    } 

        return (
            <div className="input-container">
                <input type="text" className="mb-sm" id="taskTitle" placeholder="Enter title..." value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
                <textarea                 
                    placeholder="Enter task..." 
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                />
                <button className="btn btn-ghost" onClick={handleInputSubmit}>
                    Add
                </button>
            </div>
        );
    

}

export default Input;