import { fetchFilteredServicos } from "@/app/lib/data-mongodb";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/cliente/create-form";

export default async function Page() {
    const servicos = await fetchFilteredServicos();
    let serv: string[] = []
    servicos.map(s=>{
        serv.push(s.nome)
    })
    console.log(serv)
    return (
        <main>
            <Breadcrumbs 
            breadcrumbs={[
                {label: "Cliente", href: '/dashboard/cliente'},
                {
                    label: 'Criar Cliente',
                    href: '/dashboard/cliente/criar',
                    active: true,
                  }
            ]} />
            <Form servicos = {serv}/>
        </main>
    )
}