<template>
<!-- import func from './vue-temp/vue-editor-bridge';-->
                      <!--Begin 添加总商弹层 -->
                  <div class="add-business">
                    <div class="add-business_top">
                      <span>添加</span>
                        <i class="main-icon main-icon_close" @click="close()"></i>
                    </div>
                    <div class="add-business_main">
                    <div v-for="value in modifyfields" :key="value.id">
                      <b-row v-if="!value.hasOwnProperty('isshow')||value.isshow">
                        <b-col md="3"> <label>{{value.label}}</label></b-col>

                        <b-col md="6" v-if="value.hasOwnProperty('fieldsType')&&value.fieldsType==='select'">
                          <b-form-select size="sm" v-model="modifylist[value.key]">
                            <option v-for="option in value.fieldsOptions" :value="option.value" :key="option.id">{{option.text}}</option>
                          </b-form-select>
                        </b-col>
                        <b-col md="6" v-else-if="value.hasOwnProperty('fieldsType')&&value.fieldsType==='textarea'">
                          <b-form-textarea v-model="modifylist[value.key]" :rows="3"
                                           :max-rows="6"></b-form-textarea>
                        </b-col>
                        <b-col md="6" v-else-if="value.hasOwnProperty('fieldsType')&&value.fieldsType==='checkbox'">
                          <b-form-checkbox-group  id="checkboxes1" v-model="modifylist[value.key]"  :options="value.fieldsOptions"></b-form-checkbox-group>
                        </b-col>
                        <b-col md="6" v-else-if="value.hasOwnProperty('fieldsType')&&value.fieldsType==='fileinput'">
                          <b-form-file accept=".jpg, .png, .gif" v-model="file" :state="Boolean(file)" placeholder="请选择图片"></b-form-file>
                        </b-col>
                        <b-col md="6" v-else>
                          <b-form-input size="sm" v-model="modifylist[value.key]"></b-form-input>
                        </b-col>
                        <br>
                      </b-row>
                    </div>
                    <b-row>
                      <b-col md="3" offset-md="5"><b-button size="md" @click="modify()">提交</b-button></b-col>
                    </b-row>
                    </div>
                  </div>
                 <!--End 添加总商弹层 --> 
</template>
<script>
export default {
  data() {
    return {
      selected: [],
      file: null
    };
  },
  props: ["list", "fields"],
  computed: {
    modifylist: function() {
      return this.list;
    },
    modifyfields: function() {
      return this.fields;
    }
  },
  methods: {
    //关闭总商弹层
    close: function() {
      this.$emit("updateShow", false);
      this.list = []
    },
    //提交按钮
    modify: function() {
      this.$emit("modify", this.modifylist);
    }
  }
};
</script>



<style>
/* 新增总商信息 */
.add-business {
  position: absolute;
  top: 30%;
  left: 35%;
  width: 30em;
  background: #ffffff;
  z-index: 10;
  border: 1px solid #dee2e6;
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
}
.add-business_top {
  height: 3em;
  background-color: #6c757d;
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
  color: #ffffff;
  line-height: 3em;
  text-align: center;
}
.add-business_main {
  padding: 1em;
}
.add-business_main .row {
  margin: 1em 0;
}
input {
  border-radius: 0.2em;
}
.main-icon_close {
  display: inline-block;
  background: url(../../assets/close-icon.png) no-repeat 0 0;
  background-size: 1.2em;
  position: absolute;
  top: 0.8em;
  right: 0.5em;
}
</style>
