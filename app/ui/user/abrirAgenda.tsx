"use client"
import { useEffect, useState } from "react";
import "./calendario.css";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { postAbrirUserAgenda } from "@/app/lib/data-mongodb";
export default function AbrirAgenda(props: any) {
    // let user = {
    //     id: '661c4708a1d9af22723dc4c8',
    //     email: 'rom@ggg.com',
    //     name: 'teste2',
    //     especializacao: ['aa', 'ccc']
    // }
    console.log(props.user)
    type Dias = { dia: string | null, ative: boolean, tipo: string }

    interface DiasInterface { dados: Dias[], datas: { dias: string[], mes: string, ano: string }, especialidades: string[] }


    const [dias, setDias] = useState<DiasInterface>({ dados: [], datas: { dias: [], mes: "", ano: "" }, especialidades: [] })
    const [cont, setCont] = useState(0)
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
        if (props.diasDoMes.users) {
            props.diasDoMes.users.map((u: any) => {
                if (u.nome == props.user.name) {
                    // let lista =
                    // aux.push({
                    //     dia: i.dia,
                    //     ative: false,
                    //     tipo: i.tipo,
                    // })
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
                })
            })

        }
        setDias({ dados: aux, datas: dias.datas, especialidades: dias.especialidades })
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
        if (dias.especialidades[0]) {
            let dados = { user: props.user.name, ...dias.datas, especialidades: dias.especialidades }
            console.log(dados)
            let result = await postAbrirUserAgenda(dados)
            console.log(result)
        } else {
            console.log("não tem especialização")

        }
    }
    useEffect(() => {
        viewCalendario()
    }, [])
    // useEffect(() => {
    //     console.log(dias)
    // }, [dias])
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
                agendamento para as especializações:
                {props.user.especializacao.map((e:any) => {
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
                                className={dias.ative ? "diaselect" : ""}
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