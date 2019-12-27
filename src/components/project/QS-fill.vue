<template>
  <div class="fill-container">
    <div class="fill" v-if="!isError">
      <router-link to="/project_info/answer_info/list" tag="span" class="back">&lt; 返回</router-link>
      <h3>{{qsItem.title}}</h3>
      <div class="content">
        <div class="content-item" v-for="item in qsItem.question">
          <p class="qs-title">
            {{item.num}}&nbsp;{{item.title}}&nbsp;{{getMsg(item)}}
          </p>
          <p v-for="option in item.options" class="option">
            <label>
              <input 
              type="radio" 
              :name="`${item.num}-${item.title}`"
              v-model="requiredItem[item.num]"
              v-if="item.type === 'radio'"
              :value="option">
              <input 
              type="checkbox" 
              :name="`${item.num}-${item.title}`"
              v-model="requiredItem[item.num]"
              v-if="item.type === 'checkbox'"
              :value="option">{{option}}
            </label>
          </p>
          <textarea 
          v-if="item.type === 'textarea'" 
          v-model="requiredItem[item.num]"></textarea>
        </div>
      </div>
      <transition name="fade">
        <div class="dialog" v-if="showDialog">
          <div class="submit-dialog" v-if="submitError">
            <header>
              <span>提示</span>
              <span class="close-btn" @click="showDialog = false">X</span>
            </header>
            <p>{{info}}</p>
            <div class="btn-box">
              <button class="yes" @click="showDialog = false">确定</button>
              <button @click="showDialog = false">取消</button>
            </div>
          </div>
          <div class="submit-dialog" v-else>
            <header>
              <span>提示</span>
              <span class="close-btn" @click="showDialog = false">X</span>
            </header>
            <p>{{info}}</p>
          </div>
        </div>
      </transition>  
      <footer>
        <button @click="submit" class="submit">提交</button>
      </footer>
    </div>
    <div class="error" v-else>
      404 Not Found
    </div>
  </div>
</template>

<script>
import storage from '../../store.js'

/**
 * A module that define qs-fill router view
 * @exports qs-fill
 * @author oyh(Reusjs)
 */
  export default {
    name: 'qsFill',
    data() {
      return {
        qsItem: [],
        qsList: storage.get(),
        isError: false,
        showDialog: false,
        info: '',
        submitError: false,
        requiredItem: {}
      }
    },
    created() {
      this.fetchData()
    },
    mounted() {
      // this.getRequiredItem()
    },
    methods: {
      fetchData() {
        let i = 0;
        for (let length = this.qsList.length; i < length; i++) {
          if (this.qsList[i].num == this.$route.params.num) {
            this.qsItem = this.qsList[i]
            break
          }
        }
        if (i === this.qsList.length) this.isError = true
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
      submit() {
        if (this.qsItem.state === 'inissue') {
          let result = this.validate()
          if (result) {
            this.showDialog = true
            this.submitError = false
            this.info = '提交成功！'
            setTimeout(() => {
              this.showDialog = false
            }, 500)
            setTimeout(() => {
              this.$router.push({path: '/'})
            }, 1500)
          } else {
            this.showDialog = true
            this.submitError = true
            this.info = '提交失败！ 存在必填项未填'
          }
        } else {
          this.showDialog = true
          this.submitError = true
          this.info = '提交失败！ 只有发布中的问卷才能提交'
        }
      },
      // getRequiredItem() {
      //   this.qsItem.question.forEach( item => {
      //     if (item.isNeed) {
      //       if (item.isNeed) {
      //         if (item.type === 'checkbox') {
      //           this.requiredItem[item.num] = []
      //         } else {
      //           this.requiredItem[item.num] = ''
      //         }
      //       }
      //     }
      //   } )
      // },
      validate() {
        for (let i in this.requiredItem) {
          if (this.requiredItem[i].length === 0) return false
        }
        return true
      }
    },
    watch: {
      '$route': 'fetchData'
    }
  }
</script>

<style>
.fill-container {
  padding: 2em;
  color: #666;
  background-color: #fff;
  border-radius: .4em;
  box-shadow: 0 0 1em #aaa;
}
.fill-container h3 {
  margin-bottom: 3em;
  text-align: center;
  color: #555;
}
.back {
  cursor: pointer;
}
.back:hover {
  color: #ee7419;
}
.content {
  padding: 3em;
  border-top: .2em solid #ccc;
  border-bottom: .2em solid #ccc;
}
.content-item{
  padding: 1.5em 2em;
}
.content-item:hover {
  background-color: #fcf0e5;
}
.content-item p{
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}
.content-item textarea {
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
footer {
  height: 6em;
  margin-top: 3em;
  text-align: center;
  line-height: 6em;
}
.submit{
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
.submit:hover {
  box-shadow: 0 0 5px #009AFF;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
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
.submit-dialog {
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
.submit-dialog header {
  height: 5em;
  padding-left: 3em;
  padding-right: 3em;
  line-height: 5em;
  border-radius: .5em;
  background-color: #f7f7f7;
}
.submit-dialog header pan:nth-of-type(1) {
  font-weight: 700;
}
.close-btn {
  position: absolute;
  right: 3em;
  color: #fff;
  cursor: pointer;
}
.close-btn:hover {
  color: #bbb;
}
.submit-dialog p {
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
.btn-box button {
  width: 7em;
  height: 2.5em;
  padding-top: .3em;
  padding-bottom: .3em;
  line-height: 100%;
  background-color: #009AFF;
  border: 1px solid #009AFF;
  border-radius: .2em;
  color: #fff;
  cursor: pointer;
  margin: 0 .5em;
}
.btn-box button:hover {
  box-shadow: 0 0 5px #bbb;
}
.yes {
  margin-right: 1em;
  color: #fff;
  background-color: #ee7419;
  border: 1px solid #ee7419;
}
.yes:hover {
  box-shadow: 0 0 5px #ee7419;
}

</style>
