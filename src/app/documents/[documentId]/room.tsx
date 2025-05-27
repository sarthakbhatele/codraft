"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import FullScreenLoader from "@/components/fullScreenLoader";
import { getUsers } from "./actions";
import { toast } from "sonner";

type User = { id: string; name: string; avatar: string }

export function Room({ children }: { children: ReactNode }) {

  const params = useParams();

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const list = await getUsers();
        setUsers(list);
      }
      catch {
        toast.error("Failed to fetch users")
      }
    },
    [],
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers])

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint="/api/liveblocks-auth"

      resolveUsers={({ userIds }) => {
        return userIds.map(
          (userId) => users.find((user) => user.id === userId) ?? undefined,
          console.log(userIds)
        )
      }}

      resolveMentionSuggestions={({ text }) => {

        let filteredUsers = users;

        if (text) {
          filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          )
        }

        return filteredUsers.map((user) => user.id)
      }}
      resolveRoomsInfo={() => []}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<FullScreenLoader label="Room loading.." />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}





// "use client";

// import { ReactNode, useEffect, useState } from "react";
// import {
//   LiveblocksProvider,
//   RoomProvider,
//   ClientSideSuspense,
// } from "@liveblocks/react/suspense";
// import { useParams } from "next/navigation";
// import FullScreenLoader from "@/components/fullScreenLoader";
// import { getUsers } from "./actions";
// import { toast } from "sonner";

// type User = { id: string; name: string; avatar: string };

// export function Room({ children }: { children: ReactNode }) {
//   const params = useParams();
//   const [users, setUsers] = useState<User[]>([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const list = await getUsers();
//         setUsers(list);
//       } catch (error) {
//         toast.error("Failed to fetch users");
//       }
//     };
//     fetchUsers();
//   }, []);

//   return (
//     <LiveblocksProvider
//       throttle={16}
//       authEndpoint="/api/liveblocks-auth"
//       resolveUsers={({ userIds }) => {
//         const resolved = userIds.map((userId) => {
//           const match = users.find((u) => u.id === userId);
//           return match ? { ...match } : undefined;
//         });
//         return resolved;
//       }}
//       resolveMentionSuggestions={({ text }) => {
//         let filteredUsers = users;

//         if (text) {
//           filteredUsers = users.filter((user) =>
//             user.name.toLowerCase().includes(text.toLowerCase())
//           );
//         }

//         // ✅ Return just an array of user IDs
//         return filteredUsers.map((user) => user.id);
//       }}

//       resolveRoomsInfo={() => []}
//     >
//       <RoomProvider id={params.documentId as string}>
//         <ClientSideSuspense
//           fallback={<FullScreenLoader label="Room loading.." />}
//         >
//           {children}
//         </ClientSideSuspense>
//       </RoomProvider>
//     </LiveblocksProvider>
//   );
// }
