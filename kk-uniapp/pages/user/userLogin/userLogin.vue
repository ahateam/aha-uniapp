<template>
	<view>
		<view class="titleBox">表扬表扬ta</view>
		<input type="text" placeholder="请输入账号" v-model="account"/>
		<input type="text" placeholder="请输入密码"  v-model="password"/>
		<button type="primary" class="loginBtn">登录</button>
		<view>
			<view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account:'',//账号
				password:'',//密码
				
			};
		}
	}
</script>

<style lang="scss">

</style>
