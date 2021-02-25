<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item ref="Name" label="姓名" prop="Name">
      <a-input v-model="form.Name" />
    </a-form-model-item>
    <a-form-model-item label="身份证号" prop="IDNumber">
      <a-input v-model="form.IDNumber" />
    </a-form-model-item>
    <a-form-model-item label="身份" prop="Type">
      <a-radio-group v-model="form.Type">
        <a-radio :value="true"> 我是医生 </a-radio>
        <a-radio :value="false"> 我是患者 </a-radio>
      </a-radio-group>
    </a-form-model-item>
    <a-form-model-item label="密码" prop="Password">
      <a-input-password v-model="form.Password" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 8, offset: 12 }">
      <a-button type="primary" @click="onSubmit"> 注册 </a-button>
      <a-button style="margin-left: 10px" @click="resetForm"> 清空 </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
      form: {
        IDNumber: "",
        Password: "",
        Name: "",
        Type: true,
      },
      rules: {
        Name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2-10之间", trigger: "blur" },
        ],
        IDNumber: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { min: 18, max: 18, message: "身份证长度为18位", trigger: "blur" },
        ],
        Type: [{ required: true, message: "请选择身份", trigger: "change" }],
        Password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "密码长度在6-16之间", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    onSubmit(): void {
      (this.$refs.ruleForm as any).validate((valid: Boolean) => {
        if (valid) {
          this.register();
        } else {
          this.$msg.error("填写信息不符合要求，请按要求修改");
        }
      });
    },
    resetForm(): void {
      (this.$refs.ruleForm as any).resetFields();
    },
    register(): void {
      this.$axios.post("api/user/register", this.form).then((resp) => {
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