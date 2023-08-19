import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './KanbanCard.css';
import userIcon from './images/user.png';
import dotsIcon from './images/dots.png';
import dotIcon from './images/dot.png';

const KanbanCard = ({ ticket, index }) => {
  const { id, title, tag } = ticket;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="kanban-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p>{id}</p> 
          <img src={userIcon} alt="User" className="user-icon" />
          <p className='title-width'>{title}</p>
          <div className='below'>
          <div className='dots'>
            <button className='threedot-button'>
          <img src={dotsIcon} alt='Dots' className='dots-icon'/> </button>
          </div>
          <div className='tag'>
            <button className='singleDot'>
            
          <p id='tag-feature'> <img src={dotIcon} alt='Dot' className='dot-icon'/> {tag.join(', ')}</p>
         
          
          </button>
          </div>
          </div>
          {/* <p>User: {userId}</p> */}
          {/* <p>Priority: {priority}</p> */}
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;

// const { id, title, tag, userId, priority } = ticket;
