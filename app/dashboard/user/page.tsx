import { fetchInvoicesPages } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import { CreateUsuario } from '@/app/ui/user/buttons';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
// import CadastroUser from '@/app/ui/user/u ser';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Table from '@/app/ui/invoices/table';


export const metadata: Metadata = {
  title: 'Usuários',
};

export default async function Page() {

  return (
    
    <div className="w-full">
    <div className="flex w-full items-center justify-between">
      <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
    </div>
    <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      <Search placeholder="Search invoices..." />
      <CreateUsuario />
      {/* <CadastroUser /> */}
    </div>
   
      <Table />
  

  </div>
  )
}