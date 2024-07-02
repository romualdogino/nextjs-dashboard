import { fetchAgendas } from "@/app/lib/data-mongodb";
import AgCalendarioADM from "@/app/ui/agenda/ag-calendarioADM";

export default async function PageAdm(props: any) {
    let data = new Date()
    let mes = data.getMonth() + 1
    let ano = data.getFullYear()
    // console.log(mes)
    const agenda = await fetchAgendas(mes, ano);
    return (
        <>
            <AgCalendarioADM agenda={agenda}/>
        </>
    )
}