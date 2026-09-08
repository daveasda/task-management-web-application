import React from 'react';
import {Link} from 'react-router-dom';

function Home() {

    return(
        <div className="bg-teal-light" >
            <h1 className="text-primary">Welcome to the Task Management Application</h1>
            <p className="text-secondary">Please login or register to continue.</p>
            <Link to="/login">
                <button className="btn btn-primary">Login</button>                
            </Link>
            <Link to="/register">
                <button className="btn btn-secondary">Register</button>
            </Link>
        </div>

    );
}

export default Home;