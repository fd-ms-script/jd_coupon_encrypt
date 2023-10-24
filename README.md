### 1、抢券直链模板

https://api.m.jd.com/client.action?functionId=newBabelAwardCollection&body={"activityId":代码,"from":"H5node","scene":"1","args":"key=代码,roleId=数字","log":代码,"random":代码}&client=wh5&clientVersion=1.0.0

### 2、优惠券直链参数说明

- activityId：活动页
- key：优惠券参数
- roleId：优惠券参数
- log：main.js 生成
- random：main.js 生成

说明：log 参数和 random 参数，有效访问次数 4 次，第 5 次会返回：很抱歉，没有抢到

### 3、运行项目

```
npm install
node jd_coupon.js
```

log 接口：

```
GET请求：
http://127.0.0.1:3000/log

响应：
{
    "log": "1652184562735~1IeNh1sKIwDd41d8cd98f00b204e9800998ecf8427e~1,1~C56C2F18382DC28F740958CAF3265B1D41BC5BEF~06wurir~C~TRBMWBAIbW8UF0ZcWxACbm8eFFVKWxAIBx4aRkEQDBAJAwcABwoMAAQAAQIODAsGBBAUF0VXUhACF0dUUFReU0dUFB4aQldTFAgaU1RGV0dZQFMQGhBIUVwQDGkaVhAeFFEaGRBRFB4aVhAeFFEaGRBRFG8UF1hYFAgJGRBRRRACFwEKBgNeVgYEVwVbBgADAFRcVFZUVVYJVFELDwUMAAVTFB4aW0IQDBBNFx4QQhACFwMEAwAJDQYHAAAPBgcQGhBSXhAIFFMaGRBURlAaDxAQGhBWQxAIFEcaGRBcV0QaDxBRFB4aRlFAFAhjF1EQGhBbFx4QVRAUF1EQGhBbFx4QVRBlGRBAWRACbhBTFB4aVBAeFFMaGRBTFB4aVBAeFFMaGRBTFG8UF1tdVxACF1RUUFReU0ZGFB4aVFgQDBBNFx4QVVsaDxBFBRwNGwAQGhBbU21EFAgaBQIQGhBaURAIFEBZW1ZdWw8MAAAFAwsIAhAeFF9SFwhpBh4IGQJvGhBaWV1VFAgaVBAeFF9LUhAIFFMaSA==~0u3byow",
    "random": "45275907"
}
```
