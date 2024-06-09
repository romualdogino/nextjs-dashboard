"use client"
import { useEffect, useState } from "react";
import "./calendario.css";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { postAbrirUserAgenda } from "@/app/lib/data-mongodb";
import { JsonValue } from "@prisma/client/runtime/library";
export default function AbrirAgenda(props: any) {
    // let user = {
    //     id: '661c4708a1d9af22723dc4c8',
    //     email: 'rom@ggg.com',
    //     name: 'teste2',
    //     especializacao: ['aa', 'ccc']
    // }
    // console.log(props.user)
    type Dias = { dia: string | null, ative: boolean, tipo: string, especialista: string, agenda: JsonValue }

    interface DiasInterface {
        dados: Dias[],
        datas: { dias: string[], mes: string, ano: string },
        especialidades: string[],
    }
    interface Horarioface {
        horainicial: number,
        horafinal: number,
        horaintervaloinicial: number,
        horaintervalofinal: number
    }


    const [dias, setDias] = useState<DiasInterface>({
        dados: [],
        datas: { dias: [], mes: "", ano: "" },
        especialidades: [],
    })
    const [horario, setHorario] = useState({
        horainicial: 0,
        horafinal: 0,
        horaintervaloinicial: 0,
        horaintervalofinal: 0,
    })
    // const [cont, setCont] = useState(0)
    let data = new Date()
    // let diaSemana = data.getDay()
    // let dia = data.getDate()
    let mes = data.getMonth() + 1
    let ano = data.getFullYear()
    // let ultimoDia = monthLength(mes, ano)
    // let primeiroDiaSemana = firstDiaSemana(mes, ano)
    // function monthLength(month: number, year: number) {
    //     return new Date(year, month, 0).getDate();
    // };

    // function firstDiaSemana(month: number, year: number) {
    //     return new Date(year, month - 1, 1).getDay();
    // };
    async function viewCalendario() {
        let aux: Dias[] = []
        var aux2: any
        if (props.diasDoMes.users) {
            props.diasDoMes.users.map((u: any) => {
                // {
                //     agenda: []
                //     dia: "1"
                //     especialista: ['ccc']
                //     tipo: "aberto"
                // }
                if (u.nome == props.user.name) {
                    aux2 = u.dias
                    // console.log(u.dias)

                }
            })
        } else {

        }


        if (props.diasDoMes.dias) {
            props.diasDoMes.dias.map((i: any) => {
                aux.push({
                    dia: i.dia,
                    ative: false,
                    tipo: i.tipo,
                    agenda: [],
                    especialista: ""
                })
            })
        }
        if (aux2) {
            // console.log("ee")
            console.log({ aux })
            console.log({ aux2 })
            aux.map((a) => {
                if (a.dia) {
                    a.tipo = aux2[parseInt(a.dia) - 1].tipo
                    a.especialista = aux2[parseInt(a.dia) - 1].especialista
                    a.agenda = aux2[parseInt(a.dia) - 1].agenda
                }
            })

        }
        setDias({
            dados: aux,
            datas: dias.datas,
            especialidades: dias.especialidades,
        })
        // console.log(dias)
    }
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
    async function selecionou(item: any) {
        let auxEsp = dias.especialidades
        if (item.target.checked) {
            // console.log("inclui - " + item.target.name)
            auxEsp.push(item.target.name)
        } else {
            // console.log("apaga - " + item.target.name)
            auxEsp.splice(auxEsp.findIndex(v => v == item.target.name), 1)
        }
        // console.log(item.target.checked)
        // console.log(item.target.name)

    }
    // async function listaDias(dias:Dias[]) {
    //     'use server'
    // }
    async function enviarDias() {
        if (horario.horainicial != 0
            && horario.horafinal != 0
            && horario.horaintervaloinicial != 0
            && horario.horaintervalofinal != 0
        ) {


            if (dias.especialidades[0]) {
                let dados = { user: props.user.name, ...dias.datas, especialidades: dias.especialidades, ...horario }
                console.log(dados)
                let result = await postAbrirUserAgenda(dados)
                console.log({ result })
            } else {
                console.log("não tem especialização")

            }
        }else{
            console.log('horários inválidos')
        }
    }
    useEffect(() => {
        viewCalendario()
    }, [])
    // useEffect(() => {
    //     console.log(dias)
    // }, [dias])
    // console.log(dias)
    function mudaHorario(local: string, hora: string) {
        let h = parseInt(hora.split(":")[0]) * 60 //minutos
        let m = parseInt(hora.split(":")[1])
        console.log({ local, hora })
        console.log({ h, m })
        let item = horario
        item[local] = h + m

        setHorario(item)
        // setHorario(prevState => ({ ...prevState }))
        // console.log(item)
        console.log(horario)

    }
    return (
        <div>
            {/* <div>
                <p>Você clicou {cont} vezes</p>
                <button onClick={() => setCont(cont + 1)}>
                    Clique aqui
                </button>
            </div>
            agenda
            dia {dia}
            mes {mes}
            ano {ano}
            semana {diaSemana}
            primeiroDiaSemana {primeiroDiaSemana}
            ultimo dia {ultimoDia} */}
            <div>
                <div>
                    <label htmlFor="horainicial">hora inicial do trabalho</label>
                    <input type="time" onChange={event => mudaHorario(event.target.id, event.target.value)} id="horainicial" />
                </div>
                <div>
                    <label htmlFor="horaintervaloinicial">hora inicial do intervalo</label>
                    <input type="time" onChange={event => mudaHorario(event.target.id, event.target.value)} id="horaintervaloinicial" />
                </div>
                <div>
                    <label htmlFor="horaintervalofinal">hora final do intervalo</label>
                    <input type="time" onChange={event => mudaHorario(event.target.id, event.target.value)} id="horaintervalofinal" />
                </div>
                <div>
                    <label htmlFor="horafinal">hora final do trabalho</label>
                    <input type="time" onChange={event => mudaHorario(event.target.id, event.target.value)} id="horafinal" />
                </div>
                agendamento para as especializações:
                {props.user?.especializacao.map((e: any) => {
                    return (
                        <div key={'select' + e}>
                            <input type="checkbox" name={e} onClick={event => selecionou(event)} />
                            <label>{e}</label>
                        </div>
                    )
                })}
            </div>
            <div id="calendario">
                <div id="semana">
                    <li>Dom</li>
                    <li>Seg</li>
                    <li>Ter</li>
                    <li>Qua</li>
                    <li>Qui</li>
                    <li>Sex</li>
                    <li>Sab</li>
                </div>
                <div id="dias">
                    {dias.dados.map((dias, id) => {
                        return (
                            <li
                                className={`${dias.ative ? "diaselect" : ""} ${dias.tipo == 'aberto' ? "tipoAberto" : ""} `}
                                key={"dia" + id}
                                onClick={() =>
                                    clicou(id, dias.dia)
                                }
                                value={dias?.dia?.toString()}
                            >
                                {dias.dia}
                            </li>
                        )
                    })}
                </div>
                <div>
                    <Link
                        href="#"
                        onClick={() => enviarDias()}
                        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        <span className="hidden md:block">Abrir Agenda</span>{' '}
                        <PlusIcon className="h-5 md:ml-4" />
                    </Link>
                </div>
            </div>
        </div>
    )
}