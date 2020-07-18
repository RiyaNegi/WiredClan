export default {
  selector: '.rich-editor-field textarea',
  skin: 'oxide-dark',
  content_css: '/editor.css?' + new Date().getTime(),
  plugins: 'fullpage autoresize preview paste importcss searchreplace autolink autosave directionality code visualblocks visualchars fullscreen image link media codesample table hr nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
  imagetools_cors_hosts: ['picsum.photos'],
  textpattern_patterns: [
    { start: '*', end: '*', format: 'italic' },
    { start: '**', end: '**', format: 'bold' },
    { start: '#', format: 'h1' },
    { start: '##', format: 'h2' },
    { start: '###', format: 'h3' },
    { start: '####', format: 'h4' },
    { start: '#####', format: 'h5' },
    { start: '######', format: 'h6' },
    { start: '1. ', cmd: 'InsertOrderedList' },
    { start: '* ', cmd: 'InsertUnorderedList' },
    { start: '- ', cmd: 'InsertUnorderedList' }
  ],
  menubar: false,
  block_formats: '3=h3',
  toolbar: 'undo redo | bold italic underline strikethrough | alignleft alignjustify | outdent indent |  numlist bullist | backcolor removeformat| emoticons | insertfile image media link anchor codesample  | fullscreen  preview ',
  toolbar_sticky: true,
  autosave_ask_before_unload: true,
  autosave_interval: "0s",
  autosave_restore_when_empty: false,
  autosave_retention: "0m",
  fullpage_default_font_size: "16px",
  image_advtab: false,
  // content_css: '//www.tiny.cloud/css/codepen.min.css',

  importcss_append: true,
  file_picker_callback: function (callback, value, meta) {
    /* Provide file and text for the link dialog */
    // if (meta.filetype === 'file') {
    //   callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
    // }

    /* Provide image and alt text for the image dialog */

    if (meta.filetype == 'image') {
      var input = document.getElementById('my-file');
      input.click();
      input.onchange = function () {
        var file = input.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
          callback(e.target.result, {
            alt: file.name
          });
        };
        reader.readAsDataURL(file);
      };
    }

    /* Provide alternative source and posted for the media dialog */
    // if (meta.filetype === 'media') {
    //   callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
    // }
  },
  min_height: 430,
  image_caption: false,
  quickbars_selection_toolbar: 'bold italic | quicklink h5 blockquote quickimage quicktable',
  noneditable_noneditable_class: "mceNonEditable",
  toolbar_mode: 'sliding',
  branding: false,
  contextmenu: "link image imagetools table"
}