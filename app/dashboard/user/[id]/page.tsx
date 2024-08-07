import { fetchAgendaUser, fetchUser } from "@/app/lib/data-mongodb";
import AbrirAgenda from "@/app/ui/user/abrirAgenda";
import { auth } from "@/auth";
import { Metadata } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const metadata: Metadata = {
    title: 'User',
};

export default async function Page({ params }: { params: { id: string } }) {
    const session = await auth()
    const userS = session?.user

    console.log(session)
    let data = new Date()
    let mes = data.getMonth() + 1
    let ano = data.getFullYear()
    // console.log(mes)
    const agenda = await fetchAgendaUser(params.id, mes, ano);
    var user 
    if (userS) {
        user = await fetchUser(userS.name);

    }

    // console.log(params.id)
    // console.log({agenda})
    return (
        <div className="w-full">
            Olá, <strong>{session?.user?.name}</strong> do email: {session?.user?.email}
            <Link href={params.id + '/agenda'} > <button> minha agenda </button> </Link><br />

            <AbrirAgenda diasDoMes={agenda} user={user} />
        </div>
    )
}