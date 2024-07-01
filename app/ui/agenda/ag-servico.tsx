'use client'
import { useCallback, useEffect, useState } from "react"
import AgCalendario from "./ag-calendario"
import { number } from "zod"

export default function AgServico(props: any) {


    const [servicos, setServico] = useState(props.servicos)
    const [pedido, setPedido] = useState<{item:{nome: string, duracao: number, solicitado: boolean}[]|[],controle:number}>({ item: [], controle: 0 })

    const selecionou = useCallback(async (item: any, nome: string, duracao: number) => { //serviços solicitados
        // console.log({ nome, duracao })
        let auxPedido: { nome: string, duracao: number, solicitado: boolean }[] = pedido?.item
        if (item.target.checked) {

            auxPedido.push({ nome, duracao, solicitado: false })
        } else {

            auxPedido.splice(auxPedido.findIndex((v: { nome: string }) => v.nome == nome), 1)
        }


        setPedido({ item: auxPedido, controle: Math.floor(Math.random() * 20) })
        // console.log({ pedido })
    }, [pedido])

    useEffect(() => {
        // console.log('Componente montado.');
        // return () => {
        //     console.log('Componente desmontado.');
        // };
    }, [selecionou]);

    return (<>
        {servicos?.map((servico: any) => {
            // console.log(servico)
            return (
                <div key={'select' + servico.nome}>
                    <input type="checkbox" name={servico.nome} onClick={event => selecionou(event, servico.nome, servico.duracao)} />
                    <label>{servico.nome} - {servico.duracao}</label>
                </div>
            )
        })}
        <AgCalendario pedido={pedido} agenda={props.agenda} />
    </>)

}