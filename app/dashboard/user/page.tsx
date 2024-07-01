import { fetchInvoicesPages } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import { CreateUsuario } from '@/app/ui/user/buttons';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
// import CadastroUser from '@/app/ui/user/u ser';
import { Metadata } from 'next';
import { Suspense } from 'react';
import UserTable from '@/app/ui/user/tabela';
import { fetchFilteredServicos, fetchFilteredUser } from '@/app/lib/data-mongodb';


export const metadata: Metadata = {
  title: 'Usuários',
};

export default async function Page() {
  const users = await fetchFilteredUser();
  return (
    
    <div className="w-full">
    <div className="flex w-full items-center justify-between">
      <h1 className={`${lusitana.className} text-2xl`}>Usuários</h1>
    </div>
    <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      <Search placeholder="Pesquisar Usuários..." />
      <CreateUsuario />
      {/* <CadastroUser /> */}
    </div>
   
      <UserTable servicos={users}/>
  
  </div>
  )
}