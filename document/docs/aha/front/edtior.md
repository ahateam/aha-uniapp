---

title: uni-app——缓存
author: 李金泉   
date: 2019-12-12

---

## 两端的编辑器

- #### PC端的编辑器采用了[wangEditor](http://www.wangeditor.com/)

  > *wangEditor*的使用
  >
  > - npm导入编辑器
  >
  > ```
  > npm install wangeditor
  > ```
  >
  > - 导入后就可以在页面中引用啦，示例：
  >
  > ```html
  > <div id="editor"></div>
  > ```
  >
  > 
  >
  > ```js
  > import wangEditor from 'wangeditor' //引入
  > 
  > mounted() {
  >     this.editor = new wangEditor('#editor') // 需要根据元素id生成编辑器
  > 	this.editor.customConfig.zIndex = 1 // 降低z-index等级防止显示异常
  >     this.editor.create() // 生成编辑器
  > }
  > 
  > // this.editor.txt.getJSON() // 取出json格式编辑器内容
  > ```
  >
  > 

  

  

- #### 手机端的编辑器效果不佳，如感兴趣可去[uni-app插件市场](https://ext.dcloud.net.cn/)搜索''编辑器''

  

