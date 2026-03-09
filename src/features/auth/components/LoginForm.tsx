"use client";

import Form from "@/src/shared/components/forms/Form";


export default function LoginForm() {
  return (
    <Form>
    <label  className="block" htmlFor="email">E-mail</label>
    <input type="email"
            id="email"
            placeholder="Ingresa tu E-mail"
            className="border border-slate-200 w-full p-2"
            />
    <label  className="block" htmlFor="password">Contraseña</label>
    <input type="password"
            id="password"
            placeholder="Ingresa tu Contraseña"
            className="border border-slate-200 w-full p-2"
            />
    </Form>
  )
}
