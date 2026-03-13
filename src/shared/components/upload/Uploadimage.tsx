import { useState } from 'react'
import { UploadDropzone } from '@/shared/utils/uploadthings'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { useFormContext } from 'react-hook-form'
import { CommunityInput } from '@/src/features/Communities/schemas/communitySchema'
import { FormError } from '../forms'

export default function Uploadimage() {

    const {formState: {errors}, setValue} = useFormContext<CommunityInput>()

    const [uploadedImage, setUploadedImage] = useState('')

    return (
        <>
            <UploadDropzone
                endpoint={'meetiUploader'}
                className=" ut-button:bg-orange-400 font-black hover:ut-button:bg-orange-500"
                onClientUploadComplete={(res) => {
                    setUploadedImage(res[0].ufsUrl)
                    setValue('image', res[0].ufsUrl, {shouldValidate: true})
                }}
              
                
                appearance={{
                    button: "w-full rounded-none py-3 after:bg-orange-300 after:h-2 after:top-0",
                    label: "text-sm text-gray-600 ",
                    allowedContent: "text-sm"
                    
                }}
                content={{
                    button: 'Selecciona una Imagen',
                    label: 'Elige un archivo o arrastralo aqui',
                    allowedContent: 'Maximo 1 imagen de 1MB'

                }}
                config={{
                    cn: twMerge,
                    mode: 'auto'
                }}
            />

            {errors.image && <FormError>{errors.image.message}</FormError>}

            {uploadedImage && (
                <>
                    <p className="text-lg font-bold">Image Nueva</p>
                    <Image
                        src={uploadedImage}
                        alt="Imagen"
                        width={300}
                        height={200}
                        className="w-[300px] h-auto"
                    />
                </>
            )}
        </>
    )
}
