// services/authService.js
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

// Función para login
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Función para registro
export const registerUser = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Actualizar perfil del usuario
    await updateProfile(userCredential.user, {
      displayName: name
    });

    // Crear documento de usuario en Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      name: name,
      email: email,
      createdAt: new Date(),
      goals: []
    });

    return userCredential.user;
  } catch (error) {
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Función para logout - CORREGIDA
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return true; // Éxito
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw new Error('Error al cerrar sesión: ' + error.message);
  }
};

// Función auxiliar para mensajes de error
const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Email inválido';
    case 'auth/user-disabled':
      return 'Usuario deshabilitado';
    case 'auth/user-not-found':
      return 'Usuario no encontrado';
    case 'auth/wrong-password':
      return 'Contraseña incorrecta';
    case 'auth/email-already-in-use':
      return 'El email ya está en uso';
    case 'auth/weak-password':
      return 'La contraseña debe tener al menos 6 caracteres';
    case 'auth/network-request-failed':
      return 'Error de conexión a internet';
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Intenta más tarde';
    case 'auth/operation-not-allowed':
      return 'Operación no permitida';
    default:
      return 'Error de autenticación. Intenta nuevamente';
  }
};

// También puedes exportar la función de mensajes de error si la necesitas en otros lugares
export { getAuthErrorMessage };