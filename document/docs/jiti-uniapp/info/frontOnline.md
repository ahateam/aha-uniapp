---
title: 集体前端上线说明
author: cometang    
date: 2019-9-28

---

## 一 、区级平台上线 /合作社



#### 1.找到请求后端的url的文件，一般放在根目录commen文件夹下，修改baseUrl为对应的后端测试服接口地址【正式服就将地址改为正式服地址】

```js
 // url.js
    const baseUrl = 'http://47.99.209.235/api/jiti';  //测试服请求地址前缀
 // const baseUrl = 'http://47.99.212.32/api/jiti';  正式服请求地址前缀
```



#### 2.找到oss声明文件，将oss中文件上传的bukect修改为对应测试服的bukect 【正式服就将地址改为正式服地址】

```js
// ossAuth.js
 bucket: 'jiti-img-test'                 //测试服
// bucket: 'jitijingji-test1'       //正式服
```



#### 3.根目录下打包

```node
npm run build               
```



#### 4.完成后将dist目录中所有的文件全部上传到对应的oss bucket 中



#### 5.通过测试服地址进行访问

```html
    jiti.test.3ch.org.cn/area/index.html
```



#### 6.观察接口请求地址是否正确，完成测试服上线流程



<hr>



## 二、wap/H5 移动版上线





#### 1.HbuliderX 中打开jiti-uniapp 项目 



#### 2.找到请求后端的url的文件，一般放在根目录commen文件夹下，修改baseUrl为对应的后端测试服接口地址【正式服就将地址改为正式服地址】

```js
  // url.js
  const baseUrl = 'http://47.99.209.235/api/jiti';  //测试服请求地址前缀
 // const baseUrl = 'http://47.99.212.32/api/jiti';  正式服请求地址前缀
```



#### 3.“发行——网站H5手机版”



#### 4. 弹出窗填写好 对应的访问地址   【正式服就将地址改为正式服地址】

```js
jiti.test.3ch.org.cn    //测试服访问地址
//jiti.online.3ch.org.cn    //正式服访问地址
```



#### 5.将打包完成的H5文件夹下的文件，上传到oss对应bucket中的wap文件夹下即可



#### 6.测试服的wap测试完成之后开始打包app



<hr>



## 三、APP应用打包上线



```
注：APP只能打包到正式服，因为涉及到版本在线强制更新的原因
```

#### 1.在HbuliderX中打开jiti-uniapp项目



#### 2.找到请求后端的url的文件，一般放在根目录commen文件夹下，修改baseUrl为正式服接口地址

```js
 // url.js
 const baseUrl = 'http://47.99.212.32/api/jiti'  //正式服请求地址前缀
```



#### 3.修改mainifest.json 中的app版本号为下一最新版本号



#### 4.修改constData 中的app版本号为下一最新版本



#### 5.“发行-原生APP云打包”



#### 6.证书选择

- ios 选择hublider提供的默认的越狱包
- 安卓包使用已经有的证书及密码进行打包（密码：Aa...）



#### 7.将打包好的apk/ipa 文件上传到正式服oss上



#### 8.让后端更新为最新的app版本号和下载地址



#### 9. 更新oss 上面的version.js 的内容为最新版本号（防止老版本的app 不能够更新，预计应用商城上了之后就可以取消了）



