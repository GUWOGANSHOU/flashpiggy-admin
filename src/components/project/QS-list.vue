<template>
   <div class="qs-list">
     <b-row v-if="qsList.length == 0 ? false : true">
      <!-- <ul v-if="qsList.length == 0 ? false : true"> -->
        <b-col md="1">
          <li></li>
        </b-col>
        <b-col md="2">
          <li>标题</li>
        </b-col>
        <b-col md="2">
          <li>创建时间</li>
        </b-col>
        <b-col md="2">
          <li>状态</li>
        </b-col>
        <b-col md="2">
          <li>操作</li>
        </b-col>
        <b-col md="3">                                    
          <button class="add-btn" @click="$router.push({name: 'qsEdit', params: {num: 0}})">+新建问卷</button>
        </b-col>
      <!-- </ul> -->
     </b-row>
     
    <template v-for="item in qsList">
      <b-row>
        <b-col md="1" >
          <li class="center-control"><input type="checkbox" v-model="item.checked"></li>
        </b-col>
        <b-col md="2">
          <li>{{item.title}}</li>
        </b-col>
        <b-col md="2">
         <li>{{item.create_time}}</li>
        </b-col>
        <b-col md="2">
          <li :class="item.state === 'inissue' ? 'inissue' : ''">{{item.stateTitle}}</li>
        </b-col>
        <b-col md="5">
          <li>
            <b-button size="md" class="mr-1"@click="iterator = edit(item); iterator.next()">编辑</b-button>
          <!-- <button @click="iterator = edit(item); iterator.next()">编辑</button> -->
            <b-button size="md" class="mr-1"@click="iterator = delItem(item.num); iterator.next()">删除</b-button>
          <!-- <button @click="iterator = delItem(item.num); iterator.next()">删除</button> -->
            <router-link :to="`/project_info/answer_info/fill/${item.num}`" tag="b-button" class="btn-spacing">查看问卷</router-link>
            <b-button  size="md" class="mr-1" @click="iterator = watchData(item); iterator.next()">查看数据</b-button>
          </li>
        </b-col>
      </b-row>
    </template>
      <div class="list-footer" v-if="qsList.length == 0 ? false : true">
          <li><input type="checkbox" id="all-check" v-model="selectAll"></li>
          <li><label class="all-selectTab">全选</label></li>
          <li><b-button class="del-btn" size="md" @click="iterator = delItems(); iterator.next()">删除</b-button></li>
      </div>
      <div class="pagation">
            <b-pagination align="center" :total-rows="100" v-model="currentPage" :per-page="10">
       </b-pagination>
      </div>
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

/**
 * A module that define qs-list router view
 * @exports qs-list
 * @author oyh(Reusjs)
 */
  export default {
    name: 'qslist',
    data() {
      return {
        qsList: [],
        showDialog: false,
        iterator: {},
        info: '',
         
      }
    },
    mounted() {
      if (storage.get() !== null) {
        this.qsList = storage.get();
        // 此处代码为：问卷截止时间和当前时间对比，判断问卷是否结束。【问卷截止时间改为项目截止时间】
        // this.qsList.forEach( item => {    
        //   let [year, month, day] = item.time.split('-')     let [year, month, day] = 从后台拿【项目截止时间】
        //   if (year < new Date().getFullYear()) {
        //     item.state = 'issueed'
        //     item.stateTitle = '已发布'
        //   } else if (year == new Date().getFullYear() 
        //     && month < new Date().getMonth() + 1) {
        //     item.state = 'issueed'
        //     item.stateTitle = '已发布'
        //   } else if (year == new Date().getFullYear() 
        //     && month == new Date().getMonth() + 1 
        //     && day < new Date().getDate()) {
        //     item.state = 'issueed'
        //     item.stateTitle = '已发布'
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
    methods: {
      showDialogMsg(info) {
        this.showDialog = true;
        this.info = info;
      },
      *delItem(num) {
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
      *delItems() {
        yield this.showDialogMsg('确认要删除选中的问卷？');

        yield (() => {
          this.showDialog = false;
          if (this.selectAll) {
            this.qsList = [];
            return;
          }
          if (this.selectGroup == []) return;

          this.selectGroup.forEach( item => {
            if (this.qsList.indexOf(item) > -1) this.qsList.splice(this.qsList.indexOf(item), 1);
          } )
        })();     
      },
      *edit(item) {
        yield (() => {
          if (item.state === 'noissue') {
            this.showDialogMsg('确认要编辑？');
          } else {
            this.showDialogMsg('只有未发布的问卷才能编辑');
          }
        })();
        yield (() => {
          if (item.state !== 'noissue') {
            this.showDialog = false;
          } else {
            this.showDialog = false;
            this.$router.push({name: 'qsEdit', params: { num: item.num }})
          }
        })();
      },
      *watchData(item) {
        yield (() => {
          if (item.state === 'noissue') {
            this.showDialogMsg('未发布的问卷无数据可查看');
          } else {
            this.$router.push({ name: 'qsData', params: { num: item.num }})
          }
        })();
        yield this.showDialog = false;
      }
    },
    computed: {
      selectAll: {
        get() {
          return this.selectCount === this.qsList.length && this.selectCount !== 0;
        },
        set(value) {
          this.qsList.forEach( item => {
            item.checked = value;
          } );
          return value;
        }
      },
      selectCount() {
        let i = 0;
        this.qsList.forEach( item => {
          if (item.checked) i++;
        } );
        return i;
      },
      selectGroup() {
        let group = [];
        this.qsList.forEach( item => {
          if (item.checked) group.push(item);
        } );
        return group;
      }
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
  }
</script>

<style>
.qs-list {
  margin: 50px auto;
  color: #666;
  list-style: none;
  line-height: 6em;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  }
.add-btn{
  display: inline-block;
  height: 2.5em;
  width: 7em;
  line-height: 2.5em;
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
.qs-list .row {
  margin-left: 2em;
  margin-right: 2em;
  border-top: solid 1px lightgray;
}
.inissue {
  color: #9fef96;
}
.btn-spacing {
  margin-right: .5em;
}


.qs-list .shadow {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(85, 85, 85, .7);
  }
.qs-list .shadow header{
      height: 5em;
      padding-left :3em;
      padding-right: 3em;
      line-height: 5em;
      border-radius: .5em;
      background-color: #f7f7f7;
}
.qs-list .shadow header .close-btn {
  position: absolute;
  right: 3em;
  color: #bbb;
  cursor: pointer;
}
.qs-list .shadow header .close-btn:hover {
  color: #009AFF;
}
.qs-list .shadow height span:nth-of-type(1) {
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
.list-footer {
  display: flex;
  align-content: space-between;
  margin: 0 5em;
}
.all-selectTab {
  margin-left: .5em;
}
.del-btn {
  margin-left: 2em;
}
</style>
