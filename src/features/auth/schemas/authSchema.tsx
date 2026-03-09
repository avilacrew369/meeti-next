import z from 'zod'

export const BaseAuthSchema = z.object({
    name: z.string().trim().min(1, {error:  'El nombre es Obligatorio'}),
    email: z.email( {error:  'E-email no es válido'}),
    password: z.string().trim().min(8, {error: 'La contraseña debe tener al menos 8 caracteres'}),
    passwordConfirmation: z.string().trim().min(1, {error: 'La confirmación de contraseña es Obligatoria'}),
 
})

export const SingUpSchema = BaseAuthSchema.pick({
    name: true, 
    email: true, 
    password: true, 
    passwordConfirmation: true
}).refine((data) => data.password === data.passwordConfirmation, {
    error: 'Los passwords no coinciden',
    path: ['passwordConfirmation']
})
    
export type SingUpInput = z.infer<typeof SingUpSchema>