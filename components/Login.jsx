import clsx from "clsx";
import Link from "next/link";
/* import Image from "next/image";
import { images } from "../lib/images" */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { login } from "../services/auth"


const loginSchema = yup.object({
    user: yup
        .string()
        .required("Usuario requerido"),
    password: yup
        .string()
        .required("Contraseña requerida"),
}).required()

export default function Login( props ) {
    const [ messageError, setMessageError] = useState()
    const router = useRouter()


const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(loginSchema)
});

const onSubmit = data => submitLogin(data);

const submitLogin = async (data) => {
    try {
        setMessageError("")
        const { user, password} = data
        const response = await login(user, password) //  *listo* configurar aut login
        const dataJson = await response.json()

        if ( response.status === 200) {
            router.push(`/menu`) // crear pagina menu
            return
        }
        setMessageError("Ya existe un usuario con este correo")
    } catch ( error ) {
        console.log('Error', error)
        setMessageError("Ops ocurrió un error")
    }
}

const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
      };

return(
    <section className="w-screen flex justify-center content-center mt-20">
    <article className={clsx(
        "flex flex-col justify-center items-center mt-8 mb-8",
        "text-[16px] text-blue-700 leading-[20px] border-2 border-blue-200 rounded-[16px] shadow-md",
        "w-[350px] h-[450px]"
    )}>
        <div>
            <h2 className={clsx("font-montserrat font-bold text-[25px]")}>Bienvenidos</h2>
        </div>
        <form
                className={clsx("flex flex-col items-center mt-6")}
                onSubmit={handleSubmit(onSubmit)}
            >
                {messageError && (<h3 className="text-red-700 font-bold">Credenciales inválidas</h3>)}
                <ToastContainer />
                <div className={clsx("w-[100%] relative mb-1")}>
                    <div className={clsx("flex justify-between px-2.5 w-[100%] absolute top-1/4")}>
                        <p className={clsx(
                            "font-poppins font-medium text-[12px] leading-[18px]",
                            "w-[100%] text-blue-gray-700")}>
                                Usuario
                        </p>
                    </div>
                    <input
                        htmlFor="user"
                        name="user"
                        id="user"
                        type="text"
                        placeholder="Ingresa tu clave de usuario"
                        message="error"
                        className={clsx(
                            "text-blue-gray-400 font-poppins font-normal text-[15px] leading-[24px]",
                            "shadow mt-[12px] appearance-none border w-[300px] h-[56px]",
                            "rounded-lg pt-8 pb-4 px-3 text-gray-700",
                            "bg-[#F6F9FF] hover:border-blue-500 border-2",
                            "focus:outline-none focus:shadow-outline",
                        )}
                        {...register("user")}
                    />
                    <p>{errors?.email?.message}</p>
                </div>
                <div className={clsx("w-[100%] relative")}>
                    <div className={clsx("flex justify-between px-2.5 w-[100%] absolute top-1/4")}>
                        <p className={clsx(
                            "font-poppins font-medium text-[12px] leading-[18px]",
                            "w-[100%] text-blue-gray-700")}>
                            Contraseña
                        </p>
                        <p className={clsx(
                            "cursor-pointer",
                            "font-poppins font-normal text-[12px] text-end leading-[18px]",
                            "text-center text-blue-gray-400 w-[100%] underline underline-offset-3")}
                            onClick={togglePassword}>
                            Mostrar
                        </p>
                    </div>
                    <input
                        className={clsx(
                            "text-blue-gray-400 font-poppins font-normal text-[15px] leading-[24px]",
                            "shadow mt-[12px] appearance-none border w-[300px] h-[56px]",
                            "rounded-lg pt-8 pb-4 px-3 text-gray-700",
                            "bg-[#F6F9FF] hover:border-blue-500 border-2",
                            "focus:outline-none focus:shadow-outline")}
                        id="password"
                        name="password"
                        type={passwordShown ? "text" : "password"}
                        {...register("password")}
                    />
                    <p>{errors?.password?.message}</p>
                </div>
                <input
                    className={clsx("shadow-md border w-[120px] hover:w-[125px] h-7 hover:h-8 rounded-md mt-8 hover:mt-7 cursor-pointer bg-blue-500 text-gray-100 m-auto hover:border-x-white")}
                    type="submit"
                    value="Iniciar sesión"
                />
            </form>

    </article>
    </section>
    )}