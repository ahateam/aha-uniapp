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
    message
  },
  methods: {
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
          console.log(res)
        })
        .catch(error => {
          this.loading = false;
          console.log(error)
        });
        }



   
  
 
 },

  },
  created() {
     this.userId = "6";
     this.isActive = 1
    // if(this.$store.query.userId & this.$store.query.isActive){
    //     this.userId = this.$store.query.userId
    //     this.isActive = this.$store.query.isActive
    // }
    console.log('---------------')
    console.log(this.userId)
    
    this.loginTim()
  },
  mounted() {

  }
};
</script>

<style lang="scss" scoped>
</style>