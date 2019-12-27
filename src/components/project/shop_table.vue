<template>
    <b-container fluid>
                  <!-- User Interface controls -->
                  <b-row>
                    <!-- selectedlist用来暂存弹层数据 -->
                 <XPopLayer :list="selectedlist" :fields="fields" v-show="isShow" @updateShow="updateTheModelShow" @modify="modify" ></XPopLayer>
                    <b-col md="4" class="my-1">
                        <b-input-group>
                          <b-form-input v-model="filter" placeholder="查找昵称" />
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
                           :striped = "striped"
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
                    <template slot="name" slot-scope="row">{{row.value}}</template>
                    <template slot="actions" slot-scope="row">
                      <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
                      <b-button size="sm" class="mr-1" @click.stop="showOverlay(row.index+ ( currentPage - 1 ) * 5)">修改</b-button>
                      <b-button size="sm" data-toggle="modal" data-target="#layer" @click.stop="deleteMsg(row.index+ ( currentPage - 1 ) * 5)">删除</b-button>
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
// const shops_items = [
//   {

//     business_code: 1001,
//     shopCode: 1001001,
//     shop_name: "仓山苍霞店",
//     address: "福建省福州市仓三区苍霞街道2号",
//     admin: "谢镇锋",
//     mobile: "18259083427",
//     shop_time: "周一 至 周日 10：00-20：00"
//   },
//   {
//     business_code: 1001,
//     shopCode: 1001002,
//     shop_name: "仓山万达店",
//     address: "福建省福州市仓山区浦江大道万达广场1F层155",
//     admin: "谢镇锋",
//     mobile: "18259083427",
//     shop_time: "周一 至 周日 10：00-20：00"
//   },
//   {
//     business_code: 1001,
//     shopCode: 1001003,
//     shop_name: "正荣财富中心店",
//     address: "福建省福州市闽侯县新保路18号正荣·财富中心1号楼F1层",
//     admin: "周舟",
//     mobile: "13774526987",
//     shop_time: "周一 至 周日 10：00-20：00"
//   },
//   {
//     business_code: 1002,
//     shopCode: 1002001,
//     shop_name: "闽侯大学城店",
//     address: "福建省福州市闽侯县上街镇永嘉天地购物广场B1层",
//     admin: "郑甜",
//     mobile: "13212685727",
//     shop_time: "周一 至 周日 10：00-20：00"
//   },
//   {
//     business_code: 1002,
//     shopCode: 1002002,
//     shop_name: "仓山苍霞店",
//     address: "福建省福州市仓三区苍霞街道2号",
//     admin: "谢镇锋",
//     mobile: "18259083427",
//     shop_time: "周一 至 周日 10：00-20：00"
//   },
//   {
//     business_code: 1002,
//     shopCode: 1002003,
//     shop_name: "正荣财富中心店",
//     address: "福建省福州市闽侯县新保路18号正荣·财富中心1号楼B1层",
//     admin: "谢镇锋",
//     mobile: "18259083427",
//     shop_time: "周一 至 周日 10：00-20：00"
//   },
//   {
//     business_code: 1002,
//     shopCode: 1002004,
//     shop_name: "仓山苍霞店",
//     address: "福建省福州市仓三区苍霞街道2号",
//     admin: "谢镇锋",
//     mobile: "18259083427",
//     shop_time: "周一 至 周日 10：00-20：00"
//   },
//   {
//     business_code: 1005,
//     shopCode: 1005001,
//     shop_name: "仓山苍霞店",
//     address: "福建省福州市仓三区苍霞街道2号",
//     admin: "谢镇锋",
//     mobile: "18259083427",
//     shop_time: "周一 至 周日 10：00-20：00"
//   },
//   {
//     business_code: 1004,
//     shopCode: 1004001,
//     shop_name: "仓山苍霞店",
//     address: "福建省福州市仓三区苍霞街道2号",
//     admin: "谢镇锋",
//     mobile: "18259083427",
//     shop_time: "周一 至 周日 10：00-20：00"
//   },
//   {
//     business_code: 1003,
//     shopCode: 1003001,
//     shop_name: "仓山苍霞店",
//     address: "福建省福州市仓三区苍霞街道2号",
//     admin: "谢镇锋",
//     mobile: "18259083427",
//     shop_time: "周一 至 周日 10：00-20：00"
//   }
// ];

import Bus from '../../bus.js';
import XPopLayer from "../reuse/XPopLayer.vue";
import axios from 'axios';
import {API_ENDPOINT} from '../../constant'
export default {
  data() {
    return {
      items: [],
      shops_items:[],
      // items:items,
      striped:true,
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
    //从服务器读取所有总商门店列表shops_items
    axios.get(API_ENDPOINT+'/shops', {
      params:{
        pageNum: 1,
        pageSize: 20,
        token: 1234,  
      }
    }) 
    .then((response)=>{
      console.log(response.data.data);
      this.shops_items = response.data.data;
      //从所有门店列表中过滤（查询总商名参数name）
      this.fetchData();
      // console.log(this.shops_items);
      })
    .catch(function(error){
      console.log(error);
      });
  },
  methods: {
    // rowClick(row){
    //   console.log(row.business_code);
    //   this.$router.push({path:"/project_info", query: {business_code:row.business_code}});
    //   // Bus.$emit('getArgs',false, true);
    // },
    fetchData() {  
      this.items = this.shops_items.filter((v, i) => {
        return this.shops_items[i].business_code == this.$route.query.business_code
      })
      console.log(this.items);
      // this.items = shops_items.filter(function(v, i){var that = this;return shops_items[i].business_code == this.$route.query.business_code})
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
      url: API_ENDPOINT+'/shop',
      params: {
        shopId:'this.items[index].shopCode'    //门店id
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
    //子组件（新增/修改->提交）按钮冒泡触发
    modify(arr) {
      if (this.selected > -1) {
      this.$set(this.items, this.selected, arr);    //实现修改->提交
      // axios.put('API_ENDPOINT',{
      //   params:{
      //     shop:this.items[index].business_code       //门店id
      //     }
      // })
    axios({
      method: 'put',
      url: API_ENDPOINT+'/shop',
      params: {
        shop:'this.items[index].shopCode'    //门店id
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
        this.items.push(arr);      //默认selected为-1，实现新增->提交
        //提交数据到服务器
        axios.post(API_ENDPOINT+'/shop',
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
    //  delete: function (id) {
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
