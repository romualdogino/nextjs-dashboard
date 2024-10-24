'use client'
import { useCallback, useEffect, useState } from "react"
import AgCalendario from "./ag-calendario"
import { number } from "zod"
import { cookieCria } from "./action"

const allToppings = [
    { name: "Golden Corn", checked: false },
    { name: "Paneer", checked: false },
    { name: "Tomato", checked: true },
    { name: "Mushroom", checked: false },
    { name: "Onion", checked: true },
    { name: "Black Olives", checked: false },
]

export const Checkbox = ({ isChecked, label, checkHandler, index }) => {
    console.log({ isChecked })
    return (
        <div>
            <input
                type="checkbox"
                id={`checkbox-${index}`}
                checked={isChecked}
                onChange={checkHandler}
            />
            <label htmlFor={`checkbox-${index}`}>{label}</label>
        </div>
    )
}


export default function AgServico(props: {
    servicos: {
        id: string,
        nome: string,
        // checked: boolean,
        descricao: string,
        duracao: number,
        procedimento: null
        createdAt: Date,
        updatedAt: Date
    }[], testePedido: any, agenda: any
}) {
    const [toppings, setToppings] = useState(allToppings)

    //serviços disponíveis
    const [servicos, setServico] = useState(props.servicos)
    //servíços escolhidos
    const [pedido, setPedido] = useState<{
        item: {
            nome: string, duracao: number, valor: number, solicitado: boolean
        }[] | [],
        controle: number
    }>({
        item: props.testePedido ? props.testePedido : [],
        controle: 0

    })
    const updateCheckStatus = index => {
        setToppings(
            toppings.map((topping, currentIndex) =>
                currentIndex === index
                    ? { ...topping, checked: !topping.checked }
                    : topping
            )
        )
    }
    const selectAll = () => {
        setToppings(toppings.map(topping => ({ ...topping, checked: true })))
    }
    const unSelectAll = () => {
        setToppings(toppings.map(topping => ({ ...topping, checked: false })))
    }


    const selecionou = useCallback(async (item: any, nome: string, duracao: number, valor: number) => { //serviços solicitados
        // console.log({ nome, duracao })
        let auxPedido: { nome: string, duracao: number, valor: number, solicitado: boolean }[] = pedido?.item
        if (item.target.checked) {
            auxPedido.push({ nome, duracao, valor, solicitado: false })
        } else {
            auxPedido.splice(auxPedido.findIndex((v: { nome: string }) => v.nome == nome), 1)
        }

        setPedido({ item: auxPedido, controle: Math.floor(Math.random() * 20) })
        cookieCria('meuPedido', auxPedido)
        // console.log({ pedido })

    }, [pedido])
    const alterarPedido = useCallback((item: any) => {
        // console.log(item)
        setPedido({ item: item, controle: Math.floor(Math.random() * 20) })
    }, [pedido])
    const testaChecked = (nome: string) => {
        if (nome) {
            pedido.item.map(pe => {
                console.log({ pe })
                if (pe.nome == nome) {
                    console.log({ texto: "aqui" })
                    return true
                }
            })
            return false
        }
        return false
    }


    // setTimeout(() => {

    //     console.log({ servicos, pedido })
    // }, 1000);

    useEffect(() => {
        if (servicos[0]) {
            setServico(servicos.map((serv: {
                id: string,
                nome: string,
                descricao: string,
                duracao: number,
                procedimento: null,
                createdAt: Date,
                updatedAt: Date
            }) => ({
                ...serv,
                checked: testaChecked(serv.nome)
            })))
        }
        // servicos.map(ser=>{
        //     ser.
        // })

        // console.log('alterando lista de pedido');
        // return () => {
        //     console.log('Componente desmontado.');
        // };
    }, [pedido]);
    // console.log({ t6: typeof pedido.item[0].solicitado})


    return (
        <div className="flex flex-wrap">
            <div className="basis-1/4 md:basis-3/4 sm:basis-3/4 min-w-24">
                {servicos?.map((
                    servico: any
                ) => {
                    // console.log(servico)
                    return (
                        <div key={'select' + servico.nome}>
                            <input type="checkbox" name={servico.nome}

                                checked={servico.checked}
                                onClick={event => selecionou(event, servico.nome, servico.duracao, servico.valor)} />
                            <label>{servico.nome} - {servico.duracao} - {servico.valor}</label>
                        </div>
                    )
                })}
            </div>
            <div className="App">
                <p>
                    <button onClick={selectAll}>Select All</button>
                    <button onClick={unSelectAll}>Unselect All</button>
                </p>

                {toppings.map((topping, index) => (
                    <Checkbox
                        key={topping.name}
                        isChecked={topping.checked}
                        checkHandler={() => updateCheckStatus(index)}
                        label={topping.name}
                        index={index}
                    />
                ))}
                <p>
                    <pre>{JSON.stringify(toppings, null, 2)}</pre>
                </p>
            </div>
            <AgCalendario pedido={pedido} funcao={alterarPedido} agenda={props.agenda} />
        </div>
    )

}