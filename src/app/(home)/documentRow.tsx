import { TableCell, TableRow } from "@/components/ui/table"
import { Doc } from "../../../convex/_generated/dataModel"
import Image from "next/image"
import { Building2Icon, CircleUserIcon } from "lucide-react"
import { format } from "date-fns"
import DocumentMenu from "./documentMenu"
import { useRouter } from "next/navigation"
interface DocumentsRowProps {
  document: Doc<"documents">
}
const DocumentRow = ({ document }: DocumentsRowProps) => {

  const router = useRouter();

  const onRowClick = (id: string) => {
    router.push(`/documents/${id}`)
  }

  const onNewTabClick = (id: string) => {
    window.open(`/documents/${id}, "_blank`)
  }

  return (
    <TableRow className="cursor-pointer"
      onClick={() => onRowClick(document._id)}
    >
      <TableCell className="w-[50px]">
        <Image alt="doc" src={'/cdlogo.png'} width={20} height={12} />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">
        {document.title}
      </TableCell>

      <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
        {document.organizationId ? <Building2Icon className="size-4" /> : <CircleUserIcon className="size-4" />}
        {document.organizationId ? "Organisation" : "Personal"}
      </TableCell>

      <TableCell className="text-muted-foreground hidden md:table-cell">
        {format(new Date(document._creationTime), "MMM dd, yyyy")}
      </TableCell>

      <TableCell className="flex justify-end">
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTab={onNewTabClick}
        />
      </TableCell>
    </TableRow>
  )
}
export default DocumentRow