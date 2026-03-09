import { SingUpInput } from "../schemas/authSchema"

class AuthService {

    async register(credentials: SingUpInput) {

        // Implementation for user registration
        const { name, email, password } = credentials
        
        // Here you would typically send a request to your backend API to create a new user
        // For example:
        // await apiClient.post('/register', { name, email, password })

        // user Exists
    }
}

export const authService = new AuthService()