<template>
<div class="qs-list">
    <b-container fluid>
                  <b-row>        
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
                    </b-col>
                    <b-col md="2" offset-md="1" class="my-1">
                      <button class="add-btn" @click="$router.push({name: 'qsEdit', params: {num: 0}})">+新建问卷</button>
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
                  v-if="qsList.length == 0 ? false : true">    
                    <!-- <template  slot = "index"  slot-scope = "data" >{{data.index + 1 + ( currentPage - 1 ) * 5}}</template> -->
                    <template slot="name" slot-scope="row">{{row.value}}</template>
                    <template slot="actions" slot-scope="row">
                        <b-button size="sm" class="mr-1"@click="iterator = edit(row); iterator.next()">编辑</b-button>
                        <b-button size="sm" class="mr-1"@click="iterator = delrow(row.num); iterator.next()">删除</b-button>
                        <b-button size="sm" class="mr-1"@click="$router.push({path:`/project_info/answer_info/fill/${row.num}`})">查看问卷</b-button>
                        <!-- <router-link :to="`/project_info/answer_info/fill/${row.num}`" tag="b-button" class="btn-spacing">查看问卷</router-link> -->
                        <b-button  size="sm" class="mr-1" @click="iterator = watchData(row); iterator.next()">查看数据</b-button>
                    </template>
                  </b-table>
              
                  <b-pagination align = "center" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
              
                </b-container>
                <div class="add-qs" v-if="qsList.length === 0">
                    <button class="add-btn" @click="$router.push({name: 'qsEdit', params: {num: 0}})">+&nbsp;&nbsp;新建问卷</button>
                </div>
                <div class="shadow" v-if="showDialog">
                    <div class="del-dialog">
                        <header>
                             <span>提示</span>
                             <span class="close-btn" @click="showDialog = false">X</span>
                        </header>
                         <p>{{info}}</p>
                         <div class="btn-box">
                         <b-button class="yes" @click="iterator.next();">确定</b-button>
                         <b-button @click="showDialog = false">取消</b-button>
                         </div>
                     </div>
                </div>
</div>
</template>
<script>
import storage from '../../store.js'
const items = [
  {
    num: 1,
    questions_code: 180180181,
    title: "第一份问卷",
    create_time: "2018/11/17 10：10",
    state: "noissue",
    stateTitle:"未发布",
    'question': [
        {'num': 'Q1', 'title': '单选题', 'type': 'radio', 'isNeed': true, 'options': ['选项一', '选项二']},
        {'num': 'Q2', 'title': '多选题', 'type': 'checkbox', 'isNeed': true, 'options': ['选项一', '选项二', '选项三', '选项四']},
        {'num': 'Q3', 'title': '文本题', 'type': 'textarea', 'isNeed': true}
    ]
    
  },
  {
    num: 2,
    questions_code: 180180182,
    title: "第二份问卷",
    create_time: "2018/11/17 20：20",
    state: "inissue",
    stateTitle:"发布中",
    'question': [
        {'num': 'Q1', 'title': '单选题', 'type': 'radio', 'isNeed': true, 'options': ['选项一', '选项二']},
        {'num': 'Q2', 'title': '多选题', 'type': 'checkbox', 'isNeed': true, 'options': ['选项一', '选项二', '选项三', '选项四']},
        {'num': 'Q3', 'title': '文本题', 'type': 'textarea', 'isNeed': true}
    ]
    
  },
  {
    num: 3,
    questions_code: 180180183,
    title: "第三份问卷",
    create_time: "2018/11/17 15：12",
    state: "issueed",
    stateTitle:"已发布",
    'question': [
        {'num': 'Q1', 'title': '单选题', 'type': 'radio', 'isNeed': true, 'options': ['选项一', '选项二']},
        {'num': 'Q2', 'title': '多选题', 'type': 'checkbox', 'isNeed': true, 'options': ['选项一', '选项二', '选项三', '选项四']},
        {'num': 'Q3', 'title': '文本题', 'type': 'textarea', 'isNeed': true}
    ]
  },
];
/**
 * A module that define qs-list router view
 * @exports qs-list
 * @author oyh(Reusjs)
 */
export default {
  name: 'qsList',
  data() {
    return {
      striped:true,
      qsList: [],
      showDialog: false,
      iterator: {},
      info: '',
      items: items,
      fields: [
        {
          key: "questions_code",
          label: "问卷ID",
          sortable: true,
          class: "text-center"
          
        },
        {
          key: "title",
          label: "标题",
          sortable: true,
          sortDirection: "desc"
        },
        { key: "create_time", label: "创建时间" },
        { key: "stateTitle", label: "状态" },
        { key: "actions", label: "Actions" }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: items.length,
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
    };
  },
    mounted() {
      console.log(this.items);
      if (storage.get() !== null) {
        this.qsList = storage.get();
        console.log(this.qsList);
        this.items=this.qsList;
        // console.log(this.qsList);
        // 此处代码为：问卷截止时间和当前时间对比，判断问卷是否结束。【问卷截止时间改为项目截止时间】
        // this.qsList.forEach( row => {    
        //   let [year, month, day] = row.create_time.split('-')     let [year, month, day] = 从后台拿【项目截止时间】
        //   if (year < new Date().getFullYear()) {
        //     row.state = 'issueed'
        //     row.stateTitle = '已发布'
        //   } else if (year == new Date().getFullYear() 
        //     && month < new Date().getMonth() + 1) {
        //     row.state = 'issueed'
        //     row.stateTitle = '已发布'
        //   } else if (year == new Date().getFullYear() 
        //     && month == new Date().getMonth() + 1 
        //     && day < new Date().getDate()) {
        //     row.state = 'issueed'
        //     row.stateTitle = '已发布'
        //   }
        // })
      } else {
        storage.save([

          { 'num': 1, 
            'title': '第一份问卷', 
            'create_time': '2030-1-1', 
            'state': 'inissue', 
            'stateTitle': '发布中', 
            'checked': false, 
            'question': [
              {'num': 'Q1', 'title': '单选题', 'type': 'radio', 'isNeed': true, 'options': ['选项一', '选项二']},
              {'num': 'Q2', 'title': '多选题', 'type': 'checkbox', 'isNeed': true, 'options': ['选项一', '选项二', '选项三', '选项四']},
              {'num': 'Q3', 'title': '文本题', 'type': 'textarea', 'isNeed': true}
            ]
          },

          { 'num': 2,
            'title': '第二份问卷',
            'create_time': '2030-1-1',
            'state': 'noissue',
            'stateTitle': '未发布',
            'checked': false, 
            'question': [
              {'num': 'Q1', 'title': '单选题', 'type': 'radio', 'isNeed': true, 'options': ['选项一', '选项二']},
              {'num': 'Q2', 'title': '多选题', 'type': 'checkbox', 'isNeed': true, 'options': ['选项一', '选项二', '选项三', '选项四']},
              {'num': 'Q3', 'title': '文本题', 'type': 'textarea', 'isNeed': true}
            ]
          },

          { 'num': 3,
            'title': '第三份问卷', 
            'create_time': '2017-3-27', 
            'state': 'issueed', 
            'stateTitle': '已发布', 
            'checked': false, 
            'question': [
              {'num': 'Q1', 'title': '单选题', 'type': 'radio', 'isNeed': true, 'options': ['选项一', '选项二']},
              {'num': 'Q2', 'title': '多选题', 'type': 'checkbox', 'isNeed': true, 'options': ['选项一', '选项二', '选项三', '选项四']},
              {'num': 'Q3', 'title': '文本题', 'type': 'textarea', 'isNeed': true}
            ]
          }
          
        ]);
        this.qsList = storage.get();
      }
    },
  components: {
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields.filter(f => f.sortable).map(f => {
        return { text: f.label, value: f.key };
      });
    },
    // 预留：全选功能的实现
      selectAll: {
        get() {
          return this.selectCount === this.qsList.length && this.selectCount !== 0;
        },
        set(value) {
          this.qsList.forEach( row => {
            row.checked = value;
          } );
          return value;
        }
      },
      selectCount() {
        let i = 0;
        this.qsList.forEach( row => {
          if (row.checked) i++;
        } );
        return i;
      },
      selectGroup() {
        let group = [];
        this.qsList.forEach( row => {
          if (row.checked) group.push(row);
        } );
        return group;
      }
  },
  methods: {      
      showDialogMsg(info) {
        this.showDialog = true;
        this.info = info;
      },
      *delrow(num) {
        yield this.showDialogMsg('确认要删除此问卷')

        yield (() => {
          let index = 0;
          for (let length = this.qsList.length; index < length; index++) {
            if (this.qsList[index].num === num) break;
          }
          this.qsList.splice(index, 1);
          this.showDialog = false;
        })();
      },
      *delitems() {
        yield this.showDialogMsg('确认要删除选中的问卷？');

        yield (() => {
          this.showDialog = false;
          if (this.selectAll) {
            this.qsList = [];
            return;
          }
          if (this.selectGroup == []) return;

          this.selectGroup.forEach( row => {
            if (this.qsList.indexOf(row) > -1) this.qsList.splice(this.qsList.indexOf(row), 1);
          } )
        })();     
      },
      *edit(row) {
        yield (() => {
          if (row.state === 'noissue') {
            this.showDialogMsg('确认要编辑？');
          } else {
            this.showDialogMsg('只有未发布的问卷才能编辑');
          }
        })();
        yield (() => {
          if (row.state !== 'noissue') {
            this.showDialog = false;
          } else {
            this.showDialog = false;
            this.$router.push({name: 'qsEdit', params: { num: row.num }})
          }
        })();
      },
      *watchData(row) {
        yield (() => {
          if (row.state === 'noissue') {
            this.showDialogMsg('未发布的问卷无数据可查看');
          } else {
            this.$router.push({ name: 'qsData', params: { num: row.num }})
          }
        })();
        yield this.showDialog = false;
      },

    onFiltered(filtereditems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filtereditems.length;
      this.currentPage = 1;
    },
  },
    watch: {
      qsList: {
        handler(val) {
          val.forEach( (item, index) => {
            item.num = index + 1
          } )
          storage.save(val);
        },
        deep: true
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
/* .main-icon_add {
  background: url(../assets/add-icon.png) no-repeat 0 0;
  background-size: 2em;
} */


/* .qs-list {
  margin: 50px auto;
  color: #666;
  list-style: none;
  line-height: 6em;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  } */
.add-btn{
  /* display: inline-block;
  height: 2.5em; */
  width: 7em;
  /* line-height: 2.5em; */
  text-align: center;
  color: #fff;
  border: 1px solid #009AFF;
  border-radius: .3em;
  background-color: #009AFF;
  cursor: pointer;
}
.add-btn:hover {
  box-shadow: 0 0 5px #009AFF;
}
/* .qs-list .row {
  margin-left: 2em;
  margin-right: 2em;
  border-top: solid 1px lightgray;
} */
/* .inissue {
  color: #9fef96;
} */
.btn-spacing {
  margin-right: .5em;
}


.shadow {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(85, 85, 85, .7);
  }
.shadow header{
      height: 5em;
      padding-left :3em;
      padding-right: 3em;
      line-height: 5em;
      border-radius: .5em;
      background-color: #f7f7f7;
}
.shadow header .close-btn {
  position: absolute;
  right: 3em;
  color: #bbb;
  cursor: pointer;
}
.shadow header .close-btn:hover {
  color: #009AFF;
}
.shadow height span:nth-of-type(1) {
  font-weight: 700;
}
.del-dialog {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 40em;
  height: 20em;
  transform: translateX(-50%) translateY(-50%);
  border-radius: .5em;
  box-shadow: 0 0 5px #555;
  background-color: #fff;
}
.del-dialog p {
  margin-top: 3em;
  margin-left: 3em;
}
.btn-box {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 6em;
  text-align: center;
  line-height: 6em;
}
.yes {
  margin-right: 1em;
  color: #fff;
  background-color:   #009AFF;
  border: 1px solid   #009AFF;
}
.btn-box .yes:hover {
  box-shadow: 0 0 5px   #009AFF;
}
.center-control {
  text-align: center;
}
.add-qs {
  height: 30em;
  line-height: 30em;
  text-align: center;
}
/* .list-footer {
  display: flex;
  align-content: space-between;
  margin: 0 5em;
} */
/* .all-selectTab {
  margin-left: .5em;
} */
.del-btn {
  margin-left: 2em;
}
</style>