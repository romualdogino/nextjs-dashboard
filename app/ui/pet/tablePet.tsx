'use client'
import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchPesquisaPets } from '@/app/lib/data-mongodb';
import { use, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function PesquisaPetTable({
    // funcao,
    // petAtivo: any;
    listaPet
}: {
    // funcao: any
    listaPet: any
}) {
    // console.log({  })
    // const listaPet = await fetchPesquisaPets(query, currentPage);

    // const [petAtivo, setPetAtivo] = useState("");
    // const selecaoPet = (id: string) => {
    //     // setPetAtivo(id);
    //     selecaoPet;
    //     console.log(id);
    // };

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [petAtivo, setPetAtivo] = useState(localStorage.getItem('petAtivo') ? localStorage.getItem('petAtivo') : null);
    // console.log({ listaPet })
    const mudarPet = (id: string) => {
        localStorage.setItem('petAtivo', id)
        const params = new URLSearchParams(searchParams);
        // params.delete('query');
        params.set('query', '');
      replace(`${pathname}?${params.toString()}`);
 
        // setPetAtivo(localStorage.getItem('petAtivo'));
        // console.log(id);
    }

      

    useEffect(() => {
        setPetAtivo(localStorage.getItem('petAtivo'));
    }, [listaPet])

    // if (petAtivo) {
    //     console.log({ petAtivo })
    //     return (
    //         <p>aqui</p>
    //     );
    // } else {
    //     console.log('nao tem')
    //     return (
    //         <div key={0} className='flex w-full gap-2 absolute mt-32 bg-slate-300 rounded-lg'>
    //             {listaPet?.map((pet: { id: string, nome: string, tutorId: string }) => (
    //                 <div key={pet.id} onClick={() => mudarPet(pet.id)} className="flex flex-col gap-0 bg-white rounded-lg shadow-md p-4 mb-4">
    //                     <h3 className="text-lg font-semibold">{pet.nome}</h3>
    //                     <p className="text-gray-600">Tutor: {pet.tutorId}</p>
    //                 </div>
    //             ))}
    //         </div>
    //     );
    // }
    return (
        <div key={0} className='flex w-full gap-2 absolute mt-32 bg-slate-300 rounded-lg'>
            {listaPet?.map((pet: { id: string, nome: string, tutorId: string }) => (
                <div key={pet.id} onClick={() => mudarPet(pet.id)} className="flex flex-col gap-0 bg-white rounded-lg shadow-md p-4 mb-4">
                    <h3 className="text-lg font-semibold">{pet.nome}</h3>
                    <p className="text-gray-600">Tutor: {pet.tutorId}</p>
                </div>
            ))}
        </div>
    );

}
