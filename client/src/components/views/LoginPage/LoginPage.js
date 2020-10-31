import React, { useState } from 'react'
import Axios from 'axios'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
//antd
import { Form, Input, Button, Checkbox } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};



function LoginPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }   

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSignUpHandler = () =>{
      props.history.push("/register")
    }
    
    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    props.history.push('/main')
                } else {
                    alert('Error')
                }
            })
        
    }

    return (
      <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input type="email" value={Email} onChange={onEmailHandler}/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password type="password" value={Password} onChange={onPasswordHandler}/>
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" onClick={onSubmitHandler}>
          SignIn
        </Button>

        <Button type="primary" onClick={onSignUpHandler}>
          SignUp
        </Button>
      </Form.Item>
    </Form>
    )
}

export default withRouter(LoginPage)



