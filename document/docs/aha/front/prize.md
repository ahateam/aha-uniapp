---
title:抽奖小程序总结
author:huqian
data:2019-12-11

---

### 小程序开发重难点总结

#### 一、用户登录

* 使用 button 组件，并将 open-type 指定为 getUserInfo 类型，获取用户基本信息

*  获取用户信息需要先使用 uni.login 获取登录用户的code，再调用后端接口，请求腾讯服务器换取用户openId ，最后调用 uni.getUserInfo 获取用户信息（昵称、头像等）

```java
** 后端通过用户code换取用户openId代码（以下为微信小程序请求，不同小程序会有部分差异）**
	// 创建Httpclient对象
    CloseableHttpClient httpclient = HttpClients.createDefault();
    // 定义请求的参数
    URI uri = new URIBuilder("https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+secret+"&js_code="+js_code+"&grant_type="+grant_type).build();
    // 创建http GET请求
    HttpGet httpGet = new HttpGet(uri);
    //response 对象
    CloseableHttpResponse response = null;
    try {
        String content = null;
        // 执行http get请求
        response = httpclient.execute(httpGet);
        // 判断返回状态是否为200
        if (response.getStatusLine().getStatusCode() == 200) {
            content = EntityUtils.toString(response.getEntity(), "UTF-8");
        }
        return JSONObject.parseObject(content);
    } finally {
        if (response != null) {
            response.close();
        }
        httpclient.close();
    }
```

#### 二、下拉刷新

* 调用 onPullDownRefresh() 生命周期方法。该方法执行时，需要先将原数据进行初始化再调用查询接口，否则会出现数据重复现象，查询接口调用结束后需要调用 uni.stopPullDownRefresh() 方法停止刷新

```uni-app
    //下拉刷新
    onPullDownRefresh() {
        this.pageOver = false
        this.prizeList = []
        this.page = 1
        let cnt = {
            count: 10,
            offset: 0
    	}
        this.getPrizeList(cnt)
        setTimeout(function () {
    		uni.stopPullDownRefresh();
    	}, 1000);
    }
```

#### 三、触底加载

* 调用 onReachBottom() 生命周期方法。将页码+1，修改传入查询接口中的参数，再次调用查询接口

```uni-app
		onReachBottom() {
			console.log(this.pageOver)
			if (!this.pageOver) {
				this.page += 1
				let cnt = {
					count: this.count,
					offset: (this.page - 1) * this.count
				}
				this.getPrizeList(cnt)
			}
		}
```

#### 四、页面分享

* 调用 onShareAppMessage() 生命周期方法

```uni-app
		onShareAppMessage(res) {
			let pages = getCurrentPages() //获取加载的页面
			let currentPage = pages[pages.length - 1] //获取当前页面的对象
			console.log(currentPage)
			let url = currentPage.route //当前页面url
			if (url == undefined) {
				url = currentPage.__route__
			}
			let options = currentPage.options //如果要获取url中所带的参数可以查看options 
			let id = options.id
			let src = `${url}?id=${id}`
			console.log(src)
			if (res.from == 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '抽奖',
				path: src
			}
		}
```

#### 五、图片上传

* 先调用 uni.chooseImage() 方法，从本地相册中选择图片，再调用 uni.uploadFile() 方法，将选择的图片上传至服务器

```uni-app
			//相册添加图片
			addImgs(e){
				let tiemr = new Date()
				let address = tiemr.getFullYear()+"" + (tiemr.getMonth()+1) + "" + tiemr.getDate();
				address ='image/'+address+'/'
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: (res) => {
						this.showPopup = false
						let imageSrc = res.tempFilePaths[0]
						let str = res.tempFilePaths[0].substr(res.tempFilePaths[0].lastIndexOf('.'))
						let nameStr =address+ tiemr.getTime()+str
						// nameStr =  res.tempFilePaths[0]
						console.log(nameStr)
						uni.showLoading({
						    title: '上传中'
						})
						this.upLoadImg(imageSrc,nameStr,e)
					},fail: (err) => {
					uni.showToast({
						title:'已取消',
						icon:'none'
					})
					}
				})
			},
			// 上传至服务器
			upLoadImg(imageSrc,nameStr,e){
				uni.uploadFile({
						url: 'https://weapp-xhj.oss-cn-hangzhou.aliyuncs.com',
						filePath: imageSrc,
						fileType: 'image',
						name: 'file',
						formData:{
							name:nameStr,
							'key' : nameStr,
							'policy': 'eyJleHBpcmF0aW9uIjoiMjAyMi0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
							'OSSAccessKeyId': 'LTAIJ9mYIjuW54Cj', 
							'success_action_status' : '200', 
							//让服务端返回200,不然，默认会返回204
							'signature': 'kgQ5n4s0oKpFHp35EI12CuTFvVM=',
					},success: (res) => {
						console.log(res)
						
						uni.hideLoading()
						uni.showToast({
							title: '上传成功',
							icon: 'success',
							duration: 1000
						})
						if(e==0){
							this.imgsrc1 = 'https://weapp-xhj.oss-cn-hangzhou.aliyuncs.com/'+nameStr
						}else if(e==1) {
							this.imgsrc2 = 'https://weapp-xhj.oss-cn-hangzhou.aliyuncs.com/'+nameStr
						}else if(e==2) {
							this.imgsrc3 = 'https://weapp-xhj.oss-cn-hangzhou.aliyuncs.com/'+nameStr
						}else{
							this.imgList.push('https://weapp-xhj.oss-cn-hangzhou.aliyuncs.com/'+nameStr)
						}
						console.log(this.imgList)
					},fail: (err) => {
						console.log('uploadImage fail', err);
						uni.showModal({
							content: err.errMsg,
							showCancel: false
						})
					}
				})
			}
```

### 微信小程序过审注意事项

1. 小程序本身无bug，真机调试可正常运行

2. 小程序项目中 commen/url.js 文件中的 baseUrl 确认已换为服务器地址

3. 登录微信公众平台，在 开发->开发设置 中配置服务器域名和业务域名（例如： https://topoints.cn ），如有上传功能，还需配置 uploadFile 合法域名（地址为前端代码中的文件上传地址，如 https://weapp-xhj.oss-cn-hangzhou.aliyuncs.com ）

4. 小程序不能强行要求用户登录， 在用户未登录状态了解体验小程序功能后，再要求用户进行帐号登录。在登录过程中，用户可以选择取消，而不是只能登录或者退出小程序

5. 小程序正式上线时，必须清空所有测试数据，插入正式数据

6. 具体行为规范参考： https://developers.weixin.qq.com/community/operate/doc/000640bb8441b82900e89f48351401 

### 头条小程序过审注意事项

1. 参考微信小程序过审注意事项1-5
2. 登录状态下进入小程序，弹出获取用户头像、昵称等信息的弹窗，选择允许，能够正常拿到头像和名字，小程序中的头像和名字显示正常，授权弹窗只能出现一次，多次出现时bug；当用户选择不允许时，能够再次掉起授权弹窗。目前解决方案如下：用户拒绝授权后，再次点击登录将调起设置，让用户手动开启权限，开启成功后重新调用登录方法，登录小程序

```uni-app
            uni.hideLoading()
                uni.showModal({
                    title: '开启权限',
                    content: '是否前往开启权限',
                    success: (res) => {
                        if (res.confirm) {
                            // 点击确认
                            console.log("点击确认")
                                uni.openSetting({
                                    success:() => {
                                        this.getUserCode()
                                    }
                                })
                                // this.getUserCode()
                        } else if (res.cancel) {
                            // 点击取消
                            console.log("点击取消")
                                return;
                        }
                    }
                })
```

