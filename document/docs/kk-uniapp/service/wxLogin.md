---
title: 实现微信登录并绑定
author: 李金泉
date: 2019-9-9

---

## 功能简介
- 1. 主要实现在uniapp端能够通过微信登录获取用户数据
- 2. 可满足微信小程序的登录


## 实现示例
- ### html部分代码
```html
<view class="body">
	<!-- 用户信息 -->
	<view class="userBox">
		<view class="topBox">
			<image class="userhead" :src="userHead" mode="widthFix"></image>
			<view class="leftBox">
				<view class="userName">{{userName}}</view>
				<view class="userView" v-if="boxShow">个人主页
					></view>
				<button open-type="getUserInfo" type="primary" class="loginBtn" @getuserinfo="wx()" v-else>登录</button>
			</view>
			<view class="rightBox" v-if="boxShow">
				<view class="userMoney">余额 0.00</view>
				<view class="cashMoney">提现 ></view>
			</view>
		</view>
	</view>
</view>
```

- ### js部分
1. 首先调用api获取临时登录凭证

```javascript
// 微信登录
wx() {
uni.showLoading({
	title: '登录中'
})
uni.login({//通过login获取临时登录凭证code
	provider: 'weixin',
	success: (res) => {
		let code = res.code
		let cnt = {
			code: code, // String code
		}
		this.getUserInfo(cnt)
	},
	fail: function(error) {
		uni.showToast({
			title: error,
			icon: 'none',
			duration: 1000,
		})
	}
})
}
```

2. 将获取的code传给后端，让后端获取微信的用户信息并返回

```javascript
//将code传给后端，获取openId以及用户头像等其他信息
getUserInfo(cnt){
	this.$api.getAccessToken(cnt, (res) => {
		if (res.data.rc == this.$util.RC.SUCCESS) {
			let userInfo = JSON.parse(res.data.c)
			console.log(userInfo)
			let openId = userInfo.openid
			uni.setStorageSync('openId', openId)
			uni.getUserInfo({
				success: (res) => {
					let userHead = res.userInfo.avatarUrl
					let userName = res.userInfo.nickName
					let other = {
						userHead: userHead
					}
					let cnt1 = {
						wxOpenId: openId, // String 微信openId
						name: userName, // string 用户名
						ext: JSON.stringify(other), //其他信息
					}
					this.WxLogin(cnt1)
				},
			})
		} else {
			uni.showToast({
				title: res.data.rc,
				icon: 'none',
				duration: 1000,
			})
		}
	})
}
```

3. 通过后端获取用户的openid再返回给后端，去获得当前用户的唯一id

```javascript
WxLogin(cnt){
	/* 将用户信息上传至服务器获取登录id */
	this.$api.loginByWxOpenId(cnt, (res) => {
		if (res.data.rc == this.$util.RC.SUCCESS) {
			let userData = this.$util.tryParseJson(res.data.c)
			let userId = userData.id
			let userName = userData.name
			let userHead = this.$util.tryParseJson(userData.ext).userHead
			/* 将用户信息存至本地 */
			uni.setStorageSync('userId', userId)
			uni.setStorageSync('userName', userName)
			uni.setStorageSync('userHead', userHead)
			this.userHead = userHead
			this.userName = userName
			this.boxShow = true
			uni.hideLoading()
			uni.showToast({
				title: '已登录！',
				duration: 1000
			});
		} else {
			console.log('失敗')
		}
	})
}
```

## 三方文档资料
- [uni-app](https://uniapp.dcloud.io/)
- [微信小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)