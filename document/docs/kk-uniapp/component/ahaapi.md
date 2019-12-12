---
title: 使用ahaapi插件
author: cometang
date: 2019-9-9

---

## 功能简介

```javascript
    引入ahaapi之后可以使用ajax请求对应的后端数据

```
## 快速上手

- npm 安装
```npm
    npm install ahaapi --save
```

## 事先准备
- 1.在公共方法目录（commen）下创建 api.js 、 url.js 文件

  commen

  ​		├─api.js

  ​		└─url.js

  

  - url.js

  ```js
  const baseUrl = 'https://apitest.cn';  //后端提供接口地址
  		
  export default baseUrl
  ```

  - api.js

  ```js
  import util from 'ahaapi'
  	import baseUrl from './url'
  	
  	let api = {};
  	
  	api.getContents = function (cnt, callback) { // 接口实例 api.'接口名 '
  	    util.call(baseUrl + '/ZskpOtherContent/getContents', cnt, callback) // baseUrl后接'/接口地址'
  	}
  	
  export default api
  ```



- 2.在main.js中引入
``` js
	import util from 'ahaapi'
	import api from './commen/api/api.js'
 
	Vue.prototype.$util = util
	Vue.prototype.$api = api
```

## 页面引用
``` js
	let cnt = {
		module: this.$constData.module,
		type: this.typeList[0].value,
		count: this.count,
		offset: (this.page - 1) * this.count
	}
	// 传至后端的请求值
	
	cnt.re = 'admin'
	cnt.status = this.$constData.statusList[3].value
	//可动态添加属性
	
	this.$api.getContents(cnt, (res) => {
		if (res.data.rc == this.$util.RC.SUCCESS) {//成功回调
			this.tableData = this.$util.tryParseJson(res.data.c)
		} else {//失败回调
			this.tableData = []
		}
        
		// 判断返回长度是否小于请求的长度，是则结束拉取数据
		if (this.tableData.length < this.count) { 
			this.pageOver = true
		} else {
			this.pageOver = false
		}
	})
```

## 三方文档资料

- [ahaapi](http://npm.taobao.org/package/ahaapi)