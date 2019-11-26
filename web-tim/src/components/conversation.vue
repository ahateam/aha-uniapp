<template>
  <div>
     <div class="nav-box">
        <div
          @click="navActive =0"
          :class="navActive=='0'?'nav-item-box nav-item-active':'nav-item-box'"
          style="margin-left:0"
        >聊天记录</div>
        <div
          class="nav-item-box"
          @click="navActive =1"
          :class="navActive=='1'?'nav-item-box nav-item-active':'nav-item-box'"
        >通讯录</div>
        <div
          class="nav-item-box"
          @click="navActive =2"
          :class="navActive=='2'?'nav-item-box nav-item-active':'nav-item-box'"
        >其他</div>
        <div class="clear-both"></div>
      </div>
    <div class="content-box">
      <div class="list-box">
        <div class="msg">
          <div class="msg-box">
            <div class="msg-text">重要通知第一时间知晓,开启消息通知~</div>
            <div class="msg-btn">去开启</div>
            <img src="@/assets/img/icon_close.png" class="msg-close-btn" alt />
            <div class="clear-both"></div>
          </div>
        </div>
        <div class="list-item-box">
          <div class="list-item">
            <div class="list-item-img">
              <img
                src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2262632647,543198910&fm=26&gp=0.jpg"
                alt
              />
            </div>
            <div class="list-item-info">
              <div class="list-item-title">
                <div class="list-item-name">asdasd奥术大师大所大阿萨德</div>
                <div class="list-item-time">2019-11-26</div>
                <div class="clear-both"></div>
              </div>
              <div class="list-item-text">
                <div class="item-text">你好啊我说你在干啥么啊现在，赶紧回复我消息撒</div>
                <div class="item-msg-num">9</div>
              </div>
            </div>
          </div>
        </div>

        <div class="list-item-box">
          <div class="list-item">
            <div class="list-item-img">
              <img
                src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2262632647,543198910&fm=26&gp=0.jpg"
                alt
              />
            </div>
            <div class="list-item-info">
              <div class="list-item-title">
                <div class="list-item-name">asdasd奥术大师大所大阿萨德</div>
                <div class="list-item-time">2019-11-26</div>
                <div class="clear-both"></div>
              </div>
              <div class="list-item-text">
                <div class="item-text">你好啊我说你在干啥么啊现在，赶紧回复我消息撒</div>
                <div class="item-msg-num">9</div>
              </div>
            </div>
          </div>
        </div>
        <div class="list-item-box">
          <div class="list-item">
            <div class="list-item-img">
              <img
                src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2262632647,543198910&fm=26&gp=0.jpg"
                alt
              />
            </div>
            <div class="list-item-info">
              <div class="list-item-title">
                <div class="list-item-name">asdasd奥术大师大所大阿萨德</div>
                <div class="list-item-time">2019-11-26</div>
                <div class="clear-both"></div>
              </div>
              <div class="list-item-text">
                <div class="item-text">你好啊我说你在干啥么啊现在，赶紧回复我消息撒</div>
                <div class="item-msg-num">9</div>
              </div>
            </div>
          </div>
        </div>

        <div class="list-item-box">
          <div class="list-item">
            <div class="list-item-img">
              <img
                src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2262632647,543198910&fm=26&gp=0.jpg"
                alt
              />
            </div>
            <div class="list-item-info">
              <div class="list-item-title">
                <div class="list-item-name">asdasd奥术大师大所大阿萨德</div>
                <div class="list-item-time">2019-11-26</div>
                <div class="clear-both"></div>
              </div>
              <div class="list-item-text">
                <div class="item-text">你好啊我说你在干啥么啊现在，赶紧回复我消息撒</div>
                <div class="item-msg-num">9</div>
              </div>
            </div>
          </div>
        </div>

        <div class="list-item-box">
          <div class="list-item">
            <div class="list-item-img">
              <img
                src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2262632647,543198910&fm=26&gp=0.jpg"
                alt
              />
            </div>
            <div class="list-item-info">
              <div class="list-item-title">
                <div class="list-item-name">asdasd奥术大师大所大阿萨德</div>
                <div class="list-item-time">2019-11-26</div>
                <div class="clear-both"></div>
              </div>
              <div class="list-item-text">
                <div class="item-text">你好啊我说你在干啥么啊现在，赶紧回复我消息撒</div>
                <div class="item-msg-num">9</div>
              </div>
            </div>
          </div>
        </div>

        <div class="list-item-box">
          <div class="list-item">
            <div class="list-item-img">
              <img
                src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2262632647,543198910&fm=26&gp=0.jpg"
                alt
              />
            </div>
            <div class="list-item-info">
              <div class="list-item-title">
                <div class="list-item-name">asdasd奥术大师大所大阿萨德</div>
                <div class="list-item-time">2019-11-26</div>
                <div class="clear-both"></div>
              </div>
              <div class="list-item-text">
                <div class="item-text">你好啊我说你在干啥么啊现在，赶紧回复我消息撒</div>
                <div class="item-msg-num">9</div>
              </div>
            </div>
          </div>
        </div>

        <div class="list-item-box">
          <div class="list-item">
            <div class="list-item-img">
              <img
                src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2262632647,543198910&fm=26&gp=0.jpg"
                alt
              />
            </div>
            <div class="list-item-info">
              <div class="list-item-title">
                <div class="list-item-name">asdasd奥术大师大所大阿萨德</div>
                <div class="list-item-time">2019-11-26</div>
                <div class="clear-both"></div>
              </div>
              <div class="list-item-text">
                <div class="item-text">你好啊我说你在干啥么啊现在，赶紧回复我消息撒</div>
                <div class="item-msg-num">91</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="footer-box">
        <div class="footer-btn-box">
            + 发起新的咨询
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "conversation",
  data() {
    return {
      userInfo: "",
      toUserInfo: "",
      navActive: 0
    };
  },
  mounted() {
    if (this.$route.query.userInfo) {
      this.userInfo = JSON.parse(this.$route.query.userInfo);
    }
  }
};
</script>
<style lang="scss" scoped>
.nav-box {
  position: fixed;
  top: 0;
  padding: 44px 0 15px 15px;
  height: 50px;
  width: 100%;
  background: #fff;
  z-index: 100;
}
.content-box {
  top: 94px;
  width: auto;
  padding: 15px 0 15px 15px;
  position: relative;
  overflow: hidden;
}
.nav-item-box {
  float: left;
  margin-left: 25px;
  width: auto;
  height: 35px;
  line-height: 35px;
  font-size: 20px;
  color: #ccc;
}
.nav-item-active {
  color: #333;
  font-size: 25px;
}
.list-box {

  width: 100%;
}

.msg {
  padding-right: 15px;
}
.msg-box {
  width: auto;
  height: 50px;
  background-image: url("../assets/img/bg_tz.png");
  background-position: center;
  background-size: cover;
}
.msg-text {
  float: left;
  margin-left: 15px;
  line-height: 50px;
  font-size: 13px;
  color: #946934;
}
.msg-btn {
  float: left;
  margin-left: 10px;
  margin-top: 12.5px;
  width: 60px;
  height: 25px;
  font-size: 13px;
  text-align: center;
  line-height: 25px;
  color: #946934;
  border-radius: 5px;
  background: #ffd78d;
}
.msg-close-btn {
  float: left;
  margin-left: 10px;
  margin-top: 20.5px;
  width: 9px;
  height: 9px;
}
.msg-close-btn img {
  width: 9px;
  height: 9px;
}
.list-item-box {
  margin-top: 13px;
}

.list-item {
  width: auto;
  height: 81px;
  margin-top: 12px;
}
.list-item-img {
  float: left;
  width: 66px;
  height: 66px;
  background-image: url("../assets/img/bg_student.png");
  background-position: center;
  background-size: cover;
}
.list-item-img img {
  margin-top: 3px;
  margin-left: 3px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.list-item-info {
  margin-left: 78px;
  width: auto;
  height: 81px;
  border-bottom: 0.5px solid #eff0f4;
}
.list-item-title {
  padding-right: 15px;
  width: auto;
  height: 38px;
  line-height: 38px;
}
.list-item-name {
  float: left;
  width: 175px;
  height: 38px;
  color: #333;
  line-height: 38px;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-item-time {
  float: right;
  height: 38px;
  line-height: 38px;
  font-size: 11px;
  color: #999999;
}
.list-item-text {
  width: auto;
  height: 20px;
  padding-right: 15px;
  line-height: 20px;
}
.item-text {
  float: left;
  width: 240px;
  height: 20px;
  font-size: 13px;
  line-height: 20px;
  color: #999999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-msg-num {
  float: right;
  margin-top: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  text-align: center;
  line-height: 18px;
  background: #ee455a;
  color: #ffffff;
  font-size: 10px;
}
.footer-box{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    padding: 15px;
    background: #fff;
    z-index: 100;
}
.footer-btn-box{
    width: 345px;
    height: 50px;
    line-height: 50px;
    background: #00C8BE;
    color: #FFFFFF;
    font-size: 15px;
    text-align: center;
    border-radius: 3px;
}
</style>