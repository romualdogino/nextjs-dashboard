'use client'
import { JsonValue } from "@prisma/client/runtime/library"
import { useEffect, useState } from "react"

export default function AgCalendarioADM(props: any) {
    type Dias = { dia: string | null, ative: boolean, tipo: string, especialista: string, agenda: JsonValue }

    interface DiasInterface {
        dados: Dias[],
        datas: { dias: string[], mes: string, ano: string },
        especialidades: string[],
    }
    const semana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    let data = new Date()
    let mes = data.getMonth() + 1
    let ano = data.getFullYear()
    const [validacao, setValidacao] = useState<{ dia: string, tipo: string, select: boolean }[] | []>([])
    const [dias, setDias] = useState<DiasInterface>({
        dados: [],
        datas: { dias: [], mes: "", ano: "" },
        especialidades: [],
    })

    async function clicou(index: number, valor: any) {
        if (valor != "") {
            let aux = dias.dados
            let auxData = dias.datas
            // let auxEsp = dias.especialidades
            aux[index].ative = !aux[index].ative
            if (aux[index].ative == false) {
                // console.log("apagar")
                auxData.dias.splice(auxData.dias.findIndex(v => v == valor), 1)
            } else {
                auxData.dias.push(valor)
                auxData.mes = mes.toString()
                auxData.ano = ano.toString()

                // auxEsp = auxEsp.concat(user.especializacao)
            }
            setDias({ dados: aux, datas: auxData, especialidades: dias.especialidades })

        }

        // console.log({ index, valor })
        // console.log(dias) 
    }
    useEffect(() => {
        var valida: { dia: string, tipo: string, select: boolean }[] | [] = [];
         props.agenda.dias.map((item: { dia: string, tipo: string }) => {
            valida.push({
                dia: item.dia,
                tipo: item.tipo,
                select: false
            })

        })
        setTimeout(() => {
            setValidacao(valida)
            console.log({ pro1: props.agenda, validacao })
        }, 1000);
        // console.log({ pro1: props.pedido })
        // viewCalendario()
    }, [props])


    return (<>
        normal | feriado |
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
                {semana.map((sema: string) => {

                    return (
                        <div key={sema} className={`
                          
            
                            w-24 h-24 bg-slate-50 text-center items-center flex justify-center
                            `}>
                            {sema}
                        </div>
                    )
                })}
                <hr />
            </div>
            <div className="grid grid-cols-7 gap-2 justify-items-center ">
                {validacao.map((dias: { dia: string, tipo: string, select: boolean }, index: number) => {

                    return (
                        <div key={index + dias.dia} className={`
                            ${dias.dia == "" ? "" : "cursor-pointer hover:shadow-xl hover:bg-slate-400"}
                            w-24 h-24 bg-slate-50 text-center items-center flex justify-center
                            `}
                            onClick={() =>
                                clicou(index, dias.dia)
                            }
                        >
                            {dias.dia}
                            
                            {dias.select}
                        </div>
                    )
                })}
            </div>
        </div>

    </>)

}