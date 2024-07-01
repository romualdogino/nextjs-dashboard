import SideNav from '@/app/ui/dashboard/sidenav';
import { auth } from '@/auth';
 
export default async function Layout({ children }: { children: React.ReactNode }) {
  // const session = await auth()
  // console.log({session})
  //   const userS = session?.user
  return (
    <div className=" bg-gradient-to-br from-white to-purple-100 flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
