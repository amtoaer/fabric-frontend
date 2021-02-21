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
      <a-input v-model="form.Password" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 5 }">
      <a-button type="primary" @click="onSubmit"> 注册 </a-button>
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
      wrapperCol: { span: 16 },
      form: {
        IDNumber: "",
        Password: "",
        Name: "",
        Type: true,
      },
      rules: {
        Name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3-10之间", trigger: "blur" },
        ],
        IDNumber: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { min: 18, max: 18, message: "身份证长度为18位", trigger: "blur" },
        ],
        Type: [{ required: true, message: "请选择身份", trigger: "change" }],
        Password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, max: 16, message: "密码长度小于16位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async onSubmit(): Promise<void> {
      (this.$refs.ruleForm as any).validate((valid: Boolean) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
        }
      });
    },
    resetForm(): void {
      (this.$refs.ruleForm as any).resetFields();
    },
  },
});
</script>