import { ThemeToggle } from "@/components/ui/theme-toggle"

export default async function PublicLayout({
  children
}: {
  children: React.ReactNode
}) {
  
  return (
    <div className="flex flex-col h-full">
        <div className="border-b">
        <div className="flex h-16 items-center px-4">
            <div className="ml-auto flex items-center space-x-4">
                <ThemeToggle />
            </div>
        </div>
        </div>
        {children}
    </div>
  )
}