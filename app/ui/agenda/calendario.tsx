'use client'
import { useState } from "react"
import Agenda from "./agenda"
import { updateAgenda } from "@/app/lib/data-mongodb"
type Dias = [{
    dia: string,
    ative: boolean
}]
type Agenda = {
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

export default function Calendario(props: any) {
    // console.log({ props })
    const data = new Date()
    const hoje = data.getDate()
    // var listaUser: any[] = []
    const [dias, setDias] = useState(props.dados.dias)
    const [users, setUsers] = useState(props.dados.users)
    const [listaUser, setListaUser] = useState([])
    const [agenda, setAgenda] = useState([])
    const [horas, setHoras] = useState([])
    const [pet, setPet] = useState(props.pet)
    const [servicos, setServico] = useState(props.servicos)
    const [pedido, setPedido] = useState([])
    // console.log(dias)
    // console.log(hoje)
    async function clicou(dia: string) {//lista dia do user
        // listaUser = [] 
        var teste: any = []
        // console.log(typeof dia)
        // console.log({ users })
        await users.map(async (user: any) => {
            //user
            let busca = await user.dias.find((dias: any) => {
                return (dias.dia == dia && dias.tipo == 'aberto')
            })
            if (busca) {
                busca.nome = user.nome
            } else { return 0 }
            teste.push(busca)
            // if (teste?.dia == dia) {
            //     teste.nome = user.nome
            // } else { return 0 }

        })
        setListaUser([...teste])
        // console.log([listaUser])

    }
    async function mostraAgendas(nome: Agenda) { //mostra agenda do user
        setAgenda([nome])
        let aux = await ListaHoras(nome.horainicial, nome.horafinal)
        setHoras({ aux })
        setTimeout(() => {
            console.log({ nome })
            console.log({ horas })
        }, 1000);

    }
    async function ListaHoras(inicial, final) {
        let array = []

        for (let i = inicial; i <= final; i = i + 30) {
            array.push(i)
        }
        return array

    }
    function selecionou(item: any, nome: string, duracao: number) { //serviços solicitados
        console.log({ nome, duracao })
        let auxPedido = pedido
        if (item.target.checked) {

            auxPedido.push({ nome, duracao, solicitado: false })
        } else {

            auxPedido.splice(auxPedido.findIndex(v => v.nome == nome), 1)
        }


        setPedido(auxPedido)
        Calend()
        console.log({ pedido })

    }
    async function agendarHora(hora: number, nome: string, dia: string, especialista: []) {
        console.log({ hora, dia, especialista })
        let arquivo = {
            hora,
            dia,
            mes: props.dados.mes,
            ano: props.dados.ano,
            nome: nome,
            especialista,
            pet: pet.nome
            // tempo: calcular tempo total e os respectivos serviços
        }

        let resp = await updateAgenda(arquivo)
        console.log({ resp })
    }
    function Calend() {
        console.log("chamou calendario")
        if (pedido[0]) {
            return (
                <div className="calview">
                    <div className="cal" >
                        {dias?.map((dia: any, index: number) => {
                            return (
                                <div key={index} className="callinha" onClick={() => clicou(dia.dia)}>
                                    <span className={`${dia.ative ? "circulo" : ""} ${dia.dia == hoje ? "ehoje" : ""}`}>{dia.dia}</span>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            )
        }else{
            return(

                <button onClick={()=>Calend()}>ver calendário</button>
            )
        }

    }
    return (
        <main>
            calendário
            <p>agendar para : <strong>{pet ? pet.nome : ''}</strong></p>
            selecionar servicos:
            {servicos?.map((servico: any) => {
                // console.log(servico)
                return (
                    <div key={'select' + servico.nome}>
                        <input type="checkbox" name={servico.nome} onClick={event => selecionou(event, servico.nome, servico.duracao)} />
                        <label>{servico.nome} - {servico.duracao}</label>
                    </div>
                )
            })}

            <Calend />
            {/* <div className="calview">
                <div className="cal" >
                    {dias?.map((dia: any, index: number) => {
                        return (
                            <div key={index} className="callinha" onClick={() => clicou(dia.dia)}>
                                <span className={`${dia.ative ? "circulo" : ""} ${dia.dia == hoje ? "ehoje" : ""}`}>{dia.dia}</span>
                            </div>
                        )
                    })
                    }
                </div>
            </div> */}
            <div id="users">
                {
                    listaUser?.map((user: any, index) => {
                        return (
                            <div key={'nome-' + index + user} onClick={() => mostraAgendas(user)}>
                                <p><b>{user.nome}</b></p>
                                {user.especialista.map((e: any, i: number) => {
                                    return (
                                        <pre key={i}>
                                            {e}
                                        </pre>
                                    )
                                })}
                            </div>
                        )
                    })


                }
            </div>
            <div id="agenda">
                <hr />
                {agenda?.map((a: any, index) => {
                    return (
                        <div key={index}>
                            <p>nome:<strong>{a.nome}</strong></p>
                            <p>dia:{a.dia}</p>
                            <p>especialidades:{a.especialista.map((e: any, i: number) => " | " + e)}</p>
                            <p>{a.tipo}</p>
                            <p>{a.horainicial}</p>
                            <p>{a.horaintervaloinicial}</p>
                            <p>{a.horaintervalofinal}</p>
                            <p>{a.horafinal}</p>
                            <p>agenda:{a.agenda.map((ag: any, i: number) => {
                                console.log(a)
                                return (<>
                                    {ag.pet}
                                    {ag.hora}
                                </>)
                            })
                            }</p>
                            {
                                pedido?.map(async serv => {

                                    if (a.especialista) {
                                        console.log("foi")
                                        let teste = await a.especialista.findIndex(es => es == serv.nome)
                                        if (teste == -1) {
                                            return ("não pode agendar selecione serviço")
                                        } else {
                                            return (<>
                                                {horas.map((h: any, index) => {
                                                    return (
                                                        <p key={h}>
                                                            {(Math.floor(h / 60)).toString().padStart(2, '0')}:{(((h / 60) - Math.floor(h / 60)) * 60).toString().padStart(2, '0')}
                                                            | {h >= a.horaintervaloinicial && h < a.horaintervalofinal
                                                                ? (<b style={{ color: 'red' }}>reservado</b>)
                                                                : (<button onClick={() => {
                                                                    console.log(h)
                                                                    agendarHora(h, a.nome, a.dia, a.especialista)
                                                                }}>agendar</button>)}
                                                        </p>)
                                                })}
                                            </>)

                                        }

                                    }
                                    return (
                                        <> nada</>
                                    )
                                })
                            }

                            <div id="horas">


                            </div>

                        </div>
                    )
                })}
            </div>

        </main >
    )
}