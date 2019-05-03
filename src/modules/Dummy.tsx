import React from 'react';
import { LogoutButton } from '../common/components/Logout';
import {ImageUploader} from "../common/components/UI/ImageLoader/ImageLoader";

const Dummy: React.FC<{}> = () => (
  <div>
    TEST PAGE
    <ImageUploader />
    <LogoutButton />
  </div>
);

export { Dummy };
