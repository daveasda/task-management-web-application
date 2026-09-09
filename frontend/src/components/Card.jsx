import {useState, useEffect} from 'react';


function Card({task, onDragStart}) {

      
    return (
        <div className="card" draggable onDragStart = {() => onDragStart(task)}>
            <h2 className='text-teal'>{task.title}</h2>
            <p className='text-secondary'>{task.description}</p>
        </div>
    );
    
}

export default Card;