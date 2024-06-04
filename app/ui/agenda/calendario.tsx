'use client'
import { useState } from "react"
type Dias = [{
    dia: string,
    ative: boolean
}]

export default function Calendario(props: any) {

    const data = new Date()
    const hoje = data.getDate()
    // var listaUser: any[] = []
    const [dias, setDias] = useState(props.dados.dias)
    const [users, setUsers] = useState(props.dados.users)
    const [listaUser, setListaUser] = useState([])
    const [agenda, setAgenda] = useState([])
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
    async function mostraAgendas(nome: any) {
        setAgenda([nome])
        console.log(agenda)
    }
    return (
        <main>
            calendário
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
                        <em key={index}>
                            <p>nome:<strong>{a.nome}</strong></p>
                            <p>dia:{a.dia}</p>
                            <p>especialidades:{a.especialista.map((e: any, i: number) => " | " + e)}</p>
                            <p>{a.tipo}</p>
                            <p>agenda:{a.agenda.map((ag: any, i: number) => ag)}</p>
                        </em>
                    )
                })}
            </div>

        </main>
    )
}