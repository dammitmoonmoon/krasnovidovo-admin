import React from 'react';
import { LogoutButton } from '../common/components/Logout';
import {ImageLoader} from "../common/components/UI/ImageLoader/ImageLoader";

const Dummy: React.FC<{}> = () => (
  <div>
    TEST PAGE
    <ImageLoader />
    <LogoutButton />
  </div>
);

export { Dummy };
