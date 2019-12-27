<template>
    <b-container fluid>
                  <!-- User Interface controls -->
                  <b-row>
                    <!-- selectedlist用来暂存弹层数据 -->
                 <XPopLayer :list="selectedlist" :fields="fields" v-show="isShow" @updateShow="updateTheModelShow" @modify="modify" ></XPopLayer>
                    <b-col md="4" class="my-1">
                        <b-input-group>
                          <b-form-input v-model="filter" placeholder="查找总商" />
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
                           @row-clicked="rowClick"
                           @filtered="onFiltered"
                  >    
                    <!-- <template  slot = "index"  slot-scope = "data" >{{data.index + 1 + ( currentPage - 1 ) * 5}}</template > -->
                    <template slot="name" slot-scope="row" @row-clicked="showDetails(row)">{{row.value}}</template>
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
    business_code: 1001,
    business_name: "星巴克",
    login_code: "2000000",
    password: "8080808",
    total_shops_num:"5",
    role_type: "客户拓展部",
    LOGO: "url"
  },
  {
    business_code: 1002,
    business_name: "永辉超市",
    login_code: "2000000",
    password: "8080808",
    total_shops_num:"2",
    role_type: "客户拓展部",
    LOGO: "url"
  },
  {
    business_code: 1003,
    business_name: "德克士",
    login_code: "2000000",
    password: "8080808",
    total_shops_num:"3",
    role_type: "数据分析部",
    LOGO: "url"
  },
  {
    business_code: 1004,
    business_name: "悦诗风吟",
    login_code: "2000000",
    password: "8080808",
    total_shops_num:"8",
    role_type: "客户拓展部",
    LOGO: "url"
  },
  {
    business_code: 1005,
    business_name: "优衣库",
    login_code: "2000000",
    password: "8080808",
    total_shops_num:"4",
    role_type: "客户拓展部",
    LOGO: "url"
  },
  {
    business_code: 1006,
    business_name: "Zara",
    login_code: "2000000",
    password: "8080808",
    total_shops_num:"5",
    role_type: "客户拓展部",
    LOGO: "url"
  },
  {
    business_code: 1007,
    business_name: "雅诗兰黛",
    login_code: "2000000",
    password: "8080808",
    total_shops_num:"5",
    role_type: "客户拓展部",
    LOGO: "url"
  },
  {
    business_code: 1008,
    business_name: "屈臣氏",
    login_code: "2000000",
    password: "8080808",
    total_shops_num:"5",
    role_type: "客户拓展部",
    LOGO: "url"
  },
  {
    business_code: 1009,
    business_name: "CPB",
    login_code: "2000000",
    password: "8080808",
    total_shops_num:"5",
    role_type: "客户拓展部",
    LOGO: "url"
  },
  {
    business_code: 1010,
    business_name: "资生堂",
    login_code: "2000000",
    password: "8080808",
    total_shops_num:"5",
    role_type: "客户拓展部",
    LOGO: "url"
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
    mounted(){
        //从服务器读取所有总商列表
        axios.get(API_ENDPOINT+'/businesss', {
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
    getData(a, b, c){
      return a;
      return b;
      return c;
    },
    rowClick(row){
      console.log(row.userCode);
      this.$router.push({path:"/shop_info", query: {business_code:row.userCode}});
      Bus.$emit('getData', 3, true, false);
    },
    showDetails(row){
      console.log(row.business_code);
      this.$router.push({path: '/', params: { num: item.num }});
    },
    toggleAdd: function() {
      this.isShow = !this.isShow;
      this.selectedlist = {};
    },
    //删除按钮
    deleteMsg: function(n) {
    
      console.log(n);
      console.log(this.items[n].userCode);  
      axios({
        method: 'delete',
        url: API_ENDPOINT+'/business',
        params: {
          businessId: this.items[n].userCode,    //总商id
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
      console.log(this.items[this.selected].business_code);
      axios({
        method: 'put',
        url: API_ENDPOINT+'/business',
        params: {
          business:this.selected.business_code    //总商id
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
        axios.post(API_ENDPOINT+'/business',
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
  
    // //交互
    // //   新增
    //   insert: function (arr) {
    //       this.$http.post(this.urls[0],
    //           arr
    //       ).then(function (response) {
    //           console.log(response);
    //       }).catch(function (response) {
    //           console.log(response);
    //       });
    //       return 's';
    //   },
    // //   删除
    //  deleate: function (id) {
    //      this.$http.delete(this.urls[0]+id.toString(), {
    //          params: {
    //              ID: 12345
    //          }
    //      }).then(function (response) {
    //          console.log(response);
    //      }).catch(function (response) {
    //          console.log(response);
    //      });
    //      return 's';
    //  },
    // //   修改
    //   update: function () {
    //       this.$http.put(this.urls[2], {
    //           params: {
    //               ID: 12345
    //           }
    //       }).then(function (response) {
    //           console.log(response);
    //       }).catch(function (response) {
    //           console.log(response);
    //       });
    //       return 's';
    //   },
    // //   查找全部
    //   searchAll: function () {
    //       this.$http.get("./users.json", {
    //           params: {
    //               // pageNum: 1,
    //               // pageSize: 10,
    //               // orderBy: "create_date"
    //           }
    //       }).then(function (response) {
    //           console.log(response.data);


    //       }).catch(function (response) {
    //           console.log(response.data);
    //       });
    //       this.items
    //   },

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



