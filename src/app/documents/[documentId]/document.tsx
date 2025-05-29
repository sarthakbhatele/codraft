'use client'
import { Preloaded, usePreloadedQuery } from "convex/react";
import Editor from "./editor";
import Navbar from "./navbar";
import { Room } from "./room";
import ToolBar from "./toolbar";
import { api } from "../../../../convex/_generated/api";

interface DocumentProps {
    preloadedDocument: Preloaded<typeof api.documents.getById>
}

export const Document = ({ preloadedDocument }: DocumentProps) => {
   
   const document = usePreloadedQuery(preloadedDocument)
    return (
        <Room>
            <div className="min-h-screen bg-[#FAFBFD]">

                <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#fafbfd] print:hidden">
                    <Navbar data={document} />
                    <ToolBar />
                </div>  

                <div className="pt-[144px] mt-2 print:pt-0 print:mt-0"> {/* og div style = pt-[114px] print:pt-0*/}
                    <Editor />
                </div>

            </div>
        </Room>
    )
}
