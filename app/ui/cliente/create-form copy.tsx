'use client';
import Link from "next/link";
import { Button } from "../button";
import { CheckIcon, CurrencyDollarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { ClockIcon } from "@heroicons/react/20/solid";
import { useFormState } from "react-dom";
import { createInvoice } from "@/app/lib/actions";
import { createCliente } from "@/app/lib/data-mongodb";

export default function Form(props: any) {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(createCliente, initialState);
    return (
        < div className='grid grid-flow-col h-screen' >
            <form action={dispatch} method="post">
                <div className="rounded-md bg-gray-50 p-4 md:p-6">
                    {/* Customer Name */}
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
                            CPF
                        </label>
                        <div className="relative">
                            <input
                                id="cpf"
                                name="cpf"
                                type="text"
                                placeholder="cpf"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"

                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contato" className="mb-2 block text-sm font-medium">
                            Contato
                        </label>
                        <div className="relative">
                            <textarea
                                id="contato"
                                name="contato"
                                placeholder="Contato"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                cols={10}
                            >
                            </textarea>
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                            Email
                        </label>
                        <div className="relative">
                            <input

                                id="email"
                                name="email"
                                type="email"
                                placeholder="email"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"

                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                            Senha
                        </label>
                        <div className="relative">
                            <input
                                //  autoComplete="new-password"
                                id="senha"
                                name="senha"
                                type="password"
                                placeholder="Senha"

                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"

                            />
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
                    <Button type="submit">Criar Usuário</Button>
                </div>
            </form>
        </div >
    )
}