<template>
  <div>
    <div v-if="isActive =='0'">
      <choose></choose>
    </div>
    <div v-if="isActive =='1'">
      <conversation></conversation>
    </div>
    <div v-if="isActive =='2'">
      <message></message>
    </div>

  </div>
</template>

<script>
import choose from "../components/choose";
import conversation from "../components/conversation";
import message from "../components/message";
import userList from '../commen/tim/user'

//tim 
import { mapState } from 'vuex'

export default {
  name: "index",
  data() {
    return {
      isActive: 1,
      userId: "",
      loading: true,
      userInfo:'',

    };
  },
  components: {
    choose,
    conversation,
    message,
  },
  watch:{
      isPageActive(newVal){
          this.isActive = newVal
      }
  },
  computed:{
     ...mapState({
      currentUserProfile: state => state.user.currentUserProfile,
      currentConversation: state => state.conversation.currentConversation,
      isLogin: state => state.user.isLogin,
      isSDKReady: state => state.user.isSDKReady,
    }),
    // 是否显示 Loading 状态
    showLoading() {
      return !this.isSDKReady
    },
    isPageActive(){
      return this.$store.state.isPageActive
    }
  },
  methods: {
    //监听tim事件
    initListener() {
      // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
      this.tim.on(this.TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this)
      // SDK NOT READT
      this.tim.on(this.TIM.EVENT.SDK_NOT_READY, this.onReadyStateUpdate, this)
      // 被踢出
      this.tim.on(this.TIM.EVENT.KICKED_OUT, () => {
        this.$store.commit('showMessage', {
          message: '被踢出，请重新登录。',
          type: 'error'
        })
        this.$store.commit('toggleIsLogin', false)
        this.$store.commit('reset')
      })
      // SDK内部出错
      this.tim.on(this.TIM.EVENT.ERROR, this.onError)
      // 收到新消息
      this.tim.on(this.TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage)
      // 会话列表更新
      this.tim.on(this.TIM.EVENT.CONVERSATION_LIST_UPDATED, event => {
        this.$store.commit('updateConversationList', event.data)
      })
      // 群组列表更新
      this.tim.on(this.TIM.EVENT.GROUP_LIST_UPDATED, event => {
        this.$store.commit('updateGroupList', event.data)
      })
      // 收到新的群系统通知
      this.tim.on(this.TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED, event => {
        const isKickedout = event.data.type === 4
        const isCurrentConversation =
          `GROUP${event.data.message.payload.groupProfile.groupID}` === this.currentConversation.conversationID
        // 在当前会话被踢，需reset当前会话
        if (isKickedout && isCurrentConversation) {
          this.$store.commit('resetCurrentConversation')
        }
        // Notification({
        //   title: '新系统通知',
        //   message: translateGroupSystemNotice(event.data.message),
        //   duration: 3000,
        //   onClick: () => {
        //     const SystemConversationID = '@TIM#SYSTEM'
        //     this.$store.dispatch('checkoutConversation', SystemConversationID)
        //   }
        // })
      })
    },
    onReceiveMessage({ data: messageList }) {
      this.handleAt(messageList)
      this.$store.commit('pushCurrentMessageList', messageList)
    },
    onError({ data }) {
      if (data.message !== 'Network Error') {
        this.$store.commit('showMessage', {
          message: data.message,
          type: 'error'
        })
      }
    },
    onReadyStateUpdate({ name }) {
      const isSDKReady = name === this.TIM.EVENT.SDK_READY ? true : false
      this.$store.commit('toggleIsSDKReady', isSDKReady)

      if (isSDKReady) {
        this.tim.getMyProfile().then(({ data }) => {
          this.$store.commit('updateCurrentUserProfile', data)
        })
        this.$store.dispatch('getBlacklist')
      }
    },

    //登录tim
    loginTim() {
        userList.forEach(item=>{
            if(item.userId == this.userId){
                this.userInfo = item
            }
        })

        if(this.userInfo){
          this.tim.login({
          userID: this.userInfo.userId,
          userSig: this.userInfo.userSig
        })
        .then((res) => {
          
          this.loading = false;
          this.$store.commit("toggleIsLogin", true);
          this.$store.commit("startComputeCurrent");
          localStorage.setItem('userInfo',JSON.stringify(this.userInfo))
         
        })
        .catch(error => {
          console.log('1111')
          this.loading = false;
          console.log(error)
        });
        }



   
  
 
 },

  },
  created() {
     this.userId = "2";
     this.isActive = 1
   
      console.log()
    this.loginTim()
  },
  mounted() {
    this.initListener() 
  }
};
</script>

<style lang="scss" scoped>
</style>