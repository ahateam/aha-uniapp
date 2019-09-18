<template>
	<view>
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item, index) in contentTagGroupData" :key="index" class="nav-item" :class="{ current: index === currentSort }"
			 @click="changeNav(index)" :id="'tab'+index">
				{{ item.name }}
			</view>
		</scroll-view>
		<view style="padding-top: 90upx;"></view>
		<view class="contentBox" v-for="(item,index) in templateList" :key="index">

			<image :src="item.data.src" mode="scaleToFill" class="imgs" v-if="item.type == 1"></image>

			<video class="imgs" :src="item.data.src" controls v-if="item.type == 0"></video>

			<view class="contentTitle">
				{{item.name}}
			</view>
			<view class="contentInfo">
				{{item.text}}
			</view>
			<button type="primary" class="contentBtn" @click="navToCreate(item)">选择</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				count: 10,
				offset: 0,
				type: '',

				contentTagGroupData: [], //标签列表
				currentSort: -1, //标签选中下标
				tagName: '', //选中标签

				templateName: '',
				templateList: [{
						name: '1',
						text: '123123213',
						src: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1568011516&di=c7cce7e0bdf1f6caad1532f39f7a9f9a&src=http://b-ssl.duitang.com/uploads/item/201305/26/20130526140022_5fMJe.jpeg',
						type: 0
					},
					{
						name: '2',
						text: '123123213',
						src: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1568011516&di=c7cce7e0bdf1f6caad1532f39f7a9f9a&src=http://b-ssl.duitang.com/uploads/item/201305/26/20130526140022_5fMJe.jpeg',
						type: 1
					}
				], //模板列表

			};
		},
		onLoad(res) {
			this.templateName = this.$constData.taskType[res.type].templateName
			this.type = res.type
			let cnt = {
				module: this.$constData.module, // String 隶属
				type: res.type, // Byte <选填> 类型
				status: this.$constData.tagStatus[0].key, // Byte <选填> 状态
				// tags: tags, // String <选填> 标签
				count: 10, // Integer
				offset: 0, // Integer
			}
			this.getTemplate(cnt)
			this.getTags()
		},
		methods: {
			navToCreate(item) {
				console.log(item)
				if (item.type == 0) {
					uni.navigateTo({
						url: `/pages/task/createTask/createVideoTask?id=${item.id}`
					})
				} else if (item.type == 1) {
					uni.navigateTo({
						url: `/pages/task/createTask/createFoodTask?id=${item.id}`
					})
				}
			},

			//根据标签改变内容
			changeNav(e) {
				this.currentSort = e
				this.tagName = this.contentTagGroupData[e].name

				let cnt = {
					module: this.$constData.module, // String 隶属
					type: this.type, // Byte <选填> 类型
					status: this.$constData.tagStatus[0].key, // Byte <选填> 状态
					tags: this.tagName, // String <选填> 标签
					count: 10, // Integer 
					offset: 0, // Integer 
				}
				this.getTemplate(cnt)
			},

			//获取标签
			getTags() {
				let cnt = {
					moduleId: this.$constData.templateModule, // String 隶属
					group: this.type, // String 分组
					status: this.$constData.tagStatus[1].key, // Byte 标签状态
					count: 50, // Integer 
					offset: 0, // Integer 
				}
				this.$api.getContentTag(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.contentTagGroupData = this.$util.tryParseJson(res.data.c)
						console.log(this.contentTagGroupData)
					}
				})
			},

			//获取模板
			getTemplate(cnt) {
				this.$api.getTemplates(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let list = this.$util.tryParseJson(res.data.c)
						for (let i = 0; i < list.length; i++) {
							list[i].data = this.$util.tryParseJson(list[i].data)
						}
						this.templateList = list
						console.log(this.templateList)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-bar {
		position: fixed;
		z-index: 10;
		height: 90upx;
		white-space: nowrap;
		box-shadow: 0 2upx 8upx rgba(0, 0, 0, 0.06);
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
				transition: 0.3s;
			}
		}

		.current {
			color: #007aff;

			&:after {
				width: 30%;
			}
		}
	}

	.contentBox {
		position: relative;
		padding: $box-margin-top $box-margin-left;
		line-height: 0;
	}

	.imgs {
		width: 20vw;
		height: 20vw;
	}

	.contentTitle,
	.contentInfo {
		position: absolute;
		top: 50%;
		margin-left: 21vw;
		font-size: $list-title;
		line-height: $list-title-line;
	}

	.contentTitle {
		font-weight: bold;
		margin-top: -1.2em;
	}

	.contentInfo {
		margin-top: 0.2em;
	}

	.contentBtn {
		position: absolute;
		right: $box-margin-left;
		bottom: $box-margin-top;
		font-size: $list-title;
		line-height: $list-title-line;
	}
</style>
