import { fetchAgendaUser } from "@/app/lib/data-mongodb";
import AbrirAgenda from "@/app/ui/user/abrirAgenda";
import { Metadata } from "next";
import { usePathname } from "next/navigation";

export const metadata: Metadata = {
    title: 'User',
};

export default async function Page({ params }: { params: { id: string } }) {
    let data = new Date()
    let mes = data.getMonth()+1
    let ano = data.getFullYear()
    // console.log(mes)
    const agenda = await fetchAgendaUser(params.id, mes, ano );
    // const cliente = await fetchCliente(params.id);

    // console.log(params.id)
    console.log({agenda})
    return (

        <div className="w-full">
            Olá, {params.id}
            <AbrirAgenda diasDoMes={agenda} />
        </div>
    )
}