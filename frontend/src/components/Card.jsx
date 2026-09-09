import {useState, useEffect} from 'react';


function Card({task, onDragStart}) {

      
    return (
        <div className="card" draggable onDragStart = {() => onDragStart(task)}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
        </div>
    );
    
}

export default Card;