import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios, { AxiosStatic } from "axios";
import { Message } from "ant-design-vue/types/message";
import {
  FormModel,
  Input,
  Radio,
  Table,
  Button,
  Timeline,
  Layout,
  Menu,
  Icon,
  Modal,
  message,
  Divider,
  Row,
  Col,
  Descriptions,
} from "ant-design-vue";
import { ModalConfirm, ModalOptions } from "ant-design-vue/types/modal";

Vue.use(Layout)
  .use(Menu)
  .use(Icon)
  .use(Input)
  .use(Radio)
  .use(Button)
  .use(FormModel)
  .use(Table)
  .use(Timeline)
  .use(Modal)
  .use(Divider)
  .use(Row)
  .use(Col)
  .use(Descriptions);

// request拦截并加上token
axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers.Authorization = localStorage.getItem("token");
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// response拦截并处理请求结果
axios.interceptors.response.use(
  (response) => {
    // 对返回结果进行通用化处理
    if (!response.data.success) {
      message.error(response.data.message);
      if (response.data.message === "身份信息失效，请重新登录") {
        store.commit("logout");
        router.replace({
          path: "/login",
        });
      }
    }
    // 返回请求执行结果，便于后续进行特定处理
    return response;
  },
  (err) => {
    message.error(`出现错误，错误信息为：${err}`);
  }
);

Vue.prototype.$axios = axios;
Vue.prototype.$msg = message;
Vue.prototype.$confirm = Modal.confirm;

declare module "vue/types/vue" {
  interface Vue {
    $axios: AxiosStatic;
    $msg: Message;
    $confirm: (modalOptios: ModalOptions) => ModalConfirm;
  }
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
