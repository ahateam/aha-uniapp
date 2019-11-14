---
title: 小红椒前端AHA团队代码规范
author: cometang    
date: 2019-11-12

---

#### 文件夹相关

###### 命名

默认：全部小写字母

组件文件夹命名规则： 对象+作用/动作+形容词    shopListItem

组件命名：	ShopListItem.vue ------------->   <shop-list-item></shop-list-item>

​	

#### commen

公共js模块文件夹：通用js文件放置

- commen.js   通用js方法

- api.js             后端接口对接

- url.js              后端接口的服务器地址

- constDate     存全局静态常量

  ```js
  //commen.js
  /** @getNowDate 获取当前的日期转换格式
  	 *  @nowDate  当前日期格林尼治时间 
  	 *  @return  string:'2019-01-01'
  	 * */
  	 commen.getNowDate=(nowDate)=>{
  		 
  	 }
  
  
  ```

  

#### static

公共的静态文件：图片+图标+音视频

image--->模块名称-->静态图片





### css

- class命名：title-box   title
- id命名：title
- ref命名： titleBox 
- 写法： 定位：相对/绝对定位（position）--------间距（margin/padding）--------透明+动画  --------- 字体（color size  ）

#### uniapp & js

规范：

- 每个vue文件一定要有name

- name-------data------methods------created()------onShow----onLoad----mounted()----触底加载---下拉刷新

- html   v-for 必须加key   ||  v-if和v-for 不要放到同一个dom节点上使用

- ajax 请求示例

  ```js
  			/* 获取shop列表数据*/
  			getContentsByUser(cnt){
  				this.$api.getContentsByUser(cnt,(res)=>{
  						if(res.data.rc == this.$util.RC.SUCCESS){
  								console.log('请求成功了')
  								this.list = this.$util.tryParseJson(res.data.c)
  						}else{
  							console.log('请求失败了')
  						}
  				})
  			},
  			/*获取默认数据*/
  			getDataList(){
  				let cnt ={}
  				this.getContentsByUser(cnt)
  			}
  ```

  #### 其他规范遵守vue官网及uniapp官网代码规范

  ``` js
		//vue代码规范
		https://cn.vuejs.org/v2/style-guide/

		//uniapp代码规范
		https://uniapp.dcloud.io
  ```