/**
 * Created by rashuo on 11/22/17.
 */

import EventDispatcher from './eventmixins';

export default class Socket {
  constructor(address) {
    this.socket = new WebSocket(address);
    EventDispatcher.attach(this);

    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
    // this.socket.onclose = this.onClose.bind(this);
    // this.socket.onerror = this.onError.bind(this);
  }

  install(Vue) {
    const self = this;
    Vue.mixin({
      created() {
        this.socket = self;
      },
    });
  }


  onMessage(e) {
    console.log('message: ', e);
    const data = JSON.parse(e.data);
    this.emit(data.type, data.data);
  }

  onOpen() {
    console.log('app connected: ');
    this.socket.send('hello server');
  }
}
