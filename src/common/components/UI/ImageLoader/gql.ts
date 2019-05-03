import gql from "graphql-tag";

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file) {
      filename
      imageUrl
    }
  }
`;
