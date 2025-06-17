// import { auth, currentUser } from "@clerk/nextjs/server";
// import { ConvexHttpClient } from "convex/browser";
// import { api } from "../../../../convex/_generated/api";
// import { Liveblocks } from "@liveblocks/node"

// const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// const liveblocks = new Liveblocks({
//     secret: process.env.LIVEBLOCKS_SECRET_KEY!,
// });

// export async function POST(req: Request) {

//     const { sessionClaims } = await auth();
//     if (!sessionClaims) {
//         return new Response("Unauthorized", { status: 401 })
//     }
//     console.log({sessionClaims});

//     const user = await currentUser();
//     if (!user) {
//         return new Response("Unauthorized", { status: 401 });
//     }

//     const { room } = await req.json();

//     const document = await convex.query(api.documents.getById, { id: room });
//     if (!document) {
//         return new Response("Unauthorized", { status: 401 });
//     }

//     const isOwner = document.ownerId === user.id;
//     // const isOrganizationMember = !!(document.organizationId && document.organizationId === sessionClaims?.org_id);
//     const isOrganizationMember = document.organizationId === sessionClaims?.org_id;

//     if (!isOwner && !isOrganizationMember) {
//         return new Response("Unauthorized", { status: 401 });
//     }

//     const session = liveblocks.prepareSession(user.id, {
//         userInfo: {
//             name: user.fullName ?? "Anonymous",
//             avatar: user.imageUrl,
//         }
//     });
//     session.allow(room, session.FULL_ACCESS);
//     const { body, status } = await session.authorize();

//     return new Response(body, { status });

// }

// new code for extracting org_id as previous one was not working

import { auth, currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { Liveblocks } from "@liveblocks/node";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

// Define a custom type for session claims
interface ClerkSessionClaims {
    o?: {
        id: string;
        rol: string;
        slg: string;
    };
    //  [key: string]: any; (error during run build)
    [key: string]: unknown;
}

export async function POST(req: Request) {
    // Auth and get session claims
    const { sessionClaims } = await auth();

    if (!sessionClaims) {
        return new Response("Unauthorized", { status: 401 });
    }

    // Get current user
    const user = await currentUser();
    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    // Parse request body
    const { room } = await req.json();

    // Get the document from Convex
    const document = await convex.query(api.documents.getById, { id: room });

    if (!document) {
        return new Response("Unauthorized", { status: 401 });
    }

    // Extract organization ID from sessionClaims
    const { o } = sessionClaims as ClerkSessionClaims;
    const organizationId = o?.id;

    // Check permissions
    const isOwner = document.ownerId === user.id;
    const isOrganizationMember = document.organizationId === organizationId;

    if (!isOwner && !isOrganizationMember) {
        return new Response("Unauthorized", { status: 401 });
    }

    // for different cursor colors for different user [assisted by gpt]
    const name = user.fullName ?? user.id ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous"
    let hash = 5381;
    for (let i = 0; i < name.length; i++) {
        hash = (hash * 33) ^ name.charCodeAt(i);
    }
    const hue = Math.abs(hash) % 360;
    const color = `hsl(${hue}, 90%, 45%)`;

    // Generate Liveblocks session
    const session = liveblocks.prepareSession(user.id, {
        userInfo: {
            name,
            avatar: user.imageUrl,
            //@ts-expect-error This is for different colors for users
            color,
        },
    });

    // Allow full access to the document's room
    session.allow(room, session.FULL_ACCESS);

    const { body, status } = await session.authorize();

    return new Response(body, { status });
}

