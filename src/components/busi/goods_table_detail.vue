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
                           @filtered="onFiltered"
                  >    
                    <!-- <template  slot = "index"  slot-scope = "data" >{{data.index + 1 + ( currentPage - 1 ) * 5}}</template > -->
                    <template slot="name" slot-scope="row">{{row.value}}</template>
                    <template slot="actions" slot-scope="row">
                      <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
                      <b-button size="sm" class="mr-1" @click="showOverlay(row.index+ ( currentPage - 1 ) * 5)">修改</b-button>
                      <b-button size="sm" data-toggle="modal" data-target="#layer" @click="deleteMsg(row.index+ ( currentPage - 1 ) * 5)">删除</b-button>
                    </template>
                  </b-table>

              <!-- 分页begin-->
              <b-pagination align = "center" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
              <!-- 分页end -->
              
                </b-container>
</template>
<script>
/* eslint-disable no-console */

import axios from 'axios';
import {API_ENDPOINT} from '../../constant'
import XPopLayer from "../reuse/XPopLayer.vue";


const goods_items = [
  {
           
    business_name: "星巴克",
    business_code: "1001",
    key_code: "8080808",
    good_code: "2018101020202020",
    goods_name: "咖啡兑换券",
    exchange_num: 2,
    url: "url",
    introduce: "本卡可以在店内随意消费，不找零，不兑现",
    points: "100",
    end_time: "2018/10/31",
    sum: 5,
    num: 2,
    state: "已上架"
  },
  {
           
    business_name: "星巴克",
    business_code: "1001",
    key_code: "8080808",
    good_code: "2018101020202020",
    goods_name: "九折卡",
    exchange_num: 2,
    url: "url",
    introduce: "本卡可以在店内随意消费，不找零，不兑现",
    points: "100",
    end_time: "2018/10/31",
    sum: 5,
    num: 2,
    state: "已上架"
  },
  {
           
    business_name: "星巴克",
    business_code: "1001",
    key_code: "8080808",
    good_code: "2018101020202020",
    goods_name: "新品试饮",
    exchange_num: 2,
    url: "url",
    introduce: "本卡可以在店内随意消费，不找零，不兑现",
    points: "100",
    end_time: "2018/10/31",
    sum: 5,
    num: 2,
    state: "已上架"
  },
  {
           
    business_name: "永辉超市",
    business_code: "1002",
    key_code: "8080808",
    good_code: "2018101020202020",
    exchange_num: 2,
    goods_name: "超市100元购物券",
    url: "url",
    introduce: "本卡可以在店内随意消费，不找零，不兑现",
    points: "100",
    end_time: "2018/10/31",
    sum: 5,
    num: 2,
    state: "已上架"
  },
  {
           
    business_name: "德克士",
    business_code: "1003",
    key_code: "8080808",
    good_code: "2018101020202020",
    exchange_num: 2,
    goods_name: "星巴克兑换券",
    url: "url",
    introduce: "本卡可以在店内随意消费，不找零，不兑现",
    points: "100",
    end_time: "2018/10/31",
    sum: 5,
    num: 2,
    state: "已上架"
  },
  {
           
    business_name: "悦诗风吟",
    business_code: "1004",
    key_code: "8080808",
    good_code: "2018101020202020",
    exchange_num: 2,
    goods_name: "绿茶精华试用装",
    url: "url",
    introduce: "本卡可以在店内随意消费，不找零，不兑现",
    points: "100",
    end_time: "2018/10/31",
    sum: 5,
    num: 2,
    state: "已上架"
  },
  {
           
    business_name: "优衣库",
    business_code: "1005",
    key_code: "8080808",
    good_code: "2018101020202020",
    exchange_num: 2,
    goods_name: "九折卡",
    url: "url",
    introduce: "本卡可以在店内随意消费，不找零，不兑现",
    points: "100",
    end_time: "2018/10/31",
    sum: 5,
    num: 2,
    state: "已上架"
  },
  {
           
    business_name: "Zara",
    business_code: "1006",
    key_code: "8080808",
    good_code: "2018101020202020",
    exchange_num: 2,
    goods_name: "包邮券",
    url: "url",
    introduce: "本卡可以在店内随意消费，不找零，不兑现",
    points: "100",
    end_time: "2018/10/31",
    sum: 5,
    num: 2,
    state: "已上架"
  },
  {
           
    business_name: "雅诗兰黛",
    business_code: "1007",
    key_code: "8080808",
    good_code: "2018101020202020",
    exchange_num: 2,
    goods_name: "眼霜小样",
    url: "url",
    introduce: "本卡可以在店内随意消费，不找零，不兑现",
    points: "100",
    end_time: "2018/10/31",
    sum: 5,
    num: 2,
    state: "已上架"
  },
  {
           
    business_name: "屈臣氏",
    business_code: "1008",
    key_code: "8080808",
    good_code: "2018101020202020",
    exchange_num: 2,
    goods_name: "半价券",
    url: "url",
    introduce: "本卡可以在店内随意消费，不找零，不兑现",
    points: "100",
    end_time: "2018/10/31",
    sum: 5,
    num: 2,
    state: "已上架"
  },
  {
           
    business_name: "CPB",
    business_code: "1009",
    key_code: "8080808",
    good_code: "2018101020202020",
    exchange_num: 2,
    goods_name: "口红小样",
    url: "url",
    introduce: "本卡可以在店内随意消费，不找零，不兑现",
    points: "100",
    end_time: "2018/10/31",
    sum: 5,
    num: 2,
    state: "已上架"
  },
  {
           
    business_name: "资生堂",
    business_code: "1010",
    key_code: "8080808",
    good_code: "2018101020202020",
    exchange_num: 2,
    goods_name: "粉底液小样",
    url: "url",
    introduce: "本卡可以在店内随意消费，不找零，不兑现",
    points: "100",
    end_time: "2018/10/31",
    sum: 5,
    num: 2,
    state: "已上架"
  }

      
      
      ];
export default {
  data() {
    return {
      arr: [],
      hover: true,
      striped: true,
      items: [],
      // goods_items:[],
      // fields: this.opfields,
      selectedlist: {},
      selected: -1,
      isShow: false,
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null
    };
  },
  // created() {
  //   this.fetchData();
  // },
  mounted(){
    //从服务器读取所有总商礼品列表goods_items
    axios.get(API_ENDPOINT+'/goods', {
      params:{
        pageNum: 1,
        pageSize: 20,
        token: 1234,  
      }
    }) 
    .then(response=>{
      console.log(response.data.data);
      const goods_items = response.data.data;
      })
    .catch(function(error){
      console.log(error);
      });
      //从所有礼品列表中过滤（查询总商名参数name）
      this.fetchData();
  },
  components: {
    XPopLayer
  },
  props: ["opfields", "urls"],
  computed: {
    fields: function() {
      // this.searchAll();
      return this.opfields;
    },
    sortOptions() {
      // Create an options list from our fields
      return this.fields.filter(f => f.sortable).map(f => {
        return { text: f.label, value: f.key };
      });
    }
  },
  methods: {
    fetchData() {
      this.items = goods_items.filter((v, i) => {
        return goods_items[i].business_code == this.$route.query.business_code
      })

    },
    toggleAdd: function() {
      this.isShow = !this.isShow;
    },
    //删除按钮
    deleteMsg: function(n) {
      this.items.splice(n, 1);
      axios({
      method: 'delete',
      url: API_ENDPOINT+'/good',
      params: {
        goodId:'this.items[index].good_code'    //礼品id
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
      this.toggleAdd();
    },
    //子组件提交按钮冒泡触发
    modify(arr) {
      if (this.selected > -1) {
        this.$set(this.items, this.selected, arr);
        axios({
          method: 'put',
          url: API_ENDPOINT+'/good',
          params: {
            goods:'this.items[index].good_code'    //礼品id
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
        axios.post(API_ENDPOINT+'/good',
          this.selectedlist
        )
        .then(function(response){
          console.log(response);
          })
        .catch(function(error){
          console.log(error);
        });
      }
      this.toggleAdd();
    },
    updateTheModelShow(s) {
      this.isShow = s;
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
