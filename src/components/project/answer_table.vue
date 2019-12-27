<template>
    <b-container fluid>
                  <!-- User Interface controls -->
                  <b-row>
                    <!-- selectedlist用来暂存弹层数据 -->
                 <XPopLayer :list="selectedlist" :fields="fields" v-show="isShow" @updateShow="updateTheModelShow" @modify="modify" ></XPopLayer>
                    <b-col md="4" class="my-1">
                        <b-input-group>
                          <b-form-input v-model="filter" placeholder="查找问题" />
                          <b-input-group-append>
                            <b-btn :disabled="!filter" @click="filter = ''">清除</b-btn>
                          </b-input-group-append>
                        </b-input-group>
                    </b-col>
                    <b-col md="1" class="my-1"></b-col>
                    <b-col md="4" class="my-1">
                        <b-input-group>
                          <b-form-select v-model="sortBy" :options="sortOptions">
                            <option slot="first" :value="null">-- none --</option>
                          </b-form-select>
                          <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
                            <option :value="false">升序</option>
                            <option :value="true">降序</option>
                          </b-form-select>
                        </b-input-group>
                      <!--</b-form-group>-->
                    </b-col>
                    <!-- <b-col md="2" offset-md="1" class="my-1">
                      <div class="main-icon main-icon_add" @click="toggleAdd()"></div>
                    </b-col> -->
                  </b-row>
              
                  <!-- Main table element -->
                  <b-table show-empty
                           :hover="hover"
                           :striped="striped"
                           stacked="md"
                           :items="items"
                           :fields="fields"
                           :current-page="currentPage"
                           :per-page="perPage"
                           :filter="filter"
                           :sort-by.sync="sortBy"
                           :sort-desc.sync="sortDesc"
                           :sort-direction="sortDirection"
                           @filtered="onFiltered"
                  >    
                    <!-- <template  slot = "index"  slot-scope = "data" >{{data.index + 1 + ( currentPage - 1 ) * 5}}</template > -->
                    <!-- <template slot="name" slot-scope="row" @row-clicked="showDetails(row)">{{row.value}}</template> -->
                    <template slot="actions" slot-scope="row">
                      <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
                      <b-button size="sm" class="mr-1" @click.stop="showOverlay(row.index+ ( currentPage - 1 ) * 5)">修改</b-button>
                      <b-button size="sm" data-toggle="modal" data-target="#layer" @click.stop="deleteMsg(row.index+ ( currentPage - 1 ) * 5)">删除</b-button>
                    </template>
                  </b-table>

              <!-- 分页begin-->
              <b-pagination align = "center" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
              <!-- 分页end -->
              
                </b-container>
</template>
<script>
    /* eslint-disable no-console */

const items = [
  {
    answers_code: 1001,
    missionCode: "m1",
    question_code: 1001,
    user_code: "1000000",
    create_time: "20181225 15:58:00",
    answers: "好喝",   //"题目选项 当为拍照时为空"
    status:"已审核",
    goals: "60"
  },
  {
    answers_code: 1002,
    missionCode: "m1",
    question_code: 1001,
    user_code: "1000001",
    create_time: "20181225 15:18:00",
    answers: "好喝",   //"题目选项 当为拍照时为空"
    status:"已审核",
    goals: "60"
  },
  {
    answers_code: 1003,
    missionCode: "m1",
    question_code: 1001,
    user_code: "1000002",
    create_time: "20181225 15:04:00",
    answers: "好喝",   //"题目选项 当为拍照时为空"
    status:"已审核",
    goals: "60"
  },
  {
    answers_code: 1004,
    missionCode: "m1",
    question_code: 1001,
    user_code: "1000003",
    create_time: "20181225 15:52:10",
    answers: "好喝",   //"题目选项 当为拍照时为空"
    status:"已审核",
    goals: "60"
  },
  {
    answers_code: 1005,
    missionCode: "m1",
    question_code: 1001,
    user_code: "1000004",
    create_time: "20181225 15:48:00",
    answers: "好喝",   //"题目选项 当为拍照时为空"
    status:"已审核",
    goals: "60"
  }
];
import axios from 'axios';
import {API_ENDPOINT} from '../../constant'
import Bus from '../../bus.js';
import XPopLayer from "../reuse/XPopLayer.vue";
export default {
  data() {
    return {
      hover: true,
      striped: true,
    //   items: items,
      items:[],
      // fields: this.opfields,
      selectedlist: {},
      selected: -1,
      isShow: false,
      currentPage: 1,
      perPage: 5,
      // totalRows: items.length,
      totalRows: 0,
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null
    };
  },
  components: {
    XPopLayer
  },
    props:['opfields','urls'],
    computed: {
        fields :function(){
            // this.searchAll();
            return this.opfields;
        },
    sortOptions() {
      // Create an options list from our fields
      return this.fields.filter(f => f.sortable).map(f => {
        return { text: f.label, value: f.key };
      });
    },
  },
    mounted(){
        //从服务器读取所有问题列表
        axios.get(API_ENDPOINT+'/answers', {
          params:{
            pageNum: 1,
            pageSize: 20,
            token: 1234,  
          }
        }) 
        .then((response)=>{
            this.items = response.data.data;
            console.log(this.items);
          })
        .catch(function(error){
          console.log(error);
          });
      },
  methods: {
    // showDetails(row){
    //   console.log(row.business_code);
    //   this.$router.push({path: '/', params: { num: item.num }});
    // },
    // toggleAdd: function() {
    //   this.isShow = !this.isShow;
    //   this.selectedlist = {};
    // },
    //删除按钮
    deleteMsg: function(n) {
    
      console.log(n);
      console.log(this.items[n].answers_code);  
      axios({
        method: 'delete',
        url: API_ENDPOINT+'/answer',
        params: {
          questionId: this.items[n].answers_code,    //问题id
        }
      })
      .then((response)=>{
        console.log(response); 
        this.items.splice(n, 1);   //必须先删除服务器上的数据再移除前端数据，若是先移除前端表格数据，index对应的总商ID是删除后下一个的ID
      })
      .catch(function(error){
        console.log(error);
      }); 
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    //修改按钮
    showOverlay(index) {
      this.selected = index;
      // this.selectedlist = this.items[index]; //浅拷贝会导致用户修改后未提交也影响到原表单数据
      this.selectedlist = JSON.parse( JSON.stringify(this.items[index]) );
      this.isShow = !this.isShow;
    },
    //子组件提交按钮冒泡触发
    modify(arr) {
      if (this.selected > -1) {
      console.log(this.selected);
      this.$set(this.items, this.selected, arr);
      console.log(this.items[this.selected].answers_code);
      axios({
        method: 'put',
        url: API_ENDPOINT+'/answer',
        params: {
          question:this.selected.answers_code    //问题id
        },
        data:this.selectedlist
    })
      .then(function(response){
        console.log(response);
      })
      .catch(function(error){
        console.log(error);
      });
        this.selected = -1;
      } else {
        this.items.push(arr);
        //提交数据到服务器
        axios.post(API_ENDPOINT+'/answer',
          this.selectedlist
        )
        .then(function(response){
          console.log(response);
          })
        .catch(function(error){
          console.log(error);
        });
      }
      this.isShow = !this.isShow;
    },
    updateTheModelShow(s) {
      this.isShow = s;
    },
  
 

  }
};
</script>


