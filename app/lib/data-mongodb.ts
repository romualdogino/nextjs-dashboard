'use server'
import { Compra, Prisma, PrismaClient } from '@prisma/client'
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { unstable_noStore as noStore } from 'next/cache';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { json } from 'stream/consumers';
import { boolean, date, string } from 'zod';
import { JsonValue } from '@prisma/client/runtime/library';

const prisma = new PrismaClient()
export async function fetchClientePedido(clienteId : string){
// console.log({clienteId})
const pedido = await prisma.pedido.findFirst({
  where:{
    clienteId,
    ativo: true
  }
})
return pedido
}
export async function postAgendamento(agendamento: any) {
  // console.log({ agendamento })
  try {
    let teste = await prisma.agendamento.findFirst({
      where: {
        dia: agendamento.dia,
        mes: agendamento.mes,
        ano: agendamento.ano
      }
    })
    // console.log({ teste })
    if (teste) {
      console.log("achou teste")
      const alterar = await updateAgentamento(teste.id, agendamento)
      // console.log(alterar)
      let pedido = await criarPedido(agendamento)

      // return alterar
      return pedido

    } else {
      console.log("não achou ... criar")
      //inicia o db
      let ag = await criarAgentamento(agendamento)
      let pedido = await criarPedido(agendamento)
      return ag

    }

  } catch (error) {
    console.log(error)
    return false
  }

}
async function criarPedido(agendamento: any) {
  var p1 = await prisma.pedido.findFirst({
    where: {
      clienteId: agendamento.agenda.clienteId,
      ativo: true
    }
  })
  if (p1) {
    //atualizar
    p1.lista.push({
      dia: agendamento.dia,
      mes: agendamento.mes,
      ano: agendamento.ano,
      pedido: [{
        userId: agendamento.agenda.userId,
        user: agendamento.agenda.user,
        clienteId: agendamento.agenda.clienteId,
        cliente: agendamento.agenda.cliente,
        petId: agendamento.agenda.petId,
        pet: agendamento.agenda.pet,
        servico: agendamento.agenda.servico,
        hora: agendamento.agenda.hora,
        horachegada: agendamento.agenda.horachegada,
        horasaida: agendamento.agenda.horasaida,
        tempoTotal: agendamento.agenda.tempoTotal,
        valorTotal: agendamento.agenda.valorTotal,
        pagamento: agendamento.agenda.pagamento,
        obs: "",
        compraId: "",
        createdAt: new Date(),

      }]
    })
    const upPedido = await prisma.pedido.update({
      where: {
        id: p1.id
      },
      data: { lista: p1.lista }
    })
    console.log("atualizado")
    return upPedido

  } else {
    //criar
    const pedido = await prisma.pedido.create({
      data: {
        clienteId: agendamento.agenda.clienteId,
        cliente: agendamento.agenda.cliente,
        ativo: true,
        lista: [{
          dia: agendamento.dia,
          mes: agendamento.mes,
          ano: agendamento.ano,
          pedido: [{
            userId: agendamento.agenda.userId,
            user: agendamento.agenda.user,
            clienteId: agendamento.agenda.clienteId,
            cliente: agendamento.agenda.cliente,
            petId: agendamento.agenda.petId,
            pet: agendamento.agenda.pet,
            servico: agendamento.agenda.servico,
            hora: agendamento.agenda.hora,
            horachegada: agendamento.agenda.horachegada,
            horasaida: agendamento.agenda.horasaida,
            tempoTotal: agendamento.agenda.tempoTotal,
            valorTotal: agendamento.agenda.valorTotal,
            pagamento: agendamento.agenda.pagamento,
            obs: "",
          }]
        }]
      }
    })
    return pedido
  }

}
async function updateAgentamento(id: string, agendamento: any) {
  const atualizado = await prisma.agendamento.update({
    where: {
      id
    },
    data: {
      agenda: {
        push: agendamento.agenda,
        // sort: 'asc',
        // fields: ['hora']

      },
    }
  })
  return atualizado
}
async function criarAgentamento(agendamento: any) {
  const ag = await prisma.agendamento.create({
    data: {
      dia: agendamento.dia,
      mes: agendamento.mes,
      ano: agendamento.ano,
      agenda: [{

        ...agendamento.agenda
      }],
    }
  })
  return ag
}
async function criarCompra(compra: any) {
  let somaValor = 0
  let co: Prisma.CompraCreateInput = {
    cliente: {
      connect: {
        id: compra.clienteId
      }
    },
    produtos: [],
    valor: 0,
  }
  compra.agenda.servico.map((s: any) => {
    co.produtos?.push({
      nome: s.servico,
      quantidade: s.quantidade,
      valorunit: s.valor,
      valorTotal: s.valor * s.quantidade,
    } as Prisma.ProdutoCreateInput)
    somaValor += s.valor * s.quantidade
  })
  co.valor = somaValor
  let comp = await prisma.compra.create({
    data: {
      ...co
    }
  })
  return comp
}

export async function updateAgendaADMById(dias, id) {
  if (dias && id) {
    let agenda = await prisma.agenda.update({
      where: { id },
      data: { dias }
    })
    return agenda
  }
}
export async function updateAgenda(item) {
  //   {
  //     hora,
  //     dia,
  //     mes: props.dados.mes,
  //     ano: props.dados.ano,
  //     nome: nome,
  //     especialista,
  // }
  // console.log(item)
  var agenda = await prisma.agenda.findFirst({
    where: { mes: item.mes, ano: item.ano }
  })
  agenda?.users?.map((ag: any) => {
    if (ag.nome == item.nome) {
      ag.dias.map((d: any) => {
        if (d.dia == item.dia) {
          d.agenda.push({
            hora: item.hora,
            pet: item.pet,
            servico: item.especialista,
            tempo: item.tempo
          })
        }
      })
    }
  })
  if (agenda) {
    const resp = await prisma.agenda.update({
      where: { id: agenda.id },
      data: { users: agenda?.users }
    })

    return resp
  }
  // console.log(agenda?.users[0].dias[item.dia - 1].agenda)
}
export async function fetchServicos() {

  const servicos = await prisma.servico.findMany()
  const lista: {
    checked: boolean;
    id: string;
    nome: string;
    descricao: string;
    procedimento: string | null;
    duracao: number;
    valor: number;
    createdAt: Date;
    updatedAt: Date;
  }[] = servicos.map(serv => ({ ...serv, checked: false }))
  return lista

}
export async function fetchPet(nome: string | null | undefined) {
  if (typeof nome == "string") {
    const user = await prisma.pet.findFirst({
      where: { id: nome },
      select: {

        nome: true,
        id: true
      }
    })
    return user
  }
}
export async function fetchAgendas(mes: number, ano: number) {
  const agenda = await prisma.agenda.findFirst({
    where: {
      mes: mes,
      ano: ano
    }
  }).then(async dados => {
    if (dados == null) {
      let agendaNova = await criarAgenda(mes, ano)
      let novaAgenda = await prisma.agenda.create({ data: agendaNova })
      return novaAgenda
    } else {
      return dados
    }
  })
  return agenda
}
export async function fetchUser(nome: string | null | undefined) {
  if (typeof nome == "string") {
    const user = await prisma.user.findFirst({
      where: { name: nome },
      select: {
        email: true,
        name: true,
        especializacao: true,
        id: true
      }
    })
    return user
  }
}
export async function postAbrirUserAgenda(post: any) {
  console.log(post)
  let mes = post.mes ? parseInt(post.mes) : 0
  let ano = post.ano ? parseInt(post.ano) : 0
  let agenda = await fetchAgendaUser(post.user, mes, ano)
  console.log({ agenda: agenda.users })
  if (agenda) {
    var newUsers = agenda.users
  }
  var newUsers = agenda.users
  if (agenda.users[0]) {
    console.log("achou user")

    // var aux = agenda.users.filter(u = > u.nome == post.user)
    var aux = agenda.users
    var indexUser = aux.findIndex(u => u.nome == post.user)
    console.log(indexUser)
    if (indexUser != -1) {
      console.log("tem o user")
      if (aux[indexUser].especialista && typeof aux[indexUser].especialista == 'object') {
        //verifica nova especialidade do user para o mes nos dias abertos

        await post.especialidades.forEach((i: string) => {
          if (aux[indexUser].especialista) {
            let verificar = aux[indexUser].especialista.indexOf(i)
            // console.log(verificar)
            if (verificar === -1) {
              aux[indexUser].especialista.push(i)
            }
          }
        })
        // console.log(aux[0].especialista)

      }
      //alterar os dias
      aux[indexUser].dias.map(dia => {
        post.dias.forEach((d: string) => {
          if (d == dia.dia) {
            dia.especialista = post.especialidades
            dia.tipo = "aberto"
            dia.horainicial = post.horainicial
            dia.horafinal = post.horafinal
            dia.horaintervaloinicial = post.horaintervaloinicial
            dia.horaintervalofinal = post.horaintervalofinal
          }
        })
      })
      let resultado2 = await prisma.agenda.updateMany({
        where: {
          mes: mes, ano: ano
        },
        data: {
          users: aux
        },
      })
      console.log({ aux: aux[indexUser] })
      return aux

    } else {
      console.log("não tem o user")
      let newUserAgenda = await criarUserAgenda(agenda, post)
      newUsers.push(newUserAgenda)
      if (mes && ano) {
        let result = await prisma.agenda.updateMany({
          where: {
            mes: mes, ano: ano,
          },
          data: {
            users: newUsers
          },
        })
        return result
      }
    }
  } else {
    console.log("não tem user")
    let newUserAgenda = await criarUserAgenda(agenda, post)
    newUsers.push(newUserAgenda)
    if (mes && ano) {
      let result = await prisma.agenda.updateMany({
        where: {
          mes: mes, ano: ano,
        },
        data: {
          users: newUsers
        },
      })
      return result
    }
  }
}
async function criarUserAgenda(agenda: any, post: any) {
  let newAgenda: {
    nome: string,
    especialista: JsonValue,
    obs: string,
    dias: {
      dia: string,
      tipo: string,
      especialista: JsonValue,
      agenda: JsonValue
      horainicial: number
      horafinal: number
      horaintervaloinicial: number
      horaintervalofinal: number
    }[]
  } = {
    nome: post.user,
    especialista: post.especialidades,
    obs: "",
    dias: [],
  }
  for (let index = 1; index <= 31; index++) {
    let aux = await post.dias.find((d: string) => parseInt(d) === index)
    if (aux) {
      newAgenda.dias.push({
        dia: index.toString(),
        tipo: "aberto",
        especialista: post.especialidades,
        agenda: [],
        horainicial: post.horainicial,
        horafinal: post.horafinal,
        horaintervaloinicial: post.horaintervaloinicial,
        horaintervalofinal: post.horaintervalofinal,
      })
    } else {
      newAgenda.dias.push({
        dia: index.toString(),
        tipo: "",
        especialista: "",
        agenda: [],
        horainicial: 0,
        horafinal: 0,
        horaintervaloinicial: 0,
        horaintervalofinal: 0,
      })
    }

  }
  // console.log(newAgenda)
  return newAgenda
}
export async function fetchAgendaUser(nome: string, mes: number, ano: number) {
  const agenda = await prisma.agenda.findFirst({
    where: {
      mes: mes,
      ano: ano
    }
  }).then(async dados => {
    if (dados == null) {
      let agendaNova = await criarAgenda(mes, ano)
      let novaAgenda = await prisma.agenda.create({ data: agendaNova })
      return novaAgenda
    } else {
      return dados
    }
  })
  return agenda
}
async function criarAgenda(mes: number, ano: number) {
  type Dias = { dia: string, tipo: string }
  type Agenda = { mes: number, ano: number, dias: Dias[], users: [] }
  // console.log({mes,ano})
  let agenda: Agenda = {
    mes: mes,
    ano: ano,
    dias: [],//caledario []
    users: []
  }
  agenda.dias = await criarCalendarioMes(mes, ano)
  return agenda
}
async function criarCalendarioMes(mesEntrada: number, anoEntrada: number) {
  let data = new Date(`${anoEntrada}-${mesEntrada}`)
  var diaSemana = data.getDay()
  var dia = data.getDate()
  var mes = data.getMonth() + 1
  var ano = data.getFullYear()
  var ultimoDia = monthLength(mes, ano)
  var primeiroDiaSemana = firstDiaSemana(mes, ano)
  // console.log(data)
  function monthLength(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  };

  function firstDiaSemana(month: number, year: number) {
    return new Date(year, month - 1, 1).getDay();
  };
  function viewCalendario() {
    let aux = []
    for (let index = 1; index <= primeiroDiaSemana; index++) {
      aux.push({ dia: "", tipo: "" })
    }
    for (let index = 1; index <= ultimoDia; index++) {
      aux.push({ dia: index.toString(), tipo: "" })
    }
    // console.log(aux)

    return aux

  }
  let ca = await viewCalendario()

  return ca
}
export async function fetchFilteredPets(id: string) {
  noStore();


  try {
    const pets = await prisma.pet.findMany({
      where: { tutorId: id },
      select: {
        id: true, nome: true
      }
    })
    console.log(pets)
    return pets;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}
export async function fetchCliente(id: string) {
  // console.log(id + "aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: id }
    })
    // console.log({zzz:cliente})
    return cliente
  } catch (error) {
    console.log("error")
  }
}
// export async function fetchInvoicesPages(query: string) {
//   noStore();
//   try {
//     //   const count = await sql`SELECT COUNT(*)
//     //   FROM invoices
//     //   JOIN customers ON invoices.customer_id = customers.id
//     //   WHERE
//     //     customers.name ILIKE ${`%${query}%`} OR
//     //     customers.email ILIKE ${`%${query}%`} OR
//     //     invoices.amount::text ILIKE ${`%${query}%`} OR
//     //     invoices.date::text ILIKE ${`%${query}%`} OR
//     //     invoices.status ILIKE ${`%${query}%`}
//     // `;
//     const count = await prisma.servico.findMany()

//     const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
//     return totalPages;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch total number of invoices.');
//   }
// }
export type User = {
  nome: string, cpf: string, fone: string, email: string, senha: string, setorId: string
}
export async function createPet(data: any) {
  console.log(data)
  // console.log(prevState)

  // let dados: any = {


  //   // tutorId: formData.get('cliente')?.toString(),
  //   // nome: formData.get('nome')?.toString(),
  //   // tipo: formData.get('tipo')?.toString(),
  // }
  // console.log(dados)

  try {


    const novoPet = await prisma.pet.create({
      data: { ...data }
    })
    console.log(novoPet)


  } catch (error) {
    console.log(error)
  }

}



export async function findListaPets() {
  let data = await prisma.pet.findMany()
  return data
}
export async function fetchPesquisaPets(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const pets = await prisma.pet.findMany({
      where: {
        nome: {

          contains: query,
          mode: 'insensitive',
        },
      },
    });

    return pets
      ;

    // const invoices = await sql<InvoicesTable>`
    //   SELECT
    //     invoices.id,
    //     invoices.amount,
    //     invoices.date,
    //     invoices.status,
    //     customers.name,
    //     customers.email,
    //     customers.image_url
    //   FROM invoices
    //   JOIN customers ON invoices.customer_id = customers.id
    //   WHERE
    //     customers.name ILIKE ${`%${query}%`} OR
    //     customers.email ILIKE ${`%${query}%`} OR
    //     invoices.amount::text ILIKE ${`%${query}%`} OR
    //     invoices.date::text ILIKE ${`%${query}%`} OR
    //     invoices.status ILIKE ${`%${query}%`}
    //   ORDER BY invoices.date DESC
    //   LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    // `;

    // return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    // throw new Error('Failed to fetch invoices.');
  }
}


export async function createCliente(prevState: State, formData: FormData) {
  var user: any = {}

  formData.forEach((value, key) => {
    if (!key.includes("$") && value != "") {
      user[key] = value
    } else { }
    // console.log(`${key}: ${value}`)
  })
  user.senha = await bcrypt.hash(user.senha, 10)

  console.log({ user })
  const novoUser = await prisma.cliente.create({
    data: {
      name: user.nome,
      email: user.email,
      password: user.senha,
      tipo: "cliente",
      cpf: user.cpf,
      contato: user.contato
    }
  })
  console.log(novoUser)
}
export async function createUser(prevState: State, formData: FormData) {
  var user: any = {}
  var especialidades: any = []

  formData.forEach((value, key) => {
    if (key == 'status') {
      especialidades.push(value)
    } else if (!key.includes("$") && value != "") {
      user[key] = value
    } else { }
    // console.log(`${key}: ${value}`)
  })
  user.especialidades = especialidades
  user.senha = await bcrypt.hash(user.senha, 10)

  // console.log({ user })
  // console.log(especialidades)
  const novoUser = await prisma.user.create({
    data: {
      name: user.nome,
      email: user.email,
      password: user.senha,
      tipo: "user",
      especializacao: user.especialidades

    }
  })
  console.log(novoUser)
  // // Validate form using Zod
  // const validatedFields = CreateInvoice.safeParse({
  //   customerId: formData.get('customerId'),
  //   amount: formData.get('amount'),
  //   status: formData.get('status'),
  // });

  // // If form validation fails, return errors early. Otherwise, continue.
  // if (!validatedFields.success) {
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //     message: 'Missing Fields. Failed to Create Invoice.',
  //   };
  // }

  // // Prepare data for insertion into the database
  // const { customerId, amount, status } = validatedFields.data;
  // const amountInCents = amount * 100;
  // const date = new Date().toISOString().split('T')[0];

  // // Insert data into the database
  // try {
  //   await sql`
  //     INSERT INTO invoices (customer_id, amount, status, date)
  //     VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  //   `;
  // } catch (error) {
  //   // If a database error occurs, return a more specific error.
  //   return {
  //     message: 'Database Error: Failed to Create Invoice.',
  //   };
  // }
  // // Revalidate the cache for the invoices page and redirect the user.
  // revalidatePath('/dashboard/invoices');
  // redirect('/dashboard/invoices');
}
const ITEMS_PER_PAGE = 6;
export async function fetchFilteredServicos() {
  noStore();


  try {
    // const invoices = await sql<InvoicesTable>`
    //   SELECT
    //     invoices.id,
    //     invoices.amount,
    //     invoices.date,
    //     invoices.status,
    //     customers.name,
    //     customers.email,
    //     customers.image_url
    //   FROM invoices
    //   JOIN customers ON invoices.customer_id = customers.id
    //   WHERE
    //     customers.name ILIKE ${`%${query}%`} OR
    //     customers.email ILIKE ${`%${query}%`} OR
    //     invoices.amount::text ILIKE ${`%${query}%`} OR
    //     invoices.date::text ILIKE ${`%${query}%`} OR
    //     invoices.status ILIKE ${`%${query}%`}
    //   ORDER BY invoices.date DESC
    //   LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    // `;
    const servicos = await prisma.servico.findMany({
      select: {
        id: true, nome: true, duracao: true, descricao: true
      }
    })
    // console.log(servicos)
    return servicos;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}
export async function fetchFilteredUser() {
  noStore();
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true, email: true, name: true, especializacao: true
      }
    })
    // console.log(users)
    return users
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}
export async function fetchFilteredCliente() {
  noStore();
  try {
    const users = await prisma.cliente.findMany({
      select: {
        id: true, email: true, name: true
      }
    })
    // console.log(users)
    return users
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
export async function getallServico() {
  let servicos = prisma.servico.findMany()
  return servicos
}
export async function createServico(State: State, formData: FormData) {
  // Validate form using Zod
  // const validatedFields = CreateServico.safeParse({
  //     customerId: formData.get('customerId'),
  //     amount: formData.get('amount'),
  //     status: formData.get('status'),
  // });
  let nome = formData.get('nome')?.toString()
  let tempo = formData.get('tempo')?.toString()
  let descricao = formData.get('descricao')?.toString()
  let valor = parseFloat(formData.get('valor')?.valueOf())
  // console.log(formData)

  if (nome && tempo && descricao) {
    console.log("enviou")
    let servico = await prisma.servico.create({
      data: {
        nome: nome,
        duracao: parseInt(tempo, 10),
        descricao: descricao,
        valor: valor == undefined ? 0.0 : valor

      }
    })
    return servico
  }
  return null
}