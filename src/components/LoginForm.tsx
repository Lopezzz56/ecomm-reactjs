import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector((state: any) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ username, password }));

    // Redirect if login is successful
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/home');
    }
  };

  return (
    <div 
    // style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}
    >
      <form onSubmit={handleSubmit} 
className="w-full space-y-4"      >
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm"></p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
        className="w-full p-2 bg-black text-white rounded disabled:opacity-50"
           disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
