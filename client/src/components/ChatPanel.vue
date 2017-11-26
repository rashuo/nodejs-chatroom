/**
* Created by calmeii on 11/26/17.
*/

<template>
  <div class="chat-panel">
    <div class="chat-header">聊天室</div>
    <div class="chat-body">
      <div class="chat-item" :class="{'self': item.id===user.id}" v-for="(item,index) in dialog" :key="index">
        <span class="chat-item-name">{{item.name}}</span>
        <span class="chat-item-msg">{{item.msg}}</span>
      </div>
    </div>
    <div class="chat-footer">
      <input class="chat-input" v-model="inputValue" @keyup.enter="sendMsg"/> <button class="send-btn" @click="sendMsg">发送</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'ChatPanel',
    data() {
      return {
        dialog: [],
        inputValue: '',
        user: {
          name: '',
          id: '',
        },
      };
    },

    mounted() {
      console.log(this.socket);
      this.init();
      this.socket.on('text', (data) => {
        console.log('收到服务端的数据: ', data);
        this.dialog.push(data);
      });
    },


    computed: {

    },

    watch: {
      dialog() {
        const ele = document.getElementsByClassName('chat-body')[0];
        setTimeout(() => {
          ele.scrollTop = ele.scrollHeight;
        }, 50);
      },
    },

    methods: {
      randomId() {
        const a = 'a'.charCodeAt();
        const b = 'z'.charCodeAt();
        let ret = '';

        for (let i = 0; i < 4; i += 1) {
          const ran = (Math.random() * (b - a)) + a;
          ret += String.fromCharCode(ran);
        }
        return ret;
      },
      init() {
        this.user = {
          name: this.randomId(),
          id: this.randomId(),
        };
      },
      packageData(iv) {
        return JSON.stringify({
          id: this.user.id,
          name: this.user.name,
          msg: iv,
        });
      },
      sendMsg() {
        if (this.inputValue === '') return;
        this.socket.send(this.packageData(this.inputValue));
        this.inputValue = '';
      },
    },

  };
</script>

<style scoped>
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar
  {
    width: 8px;
    background-color: #F5F5F5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #000;
  }

  .chat-panel {
    margin: auto;
    padding-top: 80px;
    padding: 80px 10px 0 10px;
    box-sizing: border-box;
    width: 800px;
    height: 900px;
    background-color: gainsboro;

  }
  .chat-body  {
    height: 500px;
    background-color: #7f7f7f;
    color: #ddd;
    padding: 10px;
    overflow-y: scroll;
  }
  .chat-footer {
    margin-top: 10px;
  }
  .chat-input {
    border: none;
    height: 50px;
    width: 550px;
    padding-left: 10px;
    box-sizing: border-box;
    font-size: 20px;
  }
  .send-btn {
    border: none;
    height: 50px;
    width: 120px;
    margin-left: 60px;
    font-size: 20px;
    cursor: pointer;
  }
  .chat-item {
    width: 100%;
    padding: 5px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
  }
  .chat-item-msg {
    border-radius: 3px;
    background-color: darkgray;
    padding: 0 5px;
    margin: 0 10px;
  }
  .chat-item-name {
    width: 60px;
    overflow: hidden;
  }

  .chat-item.self {
    justify-content: flex-end;
  }
  .chat-item.self > .chat-item-name {
    order: 1
  }

</style>
