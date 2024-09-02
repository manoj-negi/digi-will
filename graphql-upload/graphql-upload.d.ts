declare module 'graphql-upload/Upload.js' {
  import { ReadStream } from 'fs';
  
  interface UploadOptions {
    createReadStream: () => ReadStream;
    filename: string;
    mimetype: string;
    encoding: string;
  }

  export default class Upload {
    resolve: (options: UploadOptions) => void;
  }
}
