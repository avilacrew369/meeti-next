import {  FormHTMLAttributes} from 'react'

type Props = FormHTMLAttributes<HTMLFormElement>

export default function Form(props: Props) {
  return (
    <form className="mt-10 space-y-3 p-5 shadow-2xl">
         {props.children}
    </form>

   
  )
}
