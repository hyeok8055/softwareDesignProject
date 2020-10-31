import React, { useState } from 'react'
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
//antd
import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
  } from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

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

    return (
        <Form
        name="register"
      >
        <Form.Item
          name="email"
          label="E-mail"
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
          <Input type="email" value={Email} onChange={onEmailHandler}/>
        </Form.Item>
          
        <Form.Item
        name="name"
        label={
          <span>
            name&nbsp;
          </span>
        }
        rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
      >
        <Input type="text" value={Name} onChange={onNameHandler}/>
      </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password type="password" value={Password} onChange={onPasswordHandler}/>
        </Form.Item>
  
        <Form.Item
          name="confirm"
          label="Confirm Password"
        >
          <Input.Password type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
        </Form.Item>
        <Button type="primary" htmlType="submit" onClick={onSubmitHandler}>
          Register
        </Button>
      </Form>
    )
}

export default withRouter(RegisterPage)


