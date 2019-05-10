import React, { useState } from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import {Button, Form, Input, Spinner} from 'reactstrap';
import { getGQLErrorMessages } from '../../../apollo/errors';
import { Hint } from '../misc';
import { UploadImage, UploadImageVariables } from './apolloTypes/UploadImage';
import { UPLOAD_IMAGE } from './gql';
import { Image } from './styles';

const ImageLoader = () => {
  const [file, setFile] = useState<File | null>();
  const [errorMessage, setErrorMessage] = useState<string|null>('');

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile( event.target.files && event.target.files.item(0));
  };

  const onClickHandler = async (
    event: React.FormEvent<HTMLInputElement>,
    uploadImage: MutationFn<UploadImage, UploadImageVariables>,
  ) => {
    event.preventDefault();
    try {
      await uploadImage({ variables: { file } });
    }
    catch (e) {}
  };

  return (
    <Mutation<UploadImage, UploadImageVariables> mutation={UPLOAD_IMAGE}>
      {(uploadImage, { data, error, loading }) => {
        const imageUrl = data && data.uploadImage && data.uploadImage.imageUrl;
        setErrorMessage(getGQLErrorMessages(error));
        return (
          <Form>
            {loading && <Spinner/>}
            {!error && imageUrl && <Image imageUrl={imageUrl || ''} />}
            <Input type="file" id="files" required onChange={onChangeHandler} />
            {error && <Hint>{errorMessage}</Hint>}
            {file && <Button onClick={e => onClickHandler(e, uploadImage)}>Сохранить</Button>}
          </Form>
        );
      }}
    </Mutation>
  );
};

export { ImageLoader };
