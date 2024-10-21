import { fetchAgendas, fetchAgendaUser, fetchFilteredServicos, fetchServicos } from "@/app/lib/data-mongodb";
import Calendario from "./calendario";
import AgServico from "./ag-servico";
import { useState } from "react";
import { cookieLe } from "./action";

export default async function Agenda(props: any) {
    let data = new Date()
    let mes = data.getMonth() + 1
    let ano = data.getFullYear()
    // console.log(mes)
    const agenda = await fetchAgendas(mes, ano);
    const servicos = await fetchServicos();
    const testePedido = await cookieLe('meuPedido')
    console.log(testePedido)
    console.log(typeof([testePedido]))


    return (
        <div>
            <AgServico servicos={servicos} agenda={agenda} testePedido />
            {/* <Calendario dados={agenda} pet={props.pet} servicos={servicos} /> */}
        </div>

    )
}