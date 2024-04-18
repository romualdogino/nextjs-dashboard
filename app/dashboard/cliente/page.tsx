import { fetchInvoicesPages } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import { CreateCliente } from '@/app/ui/cliente/buttons';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
// import CadastroUser from '@/app/ui/user/u ser';
import { Metadata } from 'next';
import { Suspense } from 'react';
import ClienteTable from '@/app/ui/cliente/tabela';
import { fetchFilteredCliente } from '@/app/lib/data-mongodb';


export const metadata: Metadata = {
  title: 'Cliente',
};

export default async function Page() {
  const users = await fetchFilteredCliente();
  return (

    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Cliente</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateCliente />
        {/* <CadastroUser /> */}
      </div>
      <ClienteTable servicos={users} />
    </div>
  )
}