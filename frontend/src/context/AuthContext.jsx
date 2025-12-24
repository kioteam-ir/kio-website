// import { createContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login, register } from '../services/api'; 

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const navigate = useNavigate();

//   const handleLogin = async (credentials) => {
//     const res = await login(credentials);
//     localStorage.setItem('token', res.token);
//     setToken(res.token);
//     setUser(res.user);
//     navigate('/dashboard');
//   };

//   // مشابه برای register و logout

//   return (
//     <AuthContext.Provider value={{ user, token, handleLogin, /* ... */ }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;