import React from 'react';
import {MutationFn, MutationResult} from "react-apollo";
import {RouteComponentProps} from "react-router";
import {withRouter} from 'react-router-dom';
import { Col, Row} from "reactstrap";
import {FormGenerator} from "../UI/FormGenerator/FormGenerator";
import {FieldValuePairs } from "../UI/FormGenerator/FormGeneratorTypes";
import {authForm} from "../UI/formParams/authorization";
import {Login, LoginVariables} from "./apolloTypes/Login";

interface Props extends RouteComponentProps<{}> {
    loginData: MutationResult<Login>;
    login: MutationFn<Login, LoginVariables>;
}


// TODO: reconsider unknown
const Authorization: React.FC<Props>  = ({login}) => {
    const sendData = async (data: FieldValuePairs) => {
      const result = await login({variables: (data as unknown as LoginVariables)});
      if (result && result.data) {
        location.reload();
      }
    };
    return (
        <Row>
            <Col sm="12" md={{ size: 4, offset: 4 }}>
                <FormGenerator
                  formConfig={authForm}
                  submitHandler={sendData}
                  buttonName="Войти"
                />
            </Col>
        </Row>
    );
};

const AuthorizationRouted = withRouter(Authorization);

export {
    AuthorizationRouted as Authorization
};
