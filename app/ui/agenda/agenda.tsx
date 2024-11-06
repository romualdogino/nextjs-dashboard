import { fetchAgendas, fetchAgendaUser, fetchClientePedido, fetchFilteredServicos, fetchServicos } from "@/app/lib/data-mongodb";
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
    const testePet = await cookieLe('petAtivo')
    const clientePedidos = await fetchClientePedido(testePet.tutorId)
    console.log({ testePedido })
    console.log({ testePet })
    console.log({ clientePedidos })

    // console.log({ qtd: testePedido?.length || 0 })
    // console.log(servicos)
    function testarPedidosCoockies() {
        servicos.forEach(servico => {
            if (testePedido && Array.isArray(testePedido)) {
                testePedido.forEach((ped: { nome: string; solicitado: boolean }) => {
                    if (ped.nome === servico.nome) {
                        servico.checked = !ped.solicitado;
                    }
                });
            }
        });
    }
    testarPedidosCoockies()
    return (
        <div>
            <AgServico servicos={servicos.map(servico => ({
                ...servico,
                procedimento: servico.procedimento || ''
            }))} agenda={agenda} testePedido={testePedido} />
            {/* <Calendario dados={agenda} pet={props.pet} servicos={servicos} /> */}
        </div>

    )
}