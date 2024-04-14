'use server'
import { PrismaClient } from '@prisma/client'
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { unstable_noStore as noStore } from 'next/cache';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { json } from 'stream/consumers';

const prisma = new PrismaClient()


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

  console.log({ user })
  console.log(especialidades)
  const novoUser = await prisma.user.create({data:{
    name: user.nome,
    email: user.email,
    password: user.senha,
    especializacao: user.especialidades

  }})
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
export async function fetchFilteredServicos(

) {
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
  // console.log(formData)

  if (nome && tempo && descricao) {
    console.log("enviou")
    let servico = await prisma.servico.create({
      data: {
        nome: nome,
        duracao: parseInt(tempo, 10),
        descricao: descricao

      }
    })
    return servico
  }
  return null
}