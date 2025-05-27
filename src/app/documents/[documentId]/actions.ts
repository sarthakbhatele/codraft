// 'use server'

// import { auth, clerkClient } from "@clerk/nextjs/server"

// export async function getUsers() {
//     const {sessionClaims} = await auth();
//     const clerk = await clerkClient();

//     const response = await clerk.users.getUserList({
//         organizationId: [sessionClaims?.org_id as string]
//     })

//     const users = response.data.map((user)=>({
//         id: user.id,
//         name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
//         avatar: user.imageUrl
//     }));

//     return users
// }

'use server'
import { auth, clerkClient } from "@clerk/nextjs/server"
import { ConvexHttpClient } from "convex/browser";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function getDocuments(ids:Id<"documents">[]) {
    return await convex.query(api.documents.getByIds, {ids})
}

export async function getUsers() {
    const { sessionClaims } = await auth();
    // console.log("Session claims:", sessionClaims);

    const orgId = (sessionClaims?.o as { id?: string })?.id;

    if (!orgId) {
        console.log("No org_id found inside sessionClaims.o");
        return [];
    }

    const clerk = await clerkClient();

    const response = await clerk.users.getUserList({
        organizationId: [orgId]
    });

    const users = response.data.map((user) => ({
        id: user.id,
        name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
        avatar: user.imageUrl
    }));

    // console.log("Mapped users:", users);

    return users;
}




// ======

// 'use server';

// import { auth, clerkClient } from "@clerk/nextjs/server";
// import type { User as ClerkUser } from "@clerk/backend";

// interface ClerkSessionClaims {
//   o?: {
//     id: string;
//     rol: string;
//     slg: string;
//   };
//   [key: string]: any;
// }

// interface AppUser {
//   id: string;
//   name: string;
//   avatar: string;
// }

// export async function getUsers(): Promise<AppUser[]> {
//   try {
//     const { sessionClaims } = await auth();

//     const claims = sessionClaims as ClerkSessionClaims | null;
//     const orgId = claims?.o?.id;

//     if (!orgId) {
//       console.error("❌ Organization ID not found in session");
//       return [];
//     }

//     //@ts-ignore
//     const response = await clerkClient.users.getUserList({
//       organizationId: [orgId],
//     });

//     const users: AppUser[] = response.data.map((user: ClerkUser) => ({
//       id: user.id,
//       name:
//         user.fullName ??
//         user.username ??
//         user.primaryEmailAddress?.emailAddress ??
//         "Anonymous",
//       avatar: user.imageUrl,
//     }));

//     return users;
//   } catch (error) {
//     console.error("❌ Failed to fetch users:", error);
//     return [];
//   }
// }
