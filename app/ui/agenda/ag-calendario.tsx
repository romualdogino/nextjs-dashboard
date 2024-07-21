'use client'
import { useEffect, useState } from "react"

export default function AgCalendario(props: any) {
    type AgendaUser = {
        agenda: []
        dia: string
        especialista: []
        horafinal: number
        horainicial: number
        horaintervalofinal: number
        horaintervaloinicial: number
        nome: string
        tipo: string
    }
    const [lista, setLista] = useState({ item: [], marcador: 0 })   //users
    const [user, setUser] = useState({ item: [], marcador: 0 })     //nomes user do dia
    const [listaUser, setListaUser] = useState({ item: [], marcador: 0 })
    const [detalhes, setDetalhes] = useState<{ item: AgendaUser | null, marcador: number }>({ item: null, marcador: 0 })

    //Math.floor(Math.random() * 20)


    useEffect(() => {

        // console.log({ pro1: props.pedido })
        setLista({ item: props.agenda.users, marcador: Math.floor(Math.random() * 20) })
        console.log({ pro1: props.agenda })

    }, [props])
    async function selecionaDia(dia) {
        //seleciona users do dia
        let aux = []
        let auxag = []
        console.log({ dia })
        lista.item.map((user) => {
            user.dias.map(dias => {
                if (dias.dia == dia && dias.tipo != "") {
                    aux.push(user.nome)
                    auxag.push({ ...dias, nome: user.nome })
                }
            })
        })
        setUser({ item: aux, marcador: Math.floor(Math.random() * 20) })
        setListaUser({ item: auxag, marcador: Math.floor(Math.random() * 20) })
        setDetalhes({ item: null, marcador: Math.floor(Math.random() * 20) })
        // console.log({ auxag, aux })

    }
    async function selecionaNome(nome) {
        console.log({ nome })

        let user = {}
        listaUser.item.map(users => {
            if (users.nome = nome) {

                user = { ...users }
            }
        })
        setDetalhes({ item: user, marcador: Math.floor(Math.random() * 20) })
        console.log({ user })
    }
    async function DetalheView() {
        let Hi = detalhes.item?.horainicial
        let Hii = detalhes.item?.horaintervaloinicial
        let Hif = detalhes.item?.horaintervalofinal
        let Hf = detalhes.item?.horafinal
        const Mostra = () => {
            let rows = []
            var inteiro = 0
            for (let hora = Hi; hora < Hf; hora++) {
                if (hora == Hii) {
                    rows.push(<p key={hora}> intervalo inicial</p>)
                }
                if (hora == Hif) {
                    rows.push(<p key={hora}>intervalo final</p>)
                }
                if (Number.isInteger(hora / 60)) {
                    // rows.push(<p key={hora}>{hora/60}</p>)
                    inteiro = hora / 60
                }

                if (((hora % 60).toString()).charAt((hora % 60).toString().length - 1) == '0') {
                    rows.push(<p key={hora}>{inteiro} : {((hora % 60).toString()).charAt((hora % 60).toString().length - 2)}0</p>)
                }

                // rows.push(<p key={hora}>{hora}</p>)
                // rows.push(<p key={hora}>{hora%60}</p>)
                // rows.push(<p key={hora}>{ ((hora%60).toString()).charAt((hora%60).toString().length - 1) } - teste</p>)


            }


            return rows

        }

        return (
            <>
                <p> dia: <strong>{detalhes.item?.dia}</strong></p>
                <p> especialidade: <strong>{detalhes.item?.especialista}</strong></p>
                <p> hora inicio: <strong>{detalhes.item?.horainicial}</strong></p>
                <p> hora inter inicio: <strong>{detalhes.item?.horaintervaloinicial}</strong></p>
                <p> hora inter fim: <strong>{detalhes.item?.horaintervalofinal}</strong></p>
                <p> hora fim: <strong>{detalhes.item?.horafinal}</strong></p>
                <div>
                    {Mostra()}

                </div>
            </>
        )
    }

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
            {user?.item.map((u, index) => {
                return (
                    <p key={u + index} onClick={() => selecionaNome(u)}>{u}</p>
                )
            })}
        </div>
        <div className="basis-4/4">
            {/* {detalhes?.item?.especialista}
            {detalhes?.item?.horafinal}
            {detalhes?.item?.horainicial}
            {detalhes?.item?.horaintervaloinicial}
            {detalhes?.item?.horaintervalofinal}
            <div className="relative bg-orange-600 w-96 h-1/2">

                {detalhes?.item?.agenda.map((i: any) => {
                    if (i.nome) {

                        return i.nome
                    }
                })}
            </div> */}
            {detalhes.item ? DetalheView() : ''}
        </div>
        <div className="basis-4/4">
            <div className="grid grid-cols-7 gap-2 justify-items-center ">
                {props?.agenda?.dias?.map((dia: { dia: string, tipo: string }, index: number) => {

                    return (
                        <div onClick={() => `${dia.dia == "" || dia.tipo == "" || dia.tipo == "fds" ? null : selecionaDia(dia.dia)}`} key={index + dia.dia} className={`
                            ${dia.dia == "" || dia.tipo == "" || dia.tipo == "fds" ? "" : "cursor-pointer border border-spacing-4 border-green-800 hover:shadow-xl hover:bg-slate-400"}
                            
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