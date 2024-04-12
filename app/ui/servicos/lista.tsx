'use client'
import { createServico } from "@/app/lib/data-mongodb";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import { Button } from "../button";
import ServicoTable from "./tabela";

export default function Lista() {


    return (
        < div className='grid grid-flow-col h-screen' >
            <ServicoTable />
        </div>
    )
}