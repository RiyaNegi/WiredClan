import React from "react";
import { compose, withHandlers, withState, withPropsOnChange } from "recompose";
import { FormFeedback } from "reactstrap";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "./details.css";

function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imgur.com/3/image");
    xhr.setRequestHeader("Authorization", "Client-ID a7b451dcec71d8f");
    const data = new FormData();
    data.append("image", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener("error", () => {
      const error = JSON.parse(xhr.responseText);
      console.log("Image upload error:", error);
      reject(error);
    });
  });
}

const WysiwygEditor = ({
  input: { value, onChange },
  meta: { touched, error },
  editorState,
  onEditorStateChange,
}) => (
    <div className="WysiwygEditor">
      {editorState && (
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="editor"
          onEditorStateChange={onEditorStateChange}
          wrapperStyle={{ border: "1px solid gray", marginBottom: "20px" }}
          editorStyle={{ height: "100%", padding: "10px" }}
          stripPastedStyles={true}
          placeholder="Unleash the writer in you..."
          toolbar={{
            options: [
              "inline",
              "fontSize",
              "blockType",
              "image",
              "emoji",
              "list",
              "link",
              "history"
            ],
            blockType: {
              inDropdown: true,
              options: ['Normal', 'Blockquote', 'Code'],
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
            },
            fontSize: {
              options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36],
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
            },
            inline: {
              options: [
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "monospace",
              ],
              bold: { className: "bordered-option-classname" },
              italic: { className: "bordered-option-classname" },
              underline: { className: "bordered-option-classname" },
              strikethrough: { className: "bordered-option-classname" },
              code: { className: "bordered-option-classname" },
            },
            image: {
              previewImage: true,
              uploadCallback: uploadImageCallBack,
              alt: { present: false },
              defaultSize: {
                height: "350",
                width: "350",
              },
            },
          }}
        />
      )}
      {touched && error && <FormFeedback>{error}</FormFeedback>}
    </div>
  );


// export default WysiwygEditor;

export default compose(
  // withState("editorState", "setEditorState", EditorState.createEmpty()),
  // withPropsOnChange(
  //   ["input"],
  //   ({ input: { value }, meta: { dirty }, setEditorState }) => {
  //     if (dirty) {
  //       return;
  //     }
  //     if (!value) {
  //       return;
  //     }
  //     debugger;
  //     const contentBlock = htmlToDraft(value);
  //     const contentState = ContentState.createFromBlockArray(
  //       contentBlock.contentBlocks
  //     );
  //     const editorState = EditorState.createWithContent(contentState);
  //     setEditorState(editorState);
  //   }
  // ),
  // withHandlers({
  //   onEditorStateChange: ({ input: { onChange }, setEditorState }) => (
  //     editorState
  //   ) => {
  //     setEditorState(editorState);
  //     const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  //     onChange(html);
  //   },
  // })
)(WysiwygEditor);
