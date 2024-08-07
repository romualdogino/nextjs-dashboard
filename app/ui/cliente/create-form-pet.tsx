'use client';
import Link from "next/link";
import { Button } from "../button";
import { CheckIcon, CurrencyDollarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { ClockIcon } from "@heroicons/react/20/solid";
import { useFormState } from "react-dom";
import { createInvoice } from "@/app/lib/actions";
import { createPet } from "@/app/lib/data-mongodb";

export default function FormPet(props: any) {
    // console.log({form: props})
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(createPet, initialState);
    return (
        < div className='grid grid-flow-col' >
            <form action={dispatch} method="post">
                <div className="rounded-md bg-gray-50 p-4 md:p-6">
                    {/* Customer Name */}
                    Cadastro do PET
                    <div className="mb-4">
                        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                            cliente
                        </label>
                        <div className="relative">
                            <input
                                id="cliente"
                                name="cliente"
                                type="text"
                                placeholder={props.idCliente}
                                value={props.idCliente}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                // disabled
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                            Nome
                        </label>
                        <div className="relative">
                            <input
                                id="nome"
                                name="nome"
                                type="text"
                                placeholder="nome"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                            especie do pet
                        </label>
                        <div className="relative">
                            <select
                                id="tipo"
                                name="tipo"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            >
                                <option value="">selecione a espécie</option>
                                <option value="cao">cão</option>
                                <option value="gato">gato</option>

                            </select>
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <Link
                        href="/dashboard/invoices"
                        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                        Cancel
                    </Link>
                    <Button type="submit">Criar Pet</Button>
                </div>
            </form>
        </div >
    )
}