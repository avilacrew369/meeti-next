import z from "zod";

export const CommunitySchema = z.object({
        name: z.string()
                .min(3, {error: 'El Titulo de la Comunidad es Obligatorio'}),

        description: z.string()
                .min(10, {error: 'La Descripción es obligatoria'}),
                
        image: z.url({
                // allow http or https (was /^http?$/ which rejected https)
                protocol: /^https?$/,
                hostname: z.regexes.domain,
                error: 'Imagen es obligatoria'
                })
 
})

export type CommunityInput = z.infer<typeof CommunitySchema>