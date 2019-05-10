import {MutationFn} from "react-apollo";
import {UploadImage, UploadImageVariables} from "../ImageLoader/apolloTypes/UploadImage";

interface UploadModelParams {
  url: string;
  uploadImage: MutationFn<UploadImage, UploadImageVariables>;
}

class UploadAdapter {
  private loader: any;
  private uploadModel: UploadModelParams;

  public constructor( loader: any, uploadModel: UploadModelParams ) {
    this.uploadModel = uploadModel;
    this.loader = loader;
  }

  public upload() {
    return this.loader.file.then( (file: any) => new Promise( (resolve, reject) => {
      this.uploadModel.uploadImage( { variables: { file } }).then(result => {
        if (result && result.data && result.data.uploadImage) {
          resolve( {default:  result.data.uploadImage.imageUrl} );
        }
        reject();
      });
    } ) );
  }

  public abort() {}
}

export { UploadAdapter };
