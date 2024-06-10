'use client'
import { useState } from "react"
import Agenda from "./agenda"
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
    console.log({ props })
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
    // console.log(dias)
    // console.log(hoje)
    async function clicou(dia: string) {
        // listaUser = []
        var teste: any = []
        console.log(typeof dia)
        console.log(users)
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
        console.log([listaUser])

    }
    async function mostraAgendas(nome: Agenda) {
        setAgenda([nome])
        let aux = await ListaHoras(nome.horainicial, nome.horafinal)
        setHoras(aux)
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
    return (
        <main>
            calendário
            <p>agendar para : <strong>{pet ? pet.nome : ''}</strong></p>
            selecionar servicos:
            {servicos?.map((servico: any) => {
                return (
                    <p> {servico.nome} </p>
                )
            })}
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
                            <p>agenda:{a.agenda.map((ag: any, i: number) => ag)}</p>
                            <div id="horas">
                                {horas.map((h: any, index) => {
                                    return (
                                        <p key={h}>
                                            {(Math.floor(h / 60)).toString().padStart(2, '0')}:{(((h / 60) - Math.floor(h / 60)) * 60).toString().padStart(2, '0')}
                                            | {h >= a.horaintervaloinicial && h < a.horaintervalofinal ? (<b style={{ color: 'red' }}>reservado</b>) : (<button onClick={() => { console.log(h) }}>agendar</button>)}
                                        </p>)
                                })}
                            </div>

                        </div>
                    )
                })}
            </div>

        </main>
    )
}