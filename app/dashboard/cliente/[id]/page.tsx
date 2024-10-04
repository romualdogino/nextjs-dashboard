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
// import { fetchCliente } from '@/app/lib/data-mongodb';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { useParams } from 'next/navigation';
import ViewCliente from '@/app/ui/cliente/view';
import { fetchCliente, fetchFilteredPets } from '@/app/lib/data-mongodb';
import AddPet from '@/app/ui/cliente/add-pet';

export const metadata: Metadata = {
    title: 'Cliente',
};

export default async function Page({ params }: { params: { id: string } }) {
    const pets = await fetchFilteredPets(params.id);
    const cliente = await fetchCliente(params.id);

    // console.log(params.id)
    return (

        <div className="w-full">
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Breadcrumbs
                    breadcrumbs={[
                        { label: 'Cliente', href: '/dashboard/cliente' },
                        {
                            label: 'View',
                            href: '/dashboard/cliente',
                            active: true,
                        },
                    ]}
                />
                {/* 
                    <Search placeholder="Search invoices..." />
                    <CreateCliente /> *
                /}
                {/* <CadastroUser /> */}
            </div>
            {/* <div  className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}> {cliente?.name}</h1>
            </div>
            <div  className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}> {cliente?.email}</h1>
            </div> */}
            <div>

                <AddPet cliente={cliente} params={{ id: params.id,  pets }} />
            </div>
            {/* <ClienteTable servicos={users} /> */}
            {/* <ViewCliente cliente={cliente} /> */}
        </div>
    )
}