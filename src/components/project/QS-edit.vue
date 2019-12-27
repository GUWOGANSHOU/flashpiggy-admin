<template>
  <div class="edit-container">
    <h3 @click="titleClick" v-if="!titleChange">{{qsItem.title}}</h3>
    <input type="text" name="qsTitle" v-if="titleChange"
    v-model="titleValue"
    @blur="onblur"
    @keyup.enter="onsubmit"
    ref="titleInput">
    <div class="content">
      <div class="questions" v-for="(qs, index) in qsItem.question">
        <div class="qs-left">
          <p class="qs-title">
            {{qs.num}}&nbsp;{{qs.title}}&nbsp;{{getMsg(qs)}}
          </p>
          <p v-for="option in qs.options" class="option">
            <label>
              <input 
              type="radio" 
              :name="`${qs.num}-${qs.title}`"
              v-if="qs.type === 'radio'">
              <input 
              type="checkbox" 
              :name="`${qs.num}-${qs.title}`"
              v-if="qs.type === 'checkbox'">{{option}}
            </label>
          </p>
          <textarea 
          v-if="qs.type === 'textarea'"></textarea>
        </div>
        <div class="qs-right">
          <label><input type="checkbox" :value="qs.isNeed" v-model="qs.isNeed">
          此题是否必填</label>
          <p>
            <span v-if="index !== 0" @click="goUp(index)">上移</span>
            <span v-if="index !== qsItem.question.length - 1" @click="goDown(index)">下移</span>
            <span @click="copy(index, qs)">复用</span>
            <span @click="del(index)">删除</span>
          </p>
        </div>
      </div>
      <div class="add">
        <transition name="slide">
          <div class="add-option" v-if="showBtn">
            <button @click="addRadio">单选</button>
            <button @click="addCheckbox">多选</button>
            <button @click="addTextarea">文本框</button>
          </div>
        </transition>
        <div class="add-item" @click="addItemClick">
          <span class="add-icon" >+</span><span>添加问题</span>
        </div>
      </div>
    </div>
    <div class="shadow" v-if="showAddQsDialog">
      <div class="add-qs-dialog">
        <header>
          <span>提示</span>
          <span class="close-btn" @click="showAddQsDialog = false">X</span>
        </header>
        <p>{{info}}</p>
        <label>输入题目标题<input type="text" v-model="qsInputTitle"></label>
        <label v-if="showAddOptionInput">输入选项<input type="text" v-model="qsInputOptions"></label>
        <div class="btn-box">
          <button size="md" class="yes" @click="validateAddQs">确定</button>
          <button size="md" @click="showAddQsDialog = false">取消</button>
        </div>
      </div>
    </div>
    <div class="shadow" v-if="showDialog">
      <div class="dialog">
        <header>
          <span>提示</span>
          <span class="close-btn" @click="cancel">X</span>
        </header>
        <p>{{info}}</p>
        <div class="btn-box">
          <button class="yes" @click="iterator.next()" >确定</button>
          <button @click="cancel">取消</button>
        </div>
      </div>
    </div>
    <footer>
      <div class="btn-box">
        <button class="save" @click="iterator = save(); iterator.next()">保存问卷</button>
        <button class="issue" @click="iterator = issueQs(); iterator.next()">发布问卷</button>
      </div>
    </footer>
  </div>
</template>

<script>
import storage from '../../store.js'
/**
 * A module that define qs-edit view
 * @exports qs-edit
 * @author oyh(Reusjs)
 */
export default {
  name: 'qsEdit',
  components: {
  },
  data() {
    return {
      isExtra3: false,
      qsItem: {},
      qsList: storage.get(),
      isError: false,
      showBtn: false,
      titleChange: false,
      titleValue: '',
      showAddQsDialog: false,
      showAddOptionInput: true,
      qsInputTitle: '',
      qsInputOptions: [],
      info: '',    //弹出层提示内容
      selectTime: '',
      addOptionType: '',
      limit: {},
      showDialog: false,  //是否显示弹出层
      iterator: {},   //当前迭代器
      isGoIndex: false
    }
  },
  beforeRouteEnter(to, from ,next) {
    let num = to.params.num
    let theItem = {}
    if (num != 0) {
      let length = storage.get().length
      if (num < 0 || num > length) {
        alert('非法路由!')
        next('/')
      } else {
        for (let i = 0; i < length; i++) {
          if (storage.get()[i].num == num) {
            theItem = storage.get()[i]
            break
          }
        }
      }
      if (theItem.state === 'noissue') {
        next()
      } else {
        alert('非法路由')
        next('/')
      }
    } else {
      next()
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.limit = { 
          minYear: new Date().getFullYear(),
          minMonth: new Date().getMonth() + 1,
          minDay: new Date().getDate(),
          maxYear: 2030,
          maxMonth: 3,
          maxDay: 20
        }
      if (this.$route.params.num == 0) {
        let item = {}
        item.num        = this.qsList.length + 1
        item.title      = '这里是标题'
        item.time       = ''
        item.state      = 'noissue'
        item.question   = []
        item.stateTitle = '未发布'
        item.checked    = false
        this.qsItem = item
        this.qsList.push(this.qsItem)
      } else {
        let i = 0
        for (let length = this.qsList.length; i < length; i++) {
          if (this.qsList[i].num == this.$route.params.num) {
            this.qsItem = this.qsList[i]
            break
          }
        }
        if ( i === this.qsList.length) this.isError = true
      } 
    },
    getMsg(item) {
      let msg = ''
      if (item.type === 'radio') {
        msg = '(单选题)'
      } else if (item.type === 'checkbox') {
        msg = '(多选题)'
      } else {
        msg = '(文本题)'
      }

      return item.isNeed ? `${msg} *` : msg
    },
    onblur() {
      this.titleValue = this.titleValue.trim()
      this.qsItem.title = this.titleValue === '' ? this.qsItem.title : this.titleValue
      this.titleChange = false
    },
    onsubmit() {
      this.titleValue = this.titleValue.trim()
      this.qsItem.title = this.titleValue === '' ? this.qsItem.title : this.titleValue
      this.titleChange = false
    },
    titleClick() {
      this.titleChange = !this.titleChange
      setTimeout( () => {
        this.$refs.titleInput.focus()
      }, 150 )
    },
    swapItems(oldIndex, newIndex) {
      let [newVal] = this.qsItem.question.splice(newIndex, 1, this.qsItem.question[oldIndex])
      this.qsItem.question.splice(oldIndex, 1, newVal)
    },
    goUp(index) {
      this.swapItems(index, index - 1)
    },
    goDown(index) {
      this.swapItems(index, index + 1)
    },
    copy(index, qs) {
      if (this.questionLength === 10) return alert('问卷已满！')
      qs = Object.assign({}, qs)
      this.qsItem.question.splice(index, 0, qs)
    },
    del(index) {
      this.qsItem.question.splice(index, 1)
    },
    addItemClick() {
      if (this.showBtn === false) {
        this.questionLength === 10 ? alert('问卷已满！') : this.showBtn = !this.showBtn
      } else {
        this.showBtn = !this.showBtn
      }
    },
    showAddDialog(msg, showOption) {
      this.showAddQsDialog = true
      this.showAddOptionInput = showOption
      this.info = msg
      this.qsInputTitle = ''
      this.qsInputOptions = ''
    },
    addRadio() {
      if (this.questionLength === 10) return alert('问卷已满！')
      this.showAddDialog('分别在下面的输入框中输入问题的名称以及选项, 选项用半角逗号","分隔开', true)
      this.addOptionType = 'radio'
    },
    addCheckbox() {
      if (this.questionLength === 10) return alert('问卷已满！')
      this.showAddDialog('分别在下面的输入框中输入问题的名称以及选项, 选项用半角逗号","分隔开', true)
      this.addOptionType = 'checkbox'
    },
    addTextarea() {
      if (this.questionLength === 10) return alert('问卷已满！')
      this.showAddDialog('在输入框中输入问题名称', false)
      this.addOptionType = 'textarea' 
    },
    validateAddQs() {
      let qsTitle = this.qsInputTitle.trim()
      if (qsTitle === '') return alert('题目不能为空')
      if (this.showAddOptionInput) {
        let qsOptions = this.qsInputOptions.trim()
        if (qsOptions === '') return alert('选项不能为空！')
        qsOptions = qsOptions.split(',')
        for (let i = 0, length = qsOptions.length; i < length; i++) {
          if (qsOptions[i].trim() === '') {
            return alert('存在某个选项内容为空')
          }
        }
        this.qsItem.question.push({
          'num': this.qsItem.question.length - 1, 
          'title': qsTitle, 
          'type': this.addOptionType,
          'isNeed': true,
          'options':qsOptions
        })
        this.showAddQsDialog = false
      } else {
        this.qsItem.question.push({
          'num': this.qsItem.question.length - 1,
          'title': qsTitle,
          'type': 'textarea',
          'isNeed': true
        })
        this.showAddQsDialog = false
      }
    },
    getValue(selectTime) {
      this.selectTime = selectTime
      this.qsItem.time = this.selectTime
    },
    *save() {
      this.showDialog = true
      this.info = '确认保存?'         
      yield       //yield 表达式，生成器的代码将被暂停运行，直到生成器的 next() 方法被调用
      if (this.qsItem.question.length === 0) {
        this.showDialog = false
        alert('问卷为空无法保存')
      } else {
        storage.save(this.qsList)
        this.info = '是否发布?'
        this.isGoIndex = true
      }
      
      yield
      this.qsItem.state = 'inissue'
      this.qsItem.stateTitle = '发布中'
      storage.save(this.qsList)
      this.showDialog = true
      this.info = '问卷发布成功，是否配置任务?'

      yield

      this.$router.push({path:'/project_info/mission_info'})

    },
    *issueQs() {
      this.showDialog = true
      this.info = '确认发布?'
      yield
      if (this.qsItem.question.length === 0) {
        this.showDialog = false
        alert('问卷为空无法保存')
      } else {
        this.qsItem.state = 'inissue'
        this.qsItem.stateTitle = '发布中'
        storage.save(this.qsList)
        this.showDialog = true
        this.info = '问卷发布成功，是否配置任务?'
      }
      
      yield
      this.$router.push({path:'/project_info/mission_info', query:{isExtra3:true}})
    },
    cancel() {
      this.showDialog = false
      if (this.isGoIndex === true) {
        this.$router.push({path:'/project_info/answer_info/list'})
      }
    }
  },
  computed: {
    questionLength() {
      return this.qsItem.question.length
    }
  },
  watch: {
    '$route': 'fetchData',
    qsItem: {
      handler(newVal) {
        newVal.question.forEach( (item, index) => {
          item.num = `Q${index + 1}`
        } )
      },
      deep: true
    }
  }
}
</script>

<style>
.edit-container {
  padding: .5em;
  color: #666;
  background-color: #fff;
  border-radius: .4em;
  box-shadow: 0 0 1em #aaa;
}
.edit-container input[name="qsTitle"] {
  height: 6em;
  width: 100%;
  margin-bottom: 3em;
  text-align: center;
  border: 1px solid #ccc;
  background-color: #ccc;
}
.edit-container h3{
  height: 3em;
  line-height: 3em;
  text-align: center;
  color: #555;
  cursor: pointer;
}
.edit-container h3:hover {
    background-color: #fcf0e5;
}
.content {
  padding: 3em;
  border-top: .2em solid #ccc;
  border-bottom: .2em solid #ccc;
}
.questions {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 1.5em 2em;
  margin-bottom: 2em;
}
.questions:hover {
  background-color: #fcf0e5;
}
.questions p {
  margin-top:  1.5em;
  margin-bottom: 1.5em;
}
.questions textarea {
  width: 35em;
  height: 15em;
  margin-left: 2.5em;
}
.qs-title {
  font-weight: 700;
  color: #333;
}
.option {
  margin-left: 2.5em;
}
.qs-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20em;
} 
.qs-right label {
  margin-top: 2em;
  margin-bottom: 2em;
}
.qs-right p {
  bottom: 1em;
}
.qs-right p span{
  cursor: pointer;
}
.qs-right p span:hover {
  color: #009AFF;
}
.add {
  border: .2em solid #ccc;
  }
.add-option {
  height: 8em;
  line-height: 8em;
  text-align: center;
}
.add-option button {
  height: 3em;
  width: 8em;
  margin-left: 4em;
  border: .2em solid #ccc;
  background-color: #eee;
  cursor: pointer;
}
.add-option button:hover {
  box-shadow: 0 0 .4em #aaa;
}
.add-item {
  height: 8em;
  line-height: 8em;
  text-align: center;
  background-color: #eee;
  cursor: pointer;
}
footer {
  position: relative;
  height: 6em;
  margin-top: 3em;
  line-height: 6em;
}

.slide-enter-active, .slide-leave-active {
  transition: all .5s;
}
.slide-enter-active {
  height: 8em;
}
.slide-enter, .slide-leave-active {
  opacity: 0;
  height: 0;
  transform: translateY(-3em);
}
.edit-container button {
  width: 7em;
  height: 2.5em;
  padding-top: .3em;
  padding-bottom: .3em;
  line-height: 100%;
  color: #777;
  border: 1px solid #555;
  border-radius: .2em;
  background-color: #fff;
  cursor: pointer;
 }
.shadow {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: rgba(85, 85, 85, .7);
}
.add-qs-dialog, 
.dialog {
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
.add-qs-dialog {
  height: 28em;
}
.dialog header,
.add-qs-dialog header{
  height: 5em;
  padding-left: 3em;
  padding-right: 3em;
  line-height: 5em;
  border-radius: .5em .5em 0 0;
  background-color: #009AFF;
  color: white;
}
.dialog header span:nth-of-type(1),
.dialog header span:nth-of-type(2),
.add-qs-dialog header span:nth-of-type(1),
.add-qs-dialog header span:nth-of-type(2)
{
  font-size: 1.5em;
}
.close-btn {
  position: absolute;
  right: 3em;
  color: #fff;
  cursor: pointer;
}
.close-btn :hover {
  color: #bbb;
}
.add-qs-dialog p,
.dialog p {
  margin: 2em;
  font-size: 1.3em;
}
.shadow label {
  display: block;
  font-size: 1.2em;
  margin-left: 3em;
  margin-bottom: 2em;
}
.shadow label :nth-of-type(2) {
  margin-left: 5.7em;
}
.shadow label input {
  margin-left: 1em;
}

.edit-container .shadow .btn-box {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 6em;
  text-align: center;
  line-height: 6em;
}
footer .btn-box{
  position: absolute;
  right: 2rem;
  display: inline-block;
}
/* .yes {
  margin-right: 1em;
  color: #fff;
  background-color: #ee7419;
  border: 1px solid #ee7419;
}
.yes:hover {
  box-shadow: 0 0 5px #ee7419;
} */



</style>