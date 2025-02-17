import { Suspense } from "react"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { getClienti } from "./action"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CirclePlus } from "lucide-react"



export default async function Clients() {
  const profiles = await getClienti()
  return (
    <div className="p-4 w-full">
      
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">I Tuoi Clienti</h1>
          {
            /*  DA SVILUPPARE IN FUTURO
            <Button asChild>
            <Link href={"/admin/customers/new"}>
              <CirclePlus />
              <p>Crea nuova Cliente</p>
            </Link>
            </Button>
            */
          }
          
        </div>
            <DataTable columns={columns} data={profiles} />
          </div>
        </Suspense>
      
    </div>
  )
}



