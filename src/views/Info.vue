<template>
  <a-form-model
    ref="ruleForm"
    :model="user"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item ref="Name" label="姓名">
      <a-input v-model="user.Name" disabled />
    </a-form-model-item>
    <a-form-model-item label="身份证号">
      <a-input v-model="user.IDNumber" disabled />
    </a-form-model-item>
    <a-form-model-item label="身份">
      <a-input v-model="identity" disabled />
    </a-form-model-item>
    <a-form-model-item label="公钥">
      <a-textarea v-model="user.PublicKey" autoSize disabled />
    </a-form-model-item>
    <a-form-model-item label="私钥">
      <a-textarea v-model="user.PrivateKey" autoSize disabled />
    </a-form-model-item>
  </a-form-model>
</template>

<script lang="ts">
import Vue from "vue";
import { FormModel, Input } from "ant-design-vue";

Vue.use(FormModel).use(Input);

export default Vue.extend({
  computed: {
    user: function () {
      return this.$store.state.user;
    },
  },
  data: function () {
    return {
      identity: this.$store.state.user.Type ? "医生" : "病人",
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
    };
  },
});
</script>