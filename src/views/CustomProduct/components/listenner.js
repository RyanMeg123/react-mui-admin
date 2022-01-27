import * as PubSub from "pubsub-js";

export default class Listener {
  /**
   * 元素被点击
   */
  onControllerClick = "ONCONTROLLERCLICK";

  /**
   * 发送事件
   * @constructor
   * @param props
   */
  EmitControllerClick(props) {
    PubSub.publishSync(Listener.onControllerClick, props);
  }
}
