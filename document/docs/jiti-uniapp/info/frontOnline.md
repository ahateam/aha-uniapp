---
title: 项目上线说明
author: cometang    
date: 2019-9-28

---

## 集体测试服上线

#### 区级平台上线

###### 找到请求后端的url的文件，一般放在根目录commen文件夹下，修改baseUrl为对应的后端测试服接口地址
     // url.js
     const baseUrl = 'http://47.99.209.235/api/jiti';  //测试服请求地址前缀

###### 找到oss声明文件，将oss中文件上传的bukect修改为对应测试服的bukect 
    
    // ossAuth.js
     bucket: 'jiti-img-test'                 //测试服
     
###### 根目录下打包
    
    npm run build               
    
###### 完成后将dist目录中所有的文件全部上传到对应的oss bucket 中
  
###### 通过测试服地址进行访问

        jiti.test.3ch.org.cn/area/index.html

###### 观察接口请求地址是否正确，完成测试服上线流程

<hr>

#### 合作社测试服

###### 修改baseUrl
    //url.js
    const baseUrl = 'http://47.99.209.235/api/jiti';  //测试服请求地址前缀


###### 修改文件上传的oss的bucket
    // ossAuth.js
    bucket: 'jiti-img-test'                 //测试服

######





