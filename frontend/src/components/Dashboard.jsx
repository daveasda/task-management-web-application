import {useState, useEffect} from 'react';
import Card from './Card';
import Input from './Input';

function Dashboard() {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [draggedTask, setDraggedTask] = useState(null);  

    const userId = localStorage.getItem('userId')

    const handleTaskCreated = (newTask) => {
        const updatedTasks = [...tasks, newTask]
        setTasks(updatedTasks);
    };
    
    const handleDrop = async (newStatus) => {

        if (!draggedTask) {
            return;
        }

        try {

            const response = await fetch(
                `http://localhost:3000/api/task/${draggedTask.id}/status`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        status: newStatus
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                const updatedTasks = tasks.map(task => {

                    if (task.id === draggedTask.id) {
                        return data.task;
                    }

                    return task;
                });

                setTasks(updatedTasks);
                setDraggedTask(null);
            }

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
     
        
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:3000/api/account/dashboard/${userId}`);
            const data = await response.json();
            setUser(data.user);
            // console.log('Fetched user data:', data.user);
        };

        const fetchTasks = async () => {
            const response = await fetch(`http://localhost:3000/api/task/user/${userId}`);
            const data = await response.json();

            setTasks(data.task);
        };

        fetchUser();
        fetchTasks();
        }, [userId]); 

    return (
        <div className="bg-teal-light">
            <h1 className="text-dark-teal  center-text">DASHBOARD</h1>
            <p className="text-primary center-text">Welcome to the Dashboard!</p>
            {user && (
                <div className='text-secondary center-text'>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>User Type: {user.user_type}</p>
                    {<p>Created Time: {user.created_at}</p>}
                </div>
            )}
            {message && <p>{message}</p>}

            <div className= "kanban-board">
                <div className="kanban-column">
                    <h2>Unassigned</h2>
                    <Input status="unassigned" onTaskCreated={handleTaskCreated} />
                    {tasks
                        .filter(task => task.status === 'unassigned')
                        .map(task => (
                            <Card key={task.id} task={task} onDragStart = {setDraggedTask}/>
                        ))
                    }
                </div>

                <div className="kanban-column" onDragOver={(e) => e.preventDefault()}  onDrop={() => handleDrop('todo')}>
                    <h2>To Do</h2>
                    <Input status="todo" onTaskCreated={handleTaskCreated} />
                    {tasks
                        .filter(task => task.status === 'todo')
                        .map(task => (
                            <Card key={task.id} task={task} onDragStart= {setDraggedTask} />
                        ))
                    }
                </div>

                <div className="kanban-column" onDragOver={(e) => e.preventDefault()}  onDrop={() => handleDrop('doing')}>
                    <h2>Doing</h2>
                    <Input status="doing" onTaskCreated={handleTaskCreated} />
                    {tasks
                        .filter(task => task.status === 'doing')
                        .map(task => (
                            <Card key={task.id} task={task} onDragStart= {setDraggedTask}/>
                        ))
                    }
                </div>

                <div className="kanban-column" onDragOver={(e) => e.preventDefault()}  onDrop={() => handleDrop('done')}>
                    <h2>Done</h2>
                    <Input status="done" onTaskCreated={handleTaskCreated} />
                    {tasks
                        .filter(task => task.status === 'done')
                        .map(task => (
                            <Card key={task.id} task={task} onDragStart = {setDraggedTask}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}


export default Dashboard;