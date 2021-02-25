<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item ref="ID" label="编号" prop="ID">
      <a-input v-model="form.ID" />
    </a-form-model-item>
    <a-form-model-item label="密码" prop="Password">
      <a-input-password v-model="form.Password" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 8, offset: 12 }">
      <a-button type="primary" @click="onSubmit"> 登录 </a-button>
      <a-button style="margin-left: 10px" @click="resetForm"> 清空 </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script lang="ts">
import Vue from "vue";
import { FormModel, Input, Radio, Button } from "ant-design-vue";

Vue.use(Input).use(Radio).use(Button).use(FormModel);

export default Vue.extend({
  data() {
    return {
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
      form: {
        ID: "",
        Password: "",
      },
      rules: {
        ID: [{ required: true, message: "请输入编号", trigger: "blur" }],
        Password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          //TODO: 在后端对密码长度做同样的限制
          { min: 6, max: 16, message: "密码长度在6-16之间", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    onSubmit(): void {
      (this.$refs.ruleForm as any).validate((valid: Boolean) => {
        if (valid) {
          this.login();
        } else {
          this.$msg.error("填写信息不符合要求，请按要求修改");
        }
      });
    },
    resetForm(): void {
      (this.$refs.ruleForm as any).resetFields();
    },
    login(): void {
      this.$axios.post("api/user/login", this.form).then((resp) => {
        // 登录成功
        if (resp.data.success) {
          // 设置登陆信息
          localStorage.setItem("token", resp.data.token);
          localStorage.setItem("user", JSON.stringify(resp.data.data));
          this.$store.commit("setUser", resp.data.data);
          // 跳转到主页
          this.$router.replace({
            path: "/",
          });
        }
      });
    },
  },
  mounted: function () {
    // 如果发现已经登陆则直接跳转至主页
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      this.$router.replace({
        path: "/",
      });
    }
  },
});
</script>