<template>
  <div class="comment-list">
    <van-list
  
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :error="error"
  error-text="加载失败请稍后再试"
  :immediate-check = "false"
>
  
  <commentItem
  @reply-click="$emit('reply-click',$event)"
  v-for="(item,index) in list" 
  :key="index"
  :comment="item"
  />
</van-list>
  </div>
</template>

<script>
import{getcommentsAPI} from '@/Api'
import commentItem from './comment-item.vue';
export default {
  components: { 
    commentItem,
    
    },
name:'CommentList',
props:{
  source:{
    type:[String,Number,Object],
    required:true
  },
  list: {
    type:Array,
    default:()=>[]
  },
  types:{
    type:String,
    default:'a',
    validator(value){
      return ['a','c'].includes(value)
    }
  }
},
data() {
    return {
      loading: false,
      finished: false,
      offset:null,
      limit:10,
      error:false,
    };
  },
  created(){
    this.loading=true
this.onLoad()
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        // 加载状态结束
        // 数据全部加载完成
        try{
        const {data} = await getcommentsAPI({
          type:this.types,
          source:this.source,
          offset:this.offset,
          limit:this.limit
        })
        
        console.log(data)
        this.loading=false
        const {results} = data.data
        this.list.push(...results)
        this.$emit('totalComment',data.data)
        if(results.length){
          this.offset=data.data.last_id
        }else{
          this.finished=true
        }
       }catch(err){
         this.error=true
         this.loading=false
        console.log(err)}
    },
  },
}
</script>

<style>

</style>