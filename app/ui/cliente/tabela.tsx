
import Image from 'next/image';
import { UpdateCliente, DeleteCliente, ViewCliente } from '@/app/ui/cliente/buttons';
// import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
// import { fetchFilteredInvoices } from '@/app/lib/data';
import { fetchFilteredServicos } from '@/app/lib/data-mongodb';
export type Servico = {
  id: string
  name: string
  email: string
  especializacao: string

}
export default async function ClienteTable(props: any) {
  // console.log(props.servicos)


  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {props.servicos?.map((servico: Servico) => {
              // var arr: [] = JSON.parse(servico.especializacao)



              return (
                <div
                  key={servico.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        {/* <Image
                        src={servico.nome}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${servico.nome}'s profile picture`}
                      /> */}
                        <p>{servico.name}</p>
                      </div>
                      <p className="text-sm text-gray-500">{servico.name}</p>
                    </div>
                    {/* <InvoiceStatus status={servico.status} /> */}
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">
                        {/* {formatCurrency(servico.amount)} */}
                      </p>
                      {/* <p>{formatDateToLocal(servico.date)}</p> */}
                    </div>
                    <div className="flex justify-end gap-2">
                      <ViewCliente id={servico.id} />
                      <UpdateCliente id={servico.id} />
                      <DeleteCliente id={servico.id} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nome
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  ...
                </th>

                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {props.servicos?.map((servico: Servico) => {
                // var arr:[] = servico.especializacao

                console.log(servico)
                return (

                  <tr
                    key={servico.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        {/* <Image
                        src={servico.nome}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${servico.nome}'s profile picture`}
                      /> */}
                        <p>{servico.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {servico.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {
                        // arr.map(i => i)
                        servico.especializacao
                      }
                    </td>

                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                      <ViewCliente id={servico.id} />
                        <UpdateCliente id={servico.id} />
                        <DeleteCliente id={servico.id} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
