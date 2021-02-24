<template>
  <div>
    <a-form-model>
      <a-form-model-item>
        <a-radio-group v-model="searchMethod">
          <a-radio :value="true"> 医生身份证号 </a-radio>
          <a-radio :value="false"> 患者身份证号 </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item>
        <a-input-search
          placeholder="请输入搜索内容"
          enter-button="Search"
          size="large"
          v-model="IDNumber"
          @search="onSearch"
        />
      </a-form-model-item>
    </a-form-model>
    <a-table :columns="columns" :data-source="data">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="action" slot-scope="text, record">
        <router-link to=`/info/${record.PatientID}${record.DoctorID}`>查看</router-link>
      </span>
    </a-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { FormModel, Input, Radio, Table } from "ant-design-vue";
Vue.use(FormModel).use(Input).use(Radio).use(Table);
export default Vue.extend({
  data: () => ({
    searchMethod: true,
    IDNumber: "",
    data: [],
  }),
  computed: {
    columns: function () {
      return this.$store.state.columns;
    },
  },
  methods: {
    async onSearch(): Promise<void> {
      let re = /[\d]{18}/;
      if (!re.test(this.IDNumber)) {
        this.$msg.error("搜索内容需为身份证号！");
        return;
      }
      let type, postAPI, form;
      if (this.searchMethod) {
        type = "doctor";
        postAPI = "/api/search/byDoctorID";
        form = {
          doctorIDNumber: this.IDNumber,
        };
      } else {
        type = "patient";
        postAPI = "/api/search/byPatientID";
        form = {
          patientIDNumber: this.IDNumber,
        };
      }
      this.$router.push({
        path: `/search/${type}/${this.IDNumber}`,
      });
      this.data = (await this.$axios.post(postAPI, form)).data;
    },
  },
  mounted: async function () {
    // 如果带有动态路由参数
    if (Object.keys(this.$route.params).length) {
      let postAPI, form;
      // 设置输入的身份证号
      this.IDNumber = this.$route.params.id;
      // 根据类型判断API和表单内容
      if (this.$route.params.type === "patient") {
        this.searchMethod = false;
        postAPI = "/api/search/byPatientID";
        form = {
          patientIDNumber: this.IDNumber,
        };
      } else if (this.$route.params.type === "doctor") {
        this.searchMethod = true;
        postAPI = "/api/search/byDoctorID";
        form = {
          doctorIDNumber: this.IDNumber,
        };
      } else {
        // 判断失败跳转到主页
        this.$router.replace({
          path: "/",
        });
        return;
      }
      // 判断身份证号是否合法
      let re = /[\d]{18}/;
      if (re.test(this.IDNumber)) {
        this.data = (await this.$axios.post(postAPI as string, form)).data;
      } else {
        // 判断失败跳转到主页
        this.$router.replace({
          path: "/",
        });
        return;
      }
    }
  },
});
</script>