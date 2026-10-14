import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from './authStore.js';
import { apiClient } from '../../api/axios.js';
import './Login.css';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export default function Login() {
  const navigate = useNavigate();
  const loginAction = useAuthStore((state) => state.login);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setServerError('');
      const response = await apiClient.post('/auth/login', data);
      
      loginAction(response.data.user);
      navigate('/');
    } catch (err) {
      if (err.response?.data?.error) {
        setServerError(err.response.data.error);
      } else {
        setServerError('Network error or server is down.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>SPCKI Platform</h2>
        <p>Sign in to your account</p>
      </div>

      <div className="login-card">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          
          {serverError && (
            <div className="login-error-banner">
              <p>{serverError}</p>
            </div>
          )}

          <div className="form-group">
            <label>Username or Email</label>
            <input
              {...register('username')}
              type="text"
              autoComplete="username"
              className={errors.username ? 'input-error' : ''}
              disabled={isSubmitting}
            />
            {errors.username && (
              <p className="error-text">{errors.username.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              {...register('password')}
              type="password"
              autoComplete="current-password"
              className={errors.password ? 'input-error' : ''}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="login-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
