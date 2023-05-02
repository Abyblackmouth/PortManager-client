import Link from "next/link"
import clsx from "clsx"

export default function MenuModules(){
    return(
        <>
        <section className="flex h-[400px] w-full justify-center items-center gap-10">
            <Link href="">
            <div className={clsx(
                "w-[250px] h-[100px] text-white",
                "bg-blue-800 rounded-lg justify-center items-center flex cursor-pointer",
                "hover:bg-sky-500 hover:w-[255px], hover:h-[110px]"
            )}> Crear registro</div>
            </Link>
            <Link href="">
            <div className={clsx(
                "w-[250px] h-[100px] text-white",
                "bg-blue-800 rounded-lg justify-center items-center flex cursor-pointer",
                "hover:bg-sky-500 hover:w-[255px], hover:h-[110px]"
            )}> Informacion de usuario</div>
            </Link>
        </section>
        </>
    )
}