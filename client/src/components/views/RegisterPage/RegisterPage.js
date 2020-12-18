import React, { useState } from 'react'
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
//antd 디자인 부분
//antd
import { Form, Input, Button, Layout, Space } from 'antd';


function RegisterPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }
    
    const onSubmitHandler = (event) => {
        event.preventDefault();
        if(Password !== ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야합니다.')
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }

        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success){
                    props.history.push('/login')
                } else {
                    alert('fail to sign up.')
                }
            })
        
    }

    const onCancelRegisterHandler = (event) => {
      props.history.push('/')
    }

    return (
      <Layout class ='body'>
        <Form
          name="register"
          className="login-form"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input placeholder="Email" type="email" value={Email} onChange={onEmailHandler}/>
          </Form.Item>
            
          <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
        >
          <Input placeholder='name' type="text" value={Name} onChange={onNameHandler}/>
        </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password placeholder='password' type="password" value={Password} onChange={onPasswordHandler}/>
          </Form.Item>
    
          <Form.Item
            name="confirm"
          >
            <Input.Password placeholder='Confirm Password' type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
          </Form.Item>
          <Space style={{ width: '100%', display: 'flex', justifyContent:'flex-end',paddingRight: '0px' }}>
            <Button type="primary" shape='round' htmlType="submit" onClick={onSubmitHandler}>
              Register
            </Button>
            <Button type="primary" shape='round' htmlType="submit" onClick={onCancelRegisterHandler}>
              Cancel
            </Button>
          </Space> 
        </Form>
      </Layout>
    )
}

export default withRouter(RegisterPage)


