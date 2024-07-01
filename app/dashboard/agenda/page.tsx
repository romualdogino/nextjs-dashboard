import AgServico from "@/app/ui/agenda/ag-servico";
import Agenda from "@/app/ui/agenda/agenda";
import { lusitana } from "@/app/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Agenda',
};

export default async function Page() {
  // const users = await fetchFilteredUser();

  return (

    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Agenda</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      </div>
      
      <Agenda />
    </div>
  )
}