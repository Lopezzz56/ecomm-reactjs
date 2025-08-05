import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <LoginForm />
        
        {/*  Hint Container */}
        <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded text-sm">
          <p>Use the credentials below to log in:</p>
          <ul className="mt-2 ml-4 list-disc">
            <li><strong>Username:</strong> michaelw</li>
            <li><strong>Password:</strong> michaelwpass</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
