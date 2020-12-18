# vue-demo

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).






？、入口
const express= require("express");
const app=express();
const router=require('./routers/index')
const debug=require("debug")("my-application")
const bodyParser=require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api',router)
// app.get('/list',(req,res)=>{
//   res.send("测试")
// })


app.listen(8099,(req,res)=>{
  debug("服务器成功监听8090端口")
})



//router.index
const express= require("express");
const router=express.Router();

// 引入模块
const user=require('./admin/user')
const nav=require('./admin/nav')

router.use('/user',user)
router.use('/nav',nav)
module.exports=router



//nav.js

const express=require('express')
const router=express.Router()
const mockData=require("../../mock/admin/index")

router.get('/list',(req,res)=>{
    console.log(req.query)
    const { pageNumber=1, pageSize=10, title, status, star } = req.query;
    let start = (pageNumber - 1) * pageSize;
    let end = pageNumber * pageSize;
    let mockList = mockData.data.filter((item) => {
        if (star && item.star.length !== star) return false;
        if (status && item.status !== status) return false;
        if (title && item.title.indexOf(title) < 0) return false;
        return true;
    });
    let pageList = mockList.slice(start, end);
    let obj= {
        code: 200,
        data: {
            total: mockList.length,
            items: pageList,
        },
    };
    
    res.send(obj)
})

router.delete('/del',(req,res)=>{
  console.log(req.query)
  const { id } = req.query;
  const item = mockData.data.filter((item) => item.goodsId == id);
  const index = mockData.data.indexOf(item[0]);
  mockData.data.splice(index, 1);
  let obj= {
    code: 200,
    success:'删除成功'
  };
  res.send(obj)
})

router.put('/edit',(req,res)=>{
  console.log(req.body)
  const data = req.body;
  const { goodsId } = data;
  const item = mockData.data.filter((item) => item.goodsId == goodsId);
  const index = mockData.data.indexOf(item[0]);
  mockData.data.splice(index, 1, data);
  let obj=  {
    code: 200,
    success:'修改成功'
  };
  res.send(obj)
})

router.post('/add',(req,res)=>{
  const { goodsClass,goodsId,goodsName,goodsAddress,goodsLink,goodsSale } = req.body;
  mockData.data = [
    {
      "goodsClass":goodsClass,
      "goodsId": goodsId,
      "goodsName": goodsName,
      "goodsAddress": goodsAddress,
      "goodsLink": goodsLink,
      "goodsSale": goodsSale
    },
    ...mockData.data,
  ]
  let obj=  {
    code: 200,
    success:"新增成功"
  };
  res.send(obj)
})
module.exports=router











mock.js

const Mock = require('mockjs')

// 定义数据类型
var data = Mock.mock({
    // 20条数据
    "data|20": [{
      "goodsClass": "设备",
      // 商品Id
      "goodsId|+1": 1,
      "goodsName": "@ctitle(6)",
      "goodsAddress": "@county(true)",
      "goodsLink": "@Link('100x100','@color','小姐姐')",
      "goodsSale|30-500": 30
  
    }],
    count:20
  })
  module.exports=data
  // 输出结果随机生成的数据（node index.js）
  //  console.log(data);
