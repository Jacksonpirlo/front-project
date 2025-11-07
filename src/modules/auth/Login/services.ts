import axios from "axios";
import { LoginFormData } from "./dto/Login.types";

const url = "https://students-web-fb5f86739d1b.herokuapp.com/";
// Flag para modo desarrollo (simular login exitoso)
const isDevelopmentMode = true; // Cambia a false cuando tengas el backend correcto

interface LoginResponse {
    token: string;
    userId: string;
    user: {
        id: string;
        email: string;
        name?: string;
    };
}

// Función para simular login en desarrollo
const simulateLogin = async (loginData: LoginFormData): Promise<LoginResponse> => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular diferentes respuestas basadas en el email
    if (loginData.email === "admin@test.com" && loginData.password === "123456") {
        return {
            token: "fake-jwt-token-" + Date.now(),
            userId: "user-123",
            user: {
                id: "user-123",
                email: loginData.email,
                name: "Usuario Admin"
            }
        };
    } else if (loginData.email === "error@test.com") {
        throw new Error("Credenciales inválidas");
    } else {
        // Login genérico exitoso para cualquier otro email válido
        return {
            token: "fake-jwt-token-" + Date.now(),
            userId: "user-" + Date.now(),
            user: {
                id: "user-" + Date.now(),
                email: loginData.email,
                name: "Usuario de Prueba"
            }
        };
    }
};

export const loginService = async (loginData: LoginFormData): Promise<LoginResponse> => {
    console.log('🚀 Intentando login con:', { email: loginData.email, developmentMode: isDevelopmentMode });
    
    // Modo desarrollo - simular respuesta exitosa
    if (isDevelopmentMode) {
        console.log('🧪 Modo desarrollo activado - simulando login...');
        return await simulateLogin(loginData);
    }
    
    // Modo producción - conectar con servidor real
    try {
        const response = await axios.post(`${url}api/auth/login`, {
            email: loginData.email,
            password: loginData.password
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 10000 // 10 segundos timeout
        });
        
        console.log('✅ Login exitoso:', response.data);
        return response.data as LoginResponse;
    } catch (error) {
        console.error('❌ Error en login:', error);
        
        if (axios.isAxiosError(error)) {
            // Log detallado del error
            console.error('Error details:', {
                message: error.message,
                code: error.code,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
            });
            
            // Manejo más específico de errores
            const status = error.response?.status;
            if (status === 401) {
                throw new Error('Credenciales inválidas');
            } else if (status === 400) {
                throw new Error('Datos de login inválidos');
            } else if (status === 404) {
                throw new Error('Servicio no encontrado. Verifica la URL del API');
            } else if (status && status >= 500) {
                throw new Error('Error del servidor. Intenta más tarde');
            } else if (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK') {
                throw new Error('Error de red. Verifica tu conexión a internet');
            } else if (error.code === 'ECONNABORTED') {
                throw new Error('Tiempo de espera agotado. El servidor no responde');
            }
        }
        
        throw new Error('Error de conexión inesperado. Intenta nuevamente');
    }
};

// Función helper para manejar el login completo incluyendo almacenamiento local
export const handleLogin = async (loginData: LoginFormData): Promise<void> => {
    try {
        const response = await loginService(loginData);
        
        // Guardar el token en localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('userId', response.userId);
            localStorage.setItem('userEmail', response.user.email);
        }
        
        console.log('Login exitoso:', response.user);
        
        // Aquí puedes agregar redirección o actualización de estado global
        // Por ejemplo: router.push('/dashboard');
        
    } catch (error) {
        // Re-lanzar el error para que sea manejado por el componente
        throw error;
    }
};

// Función de prueba para verificar conectividad
export const testConnection = async (): Promise<boolean> => {
    try {
        console.log('🧪 Probando conexión al servidor...');
        const response = await axios.get(`${url}`, { timeout: 5000 });
        console.log('✅ Servidor responde:', response.status);
        return true;
    } catch (error) {
        console.error('❌ Error de conexión:', error);
        return false;
    }
};