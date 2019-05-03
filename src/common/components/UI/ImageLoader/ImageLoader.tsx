import React, {useRef} from 'react';
import { Mutation } from 'react-apollo';
import {Form, Input} from 'reactstrap';
import {UploadImage, UploadImageVariables} from "./apolloTypes/UploadImage";
import {UPLOAD_IMAGE} from "./gql";

class UploadImageMutation extends Mutation<UploadImage, UploadImageVariables> {}

const ImageUploader = () => {
  const fileInput = useRef<File|null>();
  return (
    <UploadImageMutation mutation={UPLOAD_IMAGE}>
      {(uploadImage, uploadImageData) => {
        const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
          fileInput.current = event.target.files && event.target.files.item(0);
        };
        const onClickHandler = async (event: React.FormEvent<HTMLInputElement>) => {
          event.preventDefault();
          await uploadImage({variables: { file: fileInput.current }});
        };

        const imageUrl = uploadImageData.data && uploadImageData.data.uploadImage && uploadImageData.data.uploadImage.imageUrl;

        return (
          <Form>
            {
              imageUrl && <img src={imageUrl} alt="Generic placeholder image" />
            }
            <Input
              type="file"
              required
              onChange={onChangeHandler}
            />
            <Input
              type="submit"
              onClick={onClickHandler}
            />
          </Form>
        );
      }}
    </UploadImageMutation>
  );
};


export { ImageUploader };
