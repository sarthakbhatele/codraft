import { create } from 'zustand'
import { type Editor } from '@tiptap/react'

interface EditorState {
    editor: Editor | null;
    setEditor: (editor: Editor | null) => void;
};

const useEditorStore = create<EditorState>((set) => ({ // returning the object
    editor: null,
    setEditor: (editor) => set({ editor }),

}))

export default useEditorStore