"use client";

import {Form, FormInput,  FormLabel, FormSubmit} from '@/components/forms'


export default function LoginForm() {
  return (
    <Form >
      <FormLabel htmlFor="mail"> E-mail</FormLabel>
      <FormInput
        type="email"
        id="email"
        placeholder="Ingresa tu E-mail"
      />


      <FormLabel htmlFor="password"> Password</FormLabel>
      <FormInput
        type="password"
        id="password"
        placeholder="Ingresa tu Password"
      />
      <FormSubmit value="Iniciar Sesión"/>
    </Form>
  )
}
