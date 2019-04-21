import React from 'react';
import {RouterProps} from "react-router";
import {withRouter} from 'react-router-dom';
import {Button, Col, Form, Row} from "reactstrap";
import {FormGenerator} from "../../common/components/UI/Form/FormGenerator";
import {authForm} from "../../common/components/UI/Form/forms/authorization";
import {Paths} from "../../common/RouteMap";

interface Props extends RouterProps {}

const Authorization: React.FC<Props>  = ({history}: RouterProps) => {
    return (
        <Row>
            <Col sm="12" md={{ size: 4, offset: 4 }}>
                <Form>
                    <FormGenerator formConfig={authForm} />
                    <Button onClick={()=>history.push(Paths.HOME)}>Войти</Button>
                </Form>
            </Col>
        </Row>
    );
};

const AuthorizationRouted = withRouter(Authorization);

export {
    AuthorizationRouted as Authorization
};
