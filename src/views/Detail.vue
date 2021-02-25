<template>
  <div>
    <a-modal v-model="model" title="提示" @ok="handleOk">
      <p>请输入对应{{ identity }}的私钥：</p>
      <a-textarea v-model="privateKey" autoSize />
    </a-modal>
    <a-form-model
      :model="record"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="医生姓名">
        <a-input :value="record.DoctorName" disabled />
      </a-form-model-item>
      <a-form-model-item label="医生身份证号">
        <a-input :value="record.DoctorID" disabled />
      </a-form-model-item>
      <a-form-model-item label="病人姓名">
        <a-input :value="record.PatientName" disabled />
      </a-form-model-item>
      <a-form-model-item label="病人身份证号">
        <a-textarea :value="record.PatientID" autoSize disabled />
      </a-form-model-item>
      <a-form-model-item label="病历内容">
        <a-textarea :value="record.Content" autoSize disabled />
      </a-form-model-item>
    </a-form-model>
    <a-timeline>
      <a-timeline-item
        ><a v-on:click="getCurrent()">当前病历</a></a-timeline-item
      >
      <a-timeline-item v-for="(item, index) in history" :key="item.TxID">
        <a v-on:click="getHistoryByIndex(index)">{{ item.TxID }}</a>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

interface Record {
  PatientName: string;
  PatientID: string;
  DoctorName: string;
  DoctorID: string;
  Content: string;
}

interface HistoryItem {
  TxID: string;
  History: Record;
}

export default Vue.extend({
  data: () => ({
    model: false,
    IDNumber: "",
    privateKey: "",
    identity: "",
    current: {} as Record,
    history: [] as HistoryItem[],
    record: {
      PatientName: "",
      PatientID: "",
      DoctorName: "",
      DoctorID: "",
      Content: "",
    } as Record,
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  }),
  computed: {
    user: function () {
      return this.$store.state.user;
    },
  },
  methods: {
    getCurrent() {
      this.record = this.current;
    },
    getHistoryByIndex(index: number) {
      this.record = this.history[index].History;
    },
    handleOk(e: Event) {
      e.preventDefault();
      this.$axios
        .post("/api/search/byKey", {
          IDNumber: this.IDNumber,
          PrivateKey: this.privateKey,
        })
        .then((resp) => {
          if (resp.data.success) {
            // current内存储当前病历，history里存储历史信息
            this.current = resp.data.result;
            this.history = (this.current as any).History;
            (this.current as any).History = [];
            // 默认展示当前病历
            this.record = this.current as any;
            // 关闭对话框
            this.model = false;
          }
        });
    },
  },
  mounted: function () {
    if (this.user.Type && this.user.Name === this.$route.params.doctorID) {
      this.identity = "病人";
      this.IDNumber = this.$route.params.patientID;
      this.model = true;
    } else if (
      !this.user.Type &&
      this.user.Name === this.$route.params.patientID
    ) {
      this.identity = "医生";
      this.IDNumber = this.$route.params.doctorID;
      this.model = true;
    } else {
      this.$msg.error("您无权查看该病历");
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
      } else {
        this.$router.back();
      }
    }
  },
});
</script>