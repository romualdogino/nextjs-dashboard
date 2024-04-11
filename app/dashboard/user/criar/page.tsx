import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/user/create-form";

export default async function Page() {
    return (
        <main>
            <Breadcrumbs 
            breadcrumbs={[
                {label: "Usuários", href: '/dashboard/usuarios'},
                {
                    label: 'Criar Usuário',
                    href: '/dashboard/user/criar',
                    active: true,
                  }
            ]} />
            <Form />
        </main>
    )
}