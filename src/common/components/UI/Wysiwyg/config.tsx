import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Code from "@ckeditor/ckeditor5-basic-styles/src/code";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";
import Subscript from "@ckeditor/ckeditor5-basic-styles/src/subscript";
import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import Link from "@ckeditor/ckeditor5-link/src/link";
import List from "@ckeditor/ckeditor5-list/src/list";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import RemoveFormat from "@ckeditor/ckeditor5-remove-format/src/removeformat";

const editorConfiguration = {
  plugins: [
    Essentials,
    Bold,
    Italic,
    Strikethrough,
    Underline,
    Subscript,
    Superscript,
    Code,
    Paragraph,
    List,
    BlockQuote,
    Link,
    Heading,
    Alignment,
    MediaEmbed,
    RemoveFormat,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
  ],
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'strikethrough',
    'underline',
    'subscript',
    'superscript',
    'code',
    'link',
    'bulletedList',
    'numberedList',
    'blockQuote',
    'alignment',
    'mediaembed',
    '|',
    'undo',
    'redo',
    'removeformat',
    '|',
    'imageUpload',
  ],
  image: {
    toolbar: [ 'imageTextAlternative', '|', 'imageStyle:full', 'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight' ],
    styles: [
      'full',
      'alignLeft',
      'alignRight',
      'alignCenter',
    ],
  },
};

export {
  editorConfiguration
};
