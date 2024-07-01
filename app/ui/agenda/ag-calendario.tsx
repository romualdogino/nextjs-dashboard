'use client'
import { useEffect, useState } from "react"

export default function AgCalendario(props: any) {


    useEffect(() => {

        // console.log({ pro1: props.pedido })
        console.log({ pro1: props.agenda })

    }, [props])


    return (<>
        <div className="basis-4/4">
            {props?.pedido?.item.map((
                serv: { nome: string, duracao: number, solicitado: boolean },
                index: number) => {
                return (
                    <div key={index}>
                        <p>
                            <small>serviço:</small> <strong>{serv.nome} </strong> &nbsp;
                            <small>tempo:</small> <strong>{serv.duracao} </strong> (min.) &nbsp;
                            <small>agendado:</small> <strong>{serv.solicitado ? "OK" : "pendente"}</strong>
                        </p>
                    </div>
                )
            })}
        </div>
        <div className="basis-4/4">
            <div className="grid grid-cols-7 gap-2 justify-items-center ">

                {props?.agenda?.dias?.map((dia: { dia: string }, index: number) => {

                    return (
                        <div key={index + dia.dia} className={`
                            ${dia.dia == "" ? "" : "cursor-pointer hover:shadow-xl hover:bg-slate-400"}
                            
                            w-24 h-24 bg-slate-50 text-center items-center flex justify-center
                            `}>
                            {dia.dia}
                        </div>
                    )
                })}
            </div>
        </div>

    </>)

}