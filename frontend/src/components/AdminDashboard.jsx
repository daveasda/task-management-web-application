import {useState, useEffect} from 'react';
import Card from './Card';
import Input from './Input';

function AdminDashboard() {
    const [message, setMessage] = useState('');
    const [admin, setAdmin] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [tasks, setTasks] = useState([]);
    const [draggedTask, setDraggedTask] = useState(null);


    const userId = localStorage.getItem('userId')

    const handleTaskCreated = (newTask) => {
        const updatedTasks = [...tasks, newTask]
        setTasks(updatedTasks);
    };
    
    const fetchNormalUsers = async () => {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/account/users`
        );

        const data = await response.json();

        setUsers(data.users);
    };

    const fetchTasks = async (selectedId) => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/task/user/${selectedId}`);
            const data = await response.json();

            setTasks(data.task);
        };

    const handleDrop = async (newStatus) => {

        if (!draggedTask) {
            return;
        }

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/task/${draggedTask.id}/status`,
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

        const fetchAdmin = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/account/dashboard/${userId}`);
            const data = await response.json();
            setAdmin(data.user);
            // console.log('Fetched user data:', data.user);
        };
        
        fetchAdmin();
        fetchNormalUsers();
        }, 
        [userId]); 

    return (
        <div className="bg-teal-light">
            <h1 className="text-dark-teal  center-text">ADMIN DASHBOARD</h1>
            <p className="text-primary center-text">Welcome to the Dashboard!</p>
            {admin && (
                <div className='text-secondary center-text'>
                    <p>Username: {admin.username}</p>
                    <p>Email: {admin.email}</p>
                    <p>User Type: {admin.user_type}</p>
                    <p>Created Time: {admin.created_at}</p>
                </div>
            )}
            {message && <p>{message}</p>}

            <div>
                
                <select 
                    value={selectedUserId} 
                    onChange={(e) => {
                        const selectedId = e.target.value;
                        setSelectedUserId(selectedId);

                        if (selectedId) {
                            fetchTasks(selectedId);
                        }
                    }} >
                    <option value="">-- Select User --</option>

                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.username}
                        </option>
                    ))}
                </select>
            </div>


            <div className= "kanban-board">
                <div className="kanban-column">
                    <h2>Unassigned</h2>
                    <Input status="unassigned"/>
                    {tasks
                        .filter(task => task.status === 'unassigned')
                        .map(task => (
                            <Card key={task.id} task={task} onDragStart={setDraggedTask} />
                        ))
                    }
                </div>

                <div className="kanban-column" onDragOver={(e) => e.preventDefault()}  onDrop={() => handleDrop('todo')}>
                    <h2>To Do</h2>
                    <Input status="todo" onTaskCreated={handleTaskCreated} />
                    {tasks
                        .filter(task => task.status === 'todo')
                        .map(task => (
                            <Card key={task.id} task={task} onDragStart = {setDraggedTask}/>
                        ))
                    }
                </div>

                <div className="kanban-column" onDragOver={(e) => e.preventDefault()}  onDrop={() => handleDrop('doing')}>
                    <h2>Doing</h2>
                    <Input status="doing" onTaskCreated={handleTaskCreated} />
                    {tasks
                        .filter(task => task.status === 'doing')
                        .map(task => (
                            <Card key={task.id} task={task} onDragStart = {setDraggedTask} />
                        ))
                    }
                </div>

                <div className="kanban-column" onDragOver={(e) => e.preventDefault()}  onDrop={() => handleDrop('done')} >
                       
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


export default AdminDashboard;