import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e)=> {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/account/login' , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      // console.log('HTTP Status:', response.status); 
      const data = await response.json();
      // console.log('Backend returned data:', data);

      if (response.ok) {
        setUsername('');
        setPassword('');
        
        navigate('/', { replace: true });

      } else {
        setMessage(data.error || 'Login failed');
      }
    } catch (error) {
      setMessage(error.message);
    }

  };

  return (
    
    <div className="bg-teal-light">
        <h1 className="text-primary">Login</h1>
        <form onSubmit={(handleSubmit)}>
          <input className="mb-lg" type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}  />
          <input className="mb-lg" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="btn btn-primary">Login</button>
        </form>

        {message && <p>{message}</p>}
    </div>
  
  );
}

export default Login;