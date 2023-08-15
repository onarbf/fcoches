'use client'

import dynamic from 'next/dynamic';
const ReactQuill = dynamic(async ()=>await import('react-quill'), { ssr: false, loading: () => <p>Loading ...</p> });

var myToolbar = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    ['link','image', 'video'],          // add's image support
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']
];

const modules = {
    toolbar: {
        container: myToolbar,
        handlers: {
            image: imageHandler, //Add it here
          },
    }
}


function imageHandler(this: any) {
    const tooltip = this.quill.theme.tooltip;
    const originalSave = tooltip.save;
    const originalHide = tooltip.hide;
    tooltip.save = function(this: any) {
      const range = this.quill.getSelection(true);
      const value = this.textbox.value;
      if (value) {
        this.quill.insertEmbed(range.index, 'image', value, 'user');
      }
    };
    // Called on hide and save.
    tooltip.hide = function (this: any) {
       tooltip.save = originalSave;
       tooltip.hide = originalHide;
       tooltip.hide();
    };
    tooltip.edit('image');
    tooltip.textbox.placeholder = "Embed URL";
  }

export default function Wysiwyg({ content, setContent }: any) {

    return (<div className="bg-white">
        <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} />
    </div>)
}