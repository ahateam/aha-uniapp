<template>
	<view>
		<view class="view-box flex-box" :style="{background:obj.background}">
			<scroll-view scroll-y class="body flex-box" :style="{'background-color':obj.listBackground}">
				<view v-for="(item,index) in obj.list" :key="index">
					<image class="img-box" :src="item.data" mode="widthFix" v-if="item.type == 'img'"></image>
					<view class="text-box" :style="item.style" v-else-if="item.type == 'text'">{{item.data}}</view>
					<up-user-box :userInfo="obj.userInfo" @click="popupShow = true" v-else></up-user-box>
				</view>
				<view class="bottom-box">
					<up-user-box :userInfo="obj.userInfo" @click="popupShow = true"></up-user-box>
				</view>
				<uni-popup :show="popupShow" @change="change" type="center" :mask-click="true">
					<view class="content-box flex-box">
						<image class="succ-icon" src="/static/image/succ.png" mode="widthFix"></image>
						<view class="popup-title">复制成功</view>
						<view class="popup-info">
							您已成功复制微信号，是否立即跳转到微信搜索该微信号？
						</view>
						<view class="btn-box flex-box">
							<button class="colse-btn" @click="popupShow = false">取消</button>
							<button class="succ-btn" @click="toWx">确认</button>
						</view>
					</view>
				</uni-popup>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import UpUserBox from '@/components/UpUserBox.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'

	export default {
		components: {
			UpUserBox,
			uniPopup
		},
		data() {
			return {
				popupShow: false,

				obj: {
					background: 'linear-gradient(180deg, rgba(28,146,210,.8), rgba(242,252,254,.8))',

					listBackground: '#FFF',

					userInfo: {
						userHead: '/static/image/head.webp',
						userName: '焕姐育儿公开课',
						userNumber: 'newWX123'
					},

					list: [{
							type: 'img',
							data: '/static/image/0.webp'
						},
						{
							type: 'text',
							data: '点击下面+关注，添加焕姐免费为你解答育儿问题',
							style: 'color:red;font-size:18px'
						},
						{
							type: 'user'
						},
						{
							type: 'img',
							data: '/static/image/1.jpg'
						},
						{
							type: 'text',
							data: '点击下面+关注，添加焕姐免费为你解答育儿问题',
							style: 'color:red;font-size:18px'
						},
						{
							type: 'user'
						},
						{
							type: 'img',
							data: '/static/image/2.jpg'
						},
						{
							type: 'img',
							data: '/static/image/3.jpg'
						}
					]
				}
			}
		},
		onLoad() {

		},
		methods: {
			toWx() {
				window.location.replace('weixin://');
				this.popupShow = false
			},

			change(e) {
				if (!e.show) {
					this.popupShow = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	button {
		cursor: pointer;
	}

	.view-box {
		width: 100vw;
	}

	.flex-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.body {
		position: relative;
		width: 100vw;
		max-width: 600px;
		height: 100vh;
		padding-bottom: calc(var(--window-bottom) + 70px);
		box-sizing: border-box;
		box-shadow: 0 0 5px 5px rgba($color: #0F0F0F, $alpha: .3);

		.img-box {
			width: 100%;
			height: auto;
		}
	}

	.text-box {
		text-align: center;
	}

	.bottom-box {
		position: fixed;
		display: flex;
		align-items: center;
		bottom: var(--window-bottom);
		width: 100vw;
		max-width: 600px;
		background-color: rgba($color: #FFF, $alpha: .8);
		height: 60px;
	}

	.content-box {
		box-sizing: border-box;
		padding: 20px;
		background-color: #FFF;
		border-radius: 5px;
	}

	.succ-icon {
		width: 42px;
	}

	.popup-title {
		font-size: 25px;
		margin-top: 10px;
	}

	.popup-info {
		text-align: center;
		font-size: 15px;
		width: 15em;
		margin-top: 10px;
	}

	.btn-box {
		width: 100%;
		box-sizing: border-box;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 25px;
		font-size: 15px;
		line-height: 20px;

		button {
			background-color: #FFFFFF;
			border: 1px solid;
			border-radius: 20px;
			padding: 0 25px;

			&:after {
				border: none;
			}
		}
	}

	.colse-btn {
		border-color: #999;
		color: #999;
	}

	.succ-btn {
		border-color: #00d48c;
		color: #00d48c;
	}
</style>
