<template>
  <div>
    <div class="nav-box">
      <div class="back-btn" @click="backBtn()">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div class="title-box">{{name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "messageNav",
  props:{
      name:String,
  },
  methods:{
      backBtn(){
          console.log('1111')
          this.$store.state.isPageActive = 1
      }
  }
};
</script>

<style lang="scss" scoped>
.nav-box {
  width: 100%;
  height: 44px;
  background: #fff;
}
.back-btn {
  float: left;
  width: 25px;
  height: 25px;
  padding: 9.5px 10px;
}
.back-btn i {
  width: 25px;
  height: 25px;
  font-size: 16px;
  line-height: 25px;
  text-align: center;
  color: #587685;
}
.title-box {
  float: left;
  width: 280px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 18px;
  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>