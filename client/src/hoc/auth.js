import Axios from 'axios';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {auth} from '../_actions/user_action';


export default function(SpecificComponent, option, adminRoute = null) {

    //null -> 아무나 출입가능
    //true  -> 로그인한 유저만 출입가능
    //false -> 로그인한 유저는 출입 불가능
    function AuthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response =>{
                console.log(response)

                if(!response.payload.isAuth){
                    //로그인하지 않은 상태
                    if(option){ //로그인 한 유저만 허락된 페이지에 접속하려고 할 때
                        props.history.push('/')
                    }
                } else {
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        //어드민이 아닌 유저가 어드민 전용 페이지에 접속하려고 할 때
                        props.history.push('/')
                    } else {
                        if(option === false){
                            //로그인한 유저가 로그인한 유저는 출입 불가능한 페이지에 접속하려고 할 때
                            props.history.push('/')
                        }
                    }
                }
            })
        }, [])

        return <SpecificComponent/>
    }


    return AuthenticationCheck
}