  
import React, {useState} from 'react';
//naver-map-components
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
//ant design
import { Select, Layout, Button, Space, Drawer, Input, Form } from 'antd';
const {Header, Sider, Content} = Layout;
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

let currentLat = 1.0
let currentLng = 1.0
let Lat = []
let Lng = []
let i = 0
axios.get('/api/sendGeoList')
      .then((res) => {
          for(i=0;i<res.data.length;i++){
            // push 하기 전 현재 위치 기반으로 500m 이내만 계산해서 배열에 push
            Lat.push(res.data[i].lat)
            Lng.push(res.data[i].lng)
          }
      })

function MainPage(props) {
    /////////////////// 로그아웃 처리 //////////////////

    const onLogoutHandler =() =>{
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success){
                props.history.push("/")
            } else {
                alert("로그아웃하는데 실패했습니다.")
            }
        })
    }
    const [visible, setVisible] = useState(false);

    function showDrawer() {
      setVisible(true);
    };

    const onClose = () => {
      setVisible(false);
    };

    const onSubmitHandler = () => {
      //서버로 데이터 전송
    }

    // 사용자가 마커 클릭 시 -> 사이드바 보여주고, 서버에서 필요한 정보 
    function ShowInfo(props) {
      showDrawer();
    }



    ///////////////////////////// 지도 띄우기 ///////////////////////////////

    
   function NaverMapAPI() {

      const navermaps = window.naver.maps;   
      let i = 0
      const Mark = Lat.map((latitude, index) =>{
        return(
          <Marker 
              key = {index}
              position = {new navermaps.LatLng(latitude, Lng[i++])}
              animation ={2}
              onClick={ShowInfo}
          />
        )
      })
      // 현재위치 받아오기
      navigator.geolocation.getCurrentPosition((position) => {
        currentLat = position.coords.latitude
        currentLng = position.coords.longitude
      })

      return (
        <NaverMap
          mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
          defaultCenter={{ lat: 35.88942215139719, lng: 128.61060722889556 }} // 지도 초기 위치
          defaultZoom={16} // 지도 초기 확대 배율
          zoomControl = {true}
          style={{
            width: '100%',
            height: '95vh',
          }}
        >
          <Marker 
            key = {10}
            position = {new navermaps.LatLng(35.88942215139719, 128.61060722889556)}
            animation ={0}
            onClick={() => {alert('현재 위치 입니다')}}
          />
          {Mark}
          
        </NaverMap>
      );
    }
        

    return (
        <Layout>
              <Header style={{ paddingLeft: '10px', width: '100%', display: 'flex', paddingRight: '0px' }}>              
                <Form layout = 'inline' style={{paddingTop: '15px'}}>
                  <Form.Item>
                    <Select defaultValue="품목 선택" style={{ width: 120 }} onChange={handleChange}>
                      <Option value="계란">계란</Option>
                      <Option value="양파">양파</Option>
                      <Option value="감자">감자</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item>                  
                    <Input placeholder="가격대 입력"></Input>
                  </Form.Item>
                  <Form.Item>
                    <Button type='primary' shape ='round' onClick={onSubmitHandler}>검색</Button>
                  </Form.Item>
                </Form>
                <Space style={{ paddingLeft: '80%'}}>
                  <Button type='primary' onClick={onLogoutHandler}>LogOut</Button>
                </Space>          
              </Header>
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
                <Drawer
                  title="마트 정보 표시"
                  placement="right"
                  closable={false}
                  onClose={onClose}
                  visible={visible}
                >
                  <p>마트의 정보가 표시됩니다</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </Drawer>
              </Content>       
        </Layout>          
    );
}

export default withRouter(MainPage)

