'use client'
import { useCallback, useEffect, useState } from "react"
import AgCalendario from "./ag-calendario"
import { number } from "zod"
import { cookieCria, cookieDelete } from "./action"

export const Checkbox = ({
    isChecked, label, checkHandler, index
}: {
    isChecked: boolean, label: string, checkHandler: () => void, index: number
}) => {
    // console.log({ isChecked })
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
        descricao: string,
        duracao: number,
        procedimento: string,
        valor: number,
        createdAt: Date,
        updatedAt: Date
        checked: boolean,
    }[], testePedido: any, agenda: any
}) {
    //serviços disponíveis
    const [servicos, setServicos] = useState(props.servicos)
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
    // console.log({ servicos })
    const checkPedido= (nome:string)=>{
        pedido.item.map(ped=>{
            if(ped.nome == nome){
                // console.log
                return ped.solicitado
            }
        })

    }
    const updateCheckStatusServico = (index: number) => {
        let nome = ""
        setServicos(
            servicos.map((serv, currentIndex) => {
                if (currentIndex === index) {
                    nome = serv.nome;
                    selecionou(!serv.checked, serv.nome, serv.duracao, serv.valor);
                    return { ...serv, checked: !serv.checked };
                } else {
                    return serv;
                }
            }))

        // console.log(nome)
        // console.log({ pedido })
    }
    const selectAll = () => {
        //nao impementado
        setServicos(servicos.map(topping => ({ ...topping, checked: true })))
    }
    const unSelectAll = () => {
        setServicos(servicos.map(topping => ({ ...topping, checked: false })))
        cookieCria('meuPedido', [])
    }


    const selecionou = useCallback(async (checked: boolean, nome: string, duracao: number, valor: number) => { //serviços solicitados
        // console.log({ nome, duracao })
        let auxPedido: { nome: string, duracao: number, valor: number, solicitado: boolean }[] = pedido?.item
        if (checked) {
            auxPedido.push({ nome, duracao, valor, solicitado: false })
        } else {
            auxPedido.splice(auxPedido.findIndex((v: { nome: string }) => v.nome == nome), 1)
        }

        setPedido({ item: auxPedido, controle: Math.floor(Math.random() * 20) })
        cookieCria('meuPedido', auxPedido)
        // console.log({ pedido })

    }, [pedido])

    const alterarPedido = useCallback((item: any) => {
        cookieCria('meuPedido', item)
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


    useEffect(() => {
        // if (servicos[0]) {
        //     setServicos(servicos.map((serv: {
        //         id: string,
        //         nome: string,
        //         descricao: string,
        //         duracao: number,
        //         procedimento: null,
        //         createdAt: Date,
        //         updatedAt: Date
        //     }) => ({
        //         ...serv,
        //         checked: testaChecked(serv.nome)
        //     })))
        // }



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

            <div className="App">
                <p>
                    {/* <button onClick={selectAll}>Select All</button> */}
                    <button onClick={unSelectAll}>Unselect All</button>
                </p>
                {servicos.map((serv, index) => (
                    <Checkbox
                        key={serv.nome}
                        isChecked={serv.checked}
                        checkHandler={() => updateCheckStatusServico(index)}
                        label={serv.nome}
                        index={index}
                    />
                ))}

                <p>

                </p>
            </div>
            <AgCalendario pedido={pedido} funcao={alterarPedido} agenda={props.agenda} />
        </div>
    )
    // <pre>{JSON.stringify(toppings, null, 2)}</pre>

}