<template>
	<view>
		<view class="titleInput">
			<input type="text" v-model="title" placeholder="请输入标题" />
		</view>
		<view class="autoBox">
			<view class="titleBox">
				陪吃对象
			</view>
			<view class="contentBox">
				<text class="contents" v-for="(item,index) in objList" :style="item.status == true?'color:#ec706b;font-weight:bold':''"
				 :key="index" v-if="index<objMore" @click="changeObj(item)">
					{{item.name}}
				</text>
				<text class="contents moreBtn">更多+</text>
			</view>
		</view>

		<view class="autoBox">
			<view class="titleBox">
				陪吃目的
			</view>
			<view class="contentBox">
				<text class="contents" v-for="(item,index) in purposeList" :style="item.status == true?'color:#ec706b;font-weight:bold':''"
				 :key="index" v-if="index<purposeMore" @click="changePurpose(item)">
					{{item.name}}
				</text>
				<text class="contents moreBtn">更多+</text>
			</view>
		</view>

		<view class="autoBox">
			<view class="titleBox">
				其他要求
			</view>
			<view class="bottomInputs">
				<text class="leftTitle">年龄</text><input style="width: 2em;" type="number" v-model="minOld" />-<input style="width: 2em;"
				 type="number" v-model="maxOld" />
			</view>
			<view class="bottomInputs">
				<text class="leftTitle">地点</text><input style="text-align: left;" type="text" v-model="taskAddrss" placeholder="请输入地点" />
			</view>
			<view class="bottomInputs">
				<text class="leftTitle">租金</text><input style="width: 2em;" type="number" v-model="money" placeholder="50" />元/小时
			</view>
		</view>

		<view class="autoBox">
			<view class="bottomInputs">
				<text class="leftTitle">预留电话</text><input type="number" v-model="telPhone" placeholder="输入电话号码" />
			</view>
		</view>

		<button class="addTaskBtn" type="primary" @click="addTask">发布</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: uni.getStorageSync('userId'),
				title: '',

				objList: [{
						name: '油腻大叔',
						status: false
					},
					{
						name: '体贴暖男',
						status: false
					},
					{
						name: '风趣帅哥',
						status: false
					},
					{
						name: '豪爽爷们',
						status: false
					},
					{
						name: '性感女神',
						status: false
					},
					{
						name: '知性美女',
						status: false
					},
					{
						name: '清纯佳人',
						status: false
					}
				], //陪吃列表
				choiceObj: [],
				objMore: 7, //显示多少个对象选项

				purposeList: [{
						name: '吃饭聊天',
						status: false
					},
					{
						name: '交友',
						status: false
					},
					{
						name: '发泄郁闷',
						status: false
					},
					{
						name: '放松心情',
						status: false
					},
					{
						name: '假扮男友',
						status: false
					},
					{
						name: '假扮女友',
						status: false
					}
				], //目的列表
				choicePurpose: [],
				purposeMore: 7, //控制显示个数

				taskObj: '', //任务对象值 默认列表第一个
				taskpurpose: '', //任务目的值 默认列表第一个

				minOld: 18, //最小年龄
				maxOld: 24, //最大年龄
				taskAddrss: '', //任务地点
				money: 50, //money
				telPhone: '', //电话号码
			}
		},
		onLoad(options) {
			this.type = options.type
			this.title = options.title
			console.log(this.type)
			this.changeObj(this.objList[0])
			this.changePurpose(this.purposeList[0])
		},
		created() {
			this.taskObj = this.objList[0].name
			this.taskpurpose = this.purposeList[0].name
		},
		methods: {
			//发布任务
			addTask() {
				if (this.minOld == '' || this.maxOld == '' || this.taskAddrss == '' || this.money == '' || this.telPhone == '') {
					uni.showToast({
						title: '请将信息填写完整',
						duration: 1000,
						icon: 'none'
					})
					return
				}

				let data = {
					purpose: this.choicePurpose,
					obj: this.choiceObj,
					age: `${this.minOld}-${this.maxOld}`,
					addrss: this.taskAddrss,
					tel: this.telPhone
				}

				data = JSON.stringify(data)

				let cnt = {
					module: this.$constData.module, // Long 模块编号
					ask: this.type, // Byte 诉求分类（0求表扬，1求陪玩，2求分享，3求制作）
					type: this.$constData.templateType[4].key, // Byte 类型（0图文,1视频,2gif表情,3音频,4描述）
					upUserId: this.userId, // Long 创建者
					// tags: tags, // String <选填> 标签
					title: this.title, // String 标题
					detail: data, // String 需求详细
					deposit: 5, // Double 保证金
					advanceAmount: this.money, // Double 预付款
					// pos: pos, // String <选填> 位置
				}
				// console.log(JSON.stringify(cnt))
				this.$store.state.createFoodTask.data = cnt
				console.log(this.$store.state.createFoodTask.data)
				uni.navigateTo({
					url: `/pages/task/payView/payView?type=0`
				})
			},

			//改变对象
			changeObj(item) {
				if (item.status == false) {
					item.status = true
					let data = {
						name: item.name
					}
					this.choiceObj.push(data)
				} else {
					item.status = false
					let arr = this.choiceObj
					for (let i = 0; i < arr.length; i++) {
						if (arr[i].name == item.name) {
							arr.splice(i, 1)
						}
					}
					this.choiceObj = arr
				}
				console.log(this.choiceObj)
			},

			//改变目的
			changePurpose(item) {
				if (item.status == false) {
					item.status = true
					let data = {
						name: item.name
					}
					this.choicePurpose.push(data)
				} else {
					item.status = false
					let arr = this.choicePurpose
					for (let i = 0; i < arr.length; i++) {
						if (arr[i].name == item.name) {
							arr.splice(i, 1)
						}
					}
					this.choicePurpose = arr
				}
				console.log(this.choicePurpose)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.titleInput {
		width: 100vw;
		box-sizing: border-box;
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
	}

	.autoBox {
		padding: $box-margin-top $box-margin-left;
	}

	.titleBox {
		font-size: $list-title;
		font-weight: bold;
	}

	.contentBox {
		position: relative;
	}

	.contents {
		display: inline-block;
		width: 25%;
		box-sizing: border-box;
		padding: 10upx;
		font-size: $list-title;
		text-align: center;
	}

	.moreBtn {
		// position: absolute;
		color: $list-info-color;
	}

	.bottomInputs {
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;

		input {
			display: inline-block;
			width: 30vw;
			vertical-align: middle;
			text-align: center;
		}
	}

	.leftTitle {
		margin-right: 30upx;
		vertical-align: middle;
	}

	.addTaskBtn {
		position: fixed;
		display: inline-block;
		bottom: 20upx;
		right: 20upx;
		font-size: $list-title;
	}
</style>
