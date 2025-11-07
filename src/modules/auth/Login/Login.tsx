'use client';

import { useState, FormEvent } from 'react';
import styles from './Login.module.css';
import { LoginFormData, LoginFormErrors, LoginProps } from './dto/Login.types';

const LoginTemplate = ({ onSubmit, isLoading = false, onRegisterRedirect }: LoginProps) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Validación de formulario
  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};
    
    // Validación de email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido';
    }
    
    // Validación de password
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo de cambios en inputs
  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Limpiar mensaje de éxito
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  // Manejo del submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
        setSuccessMessage('¡Inicio de sesión exitoso!');
        // Limpiar formulario después del éxito
        setTimeout(() => {
          setFormData({ email: '', password: '' });
          setSuccessMessage('');
        }, 2000);
      } else {
        // Si no hay onSubmit, simular un login exitoso
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSuccessMessage('¡Inicio de sesión exitoso!');
        console.log('Login data:', formData);
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setErrors({ 
        email: 'Error al iniciar sesión. Verifica tus credenciales.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormLoading = isLoading || isSubmitting;

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
        <div className={styles.loginHeader}>
          <h1 className={styles.loginTitle}>Iniciar Sesión</h1>
          <p className={styles.loginSubtitle}>
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
        </div>

        {successMessage && (
          <div className={styles.successMessage}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {successMessage}
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`${styles.input} ${errors.email ? styles.error : ''}`}
            placeholder="tu@email.com"
            disabled={isFormLoading}
            autoComplete="email"
          />
          {errors.email && (
            <div className={styles.errorMessage}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.email}
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`${styles.input} ${errors.password ? styles.error : ''}`}
            placeholder="••••••••"
            disabled={isFormLoading}
            autoComplete="current-password"
          />
          {errors.password && (
            <div className={styles.errorMessage}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.password}
            </div>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isFormLoading}
        >
          {isFormLoading ? (
            <span className={styles.loading}>
              <span className={styles.spinner}></span>
              Iniciando sesión...
            </span>
          ) : (
            'Iniciar Sesión'
          )}
        </button>

        <div className={styles.loginFooter}>
          <div style={{ marginBottom: '1rem' }}>
            <a href="#" className={styles.link}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          
          <div>
            <span style={{ color: 'var(--foreground)', opacity: 0.8, fontSize: '0.9rem' }}>
              ¿No tienes una cuenta?{' '}
            </span>
            <button
              type="button"
              onClick={onRegisterRedirect || (() => window.location.href = '/register')}
              className={styles.registerButton}
              disabled={isFormLoading}
            >
              Regístrate aquí
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginTemplate;