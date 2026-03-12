import { FormError, FormInput, FormLabel, FormTextarea } from "@/src/shared/components/forms";
import { useFormContext } from "react-hook-form";
import { CommunityInput } from "../schemas/communitySchema";
import { UploadDropzone } from "@/src/shared/utils/uploadthings";
import { twMerge } from 'tailwind-merge'
import { useState } from "react";
import Image from "next/image";

export default function CommunityForm() {

    const [uploadedImage, setUploadedImage] = useState('')
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

    <UploadDropzone 
      endpoint={'meetiUploader'}
      className=" ut-button:bg-orange-500 font-black hover:ut-button:bg-orange-300 "
      onClientUploadComplete={(res) => {
        setUploadedImage(res[0].ufsUrl)
      }}
      appearance={{
        button: "w-full rounded-none py-3 after:bg-orange-500 after:h-2 after:top-0",
        label: "text-sm text-gray-600 ",
        allowedContent: "text-sm"
      }}
      content= {{
        button: 'Selecciona una Imagen',
        label: 'Elige un archivo o arrastralo aqui', 
        allowedContent: 'Maximo 1 imagen de 1MB'

      }}
      config={{
        cn: twMerge,
        mode: 'auto'
      }}

    />
    {uploadedImage && (
      <>
        <p className="text-lg font-bold">Image Nueva</p>
        <Image 
          src={uploadedImage}
          alt="Imagen "
          width={300}
          height={200}
          />
      </>
    )}

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
