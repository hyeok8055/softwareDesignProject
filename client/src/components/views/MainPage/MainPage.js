import React, {useEffect} from 'react';
//naver-map-components
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom';
//ant design
import { Layout, Button, Space } from 'antd';
const {Header, Footer, Sider, Content} = Layout;

function MainPage(props) {


    useEffect(() => {
        axios.get('/api/hello').then(response => {console.log(response)})
    }, [])

    const onLogoutHandler =() =>{
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success){
                props.history.push("/login")
            } else {
                alert("로그아웃하는데 실패했습니다.")
            }
        })
    }
    //지도 띄우기
    function NaverMapAPI() {
      const navermaps = window.naver.maps;      
      return (
        <NaverMap
          mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
          style={{
            width: '100%', // 네이버지도 가로 길이
            height: '85vh' // 네이버지도 세로 길이
          }}
          defaultCenter={{ lat: 37.554722, lng: 126.970833 }} // 지도 초기 위치
          defaultZoom={13} // 지도 초기 확대 배율
          zoomControl = {true}
        >
          <Marker
            key = {1}
            position = {new navermaps.LatLng(37.551229, 126.988205)}
            animation ={2}
            onClick={() => {alert('여기는 N서울 타워입니다.')}}
          />
        </NaverMap>
      );
    }
        

    return (
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex', justifyContent:'flex-end' }}>
            <Space className="buttons">
              <Button type="primary" onClick={onLogoutHandler}>Logout</Button>
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
              <NaverMapAPI />
            </RenderAfterNavermapsLoaded>
            </Content>
            <Sider>Sider</Sider>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>          
    );
}

export default withRouter(MainPage)

