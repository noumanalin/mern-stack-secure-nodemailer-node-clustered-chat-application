import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

const TiptapEditor = ({ message, setMessage }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Type your message...',
        emptyEditorClass: 'is-editor-empty', // this gets added to empty editor
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm min-h-[40px] outline-none border-none focus:outline-none focus:border-none',
      },
    },
    onUpdate: ({ editor }) => {
      setMessage(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <div className="flex-1 p-2 max-h-[250px] overflow-y-auto">
      <EditorContent
        editor={editor}
        className="tiptap"
      />
    </div>
  )
}

export default TiptapEditor
