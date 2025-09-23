import React from 'react';
import { X } from 'lucide-react';

const TaskList = ({ goal, onClose, onToggleTask }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{goal.name}</h3>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="goal-dates">
          {goal.startDate} - {goal.endDate}
        </div>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${goal.progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{goal.progress}% completado</span>
        </div>
        
        <h4>Tareas</h4>
        
        <div className="tasks-list">
          {goal.tasks.map(task => (
            <div key={task.id} className="task-item">
              <input 
                type="checkbox" 
                className="task-checkbox" 
                checked={task.completed}
                onChange={() => onToggleTask(goal.id, task.id)}
              />
              <div className={`task-text ${task.completed ? 'completed' : ''}`}>
                {task.text}
              </div>
            </div>
          ))}
        </div>
        
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;