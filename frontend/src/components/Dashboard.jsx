import {useState, useEffect} from 'react';
import Card from './Card';
import Input from './Input';

function Dashboard() {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);

    const userId = localStorage.getItem('userId')


    useEffect(() => {
     
        
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:3000/api/account/dashboard/${userId}`);
            const data = await response.json();
            setUser(data.user);
            // console.log('Fetched user data:', data.user);
        };

        fetchUser();
        }, [userId]); 

    return (
        <div className="bg-teal-light">
            <h1 className="text-primary">Dashboard</h1>
            <p className="text-secondary">Welcome to the Dashboard!</p>
            <p> Here are your details:</p>
            {user && (
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>User Type: {user.user_type}</p>
                    <p>Created Time: {user.created_at}</p>
                </div>
            )}
            {message && <p>{message}</p>}

            <div className= "kanban-board">
                <div className="kanban-column">
                    <h2>Unassigned</h2>
                    <Input status="unassigned" />
                    <Card />
                    <Card />
                </div>

                <div className="kanban-column">
                    <h2>To Do</h2>
                    <Input status="todo" />
                    <Card />
                    <Card />
                </div>

                <div className="kanban-column">
                    <h2>Doing</h2>
                    <Input status="doing" />
                    <Card />
                    <Card />
                </div>

                <div className="kanban-column">
                    <h2>Done</h2>
                    <Input status="done" />
                    <Card />
                    <Card />
                </div>
            </div>
        </div>
    );
}


export default Dashboard;