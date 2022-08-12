import { EditorState, basicSetup } from "@codemirror/basic-setup";
import { defaultTabBinding } from "@codemirror/commands";
import { EditorView, keymap } from "@codemirror/view";
import { json } from "@codemirror/lang-json";

export default function setupEditors() {
  const jsonResponseBody = document.querySelector("[data-json-response-body]");

  const basicExtensions = [
    basicSetup,
    keymap.of([defaultTabBinding]),
    json(),
    EditorState.tabSize.of(2),
  ];

  const responseEditor = new EditorView({
    state: EditorState.create({
      doc: "{}",
      extensions: [...basicExtensions, EditorView.editable.of(false)],
    }),
    parent: jsonResponseBody,
  });

  function updateResponseEditor(value) {
    const jsonVal = JSON.parse(value);
    responseEditor.dispatch({
      changes: {
        from: 0,
        to: responseEditor.state.doc.length,
        insert: JSON.stringify(jsonVal, null, 2),
      },
    });
  }

  return { updateResponseEditor };
}
