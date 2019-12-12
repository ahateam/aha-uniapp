---

title: 前端技术文档示例
author: 李金泉   
date: 2019-12-11

---

## vue与uni-app开发的部分不同点

- #### uni-app才有的生命周期

| 函数名            | 说明                                                         |
| ----------------- | ------------------------------------------------------------ |
| onLaunch          | 写在*app.vue*中当<kbd>uni-app</kbd> 初始化完成时触发（全局只触发一次） |
| onShow            | 写在*app.vue*中当 <kbd>uni-app</kbd> 启动，或从后台进入前台显示触发<br />在页面中则为页面显示触发 |
| onHide            | 写在*app.vue*中当 <kbd>uni-app</kbd> 从前台进入后台触发<br />在页面中则为页面隐藏触发 |
| onUniNViewMessage | 对 <kbd>uni-app</kbd>页面发送的数据进行监听，可参考 [nvue 向 vue 通讯](https://uniapp.dcloud.io/use-weex?id=nvue-%E5%90%91-vue-%E9%80%9A%E8%AE%AF) |

> uni-app支持vue所有的生命周期



- #### uni-app的路由

  | 属性                                                         | 类型         | 必填 | 描述                    |  平台兼容  |
  | :----------------------------------------------------------- | ------------ | :--: | ----------------------- | :--------: |
  | [globalStyle](https://uniapp.dcloud.io/collocation/pages?id=globalstyle) | Object       |  否  | 设置默认页面的窗口表现  |            |
  | [pages](https://uniapp.dcloud.io/collocation/pages?id=pages) | Object Array |  是  | 设置页面路径及窗口表现  |            |
  | [tabBar](https://uniapp.dcloud.io/collocation/pages?id=tabbar) | Object       |  否  | 设置底部 tab 的表现     |            |
  | [condition](https://uniapp.dcloud.io/collocation/pages?id=condition) | Object       |  否  | 启动模式配置            |            |
  | [subPackages](https://uniapp.dcloud.io/collocation/pages?id=subpackages) | Object Array |  否  | 分包加载配置            |            |
  | [preloadRule](https://uniapp.dcloud.io/collocation/pages?id=preloadrule) | Object       |  否  | 分包预下载规则          | 微信小程序 |
  | [workers](https://developers.weixin.qq.com/miniprogram/dev/framework/workers.html) | String       |  否  | `Worker` 代码放置的目录 | 微信小程序 |



- 包含了所有配置的pages.json，查看更详细的配置[请点击]([https://uniapp.dcloud.io/collocation/pages?id=%E9%85%8D%E7%BD%AE%E9%A1%B9%E5%88%97%E8%A1%A8](https://uniapp.dcloud.io/collocation/pages?id=配置项列表))

```json
{
    "pages": [{
        "path": "pages/component/index",
        "style": {
            "navigationBarTitleText": "组件"
        }
    }, {
        "path": "pages/API/index",
        "style": {
            "navigationBarTitleText": "接口"
        }
    }, {
        "path": "pages/component/view/index",
        "style": {
            "navigationBarTitleText": "view"
        }
    }],
    "condition": { //模式配置，仅开发期间生效
        "current": 0, //当前激活的模式（list 的索引项）
        "list": [{
            "name": "test", //模式名称
            "path": "pages/component/view/index" //启动页面，必选
        }]
    },
    "globalStyle": {
        "navigationBarTextStyle": "black", //导航栏字体颜色
        "navigationBarTitleText": "演示", //导航栏文本
        "navigationBarBackgroundColor": "#F8F8F8", //导航栏的背景色
        "backgroundColor": "#F8F8F8", //窗口的背景色
        "usingComponents":{
            "collapse-tree-item":"/components/collapse-tree-item"
        },
    "pageOrientation": "portrait"//全局屏幕旋转设置(仅微信/QQ小程序)，支持 auto / portrait / landscape
    },
    "tabBar": {
        "color": "#7A7E83", 
        "selectedColor": "#3cc51f",
        "borderStyle": "black",
        "backgroundColor": "#ffffff",
        "height": "50px",
        "fontSize": "10px",
        "iconWidth": "24px",
        "spacing": "3px",
        "list": [{
            "pagePath": "pages/component/index",
            "iconPath": "static/image/icon_component.png",
            "selectedIconPath": "static/image/icon_component_HL.png",
            "text": "组件"
        }, {
            "pagePath": "pages/API/index",
            "iconPath": "static/image/icon_API.png",
            "selectedIconPath": "static/image/icon_API_HL.png",
            "text": "接口"
        }],
        "midButton": {
            "width": "80px",
            "height": "50px",
            "text": "文字",
            "iconPath": "static/image/midButton_iconPath.png",
            "iconWidth": "24px",
            "backgroundImage": "static/image/midButton_backgroundImage.png"
        }
    }
}
```

> 与vue中的router有部分相同之处,但是uni的路由中有样式以及组件的配置