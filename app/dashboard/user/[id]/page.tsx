import AbrirAgenda from "@/app/ui/user/abrirAgenda";
import { Metadata } from "next";
import { usePathname } from "next/navigation";

export const metadata: Metadata = {
    title: 'User',
};

export default async function Page({ params }: { params: { id: string } }) {
    // const pets = await fetchFilteredPets(params.id);
    // const cliente = await fetchCliente(params.id);

    // console.log(params.id)
    console.log(params)
    return (

        <div className="w-full">
            Olá, {params.id}

            <AbrirAgenda />
        </div>
    )
}