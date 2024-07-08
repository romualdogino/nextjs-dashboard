'use client'
import { updateAgendaADMById } from "@/app/lib/data-mongodb"
import { JsonValue } from "@prisma/client/runtime/library"
import { useEffect, useState } from "react"
interface Props {
    agenda: {
        ano: number
        id: string
        mes: number
        dias: { dia: string, tipo: string }[]
        users: []
    }
}

export default function AgCalendarioADM(props: Props) {
    // console.log({ props })
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
    const [validacao, setValidacao] =
        useState<{ item: { dia: string, tipo: string, select: boolean }[] | [], marcador: number }>
            ({ item: [], marcador: 0 })
    const [dias, setDias] = useState<DiasInterface>({
        dados: [],
        datas: { dias: [], mes: "", ano: "" },
        especialidades: [],
    })
    const [pedido, setPedido] = useState<string>("")

    function nomePedido(item: string) {
        setPedido(item)
    }
    async function clicou(index: number, valor: any) {
        // console.log({ index, valor })
        if (valor != "") {
            let aux = validacao.item

            aux[index].select = !aux[index].select
            if (aux[index].select || aux[index].tipo != "") {
                aux[index].tipo = pedido
            }
            setValidacao({ item: aux, marcador: Math.floor(Math.random() * 20) })
            // console.log(validacao)

        }
    }
    async function enviarAlteracao() {
        let envio = validacao.item.map(i => {
            return ({
                dia: i.dia,
                tipo: i.tipo
            })
        })
        let id = props.agenda.id
        let agenda = await updateAgendaADMById(envio, id)
        console.log({ envio, id })
        console.log({ agenda })
    }
    useEffect(() => {
        var valida: Array<{ dia: string, tipo: string, select: boolean }> = [];
        props?.agenda?.dias.map((item: { dia: string, tipo: string }) => {
            valida.push({
                dia: item.dia,
                tipo: item.tipo,
                select: false
            })

        })
        setTimeout(() => {
            setValidacao({ item: valida, marcador: 0 })
            // console.log({ pro1: props.agenda, validacao })
        }, 1000);
        // console.log({ pro1: props.pedido })
        // viewCalendario()
        // console.log(validacao)
    }, [props])


    return (<>

        <div className="basis-4/4">
            <legend className="text-sm font-semibold leading-6 text-gray-900">Mês base</legend>
            <p className="mt-1 text-sm leading-6 text-gray-600">escolha a marcaçao para ser feita</p>
            <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                    <input id="push-email" onClick={() => nomePedido('dia normal')} name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                    <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                        Dia Útil
                    </label>
                </div>
                <div className="flex items-center gap-x-3">
                    <input id="push-everything" onClick={() => nomePedido('feriado')} name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                        Feriado
                    </label>
                </div>
                <div className="flex items-center gap-x-3">
                    <input id="push-everything" onClick={() => nomePedido('fds')} name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                        Fim De Semana
                    </label>
                </div>
                <div className="flex items-center gap-x-3">
                    <input id="push-everything" onClick={() => nomePedido('')} name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                        Idefinido
                    </label>
                </div>
            </div>
        </div >
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
                {validacao.item.map((dias: { dia: string, tipo: string, select: boolean }, index: number) => {

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
                            {dias.tipo}

                            {/* {dias.select ? 'ok' : "vazio"} */}
                        </div>
                    )
                })}
            </div>
            <button onClick={() => enviarAlteracao()} className="mt-5 w-full px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-lg shadow-sm">
                enviar alterações
            </button>
        </div>

    </>)

}