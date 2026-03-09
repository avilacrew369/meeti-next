import z from 'zod'

export const BaseAuthSchema = z.object({
    name: z.string().min(1, {error:  'El nombre es Obligatorio'}),
    email: z.email( {error:  'E-email no es válido'}),
    password: z.string().min(8, {error: 'La contraseña debe tener al menos 8 caracteres'}),
    passwordConfirmation: z.string().min(1, {error: 'La confirmación de contraseña es Obligatoria'}),
 
})

export const SingUpSchema = BaseAuthSchema.pick({
    name: true, 
    email: true, 
    password: true, 
    passwordConfirmation: true
})
    