<template>
  <div>
    <div class="nav-box">
      <message-nav :name="toUserInfo.name"></message-nav>
    </div>
    <div class="content"></div>
    <div class="footer-input-box">
      <div class="input-box">
        <div class="voice-btn">
          <img src="../assets/img/icon_voice.png" alt />
        </div>
        <div class="input-text">
		
            <van-field
              v-model="textMsg"
              rows="1"
              autosize
              type="textarea"
            />
       
        </div>
      </div>
      <div class="emjo-box"></div>
      <div class="handle-box"></div>
    </div>
  </div>
</template>

<script>
import MessageNav from "@/components/message/MessageNav";
import { Field } from "vant";
export default {
  nameL: "message",
  data() {
    return {
      toUserInfo: "",

      /**发送消息 */
      textMsg: ""
    };
  },
  components: {
	MessageNav,
	Field
  },
  methods: {},
  mounted() {
    this.toUserInfo = JSON.parse(localStorage.getItem("toUserInfo"));
  }
};
</script>

<style lang="scss" scoped>
.nav-box {
  position: fixed;
  top: 0;
  width: 100%;
  height: 44px;
  background: #fff;
  z-index: 100;
}
.content {
  width: auto;
  padding: 20px;
  background: #f8f8f8;
}

/**底部输入框相关 */
.footer-input-box {
  position: fixed;
  bottom: 0;
  width: auto;
  background: #fff;
}
.input-box {
  width: 100%;
}
.voice-btn {
  float: left;
  width: 45px;
  img {
    margin-top: 100%;
    padding-left: 15px;
    width: 19px;
    height: 26px;
  }
}
.input-text {
  float: left;
  width: 225px;
  padding: 14.5px 0 10.5px 0px;
  textarea {
  }
}
</style>