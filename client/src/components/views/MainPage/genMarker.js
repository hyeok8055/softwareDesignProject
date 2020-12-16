import React, {useEffect} from 'react';
import { Marker } from 'react-naver-maps';
var express = require('express');
var mongoose = require('mongoose');
//auto-increment를 위한 패키지

//currentlat, currentlng 은 각각 현재 위도와 경도. mainpage에서 받아옴.
function genMarker(currentlat, currentlng) {

    //db에 연결. 접속 끊어졌을 경우 재연결
    mongoconnect();
    mongoose.connection.on('disconnected', connect);
    //schema를 server에서 만든걸 어떻게 받아오는건지 몰라 그냥 새로 만듬.
    var martSchema = mongoose.Schema({
        martKey: {
            type: Number
        },
        name: {
            type: String
        },
        callNumber: {
            type: String
        },
        lat: {
            type: Number
        },
        lng: {
            type: Number
        },
        info: {
            type: String
        }
    });
    var Mart = mongoose.model('marts',martSchema);
    //거리계산 후 저장할 배열.
    var lats = [];
    var lngs =[];
    //위, 경도 받아오기. 쿼리문은 이게 맞는거같은데 배열에 받아오는게 이게 맞는진 모르겠음.
    var Data = Mart.find().select('lat lng').exec(function(err,marts){});


    //여기부턴 필터링. 
    for(var i=0; i<Data.length; i++){
        //거리 계산 후, 500m보다 가까운 마트 위, 경도를 위도, 경도 배열에 각각 저장.
        if(calcDistance(Data[i].lat, Data[i].lng, currentlat, currentlng)<500){
            lats.push(Data[i].lat);
            lngs.push(Data[i].lng);
        }

    }

    

    ///////// 1. DB 요청 -> Data 싹 읽어오고 () ///// ////
    
    // 2. 필터링 -> 현위치 위도 경도 기반으로 필터링
    
    //재현님이 해주시고

    
    // 3. 반복문으로 마커 생성 -> 생성할 때 이벤트 핸들러 달아두기

    //재성님이 해주시고



}


//db 연결을 위한 mongoose 사용 함수. 
function mongoconnect(){
    mongoose.connect();
        mongoose.connect(config.mongoURI, {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
    }).then( () => console.log('mongoDB connected...'))
      .catch(err => console.log(err))
}
//거리 계산 함수
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

export default genMarker