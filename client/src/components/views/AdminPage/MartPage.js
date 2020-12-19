import React, { useState } from 'react'
import {useDispatch} from 'react-redux';
import {registerMart,registerProduct,setPriceData} from '../../../_actions/mart_action';
import { withRouter } from 'react-router-dom';
import {Form, Input, Button} from 'antd'


const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
};


function MartPage(props) {

    const dispatch = useDispatch();
 
    ///////////////////////////////////// 마트 데이터 입력 /////////////////////////////////////
    // 상태 정의 //
    const [martKey, setmartKey] = useState("")
    const [name, setname] = useState("")
    const [callNumber, setcallNumber] = useState("")
    const [lat, setlat] = useState("")
    const [lng, setlng] = useState("")

    // 이벤트 핸들러 //
    const onmartKeyHandler = (event) => {
        setmartKey(event.currentTarget.value)
    }
    const onnameHandler = (event) => {
        setname(event.currentTarget.value)
    }
    const oncallNumberHandler = (event) => {
        setcallNumber(event.currentTarget.value)
    }
    const onlatHandler = (event) => {
        setlat(event.currentTarget.value)
    }
    const onlngHandler = (event) => {
        setlng(event.currentTarget.value)
    }

    // 서버로 데이터 전송 //
    const onMartSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            martKey: martKey,
            name: name,
            callNumber: callNumber,
            lat: lat,
            lng: lng
        }

        dispatch(registerMart(body))
            .then(response => {
                if(response.payload.registerSuccess){
                    alert('마트 정보 등록 성공')
                } else {
                    alert('마트 정보 등록 성공')
                }
            })
        
    }

    ///////////////////////////////////// 상품 데이터 입력 /////////////////////////////////////
    // 상태 정의 //
    const [ProductName, setProductName] = useState("")
    const [ProductKey, setProductKey] = useState("")

    // 이벤트 핸들러 //
    const onProductNameHandler = (event) => {
        setProductName(event.currentTarget.value)
    }
    const onProductKeyHandler = (event) => {
        setProductKey(event.currentTarget.value)
    }

    // 서버로 데이터 전송 //
    const onProductSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            name: ProductName,
            productKey: ProductKey,
        }

        dispatch(registerProduct(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    alert('상품 정보 등록 성공')
                } else {
                    alert('상품 정보 등록 성공')
                }
            })
        
    }


    ///////////////////////////////////// 가격 데이터 입력 /////////////////////////////////////
    // 상태 정의 //
    const [mKey, setmKey] = useState("")
    const [pKey, setpKey] = useState("")
    //date는 mongoose가 자동으로 처리
    const [Price, setPrice] = useState("")

    // 이벤트 핸들러 //
    const onmKeyHandler = (event) => {
        setmKey(event.currentTarget.value)
    }
    const onpKeyHandler = (event) => {
        setpKey(event.currentTarget.value)
    }
    const onPriceHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    // 서버로 데이터 전송 //
    const onPriceSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            martKey: mKey,
            productKey: pKey,
            price: Price
        }

        dispatch(setPriceData(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    alert('가격 정보 등록 성공')
                } else {
                    alert('가격 정보 등록 성공')
                }
            })
        
    }

    return (
        // 정의해아 하는 부분

        // 마트 데이터 입력 및 제출 부분

        // 상품 데이터 입력 및 제출 부분

        // 가격 데이터 입력 및 제출 부분

        <Form {...layout} >
            <Form.Item >
                <Input.TextArea placeholder="martKey" value={martKey} onChange={onmartKeyHandler}/>
                <Input.TextArea placeholder="name" value={name} onChange={onnameHandler}/>
                <Input.TextArea placeholder="callNumber" value={callNumber} onChange={oncallNumberHandler}/>
                <Input.TextArea placeholder="lat" value={lat} onChange={onlatHandler}/>
                <Input.TextArea placeholder="lng" value={lng} onChange={onlngHandler}/>
                
                <Button type="primary" htmlType="submit" onClick={onMartSubmitHandler}>
                마트등록
                </Button>
            </Form.Item>
            <Form.Item>
                <Input.TextArea placeholder="ProductName" value={ProductName} onChange={onProductNameHandler}/>
                <Input.TextArea placeholder="ProductKey" value={ProductKey} onChange={onProductKeyHandler}/>
                <Button type="primary" htmlType="submit" onClick={onProductSubmitHandler}>
                상품 등록
                </Button>
            </Form.Item>
            <Form.Item>
                <Input.TextArea placeholder="MartKey" value={mKey} onChange={onmKeyHandler}/>
                <Input.TextArea placeholder="ProductKey" value={pKey} onChange={onpKeyHandler}/>
                <Input.TextArea placeholder="Price" value={Price} onChange={onPriceHandler}/>               
                <Button type="primary" htmlType="submit" onClick={onPriceSubmitHandler}>
                가격 등록
                </Button>
            </Form.Item>

        </Form>
    )
}

export default withRouter(MartPage)