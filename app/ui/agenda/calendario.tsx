'use client'
import { useState } from "react"
type Dias = [{
    dia: string,
    ative: boolean
}]

export default function Calendario(props: any) {
    const [dias, setDias] = useState(props.dados)
    console.log(dias)
    return (
        <main>
            calendário
            <div className="calview">
                <div className="cal" >
                    {dias.map((dia: any, index: number) => {
                        return (
                            <div key={index} className="callinha">
                                <span className={dia.ative? "circulo": ""}>{dia.dia}</span>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </main>
    )
}