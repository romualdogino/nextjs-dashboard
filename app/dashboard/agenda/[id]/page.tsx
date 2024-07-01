import { fetchAgendaUser, fetchPet } from "@/app/lib/data-mongodb";
import AgServico from "@/app/ui/agenda/ag-servico";
import Agenda from "@/app/ui/agenda/agenda";
import { lusitana } from "@/app/ui/fonts";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Agenda',
};

export default async function Page({ params }: { params: { id: string } }) {
    // const users = await fetchFilteredUser();
    // const session = await auth()
    // const userS = session?.user
    const pet = await fetchPet(params.id)

    // console.log(session)
    // console.log({pet})
   
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Agenda</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            </div>
           
            <Agenda pet={pet} />
        </div>)
        
}