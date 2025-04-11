import { useState } from 'react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const handleRegisterUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(import.meta.env.VITE_BASE_URL);
    try {
      if (email && password) {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/auth/register`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData || 'Registration failed');
        }

        const data = await response.json();

        setEmail('');
        setPassword('');
        console.log(data);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error during registration:', err.message);
      } else {
        console.error('Unknown error:', err);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleRegisterUser}>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type={showPassword ? 'password' : 'text'}
          name="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prevState) => !prevState)}
        >
          show password
        </button>
        <button>sign in</button>
      </form>
    </div>
  );
};

export default Auth;
