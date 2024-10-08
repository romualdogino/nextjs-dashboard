
import { fetchPesquisaPets } from "@/app/lib/data-mongodb";
import AgServico from "@/app/ui/agenda/ag-servico";
import Agenda from "@/app/ui/agenda/agenda";
import { lusitana } from "@/app/ui/fonts";
import PesquisaPets from "@/app/ui/pesquisaPets";
import TablePet from "@/app/ui/pet/tablePet";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { useEffect } from "react";


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

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const listaPet = query ? await fetchPesquisaPets(query, currentPage) : []

  return (

    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Agenda</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      </div>
      <div className="flex w-full items-center justify-between">

        <PesquisaPets query={query} placeholder="Pesquisar por nome do pet" />

        <TablePet
          listaPet={listaPet}
        />
      </div>
      <Agenda />
    </div>
  )
}