import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
const LoginContainer = styled.div`
  max-width: 400px;
  margin: 150px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #f9f9f9;
  font-family: 'Segoe UI', sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 25px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #bbb;
  border-radius: 6px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px;
  font-size: 16px;
  background-color: transparent;
  color: black;
  border: 1px solid black;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: black;
    color:white;
  }
`;

const Message = styled.p`
  margin-top: 10px;
  text-align: center;
  color: ${props => props.success ? 'green' : 'red'};
`;

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://product-expiry-alert-system-ch0e.onrender.com/api/login', { email, password });
      setIsAuthenticated(true);
      setSuccess(true);
      setMsg('Login successful');
    } catch (err) {
      setSuccess(false);
      setMsg(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <LoginContainer>
      <Title>Login</Title>
      <Form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
      </Form>
      {msg && <Message success={success}>{msg}</Message>}
    </LoginContainer>
  );
};

export default Login;
