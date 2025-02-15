import RoomCard from "@/components/roomCardUI";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import getAllRoomsWithFotoAndTariffe, { StanzeConTariffeFoto } from "./action";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import { Tariffe } from "@prisma/client";
import TariffaCard from "@/components/TariffaCardUI";
import EditTariffaForm from "./EditTariffaForm";
//import TariffaCard from "@/components/TariffaCardUI";
//import EditTariffaForm from "./EditTariffaForm";

export default async function Rooms() {

  const rooms: StanzeConTariffeFoto[] = await getAllRoomsWithFotoAndTariffe();
  


  return (
    <div className="p-5 w-full">
      <div className="mb-4 flex flex-col  ">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Le tue Stanze</h1>
          <Button asChild>
            <Link href={"/admin/room/new"}>
              <CirclePlus />
              <p>Crea nuova Stanza</p>
            </Link>
          </Button>
        </div>
      </div>
      <div className="pt-4 flex w-full justify-start">
      {rooms.length === 0 ? <div className="w-full p-4 font-semibold text-lg flex items-center justify-center border rounded-md bg-white"><p>Non ci sono stanze create</p></div> :
        <div className="flex flex-col items-center w-full gap-3">
          {rooms.map((room: StanzeConTariffeFoto, index) => (

            <div key={crypto.randomUUID()} className="flex flex-col items-end w-full gap-3">
              <RoomCard
                key={room.idStanza}
                idStanza={room.idStanza}
                nome={room.nome}
                descrizione={room.descrizione}
                capienza={room.capienza}
                costoStandard={room.costoStandard}
                urlFoto={room.FotoStanze.map(foto => foto.url)}
              />

              {room.Tariffe.map((Tariffa: Tariffe) => (
                <TariffaCard key={Tariffa.idTariffa} tariffa={Tariffa} />
              ))}
              <EditTariffaForm key={crypto.randomUUID()} codStanza={room.idStanza} tariffa={null} />

            </div>
          ))
          }
        </div>
      }
      </div>




    </div>
  );
}

function RoomListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex bg-white rounded-lg shadow-md overflow-hidden max-w-2xl w-full h-48">
          <Skeleton className="w-1/3 h-full" />
          <div className="w-2/3 p-4 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex justify-end space-x-2 mt-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}