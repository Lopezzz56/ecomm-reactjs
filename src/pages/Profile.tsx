import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import type { RootState } from '../store';
    import Card2 from '../components/ui/Card2';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  image?: string;
  gender?: string;
}

const Profile = () => {
  const reduxUser = useSelector((state: RootState) => state.auth.user);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (reduxUser) {
      setUser(reduxUser);
    } else {
      const storedAuth = localStorage.getItem('auth');
      if (storedAuth) {
        const parsed = JSON.parse(storedAuth);
        setUser(parsed.user);
      }
    }
  }, [reduxUser]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to login page after logout
  };

  if (!user) return <p className="text-center text-gray-500">Loading user info...</p>;

  return (
    <div className="flex justify-center mt-10">
      <Card2 clickable={false} foregroundColor="#ffffff" className="w-full max-w-md p-6 text-center">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>

        {user.image && (
          <img
            src={user.image}
            alt={user.firstName}
            className="w-24 h-24 rounded-full mx-auto mb-6 border-2 border-gray-300"
          />
        )}

        <div className="text-left space-y-2 mb-6">
          <p className="text-lg font-semibold">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-gray-600">@{user.username}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
          {user.gender && (
            <p className="text-sm text-gray-400 capitalize">Gender: {user.gender}</p>
          )}
        </div>

        {/* 🚪 Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 w-full rounded-lg mt-6"
        >
          Logout
        </button>
      </Card2>
    </div>
  );
};

export default Profile;
