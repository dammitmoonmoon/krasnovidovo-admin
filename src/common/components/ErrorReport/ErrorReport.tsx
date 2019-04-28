import * as React from "react";
import {Container} from "reactstrap";

interface Props {
  errorMessage: string;
}

const ErrorReport = ({errorMessage}: Props) => (
  <Container>
    {errorMessage}
  </Container>
);

export {
  ErrorReport
};
