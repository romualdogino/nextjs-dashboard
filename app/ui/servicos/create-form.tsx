'use client'
import { createServico } from "@/app/lib/data-mongodb";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import { Button } from "../button";

export default function Form() {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(createServico, initialState);

    return (
        < div className='grid grid-flow-col' >
            <form action={dispatch}>
                <div className="rounded-md bg-gray-50 p-4 md:p-6">
                    {/* Customer Name */}
                    <div className="mb-4">
                        <label htmlFor="nome" className="mb-2 block text-sm font-medium">
                            nome do serviço
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    id="nome"
                                    name="nome"
                                    type="text"
                                    placeholder="Nome do serviço"
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                // required
                                />
                                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="valor" className="mb-2 block text-sm font-medium">
                            valor R$
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    id="valor"
                                    name="valor"
                                    type="number"
                                    min="0.10"
                                    step="0.01"
                                    placeholder="Valor"
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                // required
                                />
                                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="tempo" className="mb-2 block text-sm font-medium">
                            tempo do serviço (min)
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    id="tempo"
                                    name="tempo"
                                    type="number"
                                    min="0"
                                    placeholder="Tempo em minutos serviço"
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                // required
                                />
                                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="descricao" className="mb-2 block text-sm font-medium">
                            descrição do serviço
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <textarea
                                    id="descricao"
                                    name="descricao"
                                    cols={10}
                                    placeholder="Descrição"
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                // required
                                />
                                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                    </div>
                    <Button type="submit">Criar Serviço</Button>
                </div>
            </form>
        </div>
    )
}