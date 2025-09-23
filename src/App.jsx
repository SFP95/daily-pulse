import React, { useState, useEffect } from 'react';
import Goals from './pages/Goals';
import Calendar from './pages/Calendar';
import Tasks from './pages/Tasks';
import Profile from './pages/Profile';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';
import { Target, Calendar as CalendarIcon, Plus, User } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { loginUser, registerUser, logoutUser } from './services/authService';

const App = () => {
  const [currentView, setCurrentView] = useState('goals');
  const [goals, setGoals] = useState([]);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Estados de autenticación
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [authError, setAuthError] = useState('');

  // Observador de estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Cargar datos iniciales
  useEffect(() => {
    const sampleGoals = [
      {
        id: 1,
        name: 'Aprender React Native',
        progress: 30,
        startDate: '2023-05-01',
        endDate: '2023-08-01',
        tasks: [
          { id: 1, text: 'Instalar entorno de desarrollo', completed: true },
          { id: 2, text: 'Aprender componentes básicos', completed: true },
          { id: 3, text: 'Practicar con hooks', completed: false },
          { id: 4, text: 'Crear primera app', completed: false },
        ]
      },
      {
        id: 2,
        name: 'Hacer ejercicio regularmente',
        progress: 60,
        startDate: '2023-06-01',
        endDate: '2023-12-01',
        tasks: [
          { id: 1, text: 'Correr 3 veces por semana', completed: true },
          { id: 2, text: 'Hacer 50 flexiones diarias', completed: true },
          { id: 3, text: 'Perder 5 kg', completed: false },
        ]
      }
    ];
    setGoals(sampleGoals);
  }, []);

  // Funciones de autenticación
  const handleLogin = async (email, password) => {
    try {
      setAuthError('');
      await loginUser(email, password);
      setShowLogin(false);
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const handleRegister = async (email, password, name) => {
    try {
      setAuthError('');
      await registerUser(email, password, name);
      setShowRegister(false);
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleToggleLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  // Funciones de metas
  const addGoal = (goalData) => {
    const newGoal = {
      ...goalData,
      id: Date.now(),
      progress: 0,
      tasks: []
    };
    setGoals([...goals, newGoal]);
  };

  const editGoal = (updatedGoal) => {
    setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
  };

  const deleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const addTask = (taskData) => {
    console.log('Tarea agregada:', taskData);
  };

  const toggleTask = (goalId, taskId) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedTasks = goal.tasks.map(task => 
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        
        const completedCount = updatedTasks.filter(t => t.completed).length;
        const progress = Math.round((completedCount / updatedTasks.length) * 100);
        
        return { ...goal, tasks: updatedTasks, progress };
      }
      return goal;
    }));
  };

  const handleUpdateGoalProgress = (goalId, newProgress, updatedTasks) => {
    setGoals(prevGoals => 
      prevGoals.map(goal => 
        goal.id === goalId 
          ? { ...goal, progress: newProgress, tasks: updatedTasks }
          : goal
      )
    );
  };

  const renderView = () => {
    if (loading) {
      return <div className="loading">Cargando...</div>;
    }

    switch(currentView) {
      case 'goals':
        return <Goals 
          goals={goals} 
          onAddGoal={addGoal}
          onEditGoal={editGoal}
          onDeleteGoal={deleteGoal}
          onSelectGoal={setSelectedGoalId}
          selectedGoalId={selectedGoalId}
          onUpdateGoalProgress={handleUpdateGoalProgress}
        />;
      case 'calendar':
        return <Calendar 
          goals={goals} 
          currentDate={currentDate} 
          setCurrentDate={setCurrentDate} 
        />;
      case 'tasks':
        return <Tasks 
          goals={goals} 
          onAddTask={addTask}
        />;
      case 'profile':
        return <Profile 
          goals={goals} 
          isLoggedIn={!!user}
          onToggleLogin={handleToggleLogin}
          onLogout={handleLogout}
          user={user}
        />;
      default:
        return <Goals 
          goals={goals} 
          onAddGoal={addGoal}
          onEditGoal={editGoal}
          onDeleteGoal={deleteGoal}
          onSelectGoal={setSelectedGoalId}
          selectedGoalId={selectedGoalId}
        />;
    }
  };

  return (
    <div className="mobile-container">
      <div className="header">
        <h1>Daily Pulse</h1>
      </div>

      <div className="content">
        {renderView()}
      </div>

      <div className="bottom-nav">
        <button 
          className={`nav-item ${currentView === 'goals' ? 'active' : ''}`} 
          onClick={() => setCurrentView('goals')}
        >
          <Target size={24} />
          <span>Metas</span>
        </button>
        <button 
          className={`nav-item ${currentView === 'calendar' ? 'active' : ''}`} 
          onClick={() => setCurrentView('calendar')}
        >
          <CalendarIcon size={24} />
          <span>Calendario</span>
        </button>
        <button 
          className={`nav-item ${currentView === 'tasks' ? 'active' : ''}`} 
          onClick={() => setCurrentView('tasks')}
        >
          <Plus size={24} />
          <span>Tareas</span>
        </button>
        <button 
          className={`nav-item ${currentView === 'profile' ? 'active' : ''}`} 
          onClick={() => setCurrentView('profile')}
        >
          <User size={24} />
          <span>Perfil</span>
        </button>
      </div>

      {selectedGoalId && (
        <TaskList 
          goal={selectedGoalId} 
          onClose={() => setSelectedGoalId(null)}
          onToggleTask={toggleTask}
        />
      )}

      {/* Modales de autenticación */}
      {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={handleSwitchToRegister}
          onLogin={handleLogin}
          error={authError}
        />
      )}

      {showRegister && (
        <Register 
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={handleSwitchToLogin}
          onRegister={handleRegister}
          error={authError}
        />
      )}
    </div>
  );
};

export default App;