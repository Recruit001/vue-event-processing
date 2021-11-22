import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Message } from 'element-ui';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: '',
    nextId: 5,
    btnView: "all"
  },
  mutations: {
    setList(state,list){
      state.list = list
    },
    changeInput(state,value){
      state.inputValue = value
    },
    // 模拟修改数据
    changeList(state){
      let str = state.inputValue.trim()
      if(str == ""){
        Message.error('错了哦，任务不可以为空的');
        return
      }
      const obj = {
        id: state.nextId,
        dome: false,
        content: str
      }
      state.list.push(obj)
      state.inputValue = ''
      state.nextId ++
      Message.success('添加任务成功 ！')
    },
    delectOne(state,id){
      state.list = state.list.filter((item) => {
        return item.id != id
      })
    },
    boxChange(state,id){
      state.list.some(item => {
        if(item.id == id){
          item.dome = !item.dome
          return
        }
      })
    },
    removeF(state){
      state.list = state.list.filter(item => {
        return !item.dome
      })
    },
    allBtn(state){
      state.btnView = "all"
    },
    unBtn(state){
      state.btnView = "un"
    },
    finishBtn(state){
      state.btnView = "finish"
    }
  },
  actions: {
    getData(context){
      axios.get("/data.json").then(({ data }) => {
        context.commit("setList",data)
      })
    }
  },
  getters:{
    unfinished(state){
      return state.list.filter(item => {
        return !item.dome
      }).length
    },
    getList(state){
      if(state.btnView == "all"){
        return state.list
      }
      else if(state.btnView == "un"){
        return state.list.filter(item => {
          return !item.dome
        })
      }
      else{
        return state.list.filter(item => {
          return item.dome
        })
      }
    }
  },
  modules: {
  }
})
