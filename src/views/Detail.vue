<template>
  <div>
    <a-modal v-model="model" title="提示" @ok="handleOk" @cancel="handleCancel">
      <p>请输入对应{{ identity }}的私钥：</p>
      <a-textarea v-model="privateKey" autoSize />
    </a-modal>
    <a-row>
      <a-col span="18">
        <a-descriptions
          bordered
          title="病历信息"
          size="default"
          :column="2"
          style="white-space: pre-wrap"
        >
          <a-descriptions-item label="病人姓名">
            {{ record.PatientName }}
          </a-descriptions-item>
          <a-descriptions-item label="病人身份证号">
            {{ record.PatientID }}
          </a-descriptions-item>
          <a-descriptions-item label="医生姓名">
            {{ record.DoctorName }}
          </a-descriptions-item>
          <a-descriptions-item label="医生身份证号">
            {{ record.DoctorID }}
          </a-descriptions-item>
          <a-descriptions-item label="病历内容">{{
            record.Content
          }}</a-descriptions-item>
        </a-descriptions>
      </a-col>
      <a-col span="6">
        <a-timeline>
          <p>历史信息</p>
          <a-timeline-item v-for="(item, index) in history" :key="item.TxID">
            <a v-on:click="getHistoryByIndex(index)">{{ item.TxID }}</a>
          </a-timeline-item>
        </a-timeline>
      </a-col>
    </a-row>
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
    getHistoryByIndex(index: number) {
      this.record = this.history[index].History;
    },
    handleCancel() {
      if (window.history.length <= 1) {
        this.$router.replace({ path: "/" });
      } else {
        this.$router.back();
      }
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
            this.history = resp.data.result.Historys;
            // 默认展示当前病历
            this.record = this.history[0].History;
            // 关闭对话框
            this.model = false;
          }
        });
    },
  },
  mounted: function () {
    if (this.user.Type && this.user.IDNumber === this.$route.params.doctorID) {
      this.identity = "病人";
      this.IDNumber = this.$route.params.patientID;
      this.model = true;
    } else if (
      !this.user.Type &&
      this.user.IDNumber === this.$route.params.patientID
    ) {
      this.identity = "医生";
      this.IDNumber = this.$route.params.doctorID;
      this.model = true;
    } else {
      this.$msg.error("您无权查看该病历");
      if (window.history.length <= 1) {
        this.$router.replace({ path: "/" });
      } else {
        this.$router.back();
      }
    }
  },
});
</script>