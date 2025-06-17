'use client';

import { useMutation } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface RemoveDialogProps {
    documentId: Id<"documents">
    children: React.ReactNode
}

export const RemoveDialog = ({ documentId, children }: RemoveDialogProps) => {

    const router = useRouter();

    const remove = useMutation(api.documents.removeById);

    const [isRemoving, setIsRemoving] = useState(false);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this document?</AlertDialogTitle>
                    <AlertDialogDescription>This actin cannot be undone. This will permanently delete your work.</AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            disabled={isRemoving}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsRemoving(true);
                                remove({ id: documentId })
                                    .then(() => {
                                        router.push("/")
                                        toast.success("Document deleted successfully");  
                                    })
                                    .catch(() => toast.error("Something went wrong"))
                                    .finally(() => setIsRemoving(false)
                                    )
                            }
                            }
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}



// 'use client';

// import { useMutation } from "convex/react";
// import { Id } from "../../convex/_generated/dataModel";
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
// } from "./ui/alert-dialog";
// import { api } from "../../convex/_generated/api";
// import { useState } from "react";
// import { toast } from "sonner";

// interface RemoveDialogProps {
//     documentId: Id<"documents">;
//     children: React.ReactNode;
// }

// export const RemoveDialog = ({ documentId, children }: RemoveDialogProps) => {
//     const remove = useMutation(api.documents.removeById);
//     const [isRemoving, setIsRemoving] = useState(false);

//     const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
//         e.stopPropagation();
//         setIsRemoving(true);

//         try {
//             await remove({ id: documentId });
//             toast.success("Document deleted successfully");
//         } catch (error: any) {
//             console.error("Delete error:", error);


//             if (error instanceof Error) {
//                 toast.error(error.message);
//             } else {
//                 toast.error("Something went wrong while deleting");
//             }
//         } finally {
//             setIsRemoving(false);
//         }
//     };

//     return (
//         <AlertDialog>
//             <AlertDialogTrigger asChild>
//                 {children}
//             </AlertDialogTrigger>
//             <AlertDialogContent onClick={(e) => e.stopPropagation()}>
//                 <AlertDialogHeader>
//                     <AlertDialogTitle>
//                         Are you sure you want to delete this document?
//                     </AlertDialogTitle>
//                     <AlertDialogDescription>
//                         This action cannot be undone. This will permanently delete your work.
//                     </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                     <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
//                         Cancel
//                     </AlertDialogCancel>
//                     <AlertDialogAction disabled={isRemoving} onClick={handleDelete}>
//                         {isRemoving ? "Deleting..." : "Delete"}
//                     </AlertDialogAction>
//                 </AlertDialogFooter>
//             </AlertDialogContent>
//         </AlertDialog>
//     );
// };
