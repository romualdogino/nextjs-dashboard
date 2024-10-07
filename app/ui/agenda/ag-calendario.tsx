'use client'
import { postAgendamento } from "@/app/lib/data-mongodb"
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

    // console.log({ pro1: props})
    useEffect(() => {

        // console.log({ pro1: props.pedido })
        setLista({ item: props.agenda.users, marcador: Math.floor(Math.random() * 20) })
        setDetalhes({ item: null, marcador: Math.floor(Math.random() * 20) })
        setListaUser({ item: [], marcador: Math.floor(Math.random() * 20) })
        setUser({ item: [], marcador: Math.floor(Math.random() * 20) })
        // console.log({ pro1: props })
        // console.log({ lista })
        // console.log({ listaUser })
        // console.log({ detalhes })
        ///testa se o pedido veio vazio
        // console.log("okkk")


    }, [props])
    async function selecionaDia(dia: string) {
        //seleciona users do dia
        let pedido = props.pedido.item
        let aux: string[] = []
        let auxag: AgendaUser[] = []
        // console.log({ pedido })

        lista.item.map((user: any) => {
            user.dias.map((dias: any) => {

                if (dias.dia == dia && dias.tipo != "") {
                    let teste = false
                    pedido.map((serv: { nome: string, duracao: number, solicitado: boolean }, index: number) => {
                        dias.especialista.map((esp: string) => {
                            if (serv.nome == esp) {
                                teste = true
                            }
                        })
                    })
                    if (teste) {
                        aux.push(user.nome)
                        auxag.push({ ...dias, nome: user.nome })
                    }
                }
            })
        })

        setUser({ item: aux as any[], marcador: Math.floor(Math.random() * 20) })
        setListaUser({ item: auxag as any[], marcador: Math.floor(Math.random() * 20) })
        setDetalhes({ item: null, marcador: Math.floor(Math.random() * 20) })
        // console.log({ auxag, aux })
        // console.log({ lista })

    }
    async function selecionaNome(nome: string) {
        //seleciona detalhes do user
        // console.log({ nome })
        let user: AgendaUser | null = null
        listaUser.item.map((users: AgendaUser) => {
            if (users.nome == nome) {

                user = { ...users }
            }
        })
        setDetalhes({ item: user, marcador: Math.floor(Math.random() * 20) })
        // console.log({ user })
    }
    async function DetalheView() {


        // Foco aqui!!!!!!





        let Hi = detalhes.item?.horainicial
        let Hii = detalhes.item?.horaintervaloinicial
        let Hif = detalhes.item?.horaintervalofinal
        let Hf = detalhes.item?.horafinal
        let dia: number = Number(detalhes.item?.dia)
        const Mostra = () => {
            let rows = []
            var inteiro = 0
            var intervalo = false
            if (Hi && Hf) {
                for (let hora = Hi; hora < Hf; hora++) {
                    if (hora == Hii) {
                        rows.push(<p key={hora}> reservado </p>)
                        intervalo = true
                    }
                    if (hora == Hif) {
                        // rows.push(<p key={hora}>intervalo final</p>)
                        intervalo = false
                    }
                    if (Number.isInteger(hora / 60)) {
                        // rows.push(<p key={hora}>{hora/60}</p>)
                        inteiro = hora / 60

                    }

                    if (((hora % 60).toString()).charAt((hora % 60).toString().length - 1) == '0') {
                        if (intervalo) {

                        } else {

                            rows.push(
                                <p key={hora} className="hover:shadow-xl,text-xl ">
                                    <span className="px-4 py-2 font-semibold text-sm bg-white text-slate-700">
                                        {inteiro} : {((hora % 60).toString()).charAt((hora % 60).toString().length - 2) == "" ? "00" : ((hora % 60).toString()).charAt((hora % 60).toString().length - 2) + "0"}

                                    </span>
                                    <button className="
                                px-4 py-2 font-semibold text-sm bg-white text-slate-700 dark:bg-slate-700 dark:text-white 
                                rounded-md shadow-sm ring-1 ring-slate-900/5
                                 border-indigo-500 hover:bg-blue-300 hover:border-blue-700 dark:border-sky-500 border-2 border-solid
                                 " onClick={() => Agendar(hora, props.agenda.mes, user.item[0], dia)}>
                                        agendar
                                    </button>
                                </p>
                            )
                        }
                    }

                    // rows.push(<p key={hora}>{hora}</p>)
                    // rows.push(<p key={hora}>{hora%60}</p>)
                    // rows.push(<p key={hora}>{ ((hora%60).toString()).charAt((hora%60).toString().length - 1) } - teste</p>)


                }
            }
            return rows
        }

        return (
            <div>
                <p> dia: <strong>{detalhes.item?.dia}</strong></p>
                <p> especialidade: <strong>{detalhes.item?.especialista}</strong></p>
                <p> hora inicio: <strong>{detalhes.item?.horainicial}</strong></p>
                <p> hora inter inicio: <strong>{detalhes.item?.horaintervaloinicial}</strong></p>
                <p> hora inter fim: <strong>{detalhes.item?.horaintervalofinal}</strong></p>
                <p> hora fim: <strong>{detalhes.item?.horafinal}</strong></p>
                <div className="flex text-right flex-col">
                    {Mostra()}

                </div>
            </div>
        )
    }
    async function Agendar(hora: number, mes: number, nome: string, dia: number) {
        let pagamento = 0
        let duracao = 0
        const agendamento = {

            nome: nome,
            dia: dia,
            mes: mes,
            ano: props.agenda.ano,
            solicitado: true,

            agenda: {
                user: nome,
                hora: hora,
                servico: props.pedido.item.map((serv: { nome: string, duracao: number, solicitado: boolean, valor: number }, index: number) => {
                    duracao += serv.duracao
                    pagamento += serv.valor
                    return { nome: serv.nome, duracao: serv.duracao, valor: serv.valor }
                }),
                // clienteId,
                // cliente
                petId: localStorage.getItem("petAtivo") ? localStorage.getItem("petAtivo") : "",
                pet: "",
                horachegada: 0,
                horasaida: 0,
                // valortotal: "",
                tempoTotal: duracao,
                pagamento: pagamento,
                // obs,
            },
        }
        console.log({ agendamento })
        // const response = await postAgendamento(agendamento)


        // console.log({ response })
        // console.log({ hora, mes, nome, dia })
        // console.log({ pedido: props.pedido.item })
        // props.pedido.item[0].solicitado = true
    }
    return (
        <div>
            <div className="basis-4/4">
                {/** lista de serviços selecionados */}
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
            <div className="basis-4/4 c">
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
            <div className="basis-4/4">
                {/** lista de usuarios disponiveis no dia */}
                <ul className="list-none p-0">
                    {user?.item.map((u, index) => (
                        <li
                            key={u + index}
                            onClick={() => selecionaNome(u)}
                            className="border border-spacing-4 border-green-800 text-center cursor-pointer p-2 hover:bg-gray-100 rounded"
                        >
                            {u}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="basis-4/4">
                {detalhes.item ? DetalheView() : ''}
            </div>


        </div>
    )

}