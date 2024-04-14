'use serve'
import { createServico, fetchFilteredServicos } from "@/app/lib/data-mongodb";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import { Button } from "../button";
import ServicoTable from "./tabela";

export default async function Lista() {

    const servicos = await fetchFilteredServicos();
    console.log(servicos)
    return (
        <div>
            < div className='grid grid-flow-col' >
                <ServicoTable servicos={servicos} />
            </div>
        </div>
    )
}