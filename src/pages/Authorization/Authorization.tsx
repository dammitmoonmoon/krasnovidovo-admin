import React from 'react';
import {RouterProps} from "react-router";
import {withRouter} from 'react-router-dom';
import {Button, Form, FormGroup, Input, Label } from "reactstrap";
import {Paths} from "../../common/RouteMap";

interface Props extends RouterProps {}

const Authorization: React.FC<Props>  = ({history}: RouterProps) => (
    <>
        <Form>
            <FormGroup>
                <Label for="login">Логин</Label>
                <Input name="login" id="login" placeholder="Введите логин" />
            </FormGroup>
            <FormGroup>
                <Label for="password">Пароль</Label>
                <Input type="password" name="password" id="password" placeholder="Введите пароль" />
            </FormGroup>
            <Button onClick={()=>history.push(Paths.HOME)}>Войти</Button>
        </Form>
    </>
);

const AuthorizationRouted = withRouter(Authorization);

export {
    AuthorizationRouted as Authorization
};
