import NavBar from "@/components/navbar";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";


export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  return (
    <div className="flex flex-col h-full">
      <NavBar userId={userId} />
      {children}
    </div>
  )
}