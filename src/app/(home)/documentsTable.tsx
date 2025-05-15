import { PaginationStatus } from "convex/react";
import { Doc } from "../../../convex/_generated/dataModel";
import { LoaderIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DocumentRow from "./documentRow";
import { Button } from "@/components/ui/button";

interface DocumentsTableProps {
    documents: Doc<"documents">[] | undefined;
    loadMore: (numItems: number) => void;
    status: PaginationStatus
}

const DocumentsTable = ({ documents, loadMore, status }: DocumentsTableProps) => {
    return (
        <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
            {documents === undefined ? (
                <div className="flex items-center justify-center h-24"><LoaderIcon className="animate-spin text-muted-foreground" /></div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-neutral-100 border-none">
                            <TableHead>Name</TableHead>
                            <TableHead>&nbsp;</TableHead>
                            <TableHead className="hidden md:table-cell">Shared</TableHead>
                            <TableHead className="hidden md:table-cell">Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    {documents.length === 0 ? (
                        <TableBody>
                            <TableRow className="hover:bg-neutral-100">
                                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                    No Documents Found!
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ) : (
                        <TableBody>
                            {documents.map((document) => (
                                <DocumentRow key={document._id} document={document} />
                            ))}
                        </TableBody>
                    )}
                </Table>
            )}
            <div className="flex items-center justify-center">
                <Button
                    size={'sm'}
                    variant={'ghost'}
                    onClick={() => loadMore(5)}
                    disabled={status !== "CanLoadMore"}
                >
                    {status==="CanLoadMore" ? "Load More" : "End of Results"}
                </Button>
            </div>
        </div>
    )
}
export default DocumentsTable