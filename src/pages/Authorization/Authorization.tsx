import React from 'react';
import {MutationFn, MutationResult, QueryResult} from "react-apollo";
import {RouteComponentProps} from "react-router";
import {withRouter} from 'react-router-dom';
import { Col, Row} from "reactstrap";
import {FormGenerator} from "../../common/components/UI/FormGenerator/FormGenerator";
import {FieldValuePairs } from "../../common/components/UI/FormGenerator/FormGeneratorTypes";
import {authForm} from "../../common/components/UI/forms/authorization";
import {GetCurrentUser} from "./apolloTypes/GetCurrentUser";
import {Login, LoginVariables} from "./apolloTypes/Login";

interface Props extends RouteComponentProps<{}> {
    currentUserData: QueryResult<GetCurrentUser>,
    loginData: MutationResult<Login>,
    login: MutationFn<Login, LoginVariables>
}


// TODO: reconsider unknown
const Authorization: React.FC<Props>  = (props) => {
    const sendData = async (data: FieldValuePairs) => {
      await props.login({variables: (data as unknown as LoginVariables)});
      props.history.push('/home');
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
