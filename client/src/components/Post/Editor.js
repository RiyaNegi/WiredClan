import React from "react";
import ReactDOM from 'react-dom';
import { Editor } from "@tinymce/tinymce-react";

function App(editorProps) {
  return (
    <Editor
      initialValue={editorProps.input.value}
      apiKey='v3p2ek98ypo3oknpt4gt9bzbyxmvpb22a7rmkw2yo1wvwxpq'
      onEditorChange={(content) => {
        editorProps.input.onChange(content);
      }}
      init={{
        selector: '.rich-editor-field textarea',
        plugins: 'fullpage autoresize preview paste importcss searchreplace autolink autosave directionality code visualblocks visualchars fullscreen image link media codesample table hr nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
        imagetools_cors_hosts: ['picsum.photos'],
        menubar: false,
        block_formats: '3=h3',
        toolbar: 'undo redo | bold italic underline strikethrough | alignleft alignjustify | outdent indent |  numlist bullist | backcolor removeformat| emoticons | insertfile image media link anchor codesample  | fullscreen  preview ',
        toolbar_sticky: true,
        autosave_ask_before_unload: true,
        autosave_interval: "30s",
        autosave_prefix: "{path}{query}-{id}-",
        autosave_restore_when_empty: false,
        autosave_retention: "2m",
        fullpage_default_font_size: "16px",
        image_advtab: true,
        content_css: '//www.tiny.cloud/css/codepen.min.css',
        link_list: [
          { title: 'My page 1', value: 'http://www.tinymce.com' },
          { title: 'My page 2', value: 'http://www.moxiecode.com' }
        ],
        image_list: [
          { title: 'My page 1', value: 'http://www.tinymce.com' },
          { title: 'My page 2', value: 'http://www.moxiecode.com' }
        ],
        image_class_list: [
          { title: 'None', value: '' },
          { title: 'Some class', value: 'class-name' }
        ],
        importcss_append: true,
        file_picker_callback: function (callback, value, meta) {
          /* Provide file and text for the link dialog */
          if (meta.filetype === 'file') {
            callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
          }

          /* Provide image and alt text for the image dialog */
          if (meta.filetype === 'image') {
            callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
          }

          /* Provide alternative source and posted for the media dialog */
          if (meta.filetype === 'media') {
            callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
          }
        },
        min_height: 430,
        image_caption: true,
        quickbars_selection_toolbar: 'bold italic | quicklink h5 blockquote quickimage quicktable',
        noneditable_noneditable_class: "mceNonEditable",
        toolbar_mode: 'sliding',
        branding: false,
        contextmenu: "link image imagetools table"
      }}
    // onBlur={(event, value) => { props.input.onChange(event.target.getContent()) }}
    />
  );
}

export default App;

