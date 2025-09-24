//import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = ({ goals, currentDate, setCurrentDate }) => {
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
  const days = [];
  
  // Días vacíos al inicio (empezando desde lunes)
  for (let i = 0; i < adjustedFirstDay; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
  }
  
  // Días del mes
  for (let i = 1; i <= daysInMonth; i++) {
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    
    // Verificar si este día tiene tareas pendientes (no completadas)
    const hasPendingTasks = goals.some(goal => 
      goal.tasks && goal.tasks.some(task => {
               return !task.completed;
      })
    );
    
    const isToday = dayDate.toDateString() === new Date().toDateString();
    
    days.push(
      <div key={i} className={`calendar-cell ${isToday ? 'today' : ''} ${hasPendingTasks ? 'has-tasks' : ''}`}>
        {i}
      </div>
    );
  }
  
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Obtener tareas pendientes para hoy (solo las no completadas)
  const getTodayTasks = () => {
    //const today = new Date().toDateString();
    const todayTasks = [];
    
    goals.forEach(goal => {
      if (goal.tasks) {
        goal.tasks.forEach(task => {
          if (!task.completed) {
            todayTasks.push({
              ...task,
              goalName: goal.name,
              goalId: goal.id
            });
          }
        });
      }
    });
    
    return todayTasks;
  };

  const todayTasks = getTodayTasks();
  
  return (
    <div className="calendar-container">
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={() => navigateMonth(-1)}><ChevronLeft size={20} /></button>
          <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
          <button onClick={() => navigateMonth(1)}><ChevronRight size={20} /></button>
        </div>
        
        <div className="calendar-grid">
          {/* Semana empezando en Lunes */}
          {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(day => (
            <div key={day} className="calendar-weekday">{day}</div>
          ))}
          {days}
        </div>
      </div>
      
      <div className="tasks-for-day">
        <h3>Tareas para hoy</h3>
        {todayTasks.length === 0 ? (
          <p className="no-tasks">No hay tareas pendientes para hoy</p>
        ) : (
          todayTasks.slice(0, 10).map((task, index) => (
            <div key={`${task.goalId}-${task.id}-${index}`} className="task-item">
              <div className="task-indicator pending"></div>
              <div className="task-text">
                {task.text} <span className="goal-name">({task.goalName})</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Calendar;