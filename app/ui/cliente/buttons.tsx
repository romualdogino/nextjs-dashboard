import { CalendarDaysIcon, HeartIcon, PencilIcon, PlusCircleIcon, PlusIcon, TrashIcon, ViewfinderCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';


export function CreateCliente() {
  return (
    <Link
      href="/dashboard/cliente/criar"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Cria Cliente</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCliente({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/cliente/${id}/edit`}
      className="pointer-events-none rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
export function Addpet({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/pet/criar?id=${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PlusCircleIcon className="w-5" />  add PET
   
    </Link>
  );
}
export function ViewCliente({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/cliente/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <ViewfinderCircleIcon className="w-5" />
    </Link>
  );
}
export function ViewAgendar({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/agenda/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <CalendarDaysIcon className="w-5" />
    </Link>
  );
}
export function ViewPet({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/pet/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <ViewfinderCircleIcon className="w-5" />
    </Link>
  );
}

export function createPet({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/cliente/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PlusIcon className="w-5" />
    </Link>
  );
}

export function DeleteCliente({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (

    <form action={deleteInvoiceWithId}>
      <button className="pointer-events-none rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>

  );
}
