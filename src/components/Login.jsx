import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const LoginWrapper = styled.div`
  max-width: 400px;
  margin: 80px auto;
  padding: 40px;
  background: #f4f4f4;
  border-radius: 8px;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #1e90ff;
  color: white;
  border: none;
  cursor: pointer;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });
      alert(res.data.message);
      // Redirect or save login token here
    } catch (err) {
      alert(err.response.data.message || 'Login failed');
    }
  };

  return (
    <LoginWrapper>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </form>
    </LoginWrapper>
  );
};

export default Login;
