import { HeartIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Addpet } from "./buttons";
import FormPet from "./create-form-pet";
import PetTable from "./tabela-pet";

export default function AddPet(props: any) {
    return (
        <main>

            <FormPet idCliente={props.params} />
            <PetTable idCliente={props.params}/>
            <Addpet id={props.params}/>


        </main>
    )
}