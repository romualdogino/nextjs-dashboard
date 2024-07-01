'use client'
import { useEffect, useState } from "react"

export default function AgCalendario(props: any) {


    useEffect(() => {

        // console.log({ pro1: props.pedido })
        console.log({ pro1: props.agenda })

    }, [props])


    return (<>
        {props?.pedido?.item.map((
            serv: { nome: string, duracao: number, solicitado: boolean },
            index: number) => {
            return (
                <div key={index}>
                    <p>
                        <small>serviço:</small> <strong>{serv.nome} </strong> &nbsp;
                        <small>tempo:</small> <strong>{serv.duracao} </strong> (min.) &nbsp;
                        <small>agendado:</small> <strong>{serv.solicitado ? "pendente" : "OK"}</strong>
                    </p>
                </div>
            )
        })}
        <div className="grid grid-cols-7 gap-2 justify-items-center ">

        {props?.agenda?.dias?.map((dia, index) => {
            return (
                <div key={index} className=" w-24 h-24">{dia.dia}</div>
            )
        })}
        </div>

    </>)

}