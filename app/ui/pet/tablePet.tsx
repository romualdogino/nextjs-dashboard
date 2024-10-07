'use client'
import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchPesquisaPets } from '@/app/lib/data-mongodb';
import { useState } from 'react';


export default function PesquisaPetTable({
    // funcao,
    // petAtivo: any;
    listaPet
}: {
    funcao: any
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
    console.log({ listaPet })
    return (
        <div key={0} className='flex w-full gap-2 absolute mt-32 bg-slate-300 rounded-lg'>
            {listaPet?.map((pet: { id: string, nome: string, tutorId: string }) => (
                <div key={pet.id} onClick={() => funcao(pet.id)} className="flex flex-col gap-0 bg-white rounded-lg shadow-md p-4 mb-4">
                    <h3 className="text-lg font-semibold">{pet.nome}</h3>
                    <p className="text-gray-600">Tutor: {pet.tutorId}</p>
                </div>
            ))}
        </div>
    );
}
