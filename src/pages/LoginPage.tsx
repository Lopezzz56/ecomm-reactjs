import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
