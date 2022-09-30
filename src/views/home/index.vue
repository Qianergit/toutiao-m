<template>
  <div class="home-container">
   <van-nav-bar class="page-nav-bar" fixed>
    <van-button
    class="page-search"
    slot="title"
    size="small"
    icon="search"
    round
    >
      搜索
    </van-button>
   </van-nav-bar>
   <!-- 滑动标签部分 -->
  <van-tabs v-model="active" animated swipeable class="channel-tabs">
  <van-tab :title=obj.name
   v-for="obj in channelList" 
   :key="obj.id">
   <article-list :channels='obj'/>
   </van-tab>
 
  <div class="placeholder" slot="nav-right"></div>
  <!-- 汉堡按钮 -->
  <div slot="nav-right" class="hanberge_btn" @click="isChannelsshow=true"> 
    <i slot="icon" class="toutiao toutiao-gengduo"></i>
  </div>
  </van-tabs>
  <!-- 弹出层 -->
<van-popup
  v-model="isChannelsshow"
  closeable
  position="bottom"
   close-icon-position="top-left"
  :style="{ height: '100%' }"
 
>
<channel-edit :mychannel="channelList" 
:active=active 
 @upDateactive="Changeactive">

</channel-edit>
</van-popup>

   </div>

</template>

<script >
 import {getUserChannelsAPI} from '@/Api'
 import ArticleList from './components/article-list'
 import channelEdit from './components/channel-edit.vue'
 import {mapState} from 'vuex'
 import {getItem} from '@/utils/storage'
export default {
 
name:'HomeIndex',
data(){
  return{
  active:0,
  channelList:[],
  isChannelsshow:false
  }
},
components:{
  channelEdit,
ArticleList
},
computed:{
  ...mapState(['user'])
},
created(){
  this.getChannel()
},
methods:{
  async getChannel(){
    let channel =[]
    try{
      if(this.user){
       const {data}= await getUserChannelsAPI()
       channel=data.data.channels
      }else{
        const localstoragelist=getItem('TOUTIAO_CHANNEL')
        if(localstoragelist){
          channel=localstoragelist
        }else{
           const {data}= await getUserChannelsAPI()
           channel=data.data.channels
        }
      }
    this.channelList=channel
    }catch(err){
      this.$toast('获取用户频道失败')
    }
  },
  Changeactive(index,unshow){
    console.log('aaa')
    this.active=index
    this.isChannelsshow=unshow
  }
}
}
</script>

<style lang="less" scoped>
 .home-container{
  padding-top:174px ;
  padding-bottom: 100px;
  /deep/ .page-nav-bar{
    .van-nav-bar__title{
      max-width: unset;
    }
     background-color:  #3296fa;
    .page-search{
    width: 555px;
    height: 64px;
    background-color:#5babfb;
    border: none;
    font-size: 28px;
    color: #fff;
    .van-icon{
      font-size: 40px;
    }
    }
  }
  /deep/ .channel-tabs{
     .van-tabs__wrap{
      position: fixed;
      left: 0;
      right: 0;
      top: 92px;
      z-index: 1;
      height:82px;
      
    }
    .van-tab{
        border-right: 1px solid #edeff3;
        min-width: 200px;
       font-size: 28px;
       color: #777;
       }
       .van-tab--active{
        font-size: 30px;
        color: #333333;
       }
       .van-tabs__nav--line{
        padding-bottom: 0;
       }
    .van-tabs__line{
      bottom: 8px;
      width: 31px;
	    height: 6px;
	    background-color: #3296fa;
      border-radius: 3px;
    }
      .placeholder{
       width:66px ;
       height: 82px;
       flex-shrink:0;
    }
     .hanberge_btn{
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      right: 0;
      width:66px ;
      height: 82px;
      background-color: #ffffff;
	    opacity: 0.9;
    i.toutiao{
      font-size: 33px;
    }
    &:before{
      content: "";
      position:absolute;
      left: 0;
      width: 2px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  
  }
  }
 
}

</style>