<template>
    <b-container fluid>
                  <!-- User Interface controls -->
                  <b-row>
                    <!-- selectedlist用来暂存弹层数据 -->
                 <XPopLayer :list="selectedlist" :fields="fields" v-show="isShow" @updateShow="updateTheModelShow" @modify="modify" ></XPopLayer>
                    <b-col md="4" class="my-1">
                        <b-input-group>
                          <b-form-input v-model="filter" placeholder="查找项目" />
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
                    <b-col md="2" offset-md="1" class="my-1">
                      <div class="main-icon main-icon_add" @click="toggleAdd()"></div>
                    </b-col>
                  </b-row>
              
                  <!-- Main table element -->
                  <b-table show-empty
                           stacked="md"
                           :items="items"
                           :fields="fields"
                           :current-page="currentPage"
                           :per-page="perPage"
                           :filter="filter"
                           :sort-by.sync="sortBy"
                           :sort-desc.sync="sortDesc"
                           :sort-direction="sortDirection"
                           @row-clicked="rowClick"
                           @filtered="onFiltered"
                  >    
                    <!-- <template  slot = "index"  slot-scope = "data" >{{data.index + 1 + ( currentPage - 1 ) * 5}}</template > -->
                    <template slot="name" slot-scope="row">{{row.value}}</template>
                    <template slot="actions" slot-scope="row">
                      <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
                      <b-button size="sm" class="mr-1" @click="dataDetail()">数据详情</b-button>
                      <b-button size="sm" class="mr-1" @click="showOverlay(row.index+ ( currentPage - 1 ) * 5)">修改</b-button>
                      <b-button size="sm" data-toggle="modal" data-target="#layer" @click="deleteMsg(row.index+ ( currentPage - 1 ) * 5)">删除</b-button>
                    </template>
                   <!-- <template slot="row-details" slot-scope="row">
                      <b-card>
                        <ul>
                          <li v-for="(value, key, index) in row.item" :key="key">{{ key }}: {{ value}}</li>
                        </ul>
                      </b-card>
                    </template> -->
                  </b-table>

              <!-- 分页begin-->
              <b-pagination align = "center" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
              <!-- 分页end -->
              
                </b-container>
</template>
<script>
    /* eslint-disable no-console */
//     const project_items = [
//   {
//     //项目表
//     project_code:"100110011001",
//     business_code:"1001",
//     business_name:"星巴克",
//     name:"北区Q1项目组",
//     createTime:"2018/10/10 20:20",
//     shops_groups:"仓山店",
//     shops_num:"12",
//     missions_name:"Q1任务",
//     user_num:"3k",
//     status:"待审核",
//   },
//   {
//     business_code:"1001",
//     business_name:"星巴克",
//     name:"北区Q2项目组",
//     createTime:"2018/10/10 20:20",
//     shops_groups:"仓山店",
//     shops_num:"12",
//     missions_name:"Q1任务",
//     user_num:"3k",
//     status:"待审核",
//   },
//   {
//     business_code:"1001",
//     business_name:"星巴克",
//     name:"北区Q3项目组",
//     createTime:"2018/10/10 20:20",
//     shops_groups:"仓山店",
//     shops_num:"12",
//     missions_name:"Q1任务",
//     user_num:"3k",
//     status:"待审核",

//   },
//   {
//     business_code:"1001",
//     business_name:"星巴克",
//     name:"北区Q4项目组",
//     createTime:"2018/10/10 20:20",
//     shops_groups:"仓山店",
//     shops_num:"12",
//     missions_name:"Q1任务",
//     user_num:"3k",
//     status:"待审核",

//   },
//   {
//     business_code:"1002",
//     business_name:"永辉超市",
//     name:"北区Q1项目组",
//     createTime:"2018/10/10 20:20",
//     shops_groups:"万达店",
//     shops_num:"12",
//     missions_name:"Q1任务",
//     user_num:"3k",
//     status:"待审核",

//   },
//   {
//     business_code:"1002",
//     business_name:"永辉超市",
//     name:"北区Q2项目组",
//     createTime:"2018/10/10 20:20",
//     shops_groups:"无需目的型",
//     shops_num:"12",
//     missions_name:"Q1任务",
//     user_num:"3k",
//     status:"待审核",

//   },
//   {
//     business_code:"1003",
//     business_name:"德克士",
//     name:"北区Q3项目组",
//     createTime:"2018/10/10 20:20",
//     shops_groups:"万达店",
//     shops_num:"12",
//     missions_name:"Q1任务",
//     user_num:"3k",
//     status:"待审核",
//   },
//   {
//     business_code:"1003",
//     business_name:"德克士",
//     name:"北区Q4项目组",
//     createTime:"2018/10/10 20:20",
//     shops_groups:"无需目的型",
//     shops_num:"12",
//     missions_name:"Q1任务",
//     user_num:"3k",
//     status:"待审核",
//   },
//   {
//     business_code:"1004",
//     business_name:"悦诗风吟",
//     name:"北区Q1项目组",
//     createTime:"2018/10/10 20:20",
//     shops_groups:"仓山店",
//     shops_num:"12",
//     missions_name:"Q1任务",
//     user_num:"3k",
//     status:"待审核",

//   },
//   {
//     business_code:"1004",
//     business_name:"悦诗风吟",
//     name:"北区Q2项目组",
//     missions_num:"5",
//     createTime:"2018/10/10 20:20",
//     shops_groups:"仓山店",
//     shops_num:"12",
//     missions_name:"Q1任务",
//     user_num:"3k",
//     status:"待审核",

//   }
// ];
import axios from 'axios';
import {API_ENDPOINT} from '../../constant'
import XPopLayer from "../reuse/XPopLayer.vue";
export default {
  data() {
    return {
      // items: items,
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
  // created(){
  //   this.fetchData();
  // },
  mounted(){
    //根据userId从服务器读取指定用户所有项目列表project_items
    axios.get(API_ENDPOINT+'/projects', {
      params:{
        userId:1001,
        pageNum: 1,
        pageSize: 20,
        token: 1234,  
      }
    }) 
    .then(response=>{
      this.items = response.data.data;
      console.log(this.items);
      })
    .catch(function(error){
      console.log(error);
      });
  },
  methods: {
    rowClick(row){
      console.log(row.projectCode);
      this.$router.push({path:'/project_info/mission_info',query:{projectCode:row.projectCode}});
    },
    fetchData(){
      console.log(project_items);
      this.items=project_items.filter((v,i)=>{
        return project_items[i].business_code = this.$route.query.business_code
      })
      console.log(this.items);
    },
    toggleAdd: function() {
      this.isShow = !this.isShow;
      this.selectedlist = {};
    },
    //删除按钮
    deleteMsg: function(n) {
      this.items.splice(n, 1);
      axios({
      method: 'delete',
      url: API_ENDPOINT+'project',
      params: {
        projectpId:'this.items[index].project_code'    //项目id
      }
    })
      .then(function(response){
        console.log(response);
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
      // this.selectedlist = this.items[index];//浅拷贝会导致用户修改后未提交也影响到原表单数据
      this.selectedlist = JSON.parse( JSON.stringify(this.items[index]) );
      this.isShow = !this.isShow;
    },
    //子组件提交按钮冒泡触发
    modify(arr) {
      if (this.selected > -1) {
      this.$set(this.items, this.selected, arr);
      axios({
        method: 'put',
        url: API_ENDPOINT+'/project',
        params: {
          project:'this.items[index].project_code'    //项目id
        },
        data:{
          
        }
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
        axios.post(API_ENDPOINT+'/project',
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
    dataDetail(){
      this.$router.push({path:'/project_info/project_data_detail'})
    }

  }
};
</script>
<style>
table {
  z-index: 1;
}
.active {
  border-bottom: 3px solid #009aff;
}
.main-icon {
  cursor: pointer;
  width: 2em;
  height: 2em;
}
.main-icon_add {
  background: url(../../assets/add-icon.png) no-repeat 0 0;
  background-size: 2em;
}
</style>
