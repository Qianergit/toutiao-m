<template>
  <div class="channel-Edit">
    <van-cell>
        <div slot="title" class="title-txte">我的频道</div>
        <van-button 
        class="edit-btn"
        size="mini"
        type="danger"
        plain
        @click="isEdit=!isEdit"
        round>{{isEdit? '完成':'编辑'}}</van-button>
    </van-cell >
    <van-grid :gutter="10" class="my-gird">
    <van-grid-item 
    class="grid-item"
    v-for="(value,index) in mychannel" 
    :key="index" 
    @click="onMychannelClick(value,index)"
    >
    <!-- 下面是小叉号 -->
     <van-icon slot="icon" 
     name="clear"
     v-show="isEdit && !fiexchannel.includes(value.id)"
     ></van-icon>
     <!-- 这个是文字的插槽 -->
    <span 
    slot="text"
     class="text"
     :class="{active:index===active}"
     >{{value.name}}</span>
    </van-grid-item>

    </van-grid>
    <!-- 频道推荐 -->
      <van-cell class="recommend-grid"> 
        <div slot="title" class="title-txte">频道推荐</div>
    </van-cell>
     <van-grid :gutter="10">
    <van-grid-item 
    class="grid-item"
    v-for="(value,index) in recommendChannels" 
    :key="index" 
    icon="plus"
    @click="addchannels(value)"
    >
    <span slot="text" class="text">{{value.name}}</span>
    </van-grid-item>
    </van-grid>
     <!-- 频道推荐 -->
  </div>
</template>

<script>
import {getAllchannellistAPI , addUserChannelAPI} from '@/Api'
import {mapState} from 'vuex'
import {setItem} from '@/utils/storage'
import { deleteUserChannel } from '@/Api/article'

export default {
name:'channelEdit',
data(){
    return{
        allchannel:[],//所有的频道
        isEdit:false,
        fiexchannel:[0]
    }
},
props:{
    mychannel:{
          type:Array,
          required:true
    },
    active:{
        type:Number,
        required:true
    }
},
created(){
    this.getallchannel()
},
computed:{
    ...mapState(['user']),
    //这里是对比数据的时候使用的计算属性
    //使用filter方法做简化
    recommendChannels(){ //这里逻辑主要是要分清从谁的身上去遍历
        return this.allchannel.filter(channel=>{
           return !this.mychannel.find(mychannnel=>{
               return mychannnel.id===channel.id
            })
        })
    }
    // recommendChannels () {
    //  const commendchannel=[]
    // this.allchannel.forEach(channel=>{
    //        const ret =this.mychannel.find(mychannel=>{
    //         return mychannel.id===channel.id
    //        })
    //        //这里取反就是我的频道中不包括上面筛选出来的内容然后push成一个新的数组
    //      if(!ret){
    //         commendchannel.push(channel)
    //      }
    // })
    // //计算属性需要返回结果并且计算属性使用时之恶使用这个方法的名
    // return commendchannel
    // }
},
methods:{
    async getallchannel(){ //这里是请求全部频道的方法
        try{
          const {data} = await getAllchannellistAPI()
          console.log(data)
          this.allchannel=data.data.channels
        }
          catch(err){
            console.log(err)
          }
    },
    async addchannels(channel){ //这个是添加频道的方法
        this.mychannel.push(channel)
        if(this.user){
        try{ 
            await addUserChannelAPI({ //这里是解决数据的存储问题
                id:channel.id,
                seq:this.mychannel.length
            })
            }catch(err){
            console.log(err)
              this.$toast('请求失败')
           }
        }else{
          setItem('TOUTIAO_CHANNEL',this.mychannel) //这里是未登录的时候的存储
        }
    },
    onMychannelClick(value,index){ //这里是切换编辑和切换的状态的方法
        if(this.isEdit){
            if(index<=this.active){
             this.$emit('upDateactive',this.active-1,true)  
            }
           this.mychannel.splice(index,1) //这里是删除频道的数据代码
           //处理持久化
           deleteUserChannel(value.id)
            
        } else{
            this.$emit('upDateactive',index,false)
        }
    },
    async deleteUserChannel(channelid){ //处理持久化删除的封装的函数
        try{
             if(this.user){
            await deleteUserchannelAPI(channelid)
             }else{
              setItem('TOUTIAO_CHANNEL',this.mychannel)
             }
        }catch(err){
            this.$toast('删除失败')
        }
        
    }
    
}
}
</script>

<style lang="less" scope>
.channel-Edit{
    padding:85px 0;
    .title-txte{
        font-size: 32px;
    }
    .edit-btn{
        width:103px;
        height: 48px;
        font-size: 26px;
        color: #f85959;
        border: 1px solid #f85959;
    }
    .grid-item{
    .grid-item van-grid-item{
       border-radius: 6px;
    }
   
    .van-icon-clear{
        position: absolute;
        color: #a1a5a5;
        right:-2px;
        top: -3px;
        font-size: 0.4rem;
    }
        .van-grid-item__content{
        white-space: nowrap;
        flex-direction: row;
    width: 160px;
        height: 86px;
        background-color: #f4f5f6;
        .van-grid-item__icon-wrapper{
            position: unset;
        }
        .van-icon-plus{
            font-size: 24px;
            margin-right: 6px;
        }
        .van-grid-item__text{
            margin-top: 0;
        }
    }
    .van-grid-item__text,.text{
        font-size: 28px;
        color: #222;
       
    }
    .active{
        color: #f85959;
    }
  
   }
  
}

</style>