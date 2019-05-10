import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import CKEditor from '@ckeditor/ckeditor5-react';
import * as React from 'react';
import {Mutation, MutationFn} from "react-apollo";
import { Button, Container, Form } from 'reactstrap';
import {GRAPHQL_ENDPOINT} from "../../../../configs";
import {UploadImage, UploadImageVariables} from "../ImageLoader/apolloTypes/UploadImage";
import {UPLOAD_IMAGE} from "../ImageLoader/gql";
import {editorConfiguration} from "./config";
import {UploadAdapter} from "./UploadAdapter";

interface WysiwygProps {
   handleWysiwygData: (data: string) => void;
}

const Wysiwyg: React.FunctionComponent<WysiwygProps> = ({handleWysiwygData}) => {
  const [editorData, setEditorData] = React.useState('');

  function uploadAdapterPlugin( uploadImage: MutationFn<UploadImage, UploadImageVariables>) {
    return function uploadAdapterPlugin(editor: any) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
        const uploadModel = {
          uploadImage,
          url: GRAPHQL_ENDPOINT,
        };
        return new UploadAdapter(loader, uploadModel);
      };
    }
  }

  return (
    <Mutation<UploadImage, UploadImageVariables> mutation={UPLOAD_IMAGE}>
      {(uploadImage) => {
        const config = {...editorConfiguration, extraPlugins: [ uploadAdapterPlugin(uploadImage) ]};
        return (
          <Container>
            <Form>
              <CKEditor
                editor={ClassicEditor}
                config={config}
                onChange={(_: any, editor: any) => {
                  const data = editor.getData();
                  setEditorData(data);
                }}
              />
              <Button onClick={() => handleWysiwygData(editorData)}>Сохранить</Button>
            </Form>
          </Container>
        );
      }}
    </Mutation>
  );
};

export { Wysiwyg };
