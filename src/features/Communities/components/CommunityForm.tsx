
import { FormError, FormInput, FormLabel, FormTextarea } from "@/src/shared/components/forms";
import { useFormContext } from "react-hook-form";
import { CommunityInput } from "../schemas/communitySchema";
import Uploadimage from "@/src/shared/components/upload/Uploadimage";

export default function CommunityForm() {

    const { register, formState: {errors} } = useFormContext<CommunityInput>()
  return (
    <>
    <FormLabel htmlFor="name">Nombre Comunidad</FormLabel>
    <FormInput
        id="name"
        type="text"
        placeholder="Titulo Comunidad"
    {...register('name')}
    />
    {errors.name && <FormError>{errors.name.message}</FormError>}

    <FormLabel>Imagen Comunidad</FormLabel>
    
    <Uploadimage />



    <FormLabel htmlFor="description">Descripcion Comunidad</FormLabel>
    <FormTextarea
        id="description"
        placeholder="Descripcion Comunidad"
        {...register('description')}
    />
    {errors.description && <FormError>{errors.description.message}</FormError>}


    </>
  )
}
