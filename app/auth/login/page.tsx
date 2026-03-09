import LoginForm from "@/src/features/auth/components/LoginForm";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: generatePageTitle('Iniciar Sesión')
}

export default function LoginPage() {
  return (
    <>
     <Heading level={1}>Iniciar Sesión</Heading>

      <LoginForm />
    
    </>
  )
}