<script setup>
import GoEasy from 'goeasy';
import { ref } from 'vue';
const goEasy = GoEasy.getInstance({
  host: 'hangzhou.goeasy.io', //新加坡host：singapore.goeasy.io
  appkey: "BC-514bb8576ac44fab9e704efa6d956f68", //替换为您的应用appkey
  modules: ['pubsub']
});
//建立连接
goEasy.connect({
  onSuccess: function () { //连接成功
    console.log("GoEasy 连接成功.") //连接成功
  },
  onFailed: function (error) { //连接失败
    console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
  }
});

let Message = ref([])
let Myessage = ref([])
//订阅消息
goEasy.pubsub.subscribe({
  channel: "小王",//替换为您自己的channel
  onMessage: function (message) { //收到消息
    Message.value.push({ b: `${message.channel}:${message.content}` })
    console.log("收到消息:" + message.channel + "的消息" + message.content);
  },
  onSuccess: function () {
    console.log("Channel订阅成功。");
  },
  onFailed: function (error) {
    console.log("Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
  }
});
let sendinp = ref('')
const send = () => {
  //发送
  goEasy.pubsub.publish({
    channel: "小明",//替换为您自己的channel
    message: sendinp.value,//替换为您想要发送的消息内容
    onSuccess: function (e) {
      Message.value.push({ a: `小明:${sendinp.value}` })
      console.log("消息发布成功。");
    },
    onFailed: function (error) {
      console.log("消息发送失败，错误编码：" + error.code + " 错误信息：" + error.content);
    }
  });
}
</script>
<template>
  <div style="">
    <div>我是小明</div>
    <input type="text" v-model="sendinp">
    <button @click="send">发送</button>
    <div style="background-color: #fff;width: 500px;height: 500px;">
      <div v-for="item in  Message " :key="item">
        <div style="color: red;text-align: left;">{{ item.b }}</div>
        <div style="color: #048b28;text-align: right;">{{ item.a }}</div>
      </div>
    </div>
  </div>
</template>