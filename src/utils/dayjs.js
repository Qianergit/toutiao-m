import dayjs from 'dayjs'
import Vue from 'vue'

import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
    //定义的过滤器是一个全局可用的方法但是只能在模板使用
    //参数一过滤器名称
    //参数二是过滤器函数
    //使用方式：{{表达式|过滤器名称}}
    //管道符前面带表达式结果会作为参数传到过滤器函数中
    //过滤器的返回值会渲染到使用过滤器的模板位置
Vue.filter('relativeTime', value => {
        return dayjs().to(dayjs(value)) // 31 年前

    })
    //全局使用
dayjs.locale('zh-cn')