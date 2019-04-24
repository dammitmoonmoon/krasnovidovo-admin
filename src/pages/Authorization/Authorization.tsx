import React, {useState} from 'react';
import {RouterProps} from "react-router";
import {withRouter} from 'react-router-dom';
import { Col, Row} from "reactstrap";
import {FormGenerator} from "../../common/components/UI/FormGenerator/FormGenerator";
import {FieldValuePairs } from "../../common/components/UI/FormGenerator/FormGeneratorTypes";
import {authForm} from "../../common/components/UI/forms/authorization";

interface Props extends RouterProps {}

const Authorization: React.FC<Props>  = () => {
    const [apolloData, setApolloData] = useState<FieldValuePairs>();
    console.log('apolloData', apolloData);
    return (
        <Row>
            <Col sm="12" md={{ size: 4, offset: 4 }}>
                <FormGenerator
                  formConfig={authForm}
                  submitHandler={setApolloData}
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
