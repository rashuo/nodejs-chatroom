
/**
 * 事件监听与派发
 *
 * @export
 * @class EventDispatcher
 */
export default class EventDispatcher {
  static attach(target) {
    target.on = EventDispatcher.on;
    target.off = EventDispatcher.off;
    target.emit = EventDispatcher.emit;
    target.hasEventListener = EventDispatcher.hasEventListener;
    return target;
  }
  static on(type, listener) {
    if (this._listeners === undefined) this._listeners = {};
    const listeners = this._listeners;
    if (listeners[type] === undefined) {
      listeners[type] = [];
    }
    if (listeners[type].indexOf(listener) === -1) {
      listeners[type].push(listener);
    }
  }

  static off(type, listener) {
    if (this._listeners === undefined) return;

    const listeners = this._listeners;
    const listenerArray = listeners[type];

    if (listenerArray !== undefined) {
      const index = listenerArray.indexOf(listener);

      if (index !== -1) {
        listenerArray.splice(index, 1);
      }
    }
  }

  static emit(event, data) {
    if (this._listeners === undefined) return;

    const listeners = this._listeners;
    const listenerArray = listeners[event];

    if (listenerArray !== undefined) {
      const array = [];
      const length = listenerArray.length;
      for (let i = 0; i < length; i += 1) {
        array[i] = listenerArray[i];
      }
      for (let i = 0; i < length; i += 1) {
        array[i].call(this, data);
      }
    }
  }

  static hasEventListener(type, listener) {
    if (this._listeners === undefined) return false;
    const listeners = this._listeners;
    if (listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1) {
      return true;
    }
    return false;
  }
}
