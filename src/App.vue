<template>
  <div id="app">
    <el-row>
      <el-input placeholder="请输入任务" :value = "$store.state.inputValue" @input = 'inputChange'></el-input>
      <el-button type="primary" @click = "add">添加事项</el-button>
    </el-row>
   <div class = "table">
     <el-table
         :data="$store.getters.getList"
         style="width: 1000px;margin-top:20px"
         :show-header = 'false'
         border
         row-key="id"
         >
         <el-table-column>
           <template v-slot = "scope">
             <div>
               <el-checkbox :checked = "scope.row.dome" @change = "boxChange(scope.row.id)" >{{ scope.row.content }}</el-checkbox>
               <a href="javascript:;" style = "text-decoration: none; position: absolute; right:30px" @click = 'delectOne(scope.row.id)'>删除</a>
             </div>
           </template>
         </el-table-column>
       </el-table>
       <div class="btn">
         <span style = "font-size: 14px;margin-left: 10px;color:gray;letter-spacing:1px">{{ $store.getters.unfinished }}条剩余</span>
         <el-button-group>
           <el-button :type="$store.state.btnView == 'all' ? 'primary' : 'default'" @click = "allBtn">全部</el-button>
           <el-button :type="$store.state.btnView == 'un' ? 'primary' : 'default'" @click = "unBtn">未完成</el-button>
           <el-button :type="$store.state.btnView == 'finish' ? 'primary' : 'default'" @click = "finishBtn">已完成</el-button>
         </el-button-group>
          <a href="javascript:;" style = "text-decoration: none;margin-right: 30px;font-size: 14px;" @click = "removeF">清楚已完成</a>
       </div>
   </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      false: false
    }
  },
  methods:{
    inputChange(e){
      this.$store.commit("changeInput",e)
    },
    add(){
      this.$store.commit("changeList")
    },
    delectOne(id){
      this.$store.commit("delectOne",id)
    },
    boxChange(id){
      this.$store.commit("boxChange",id)
    },
    removeF(){
      this.$store.commit("removeF")
    },
    allBtn(){
      this.$store.commit("allBtn")
    },
    unBtn(){
      this.$store.commit("unBtn")
    },
    finishBtn(){
      this.$store.commit("finishBtn")
    }
  },
  created(){
    this.$store.dispatch('getData')
  }
}
</script>

<style lang="less" scoped >
  /deep/ .el-input{
    width:1000px;
    margin-right: 20px;
  }
  .el-checkbox{
    color:gray;
  }
  .btn{
    width: 1000px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    border:1px solid rgb(235, 238, 245);
    border-top-width: 0px;
  }
</style>
