import React, { useState } from 'react'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

//antd
import { Form, Input, Button, Layout } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


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
      <Layout class='body'>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            name="Email"  
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" type="email" value={Email} onChange={onEmailHandler} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              value={Password} 
              onChange={onPasswordHandler}
            />
          </Form.Item>
          <Form.Item>
            <Button className="login-form-button" type = 'primary' shape = 'round' htmlType="submit" onClick={onSubmitHandler} block>
              Log in
            </Button>
            <br/>Or <a onClick={onSignUpHandler}>register now!</a>
          </Form.Item>
        </Form>
      </Layout>
    )
}

export default withRouter(LoginPage)



