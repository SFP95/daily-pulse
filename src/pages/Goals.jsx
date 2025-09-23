import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Target, Calendar, Award, CheckCircle, Circle } from 'lucide-react';

const Goals = ({ goals, onAddGoal, onEditGoal, onDeleteGoal, onUpdateGoalProgress }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  // Actualizar progreso inmediatamente cuando se cambia un check
  const handleTaskToggle = (goalId, taskId, completed) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal || !goal.tasks) return;

    const updatedTasks = goal.tasks.map(task =>
      task.id === taskId ? { ...task, completed } : task
    );

    // Calcular nuevo progreso inmediatamente
    const completedTasks = updatedTasks.filter(task => task.completed).length;
    const newProgress = goal.tasks.length > 0 
      ? Math.round((completedTasks / goal.tasks.length) * 100) 
      : 0;

    // Actualizar el progreso en el estado padre
    onUpdateGoalProgress(goalId, newProgress, updatedTasks);
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setShowGoalForm(true);
  };

  const handleSaveGoal = (goalData) => {
    if (editingGoal) {
      onEditGoal({ ...editingGoal, ...goalData });
    } else {
      onAddGoal({
        ...goalData,
        id: Date.now().toString(),
        progress: 0,
        tasks: goalData.tasks || [],
        createdAt: new Date().toISOString()
      });
    }
    setShowGoalForm(false);
    setEditingGoal(null);
  };

  return (
    <div className="goals-container">
      <div className="goals-header">
        <h2><Target size={24} /> Mis Metas</h2>
        <button className="btn btn-primary" onClick={() => setShowGoalForm(true)}>
          <Plus size={16} /> Nueva Meta
        </button>
      </div>

      {goals.length === 0 ? (
        <div className="empty-state">
          <Target size={48} />
          <p>No tienes metas aún. Crea una para comenzar.</p>
        </div>
      ) : (
        <div className="goals-list">
          {goals.map(goal => (
            <div key={goal.id} className="goal-card">
              <div className="goal-header">
                <h3 className="goal-title">{goal.name}</h3>
                <span className={`goal-progress ${goal.progress === 100 ? 'completed' : ''}`}>
                  {goal.progress}%
                </span>
              </div>
              <div className="goal-dates">
                <Calendar size={14} />
                {new Date(goal.startDate).toLocaleDateString()} - {new Date(goal.endDate).toLocaleDateString()}
              </div>
              <div className="progress-bar">
                <div 
                  className={`progress-fill ${goal.progress === 100 ? 'completed' : ''}`}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              
              {/* Mostrar tareas SIEMPRE (sin necesidad de click) */}
              {goal.tasks && goal.tasks.length > 0 && (
                <div className="goal-tasks">
                  <h4>Tareas:</h4>
                  {goal.tasks.map(task => (
                    <div key={task.id} className="task-item">
                      <button
                        className={`task-checkbox ${task.completed ? 'completed' : ''}`}
                        onClick={() => handleTaskToggle(goal.id, task.id, !task.completed)}
                      >
                        {task.completed ? <CheckCircle size={16} /> : <Circle size={16} />}
                      </button>
                      <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                        {task.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="goal-actions">
                <button 
                  className="btn btn-edit" 
                  onClick={() => handleEdit(goal)}
                >
                  <Edit size={16} /> Editar
                </button>
                <button 
                  className="btn btn-delete" 
                  onClick={() => setShowDeleteConfirm(goal.id)}
                >
                  <Trash2 size={16} /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-icon warning">
              <Trash2 size={32} />
            </div>
            <h3>Confirmar eliminación</h3>
            <p>¿Estás seguro de que quieres eliminar esta meta? Esta acción no se puede deshacer.</p>
            <div className="modal-actions2">
              <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(null)}>
                Cancelar
              </button>
              <button 
                className="btn btn-danger2" 
                onClick={() => { onDeleteGoal(showDeleteConfirm); setShowDeleteConfirm(null); }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {showGoalForm && (
        <GoalForm 
          goal={editingGoal}
          onSave={handleSaveGoal}
          onClose={() => {
            setShowGoalForm(false);
            setEditingGoal(null);
          }}
        />
      )}
    </div>
  );
};

const GoalForm = ({ goal, onSave, onClose }) => {
  const [formData, setFormData] = useState(
    goal || {
      name: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      tasks: []
    }
  );
  const [errors, setErrors] = useState({});
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      
      if (end <= start) {
        setErrors(prev => ({...prev, endDate: 'La fecha final debe ser posterior a la inicial'}));
      } else {
        setErrors(prev => ({...prev, endDate: ''}));
      }
    }
  }, [formData.startDate, formData.endDate]);

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false
      };
      setFormData({
        ...formData,
        tasks: [...(formData.tasks || []), task]
      });
      setNewTask('');
    }
  };

  const removeTask = (taskId) => {
    setFormData({
      ...formData,
      tasks: formData.tasks.filter(task => task.id !== taskId)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.startDate) newErrors.startDate = 'La fecha de inicio es requerida';
    if (!formData.endDate) newErrors.endDate = 'La fecha final es requerida';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (errors.endDate) {
      return;
    }

    onSave(formData);
  };

  const getMinEndDate = () => {
    if (!formData.startDate) return '';
    const nextDay = new Date(formData.startDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split('T')[0];
  };

  return (
    <div className="modal-overlay">
      <div className="modal goal-form-modal">
        <div className="modal-header">
          <div className="modal-icon">
            <Award size={24} />
          </div>
          <h3>{goal ? 'Editar Meta' : 'Nueva Meta'}</h3>
          <button className="modal-close" onClick={onClose}>X</button>
        </div>
        
        <form onSubmit={handleSubmit} className="goal-form">
          <div className="form-group">
            <label>Nombre de la meta *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({...formData, name: e.target.value});
                if (errors.name) setErrors({...errors, name: ''});
              }}
              className={errors.name ? 'error' : ''}
              placeholder="Ej: Ahorrar para vacaciones"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Fecha de inicio *</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className={errors.startDate ? 'error' : ''}
              />
              {errors.startDate && <span className="error-message">{errors.startDate}</span>}
            </div>
            
            <div className="form-group">
              <label>Fecha de finalización *</label>
              <input
                type="date"
                value={formData.endDate}
                min={getMinEndDate()}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                className={errors.endDate ? 'error' : ''}
              />
              {errors.endDate && <span className="error-message">{errors.endDate}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Tareas</label>
            <div className="task-input-group">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Añadir una tarea..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTask())}
              />
              <button type="button" className="btn btn-small" onClick={addTask}>
                Añadir
              </button>
            </div>
            
            {formData.tasks && formData.tasks.length > 0 && (
              <div className="form-tasks-list">
                {formData.tasks.map(task => (
                  <div key={task.id} className="form-task-item">
                    <span>{task.text}</span>
                    <button 
                      type="button" 
                      className="btn btn-small btn-danger"
                      onClick={() => removeTask(task.id)}
                    >
                    X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary2">
              {goal ? 'Actualizar' : 'Crear'} Meta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Goals;