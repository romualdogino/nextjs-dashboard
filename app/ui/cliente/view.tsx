'use client'

import { useParams } from "next/navigation";


export default function ViewCliente(props: any) {
    // console.log(props.servicos)

    const params = useParams<{ tag: string; item: string }>

    return (
        <>

        
        </>

    )
}