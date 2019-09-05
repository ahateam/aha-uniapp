<template>
	<view>
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item,index) in tagsList" :key="index" class="nav-item" :class="{current: index === tabCurrentIndex}"
			 :id="'tab'+index" @click="changeTag(index)">{{item.name}}</view>
		</scroll-view>
		<view style="padding-top: 90upx;"></view>
		<view v-for="(item,index) in columnList" :key="index">
			<column :obj="item"></column>
		</view>
	</view>
</template>

<script>
	import column from '@/components/vip/column.vue'
	export default {
		components: {
			column,
		},
		data() {
			return {
				count: 10,
				offset: 0,
				page: 1,

				columnList: [], //课程列表
				
				tagsList: [],//标签列表
				tabCurrentIndex:0,//选中标签下标
				tagName:'',//当前选中标签名
			}
		},
		onLoad() {
			let cnt = {
				module: this.$constData.module, // String 隶属
				status: 0, // Byte <选填> 状态 默认显示0
				// tags: tags, // String <选填> 标签
				count: this.count, // Integer 
				offset: this.offset, // Integer 
			}
			this.getTags()
			this.getChannel(cnt)
		},
		methods: {
			//获取假数据
			getLocalData(){
				this.columnList = [
					{
						id:400991144409319,
						createTime:1566371748915,
						title:'专栏1'
					},
					{
						id:400575094202044,
						createTime:1566301330971,
						title:'专栏2'
					}
				]
			},
			
			//根据标签切换内容
			changeTag(e){
				this.tabCurrentIndex = e
				// this.tagName = this.tagsList[e].name
				// 
				// let cnt = {
				// 	module: this.$constData.module, // String 隶属
				// 	status: 0, // Byte <选填> 状态
				// 	// tags: tags, // String <选填> 标签
				// 	count: this.count, // Integer 
				// 	offset: this.offset, // Integer 
				// }
				// 
				// if(e != 0){
				// 	cnt.tags = this.tagName
				// 	this.getChannel(cnt)
				// }else{
				// 	this.getChannel(cnt)
				// }
			},
			
			//获取专栏标签
			getTags() {
				let cnt = {
					moduleId: this.$constData.module, // String 隶属
					status: this.$constData.tagStatus[1].key, // Byte 标签状态
					group: 'VIP', // String 标签
					count: 500, // Integer 
					offset: 0, // Integer 
				}
				this.$api.getContentTag(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.tagsList = this.$util.tryParseJson(res.data.c)
						console.log(this.tagsList)
						// this.getLocalData()
					} else {
						console.log('错误')
					}
				})
			},

			//获取专栏
			getChannel(cnt) {
				this.$api.getChannel(cnt, (res => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.columnList = this.$util.tryParseJson(res.data.c)
						console.log(this.columnList)
					}else{
						this.columnList = []
					}
				}))
			},
		},
		onPullDownRefresh(){
			// this.page = 1
			// let cnt = {
			// 	module: this.$constData.module, // String 隶属
			// 	status: 0, // Byte <选填> 状态
			// 	// tags: tags, // String <选填> 标签
			// 	count: this.count, // Integer 
			// 	offset: this.offset, // Integer 
			// }
			// if(this.tabCurrentIndex == 0){
			// 	this.getChannel(cnt)
			// }else{
			// 	cnt.tags = this.tagName
			// 	this.getChannel(cnt)
			// }
		},
		onReachBottom: function(){
			this.page += 1
			
		}
	}
</script>

<style lang="scss" scoped>
	/* 顶部tabbar */
	.nav-bar {
		position: fixed;
		top: 0;
		z-index: 10;
		height: 90upx;
		white-space: nowrap;
		box-shadow: 0 2upx 8upx rgba(0, 0, 0, .06);
		background-color: #fff;

		.nav-item {
			display: inline-block;
			width: 150upx;
			height: 90upx;
			text-align: center;
			line-height: 90upx;
			font-size: 30upx;
			color: #303133;
			position: relative;

			&:after {
				content: '';
				width: 0;
				height: 0;
				border-bottom: 4upx solid #007aff;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: .3s;
			}
		}

		.current {
			color: #007aff;

			&:after {
				width: 50%;
			}
		}
	}
</style>
