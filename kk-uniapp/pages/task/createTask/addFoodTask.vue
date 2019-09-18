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
				<text class="contents" v-for="(item,index) in objList" :style="index == objListIndex?'color:#ec706b;font-weight:bold':''"
				 :key="index" v-if="index<objMore" @click="changeObj(index)">
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
				<text class="contents" v-for="(item,index) in purposeList" :style="index == purposeIndex?'color:#ec706b;font-weight:bold':''"
				 :key="index" v-if="index<purposeMore" @click="changePurpose(index)">
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
				<text class="leftTitle">年龄</text><input style="width: 2em;" type="number" v-model="minOld" placeholder="18"/>-<input style="width: 2em;" type="number" v-model="maxOld" placeholder="24"/>
			</view>
			<view class="bottomInputs">
				<text class="leftTitle">地点</text><input style="text-align: left;" type="text" v-model="taskAddrss" placeholder="请输入地点"/>
			</view>
			<view class="bottomInputs">
				<text class="leftTitle">租金</text><input style="width: 2em;" type="number" v-model="money" placeholder="50"/>元/小时
			</view>
		</view>
		
		<view class="autoBox">
			<view class="bottomInputs">
				<text class="leftTitle">预留电话</text><input type="number" v-model="telPhone" placeholder="输入电话号码"/>
			</view>
		</view>
		
		<button class="addTaskBtn" type="primary" @click="addTask">发布</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				objList: [{
						name: '油腻大叔'
					},
					{
						name: '体贴暖男'
					},
					{
						name: '风趣帅哥'
					},
					{
						name: '豪爽爷们'
					},
					{
						name: '性感女神'
					},
					{
						name: '知性美女'
					},
					{
						name: '清纯佳人'
					}
				], //陪吃列表
				objListIndex: 0, //陪吃对象的index值
				objMore: 7, //显示多少个对象选项

				purposeList: [{
						name: '吃饭聊天'
					},
					{
						name: '交友'
					},
					{
						name: '发泄郁闷'
					},
					{
						name: '放松心情'
					},
					{
						name: '假扮男友'
					},
					{
						name: '假扮女友'
					}
				], //目的列表
				purposeIndex: 0, //下标
				purposeMore: 7, //控制显示个数

				taskObj: '', //任务对象值 默认列表第一个
				taskpurpose: '', //任务目的值 默认列表第一个
				
				minOld:'',//最小年龄
				maxOld:'',//最大年龄
				taskAddrss:'',//任务地点
				money:'',//money
				telPhone:'',//电话号码
			}
		},
		onLoad(options) {

		},
		created() {
			this.taskObj = this.objList[0].name
			this.taskpurpose = this.purposeList[0].name
		},
		methods: {
			//发布任务
			addTask(){
				if(this.minOld == ''||this.maxOld == ''||this.taskAddrss == ''||this.money == ''||this.telPhone == ''){
					uni.showToast({
						title:'请将信息填写完整',
						duration:1000,
						icon:'none'
					})
					return
				}
				
			},
			
			//改变对象
			changeObj(e) {
				this.objListIndex = e
				this.taskObj = this.objList[e].name
			},
			
			//改变目的
			changePurpose(e) {
				this.purposeIndex = e
				this.taskpurpose = this.purposeList[e].name
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
	
	.bottomInputs{
		padding: $box-margin-top $box-margin-left;
		font-size:$list-title;
		
		input{
			display: inline-block;
			width: 30vw;
			vertical-align: middle;
			text-align: center;
		}
	}
	
	.leftTitle{
		margin-right: 30upx;
		vertical-align: middle;
	}
	
	.addTaskBtn{
		position: fixed;
		display: inline-block;
		bottom: 20upx;
		right: 20upx;
		font-size: $list-title;
	}
</style>
