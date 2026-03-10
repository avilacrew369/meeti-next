import { auth } from "@/src/lib/auth"
import { SingUpInput } from "../schemas/authSchema"
import { APIError } from "better-auth"
import { authRepository, IAauthRepository } from "./AuthRepository"

class AuthService {

    constructor(
        private authRepository : IAauthRepository
    ){}

    async register(credentials: SingUpInput) {

        // Implementation for user registration
        const { name, email, password } = credentials
        
        // Existe usuario con ese email
       const user =await this.authRepository.userExists(email)
         if(user) {
            return {
                error: "El email ya está registrado",
                success: " "
            }

         }
        // await Validacion de negocio

        // Manejar el registro del usuario
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password
            }
        })
     return {
        error: '',
        success: "Usuario registrado exitosamente"
     }
    }
}

export const authService = new AuthService(authRepository)