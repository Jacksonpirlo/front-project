'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginTemplate from '@/modules/auth/Login/Login';
import { handleLogin } from '@/modules/auth/Login/services';
import { LoginFormData } from '@/modules/auth/Login/dto/Login.types';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLoginSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await handleLogin(data);
      // Aquí puedes redirigir al dashboard
      console.log('Login exitoso!', data);
      alert('¡Login exitoso! Revisa la consola para ver los datos.');
    } catch (error) {
      console.error('Error en login:', error);
      // El error se maneja automáticamente en el componente
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    router.push('/register');
  };

  return (
    <LoginTemplate 
      onSubmit={handleLoginSubmit}
      isLoading={isLoading}
      onRegisterRedirect={handleRegisterRedirect}
    />
  );
}