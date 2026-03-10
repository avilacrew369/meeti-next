import z from 'zod'

export const BaseAuthSchema = z.object({
    name: z.string().trim().min(1, {error:  'El nombre es Obligatorio'}),
    email: z.email( {error:  'E-email no es válido'}),
    password: z.string().trim().min(8, {error: 'La contraseña debe tener al menos 8 caracteres'}),
    passwordConfirmation: z.string().trim().min(1, {error: 'La confirmación de contraseña es Obligatoria'}),
 
})
export const SignInSchema = BaseAuthSchema.pick({
    email: true,
}).extend({
    password:z.string().trim().min(1, {error: 'El password no puede ir vacio'}),
})
export const SignUpSchema = BaseAuthSchema.pick({
    name: true, 
    email: true, 
    password: true, 
    passwordConfirmation: true
}).refine((data) => data.password === data.passwordConfirmation, {
    error: 'Los passwords no coinciden',
    path: ['passwordConfirmation']
})
    
export type SignUpInput = z.infer<typeof SignUpSchema>
export type SignInInput = z.infer<typeof SignInSchema>
