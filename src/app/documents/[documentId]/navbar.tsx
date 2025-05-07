// 'use client';

// import Image from "next/image"
// import Link from "next/link"
// import DocumentInput from "./document-input"
// import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar"
// import { BoldIcon, FileIcon, FileJsonIcon, FilePenIcon, FilePlusIcon, FileTextIcon, GlobeIcon, ItalicIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, StrikethroughIcon, TextIcon, TrashIcon, UnderlineIcon, Undo2Icon } from "lucide-react"
// import { BsFilePdf } from "react-icons/bs"
// import useEditorStore from "@/store/use-editor-store";
// import TableGridSelector from "@/components/tableGridSelector";

// const Navbar = () => {

//     const { editor } = useEditorStore(); // extracting editor to implement it in navbar

//     // const insertTable = ({ rows, cols }: { rows: number, cols: number }) => {
//     //     editor
//     //         ?.chain()
//     //         .focus()
//     //         .insertTable({ rows, cols, withHeaderRow: false })
//     //         .run()
//     // }

//     //new fn for inserting table
//     const insertTable = (rows: number, cols: number) => {
//         editor
//             ?.chain()
//             .focus()
//             .insertTable({ rows, cols, withHeaderRow: false })
//             .run()
//     }

//     // fn's for saving docs in json, html and text
//     const onDownload = (blob: Blob, filename: string) => {
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement("a")
//         a.href = url;
//         a.download = filename;
//         a.click();
//     };

//     const onSaveJSON = () => {
//         if (!editor) return;

//         const content = editor.getJSON();
//         const blob = new Blob([JSON.stringify(content)], {
//             type: "application/json",
//         });
//         onDownload(blob, `document.json`)
//     };

//     const onSaveHTML = () => {
//         if (!editor) return;

//         const content = editor.getHTML();
//         const blob = new Blob([content], {
//             type: "text/html",
//         });
//         onDownload(blob, `document.html`)
//     };

//     const onSaveText = () => {
//         if (!editor) return;

//         const content = editor.getText();
//         const blob = new Blob([content], {
//             type: "text/plain",
//         });
//         onDownload(blob, `document.txt`)
//     };

//     return (
//         <nav className="flex items-center justify-between">
//             <div className="flex items-center gap-2 m-2">
//                 <Link href='/'>
//                     <Image src={"/logo.svg"} alt="logo" width={36} height={36} className="transition-all duration-300 hover:brightness-90" />
//                 </Link>

//                 <div className="flex flex-col">
//                     {/* doc input */}
//                     <DocumentInput />

//                     {/* menubar */}
//                     <div className="flex">
//                         <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
//                             <MenubarMenu>
//                                 <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-neutral-200/80 h-auto cursor-pointer">
//                                     File
//                                 </MenubarTrigger>
//                                 <MenubarContent className="print:hidden">
//                                     <MenubarSub>
//                                         <MenubarSubTrigger>
//                                             <FileIcon className="size-4 mr-2" />
//                                             Save
//                                         </MenubarSubTrigger>
//                                         <MenubarSubContent>
//                                             <MenubarItem onClick={onSaveJSON}>
//                                                 <FileJsonIcon className="size-4 mr-2" />
//                                                 JSON
//                                             </MenubarItem>
//                                             <MenubarItem onClick={onSaveHTML}>
//                                                 <GlobeIcon className="size-4 mr-2" />
//                                                 HTML
//                                             </MenubarItem>
//                                             <MenubarItem onClick={() => window.print()}> {/* trick  */}
//                                                 <BsFilePdf className="size-4 mr-2" />
//                                                 PDF
//                                             </MenubarItem>
//                                             <MenubarItem onClick={onSaveText}>
//                                                 <FileTextIcon className="size-4 mr-2" />
//                                                 Text
//                                             </MenubarItem>
//                                         </MenubarSubContent>
//                                     </MenubarSub>
//                                     <MenubarItem>
//                                         <FilePlusIcon className="size-4 mr-2" />
//                                         New Document
//                                     </MenubarItem>

//                                     <MenubarSeparator />

//                                     <MenubarItem>
//                                         <FilePenIcon className="size-4 mr-2" />
//                                         Rename
//                                     </MenubarItem>
//                                     <MenubarItem>
//                                         <TrashIcon className="size-4 mr-2" />
//                                         Remove
//                                     </MenubarItem>

//                                     <MenubarSeparator />

//                                     <MenubarItem onClick={() => window.print()}>
//                                         <PrinterIcon className="size-4 mr-2" />
//                                         Print <MenubarShortcut>Ctrl+P</MenubarShortcut>
//                                     </MenubarItem>
//                                 </MenubarContent>
//                             </MenubarMenu>

//                             <MenubarMenu>
//                                 <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-neutral-200/80 h-auto cursor-pointer">
//                                     Edit
//                                 </MenubarTrigger>
//                                 <MenubarContent>
//                                     <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
//                                         <Undo2Icon className="size-4 mr-2" />
//                                         Undo<MenubarShortcut>Ctrl+Z</MenubarShortcut>
//                                     </MenubarItem>
//                                     <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
//                                         <Redo2Icon className="size-4 mr-2" />
//                                         Redo<MenubarShortcut>Ctrl+Y</MenubarShortcut>
//                                     </MenubarItem>
//                                 </MenubarContent>
//                             </MenubarMenu>

//                             <MenubarMenu>
//                                 <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-neutral-200/80 h-auto cursor-pointer">
//                                     Insert
//                                 </MenubarTrigger>
//                                 <MenubarContent>
//                                     <MenubarSub>
//                                         <MenubarSubTrigger>
//                                             Table
//                                         </MenubarSubTrigger>
//                                         <MenubarSubContent>
//                                             <div className="p-0 cursor-default hover:bg-transparent">
//                                                 <TableGridSelector onInsert={insertTable} />
//                                             </div>
//                                         </MenubarSubContent>
//                                     </MenubarSub>
//                                 </MenubarContent>
//                             </MenubarMenu>

//                             <MenubarMenu>
//                                 <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-neutral-200/80 h-auto cursor-pointer">
//                                     Format
//                                 </MenubarTrigger>
//                                 <MenubarContent>
//                                     <MenubarSub>
//                                         <MenubarSubTrigger>
//                                             <TextIcon className="size-4 mr-2" />Text
//                                         </MenubarSubTrigger>
//                                         <MenubarSubContent>
//                                             <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
//                                                 <BoldIcon className="size-4 mr-2" /> Bold<MenubarShortcut>Ctrl+B</MenubarShortcut>
//                                             </MenubarItem>
//                                             <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
//                                                 <ItalicIcon className="size-4 mr-2" /> Italic<MenubarShortcut>Ctrl+I</MenubarShortcut>
//                                             </MenubarItem>
//                                             <MenubarItem onClick={() => editor?.chain().focus().toggleUnderline().run()}>
//                                                 <UnderlineIcon className="size-4 mr-2" /> Underline<MenubarShortcut>Ctrl+U</MenubarShortcut>
//                                             </MenubarItem>
//                                             <MenubarItem onClick={() => editor?.chain().focus().toggleStrike().run()}>
//                                                 <StrikethroughIcon className="size-4 mr-2" /> Strikethrough<MenubarShortcut>Alt+Shift+5</MenubarShortcut>
//                                             </MenubarItem>
//                                         </MenubarSubContent>
//                                     </MenubarSub>
//                                     <MenubarItem onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
//                                         <RemoveFormattingIcon className="size-4 mr-2" />Clear Formatting
//                                     </MenubarItem>
//                                 </MenubarContent>
//                             </MenubarMenu>
//                         </Menubar>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     )
// }
// export default Navbar




'use client';

import Image from "next/image"
import Link from "next/link"
import DocumentInput from "./document-input"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar"
import { BoldIcon, FileIcon, FileJsonIcon, FilePenIcon, FilePlusIcon, FileTextIcon, GlobeIcon, ImageIcon, ItalicIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SearchIcon, StrikethroughIcon, TableIcon, TextIcon, TrashIcon, UnderlineIcon, Undo2Icon, UploadIcon } from "lucide-react"
import { BsFilePdf } from "react-icons/bs"
import useEditorStore from "@/store/use-editor-store";
import TableGridSelector from "@/components/tableGridSelector";
import { useState } from "react";
import CustomTable from "@/components/customTable";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Navbar = () => {

    const { editor } = useEditorStore(); // extracting editor to implement it in navbar

    //fn's for inserting table
    const [isTableMenuOpen, setIsTableMenuOpen] = useState(false)
    const insertTable = (rows: number, cols: number) => {
        editor
            ?.chain()
            .focus()
            .insertTable({ rows, cols, withHeaderRow: false })
            .run()
    }
    const insertCustomTable = (rows: number, cols: number) => {
        editor
            ?.chain()
            .focus()
            .insertTable({ rows, cols, withHeaderRow: false })
            .run()
    }

    // fn's for saving docs in json, html and text
    const onDownload = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a")
        a.href = url;
        a.download = filename;
        a.click();
    };

    const onSaveJSON = () => {
        if (!editor) return;

        const content = editor.getJSON();
        const blob = new Blob([JSON.stringify(content)], {
            type: "application/json",
        });
        onDownload(blob, `document.json`)
    };

    const onSaveHTML = () => {
        if (!editor) return;

        const content = editor.getHTML();
        const blob = new Blob([content], {
            type: "text/html",
        });
        onDownload(blob, `document.html`)
    };

    const onSaveText = () => {
        if (!editor) return;

        const content = editor.getText();
        const blob = new Blob([content], {
            type: "text/plain",
        });
        onDownload(blob, `document.txt`)
    };

    // fn for image upload 
    // const ImageButton = () => {
    //     const { editor } = useEditorStore();
    //     const [isDialogOpen, setIsDialogOpen] = useState(false);
    //     const [imageUrl, setImageUrl] = useState("");

    //     const onChange = (src: string) => {
    //         editor?.chain().focus().setImage({ src }).run();
    //         setImageUrl("");
    //     }

    //     const onUpload = () => {
    //         const input = document.createElement("input");
    //         input.type = "file";
    //         input.accept = "image/*"

    //         input.onchange = (e) => {
    //             const file = (e.target as HTMLInputElement).files?.[0];
    //             if (file) {
    //                 const imageUrl = URL.createObjectURL(file)
    //                 onChange(imageUrl)
    //             }
    //         }

    //         input.click();
    //     }

    //     const handleImageUrlSubmit = () => {
    //         if (imageUrl) {
    //             onChange(imageUrl);
    //             setImageUrl("");
    //             setIsDialogOpen(false);
    //         }
    //     }

    //     return (
    //         <>
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <button
    //                         className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-300/80 px-1.5 overflow-hidden text-sm">
    //                         <ImageIcon className='size-4' />
    //                     </button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent>
    //                     <DropdownMenuItem onClick={onUpload}>
    //                         <UploadIcon className='size-4 mr-2 ' />
    //                         Upload
    //                     </DropdownMenuItem>
    //                     <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
    //                         <SearchIcon className='size-4 mr-2 ' />
    //                         Paste image URL
    //                     </DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>

    //             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    //                 <DialogContent>
    //                     <DialogHeader>
    //                         <DialogTitle>Insert image URL</DialogTitle>
    //                     </DialogHeader>
    //                     <Input
    //                         placeholder='Insert image URL'
    //                         value={imageUrl}
    //                         onChange={(e) => setImageUrl(e.target.value)}
    //                         onKeyDown={(e) => {
    //                             if (e.key === "Enter") {
    //                                 handleImageUrlSubmit();
    //                             }
    //                         }}
    //                     />
    //                     <DialogFooter>
    //                         <Button onClick={handleImageUrlSubmit}>
    //                             Insert
    //                         </Button>
    //                     </DialogFooter>
    //                 </DialogContent>

    //             </Dialog>
    //         </>
    //     )
    // }

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const onChange = (src: string) => {
        editor?.chain().focus().setImage({ src }).run();
        setImageUrl("");
    };

    const onUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                onChange(imageUrl);
            }
        };

        input.click();
    };

    const handleImageUrlSubmit = () => {
        if (imageUrl) {
            onChange(imageUrl);
            setImageUrl("");
            setIsDialogOpen(false);
        }
    };

    return (
        <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2 m-2">
                <Link href='/'>
                    <Image src={"/logo.svg"} alt="logo" width={36} height={36} className="transition-all duration-300 hover:brightness-90" />
                </Link>

                <div className="flex flex-col">

                    {/* doc input */}
                    <DocumentInput />

                    {/* menubar */}
                    <div className="flex">
                        <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-neutral-200/80 h-auto cursor-pointer">
                                    File
                                </MenubarTrigger>
                                <MenubarContent className="print:hidden">
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <FileIcon className="size-4 mr-2" />
                                            Save
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={onSaveJSON}>
                                                <FileJsonIcon className="size-4 mr-2" />
                                                JSON
                                            </MenubarItem>
                                            <MenubarItem onClick={onSaveHTML}>
                                                <GlobeIcon className="size-4 mr-2" />
                                                HTML
                                            </MenubarItem>
                                            <MenubarItem onClick={() => window.print()}> {/* trick  */}
                                                <BsFilePdf className="size-4 mr-2" />
                                                PDF
                                            </MenubarItem>
                                            <MenubarItem onClick={onSaveText}>
                                                <FileTextIcon className="size-4 mr-2" />
                                                Text
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarItem>
                                        <FilePlusIcon className="size-4 mr-2" />
                                        New Document
                                    </MenubarItem>

                                    <MenubarSeparator />

                                    <MenubarItem>
                                        <FilePenIcon className="size-4 mr-2" />
                                        Rename
                                    </MenubarItem>
                                    <MenubarItem>
                                        <TrashIcon className="size-4 mr-2" />
                                        Remove
                                    </MenubarItem>

                                    <MenubarSeparator />

                                    <MenubarItem onClick={() => window.print()}>
                                        <PrinterIcon className="size-4 mr-2" />
                                        Print <MenubarShortcut>Ctrl+P</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-neutral-200/80 h-auto cursor-pointer">
                                    Edit
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                                        <Undo2Icon className="size-4 mr-2" />
                                        Undo<MenubarShortcut>Ctrl+Z</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                                        <Redo2Icon className="size-4 mr-2" />
                                        Redo<MenubarShortcut>Ctrl+Y</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-neutral-200/80 h-auto cursor-pointer">
                                    Insert
                                </MenubarTrigger>
                                <MenubarContent>
                                    <>
                                        <MenubarSub>
                                            <MenubarSubTrigger>
                                                <ImageIcon className="size-4 mr-2" />
                                                Image
                                            </MenubarSubTrigger>
                                            <MenubarSubContent>
                                                <MenubarItem onClick={onUpload}>
                                                    <UploadIcon className="size-4 mr-2" />Uplod from device
                                                </MenubarItem>
                                                {/* trick for pasting url (self) */}
                                                <div className="flex flex-row p-[2px] hover:bg-neutral-100 hover:cursor-default rounded-sm" onClick={() => setIsDialogOpen(true)}>
                                                    <SearchIcon className="size-4 ml-1 mr-4 text-neutral-500 text-sm" /><p className="text-black/80 top-0 text-sm">Paste URL</p>
                                                </div>
                                            </MenubarSubContent>
                                        </MenubarSub>
                                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Insert image URL</DialogTitle>
                                                </DialogHeader>
                                                <Input
                                                    placeholder="Insert image URL"
                                                    value={imageUrl}
                                                    onChange={(e) => setImageUrl(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            handleImageUrlSubmit();
                                                        }
                                                    }}
                                                />
                                                <DialogFooter>
                                                    <Button onClick={handleImageUrlSubmit}>Insert</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </>
                                    <MenubarSub open={isTableMenuOpen} onOpenChange={setIsTableMenuOpen}>
                                        <MenubarSubTrigger>
                                            <TableIcon className="size-4 mr-2" />
                                            Table
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem className="p-0 cursor-default hover:bg-transparent">
                                                <TableGridSelector onInsert={insertTable} />
                                            </MenubarItem>

                                            <MenubarSeparator />

                                            <div className="w-full">
                                                <CustomTable
                                                    onInsert={(rows, cols) => {
                                                        insertCustomTable(rows, cols)
                                                        setIsTableMenuOpen(false) // ✅ Close on custom insert
                                                    }}
                                                />
                                            </div>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                </MenubarContent>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-neutral-200/80 h-auto cursor-pointer">
                                    Format
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <TextIcon className="size-4 mr-2" />Text
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
                                                <BoldIcon className="size-4 mr-2" /> Bold<MenubarShortcut>Ctrl+B</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
                                                <ItalicIcon className="size-4 mr-2" /> Italic<MenubarShortcut>Ctrl+I</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                                                <UnderlineIcon className="size-4 mr-2" /> Underline<MenubarShortcut>Ctrl+U</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleStrike().run()}>
                                                <StrikethroughIcon className="size-4 mr-2" /> Strikethrough<MenubarShortcut>Alt+Shift+5</MenubarShortcut>
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarItem onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                                        <RemoveFormattingIcon className="size-4 mr-2" />Clear Formatting
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar
