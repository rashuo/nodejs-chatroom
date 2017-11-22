/**
 * Created by rashuo on 11/22/17.
 */

export default class Socket {
  constructor(address) {
    this.socket = new WebSocket(address);

    // this.socket.onopen = this.onOpen.bind(this);
    // this.socket.onmessage = this.onMessage.bind(this);
    // this.socket.onclose = this.onClose.bind(this);
    // this.socket.onerror = this.onError.bind(this);
  }

  install(Vue) {
    const self = this;
    Vue.mixin({
      created() {
        this.socket = self.socket;
      },
    });
  }
}
