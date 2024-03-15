import NavBar from "@/components/navbar"
export default async function PublicLayout({
  children
}: {
  children: React.ReactNode
}) {
  
  return (
    <div className="flex flex-col h-full">
        <NavBar />
        {children}
    </div>
  )
}