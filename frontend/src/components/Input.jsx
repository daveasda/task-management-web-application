import {useState, useEffect} from 'react';

function Input({status, onTaskCreated }) {

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const userId = localStorage.getItem('userId');

    const handleInputSubmit = async (e) => {
        e.preventDefault();

        const task ={
            title: taskTitle,
            description: taskDescription,
            status: status,
            created_by: userId,
            assigned_to: userId,
            created_at: new Date(),        
        }

        // console.log(task);

        try{
            const response = await fetch('http://localhost:3000/api/task/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            });

            const data = await response.json();
            // console.log("This is the response data :", data);
            localStorage.setItem('taskId', data.task.id);

            // const newTaskId = localStorage.getItem('taskId');
            // console.log("Task id:", newTaskId);

            if (response.ok) {
                // console.log('Task created successfully:', data);
                setTaskTitle('');
                setTaskDescription('');
                onTaskCreated(data.task);
            }

            
        } catch (error) {
            console.error('Error creating task:', error);
        }
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