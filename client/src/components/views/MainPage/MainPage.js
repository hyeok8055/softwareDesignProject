import React, {useState} from 'react';
//naver-map-components
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom';
//ant design
import { Layout, Button, Space } from 'antd';
import GenMarker from './genMarker';
const {Header, Footer, Sider, Content} = Layout;

function MainPage(props) {

    /////////////////// 로그아웃 처리 //////////////////

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

    ///////////////////////////// 지도 띄우기 ///////////////////////////////
    const [Lat,setLat] = useState('')
    const [Lng,setLng] = useState('')
    var lat = new Array();
    var lng = new Array();
    let body = {
      latt: Lat,
      lngg: Lng
    }
    // 서버를 통해 DB에서 데이터 받아오기
    var applepie = axios.post('/api/sendGeoList',body)
        .then((res) => {
            return res
        })
    for(var i=0; i<applepie.length; i++){
      if(calcDistance(applepie.body.latt, applepie.body.lngg, currentlat, currentlng)<500){
        lat.push(applepie.body.latt)
        lng.push(applepie.body.lngg)
      }
    }

    
    // 필터링 작업 필요
    
 

   function NaverMapAPI() {

      const navermaps = window.naver.maps;   
      /////////////////////// 여기서부터   ///////////////////////
      const lat = [35.885056,35.885256,35.885456,35.885656]
      const lng = [128.618123,128.615923,128.614623,128.615723]
      let i = 0
      const Mark = lat.map((latitude, index) =>{
        return(
          <Marker 
              key = {index}
              position = {new navermaps.LatLng(latitude, lng[i++])}
              animation ={2}
              onClick={() => {alert('여기는 N서울 타워입니다.')}}
          />
        )
      })
      console.log(Mark)
      /////////////////////// 여기까지가 마커를 반복적으로 찍어내는 부분   ///////////////////////
      return (
        <NaverMap
          mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
          style={{
            width: '100%', // 네이버지도 가로 길이
            height: '85vh' // 네이버지도 세로 길이
          }}
          defaultCenter={{ lat: 35.885056, lng: 128.615623 }} // 지도 초기 위치
          defaultZoom={13} // 지도 초기 확대 배율
          zoomControl = {true}
        >
          <Marker 
            key = {10}
            position = {new navermaps.LatLng(35.885056, 128.615623)}
            animation ={2}
            onClick={() => {alert('여기는 N서울 타워입니다.')}}
          />
          {Mark}
          
        </NaverMap>
      );
    }
        
    function calcDistance(lat1, lon1, lat2, lon2)
    {
      var theta = lon1 - lon2;
      dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1))
            * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
      dist = Math.acos(dist);
      dist = rad2deg(dist);
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344;
      return Number(dist*1000).toFixed(2);
    }

    function deg2rad(deg) {
      return (deg * Math.PI / 180);
    }
    function rad2deg(rad) {
      return (rad * 180 / Math.PI);
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

