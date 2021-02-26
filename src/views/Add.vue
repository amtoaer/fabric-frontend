<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item ref="IDNumber" label="病人身份证号">
      <a-input v-model="form.PatientIDNumber" :disabled="flag" />
    </a-form-model-item>
    <a-form-model-item ref="Content" label="病历内容">
      <a-textarea v-model="form.Content" autoSize />
    </a-form-model-item>
    <a-form-model-item ref="PublicKey" label="病人公钥">
      <a-textarea v-model="form.PublicKey" autoSize />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 8, offset: 12 }">
      <a-button type="primary" @click="onSubmit"> 提交 </a-button>
      <a-button style="margin-left: 10px" @click="resetForm"> 清空 </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  mounted: function () {
    // 只有医生可以访问这个页面
    if (!this.user.Type) {
      this.$msg.error("只有医生才能添加或修改病历");
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
      } else {
        this.$router.back();
      }
    }
    // 如果带有动态路由参数
    if (Object.keys(this.$route.params).length) {
      if (this.user.IDNumber !== this.$route.params.doctorID) {
        this.$msg.error("您无权修改该病历");
        if (window.history.length <= 1) {
          this.$router.push({ path: "/" });
        } else {
          this.$router.back();
        }
      } else {
        this.form.PatientIDNumber = this.$route.params.patientID;
        this.api = "/api/modify/updateRecord";
        this.flag = true;
      }
    }
  },
  computed: {
    user: function () {
      return this.$store.state.user;
    },
  },
  data: () => ({
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
    form: {
      PatientIDNumber: "",
      Content: "",
      PublicKey: "",
    },
    rules: {
      IDNumber: [
        { required: true, message: "请输入病人身份证号", trigger: "blur" },
        { min: 18, max: 18, message: "身份证长度为18位", trigger: "blur" },
      ],
      Content: [{ required: true, message: "请输入病历内容", trigger: "blur" }],
      PublicKey: [
        { required: true, message: "请输入病人公钥", trigger: "blur" },
      ],
    },
    // 标记是添加还是修改
    flag: false,
    // 标记需要请求的api
    api: "/api/modify/addRecord",
  }),
  methods: {
    resetForm(): void {
      (this.$refs.ruleForm as any).resetFields();
    },
    onSubmit(): void {
      (this.$refs.ruleForm as any).validate((valid: Boolean) => {
        if (valid) {
          this.request();
        } else {
          this.$msg.error("填写信息不符合要求，请按要求修改");
        }
      });
    },
    request() {
      this.$axios.post(this.api, this.form).then((resp) => {
        if (resp.data.success) {
          this.$msg.success(
            `请求处理成功，交易编号为${resp.data.transactionID}`
          );
          this.$router.replace({
            path: "/",
          });
        }
      });
    },
  },
});
</script>