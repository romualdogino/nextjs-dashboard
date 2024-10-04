'use server'
import { fetchPesquisaPets } from "@/app/lib/data-mongodb";
import AgServico from "@/app/ui/agenda/ag-servico";
import Agenda from "@/app/ui/agenda/agenda";
import { lusitana } from "@/app/ui/fonts";
import PesquisaPets from "@/app/ui/pesquisaPets";
import TablePet from "@/app/ui/pet/tablePet";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Agenda',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  // const users = await fetchFilteredUser();
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const listaPet = await fetchPesquisaPets(query, currentPage);

  // console.log(petAtivo);
  const selecaoPet = (id: string) => {
    // setPetAtivo(id);
    console.log({pai:id});
  };


  return (

    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Agenda</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      </div>
      <div className="flex w-full items-center justify-between">
        <PesquisaPets placeholder="Pesquisar por nome do pet" />
        <TablePet
          // petAtivo={petAtivo} 
          listaPet={listaPet}
          funcao={selecaoPet}
        />
      </div>

      <Agenda />
    </div>
  )
}