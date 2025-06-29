import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect } from 'react'

const TiptapEditor = ({ message, setMessage, reset }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Type your message...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm min-h-[40px] outline-none border-none',
      },
    },
    onUpdate: ({ editor }) => {
      setMessage(editor.getHTML());
    },
  });

  // ✅ Reset editor content when reset flag changes
  useEffect(() => {
    if (editor && reset) {
      editor.commands.setContent('');
    }
  }, [reset]);

  if (!editor) return null;

  return (
    <div className="flex-1 p-2 max-h-[250px] overflow-y-auto">
      <EditorContent editor={editor} className="tiptap" />
    </div>
  );
};

export default TiptapEditor;
