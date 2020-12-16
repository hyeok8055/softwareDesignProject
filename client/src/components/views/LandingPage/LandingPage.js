import React, {useEffect} from 'react';
import useGeolocation from 'react-hook-geolocation';
//naver-map-components
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom'
///////////////////// ant design 전용 공간 ///////////////////////////////////////////////////
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Button, Row, Col, Form,Input, Menu } from 'antd';

const {Header, Footer, Sider, Content} = Layout;
const { SubMenu } = Menu;






///////////////////// ant design 전용 공간 ///////////////////////////////////////////////////



function LandingPage(props) {

  
    //현재위치 반환
    const geolocation = useGeolocation({
      enableHighAccuracy: true,
      maximumAge: 15000,
      timeout:  12000
    })

    //랜딩페이지용 지도 생성
    function NaverMapAPI() {
      const navermaps = window.naver.maps;      
      return (
        <NaverMap
          mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
          style={{
            width: '100%', // 네이버지도 가로 길이
            height: '100vh' // 네이버지도 세로 길이
          }}
          defaultCenter={{ lat: geolocation.latitude, lng: geolocation.longitude }} // 지도 초기 위치
          defaultZoom={18} // 지도 초기 확대 배율
        >
          <Marker
            key = {1}
            position = {new navermaps.LatLng(geolocation.latitude, geolocation.longitude)}
            animation ={2}
            onClick={() => {alert('현재 사용자 위치입니다')}}
          />
        </NaverMap>
      );
    }


    useEffect(() => {
        axios.get('/api/hello').then(response => {console.log(response)})
    }, [])

    const onSignInHandler = () =>{
      props.history.push("/login")
    }

    const onSignUpHandler = () =>{
      props.history.push("/register")
    }

    //////////////////// 앤트 디자인 전용 공간 ///////////////////////////
    return (
      <Layout>
        <Header><h1 color = 'red'>관리자 전용 페이지 입니다</h1></Header>
        <Content>
          <Row>
            <Col span={8}>
              <Form.Item >
                <Input></Input>
                <Input></Input>
                <Input></Input>
                <Input></Input>
                <Input></Input>
                <Button type="primary" htmlType="submit" >
                마트등록
                </Button>
              </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item >
                <Input></Input>
                <Input></Input>
                <Button type="primary" htmlType="submit" >
                마트등록 sasdgsadg
                </Button>
              </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item >
                <Input></Input>
                <Input></Input>
                <Input></Input>
                <Input></Input>
                <Input></Input>
                <Button type="primary" htmlType="submit" >
                waegoawgoiowig
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Content>
        <Footer></Footer>
     </Layout>
    );
    //////////////////// 앤트 디자인 전용 공간 ///////////////////////////

}

export default withRouter(LandingPage)



/* 

        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex', justifyContent:'flex-end' }}>
            <Space className="buttons">
              <Button type="primary" onClick={onSignInHandler}>SignIn</Button>
              <Button type="primary" onClick={onSignUpHandler}>SignUp</Button>
            </Space>
          </Header>
          <Layout>
            <Content>
              <RenderAfterNavermapsLoaded
              ncpClientId={"3w74nk3yv7"}
              // Naver Cloud Platform 유저의 경우 props.clientId 대신 props.ncpClientId를 사용합니다. 
              // ncpClientId={YOUR_NCP_CLIENT_ID} 
              error={<p>Maps Load Error</p>}
              loading={<p>Maps Loading...</p>}
              >
                <NaverMapAPI/>
              </RenderAfterNavermapsLoaded>
            </Content>
            <Sider>
              blabla
            </Sider>
            <Footer>
              blabla
            </Footer>
          </Layout>
        </Layout>
*/