---
title: 前端上线说明
author: cometang    
date: 2019-9-28

---

# 集体测试服/正式服上线

### 区级平台上线 /合作社（类似）

###### 找到请求后端的url的文件，一般放在根目录commen文件夹下，修改baseUrl为对应的后端测试服接口地址【正式服就将地址改为正式服地址】
     // url.js
        const baseUrl = 'http://47.99.209.235/api/jiti';  //测试服请求地址前缀
     // const baseUrl = 'http://47.99.212.32/api/jiti';  正式服请求地址前缀

###### 找到oss声明文件，将oss中文件上传的bukect修改为对应测试服的bukect 【正式服就将地址改为正式服地址】
    
    // ossAuth.js
     bucket: 'jiti-img-test'                 //测试服
    // bucket: 'jitijingji-test1'       //正式服
###### 根目录下打包
    
    npm run build               
    
###### 完成后将dist目录中所有的文件全部上传到对应的oss bucket 中
  
###### 通过测试服地址进行访问

        jiti.test.3ch.org.cn/area/index.html

###### 观察接口请求地址是否正确，完成测试服上线流程

<hr>

### wap/H5 移动版上线

###### HbuliderX 中打开jiti-uniapp 项目 

###### 找到请求后端的url的文件，一般放在根目录commen文件夹下，修改baseUrl为对应的后端测试服接口地址【正式服就将地址改为正式服地址】
      // url.js
        const baseUrl = 'http://47.99.209.235/api/jiti';  //测试服请求地址前缀
     // const baseUrl = 'http://47.99.212.32/api/jiti';  正式服请求地址前缀

###### “发行——网站H5手机版”
###### 弹出窗填写好 对应的访问地址   【正式服就将地址改为正式服地址】
    jiti.test.3ch.org.cn    //测试服访问地址
    //jiti.online.3ch.org.cn    //正式服访问地址
###### 将打包完成的H5文件夹下的文件，上传到oss对应bucket中的wap文件夹下即可

###### 测试服的wap测试完成之后开始打包app

<hr>

### APP应用打包上线
#### 注：APP只能打包到正式服，因为涉及到版本在线强制更新的原因



