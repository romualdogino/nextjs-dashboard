"use client"
import { useEffect, useState } from "react";
import "./calendario.css";
export default function AbrirAgenda(props: any) {
    type Dias = { dia: string | null, ative: boolean }
    const [dias, setDias] = useState<Dias[]>([])
    const [cont, setCont] = useState(0)
    let data = new Date()
    let diaSemana = data.getDay()
    let dia = data.getDate()
    let mes = data.getMonth() + 1
    let ano = data.getFullYear()
    let ultimoDia = monthLength(mes, ano)
    let primeiroDiaSemana = firstDiaSemana(mes, ano)
    function monthLength(month: number, year: number) {
        return new Date(year, month, 0).getDate();
    };
    function firstDiaSemana(month: number, year: number) {
        return new Date(year, month - 1, 1).getDay();
    };
    function viewCalendario() {
        let aux: Dias[] = []
        for (let index = 1; index <= primeiroDiaSemana; index++) {
            aux.push({ dia: "", ative: false })
        }
        for (let index = 1; index <= ultimoDia; index++) {
            aux.push({ dia: index.toString(), ative: false })
        }
        setDias(aux)

    }

    async function clicou(index: number, valor: any) {
        if (valor != "") {
            let aux = dias
            aux[index].ative = true
            setDias(aux)

        }

        console.log({ index, valor })
        // console.log(dias)
    }
    // async function listaDias(dias:Dias[]) {
    //     'use server'


    // }

  

    useEffect(() => {
        viewCalendario()
    }, [])
    useEffect(() => {
        console.log(dias)
    }, [dias])
    return (
        <div>
            <div>
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
            ultimo dia {ultimoDia}
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
                    {dias.map((dias, id) => {
                        return (
                            <li
                                className={dias.ative ? "diaselect" : ""}
                                key={"dia" + id}
                                onClick={() =>
                                    clicou(id, dias.dia)
                                }
                                value={dias.dia?.toString()}
                            >
                                {dias.dia}
                            </li>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}