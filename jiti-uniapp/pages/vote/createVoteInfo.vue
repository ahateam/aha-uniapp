<template>
	<view>
		<view class="content-box">

			<view class="list-box">
				<view class="list-title">
					投票标题
				</view>
				<view class="list-val">
					<input type="text" v-model="title" placeholder="请输入投票标题" />
				</view>
				<view class="clear-both"></view>
			</view>

			<view class="list-box">
				<view class="list-title">投票内容</view>
				<view class="clear-both"></view>
				<view class="uni-textarea">
					<textarea v-model="remark" auto-height class="text-box" />
					</view>
			</view>
		
			<view class="list-box">
				<view class="list-title">
					开始时间
				</view>
				<view class="list-val">
					<view style="width: auto;" v-if="startDate"  @tap="toggleTab(0)">
						{{startDate}}
					</view>
					<view style="width: auto;" v-else  @tap="toggleTab(0)">
						请点击选择时间
					</view>
				</view>
				<view class="clear-both"></view>
			</view>
		
			
			<view class="list-box">
				<view class="list-title">
					结束时间
				</view>
				<view class="list-val">
					<view style="width: auto;" v-if="endDate"  @tap="toggleTab(1)">
						{{endDate}}
					</view>
					<view style="width: auto;" v-else  @tap="toggleTab(1)">
						请点击选择时间
					</view>
				</view>
				<view class="clear-both"></view>
			</view>
			
			
			<view class="list-box">
				<view class="list-title">参与人员</view>
				<view class="clear-both"></view>
				<view>
					<view class="uni-list">
						<checkbox-group @change="checkboxChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in crowdList" :key="index">
									
								<view class="item-check-box">
									<checkbox :value="item.roleId" :checked="item.checked" />
									{{item.name}}
								</view>
							</label><view class="clear-both"></view>
						</checkbox-group>
					</view>
				</view>
			</view>
			
			
			<view class="list-box">
				<view class="list-title">
					单选多选
				</view>
				<view class="list-val">
					 <radio-group @change="typeChange">
						<label class="uni-list-cell uni-list-cell-pd" >
							<view class="item-check-box">
								<radio :value="0" :checked="type ==0" />单选
							</view>
						<view class="item-check-box">
								<radio :value="1" :checked="type ==1" />多选
						</view>
						</label>
					</radio-group>
			
				</view>
				<view class="clear-both"></view>
			</view>
			
			<view class="list-box" v-if="type=='1'">
				<view class="list-title">
					最多选项数
				</view>
				<view class="list-val">
					<input type="number" v-model="choiceCount" placeholder="单人最大投票选项数" />
				</view>
				<view class="clear-both"></view>
			</view>
			<view class="list-box">
				<view class="list-title">
					失效比例
				</view>
				<view class="list-val">
					
					<radio-group @change="failDataChange">
						<label class="uni-list-cell uni-list-cell-pd" >
							<view class="item-check-box" v-for="(item,index) in numList" :key="index">
								<radio :value="item.key" :checked="failData ==item.key" />{{item.val}}
							</view>
						</label>
					</radio-group>
				</view>
				<view class="clear-both"></view>
			</view>
			
			<view class="list-box">
				<view class="list-title">
					成功比例
				</view>
				<view class="list-val">
					<radio-group @change="passDataChange">
						<label class="uni-list-cell uni-list-cell-pd" >
							<view class="item-check-box" v-for="(item,index) in numList" :key="index">
								<radio :value="item.key" :checked="passData ==item.key" />{{item.val}}
							</view>
						</label>
					</radio-group>
				</view>
				<view class="clear-both"></view>
			</view>
			
	
			
		</view>
		
		
		<view class="footer-box">
			<button type="primary" v-if="isEdit" @click="editBtn()">确认修改</button>
			<button type="primary" v-else @click="createBtn()">确认创建</button>
			<button type="default" @click="toHomePage()">
				返回首页
			</button>
		</view>
		
		<yu-datetime-picker @confirm="onConfirm" ref="dateTime"></yu-datetime-picker> 
	</view>
	
	
</template>

<script>
	import yuDatetimePicker from "@/components/yu-datetime-picker/yu-datetime-picker.vue"
	export default{
		name:'createVoteInfo',
		data(){
			return{
				title:'',
				type:0,	//单选多选
				remark:'',
				startDate:'',
				endDate:'',
				choiceCount:1,	//选项限制
				failData:'67',	//失效比例
				passData:'50',	//成功比例
				dateKey:0,
				template:'0',	 //控制0  选举和 1 投票的显示区别
				 reeditable:false,
                realName:true,
                isInternal:true,
				isAbstain:true,
				crowdList:[],	//所有的职务列表
				crowd:[],		//选中的职务列表	
				numList:[{key:33,val:'1/3'},{key:50,val:'1/2'},{key:67,val:'2/3'}],
				
				//修改操作
				isEdit:false,
				voteId:'',
				voteInfo:'',
			}
		},
		components:{
			yuDatetimePicker
		},
		methods:{
			//获取系统的职务列表
			getSysORGUserRoles(){
				this.$api.getSysORGUserRoles({},(res)=>{
					 let arr = []
				    if(res.data.rc == this.$util.RC.SUCCESS){
				        arr = this.$util.tryParseJson(res.data.c)
				    }else{
				        arr = []
				    }
					if(arr.length>0){
						this.crowdList = arr.splice(0,arr.length-2)
					}else{
						this.crowdList = []
					}
					console.log(this.crowdList)
				})
			},
			
			toggleTab( index) {  
				this.$refs.dateTime.show();  
				this.dateKey = index
			},  
			onConfirm(val) {  
		
				if(this.dateKey ==0){
					this.startDate = val.selectRes
				}else if(this.dateKey ==1){
					this.endDate = val.selectRes
				}
			},
			//参会人员职务的多选事件
			checkboxChange: function (e) {
				console.log(e)
				this.crowd = e.detail.value
				
                var items = this.crowdList,
                    values = e.detail.value;
						console.log(items)
                for (var i = 0, lenI = items.length; i < lenI; ++i) {
                    const item = items[i]
                    if(values.includes(item.value)){
                        this.$set(item,'checked',true)
                    }else{
                        this.$set(item,'checked',false)
                    }
                }
            },
			//单选多选
			typeChange:function(e){
				console.log(e)
				this.type = e.detail.value
				if(this.type == '0'){
					this.choiceCount = 1
				}
			},
			
			//失效值选择
			failDataChange:function(e){
			
				this.failData = e.detail.value
			},
			
			//成功值选择
			passDataChange:function(e){
				this.passData = e.detail.value
			},
			toHomePage() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			//创建投票
			createBtn(){
				 if(this.remark== '' ||this.title == ''||this.crowd == [] ||this.startDate == '' ||this.endDate == '' ||this.failData == '' || this.passData == ''){
                    uni.showToast({
                    	title: '请将信息填写完整'
                    })
                }else{
                    let crowd = {
                        roles:this.crowd,
                        tags:{groups:[],tag:[]}
                    }
						
					let startTime = new Date(Date.parse(this.startDate.replace(/-/g,"/"))).getTime()
					let endDate = new Date(Date.parse(this.endDate.replace(/-/g,"/"))).getTime()
					
					   let cnt = {
                        orgId:JSON.parse(uni.getStorageSync('orgUserInfo')).orgId,
                        template:this.template,
                        type:this.type,
                        choiceCount:this.choiceCount,
                        crowd:crowd,
                        reeditable:this.reeditable,
                        realName:this.realName,
                        isInternal:this.isInternal,
                        isAbstain:this.isAbstain,
                        effectiveRatio:this.passData,
                        failureRatio:this.failData,
                        title:this.title,
                        remark:this.remark,
                        ext:'无',
                        startTime: startTime, // Date 开始时间
                        expiryTime: endDate, // Date 终止时间
                        roles:JSON.parse(uni.getStorageSync('orgInfo')).orgRoles,
                        permissionId:100,
                    }
					this.createVote(cnt)
			}	
		
		},
		
		
			//创建投票	
		createVote(cnt){
			this.$api.createVote(cnt,(res)=>{
				 if(res.data.rc == this.$util.RC.SUCCESS){
						uni.setStorageSync('vote',res.data.c)
		                if(this.template == 0){
		                   uni.navigateTo({
		                   	url:'./createVoteOptionPeople'
		                   })
		                }else{
		                    uni.navigateTo({
		                   	url:'./createVoteOptionWork'
		                   })
		                }
		            }else{
		                uni.showToast({
		                	icon:'none',
							title:'信息有误或权限不足'
		                })
						uni.switchTab({
							url: '/pages/index/index'
						});
		            }
			})
		},
		
		setData(info){
			 this.template= info.template
            this.title = info.title
            this.remark = info.remark
            this.isAbstain = info.isAbstain
            this.type = info.type+''
            this.reeditable = info.reeditable
            this.realName = info.realName
            this.isInternal = info.isInternal
            this.choiceCount = info.choiceCount

            this.crowd = JSON.parse(info.crowd).roles

            this.startDate =new Date(info.startTime) .toLocaleDateString()+ ' '+new Date(info.startTime) .toLocaleTimeString('chinese',{hour12:false})
            this.endDate = new Date(info.expiryTime) .toLocaleDateString()+ ' '+new Date(info.expiryTime) .toLocaleTimeString('chinese',{hour12:false})
            this.passData = info.effectiveRatio
            this.failData = info.failureRatio
		},
		
		/*修改投票信息*/
		editBtn(){
			 if(this.remark== '' ||this.title == ''||this.crowd == [] ||this.startDate == '' ||this.endDate == '' ||this.failData == '' || this.passData == ''){
			        uni.showToast({
			        	title: '请将信息填写完整'
			        })
			    }else{
			        let crowd = {
			            roles:this.crowd,
			            tags:{groups:[],tag:[]}
			        }
						
					let startTime = new Date(Date.parse(this.startDate.replace(/-/g,"/"))).getTime()
					let endDate = new Date(Date.parse(this.endDate.replace(/-/g,"/"))).getTime()
					
					   let cnt = {
						voteId:this.voteId,
			            orgId:JSON.parse(uni.getStorageSync('orgUserInfo')).orgId,
			            template:this.template,
			            type:this.type,
			            choiceCount:this.choiceCount,
			            crowd:crowd,
			            reeditable:this.reeditable,
			            realName:this.realName,
			            isInternal:this.isInternal,
			            isAbstain:this.isAbstain,
			            effectiveRatio:this.passData,
			            failureRatio:this.failData,
			            title:this.title,
			            remark:this.remark,
			            ext:'无',
			            startTime: startTime, // Date 开始时间
			            expiryTime: endDate, // Date 终止时间
			            roles:JSON.parse(uni.getStorageSync('orgInfo')).orgRoles,
			            permissionId:100,
			        }
					this.editVote(cnt)
			}	
		},
		editVote(cnt){
			this.$api.editVote(cnt,(res)=>{
			   	 console.log(res)
				 if(res.data.rc == this.$util.RC.SUCCESS){
					
			   			uni.setStorageSync('vote',res.data.c)
			          if(this.template == 0){
			             uni.navigateTo({
			             	url:'./createVoteOptionPeople'
			             })
			          }else{
			              uni.navigateTo({
			             	url:'./createVoteOptionWork'
			             })
			          }
			      }else{
			          uni.showToast({
			          	icon:'none',
			   			title:'信息有误或权限不足'
			          })
						uni.switchTab({
							url: '/pages/index/index'
						});
			      }
			})
		}
		
		
			
		},
		onLoad(option){
			this.template = option.key
			this.getSysORGUserRoles()	
		},
		onShow(){
			console.log(	uni.getStorageSync('vote'))
			console.log(	uni.getStorageSync('vote') == true)
			if(	uni.getStorageSync('vote')){
				this.voteInfo = JSON.parse(uni.getStorageSync('vote'))
				this.setData(this.voteInfo)
				this.voteId = this.voteInfo.id
				this.isEdit = true
			}
			console.log(this.voteId)
		}
	}
</script>

<style scoped lang="scss">
	.uni-list-cell {
    justify-content: flex-start
}
	.clear-both{
		clear: both;
	}
	.content-box{
		width: 100%;
	}
	.list-box{
		width: auto;
		padding: 30rpx;
		border-bottom:1px solid #eee;
	}
	.list-title{
		float: left;
		width: 25%;
		line-height: 50rpx;
		font-size: 28rpx;
		color: #333;
	}
	.list-val{
		float: left;
		width: 75%;
		line-height: 50rpx;
		font-size: 28rpx;
		color: #666;
	}
	.text-box{
		margin-top: 20rpx;
		font-size: 28rpx;
		color: #333;
		line-height: 25rpx;
	}
	.item-check-box{
		float: left;
		font-size: 28rpx;
		line-height: 50rpx;
		margin: 20rpx;
		width: 200rpx;
		color: #666;
	}
	.item-check-box1{
		float: left;
		font-size: 28rpx;
		line-height: 50rpx;
		width: 150rpx;
		margin: 0 20rpx;
		color: #666;
		
	}
	.footer-box {
		width: auto;
		padding: 40rpx;
	
	}
	
</style>
