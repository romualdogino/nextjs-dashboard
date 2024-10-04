import { HeartIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Addpet } from "./buttons";
import FormPet from "./create-form-pet";
import PetTable from "./tabela-pet";

export default function AddPet(props: any) {
    // console.log({primeiro: props})
    return (
        <main>

            <FormPet cliente={props.cliente} idCliente={props.params.id} />
            <PetTable pets={props.params.pets}/>
            {/* <Addpet id={props.params}/> */}


        </main>
    )
}