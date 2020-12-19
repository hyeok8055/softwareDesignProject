const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require("./middleware/auth");
const { User } = require("./models/User");
const { Mart } = require("./models/Mart");
const { Product } = require("./models/Product");
const { Price } = require("./models/Price");



//application/ x-www-form-urlencoded 의 형식을 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));

//json 타입을 분석해서 가져옴
app.use(bodyParser.json());
app.use(cookieParser());


//몽고DB를 mongoose를 통해 편하게 사용하기
const mongoose = require('mongoose');
const user = require('./models/User');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then( () => console.log('mongoDB connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! asfasdfasfaf')
})

////////////////////////////// 마트 관련 데이터 생성 //////////////////////////////

app.post('/api/mart',(req, res) => {
  // 마트 정보를 클라이언트에서 가져와 DB에 넣어준다
  const mart = new Mart(req.body)

  mart.save((err,doc) => {
      if(err) return res.json({success: false, err})
      return res.status(200).json({
          success: true
      })
  })
})

app.post('/api/product',(req, res) => {
  // 마트 정보를 클라이언트에서 가져와 DB에 넣어준다
  const product = new Product(req.body)

  product.save((err,doc) => {
      if(err) return res.json({success: false, err})
      return res.status(200).json({
          success: true
      })
  })
})

app.post('/api/price',(req, res) => {
  // 마트 정보를 클라이언트에서 가져와 DB에 넣어준다
  const price = new Price(req.body)

  price.save((err,doc) => {
      if(err) return res.json({success: false, err})
      return res.status(200).json({
          success: true
      })
  })
})

////////////////////////////// 마트 데이터 클라이언트에 제공 //////////////////////////////

app.get('/api/sendGeoList',(req, res) => {
  // 사용자가 원하는 정보를 DB에서 가져온다
  Mart.find({},{_id: false,lat:true,lng:true},(err,pos)=> {
    return res.send(pos)
  })
})


//회원 가입 라우트
app.post('/api/users/register',(req,res) =>{
    //회원 가입할때 필요한 정보들을 client에서 가져오면 
    //그것들을 데이터베이스에 넣어준다

    const user = new User(req.body)
    //몽고DB에서 오는 메소드
    //save를 하기 전에 개인정보를 암호화 해야함
    user.save((err,doc) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})


//로그인 라우트
app.post('/api/users/login', (req, res) => {
    //요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
  
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다."
        })
      }

      //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
      user.comparePassword(req.body.password, (err, isMatch) => {
        
        if (!isMatch)
          return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
  
        //비밀번호 까지 맞다면 토큰을 생성하기.
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
  
          // 토큰을 저장한다.  어디에 ?  쿠키 , 로컳스토리지 
          res.cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id })
        })
      })
    })
  })

//auth 기능
app.get('/api/users/auth', auth, (req,res)=>{
    //여기까지 미들웨어를 통과했다는 것은 Authentication 이 True 라는 뜻
    res.status(200).json({
        //내가 원하는 유저 정보를 클라이언트에게 전달하면 됨
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

//로그아웃 기능
app.get('/api/users/logout', auth, (req,res) =>{

    User.findOneAndUpdate({_id: req.user._id},{token: ""},(err,user)=>{
        if(err) return res.json({success: false, err});
        return res.status(200).send({
            success: true
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })