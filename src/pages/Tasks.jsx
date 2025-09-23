import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const Tasks = ({ goals, onAddTask }) => {
  const [showTaskForm, setShowTaskForm] = useState(false);

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h2>Todas las Tareas</h2>
        <button className="btn btn-primary" onClick={() => setShowTaskForm(true)}>
          <Plus size={16} /> Nueva Tarea
        </button>
      </div>

      {goals.map(goal => (
        <div key={goal.id} className="goal-section">
          <h3 className="goal-title">{goal.name}</h3>
          <div className="tasks-list">
            {goal.tasks?.map(task => (
              <div key={task.id} className="task-item">
                <ul
                  className="task-list" 
                  checked={task.completed} 
                  onChange={() => {}}
                />
                <div className={`task-text ${task.completed ? 'completed' : ''}`}>
                  {task.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {showTaskForm && (
        <TaskForm 
          onSave={(task) => {
            onAddTask(task);
            setShowTaskForm(false);
          }}
          onClose={() => setShowTaskForm(false)}
          goals={goals}
        />
      )}
    </div>
  );
};

const TaskForm = ({ onSave, onClose, goals }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goalId: goals[0]?.id || '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    priority: 'medium',
    selectedDays: []
  });
  
  const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  
  const toggleDay = (day) => {
    if (formData.selectedDays.includes(day)) {
      setFormData({
        ...formData,
        selectedDays: formData.selectedDays.filter(d => d !== day)
      });
    } else {
      setFormData({
        ...formData,
        selectedDays: [...formData.selectedDays, day]
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Nueva Tarea</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Descripción</label>
            <textarea 
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>Meta asociada</label>
            <select 
              value={formData.goalId}
              onChange={(e) => setFormData({...formData, goalId: e.target.value})}
              required
            >
              <option value="">Seleccionar meta</option>
              {goals.map(goal => (
                <option key={goal.id} value={goal.id}>{goal.name}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Fecha de inicio</label>
            <input 
              type="date" 
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Fecha límite</label>
            <input 
              type="date" 
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>Prioridad</label>
            <select 
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Días de repetición</label>
            <div className="days-selector">
              {daysOfWeek.map(day => (
                <div 
                  key={day}
                  className={`day-btn ${formData.selectedDays.includes(day) ? 'selected' : ''}`}
                  onClick={() => toggleDay(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Guardar Tarea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tasks;