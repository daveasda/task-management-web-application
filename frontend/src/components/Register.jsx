import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevents page reload

 
    
    try {
      const response = await fetch('http://localhost:3000/api/account/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      });

      const data = await response.json();
      console.log('Backend returned data:', data);
      // Store user ID
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userType', data.user.user_type);
      
      if (response.ok) {
        setMessage('Registration successful!');
        setUsername('');
        setPassword('');
        setEmail('');
        navigate(`/dashboard/${data.user.id}`, { replace: true });
        
      } else {
        setMessage((data.error));
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    
        <div className="auth-page">
          <div className="auth-container">

            <h1 className="text-primary">Register</h1>
            <form onSubmit={handleSubmit}>
                <input className="mb-lg" type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className="mb-lg" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className="mb-lg" type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                     
                <button className="btn btn-primary">Register</button>

            </form>
            {message && <p>{message}</p>}
          </div>
            
        </div>
    
  );
}

export default Register;