"use server"

import { error } from "console"
import { SingUpInput, SingUpSchema } from "../schemas/authSchema"
import { success } from "zod"
import { authService } from "../services/AuthService"
import { da } from "zod/locales"

export async function signUpAction(input: SingUpInput){
    const data = SingUpSchema.safeParse(input)

    if(!data.success) {
        return {
            error: "Error en la validación de los datos",
            success: " "
        }
    }
    await authService.register(data.data)
}