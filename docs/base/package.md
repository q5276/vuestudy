前端组件化是现在前端框架中一个非常重要的思想元素，将页面内容进行拆分之后，可独立维护，可复用性大大提高。哪个地方出问题，直接去修改的对应的组件即可。团队人员配置多的时候，你写你的header，我写我的footer。相互不影响，不冲突。而组件的合理拆分，也就变成了衡量水平的一个维度之一。

vue将前端的html+css+js文件都放到一个文件中 .vue里面。封装格式如下

HTML （结构）：被VUE封装在template中

CSS（样式）：对应style

JavaScript：对应script

# 组件基础
虽然官方提供了直接使用Vue的component方法可以直接全局注册组件，可能我层次还没有达到这个层次，所有这样用的很少，不过还是写上：

```
Vue.component('button-counter', { 
    data: function () {   
        return {
            count: 0
        } 
    }, 
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
    }
)
```

一般都是局部注册vue文件，先对应的template,script,style区域都先写上。官方对应的案例进行改造之后就变成：

```
<template>
    <button v-on:click="count++">You clicked me {{ count }} times.</button>
</template>
<script>
export default {
    name:'ButtonCounter',
    data(){
        return {
            count:0
        }
    }
}
</script>
<style>
</style>
```
一些公司团队还会有规范，所有的vue组件都放在component文件夹下面再建一个组件的的文件夹，然后用index.js文件去引用对应的index.vue。这样看起来更加和谐一点。对应的开发目录下的组件文件结构变成

src->component->ButtonCounter->index.vue+index.js

然后在需要调用页面的脚本中，引入这个组件：
```
import ButtonCounter from "@/component/ButtonCounter"
```
页面中也要加载对应的组价
```
components:{ButtonCounter }
```
这样就可以在template里面使用这个组件了。需要的地方直接加
```
<button-counter></button-counter>
```
注意：引用组件的时候都使用驼峰命名，在组件使用的地方要转化成拆分驼峰变小写，中间用横杠链接。

# 组件复用
vue的组件都可以复用，同一个页面可以多次使用同一个组件，而且相互不受影响。做过面向对象开发的有没有很熟悉。这样我们就可以把一些常用公用的部分进行组件化拆分剥离出来，单独去制作更加牛叉的组件。很多团队都已经干了这些事情了。比如element-ui，iview，youzan，d2，ant等等，都可以把他们的代码下载下来看看。或者在npm里面直接安装，参照官方文档直接调用，做项目开发的时候事半功倍，重要的是颜值还很不错。这些组件都属于全局注册的组件了，都可以直接进行调用的。上个图：

![image](http://timg01.bdimg.com/timg?pacompress&imgtype=0&sec=1439619614&autorotate=1&di=d321103fc8707615ccdac074cb801538&quality=100&size=b870_10000&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2F4e42ad41ae6a8b412aa616afe8d0cb96.png%40wm_2%2Ct_55m%2B5a625Y%2B3L1Rpbmdub%2BiusA%3D%3D%2Cfc_ffffff%2Cff_U2ltSGVp%2Csz_17%2Cx_11%2Cy_11)

其实说白了，就是想用直接引用就行了。官方强调很多，只是说明框架很厉害而已。

# 单个根元素
就是说template下面只能有一个根元素，比如div，h1，span,p等等。不允许使用类似下面的形式。反正你直接再包一层dom就行了，div或者其他组件都可以。
```
<tempalte>
    <h1></h1>
    <div class="content"></div>
</tempalte>
```
组件间消息传递
在一个A组件中引入了B组件，那么A就是父组件，B就是子组件。大部分时候为了减少组件之间的相互影响，组件里面的内容都会有引入值和默认值。在组件生成时候，直接在组件上进行对象的赋值，就可以将值从父元素传递到子元素，子元素通过 props 选项进行接收，就可以直接在子组件中使用了。

比如前面提到的例子中增加选项：
```
<button-counter defaultValue="10"></button-counter>
```
并在子组件中进行接收，接收的同时设置默认值，用于处理组件没有传值的情况。
```
props:{
    defaultValue:{
        type: Number,
        default: 0
    }
}
```
这样就可以直接使用传递进来的值了，这也就实现了 父传子 传值的过程。

而子传父的传值，vue并没有一个很方便的参数去直接发起，而是通过$emit进行事件调用来做的。

在更更基础的文章中，有讲绑定事件的说明。绑定事件之后，对应的方法中使用$emit来使父元素调用事件，并且在后面跟上需要传递的参数，后面可以带多个参数。
```
handleClick(val){
    this.$emit('change',val);
}
```
对应的父组件使用的时候，也要填写上组件注册事件方法，使用 @change对应，等号后面是父组件里面接收事件的一个方法。
```
<button-counter defaultValue="10" @change="parentHandleFunction"></button-counter>
```
这样就完成了一个 子传父 传值的过程，顺便 子传父传递方法也实现了。

另外，还有一个就是父组件想要主要执行子组件的方法的时候，使用 ref（关键字） 先绑定对应的组件，然后就可以在父元素里面通过refs进行使用了。举个栗子,比如父组件引入了子组件的表单，保存之前需要先校验子组件是否合格，检查子组件数据完整性当然在子组件来方法书写了，那父组件想使用的话，使用下面的方法：
```
this.$refs['fom'].validate();
```
这样整个父子之间值与方法传递的过程就实现了。

### 更复杂的情况

涉及到三四代的数据传递或者兄弟传值的话，一层一层传递也是可以的，只不是比较麻烦。对应的可以使用vue Bus的解决方案，更加复杂的可以使用vuex这个组件来进行全局状态管理，都是可以的。根据需要了

![image](http://timg01.bdimg.com/timg?pacompress&imgtype=0&sec=1439619614&autorotate=1&di=48b8c454f2a0ed7b4059cce2106251a3&quality=100&size=b870_10000&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2F983ea11f68f23d6a3229e13eafea6dc7.png%40wm_2%2Ct_55m%2B5a625Y%2B3L1Rpbmdub%2BiusA%3D%3D%2Cfc_ffffff%2Cff_U2ltSGVp%2Csz_34%2Cx_22%2Cy_22)

### 小特例

再进行实际开发的过程中遇到一个关于父子传递和深浅拷贝的问题。就是父传子的过程，根据实际使用，vue采用的是浅拷贝的方式进行传值。当父组件向子组件传递了一个对象的时候，子组件拿到的是一个浅拷贝的对象，任何的调整，修改完之后的数据就不需要再进行子传父，父元素直接取对应对象里面的值也是可以的。

# 组件插槽
组件插槽可以把他理解为一个方便传递html类型的参数就行了。在一些组件开发中，其实很多内容都是父元素决定的，举个栗子：开发了个card组件，我们定义的只是这个外框，阴影，圆角之类的元素，主要内容还是父元素来提供。虽然可以通过传参传一大片东西进去，但是不方便。另外，如果我们传递的这一大堆东西里面也有很多组件就麻烦了。这里就需要用到 <slot></slot> 在子组件里面占个位子。当然solt中间也可以填一个内容，这个内容就是默认值了。父组件传递的时候直接在闭合框中间加内容就可以了。
```
<button-counter defaultValue="10" @change="parentHandleFunction">
```
这个中间就是插槽的内容了，随便填
```
</button-counter>
```
更复杂的插槽使用案例，请自行查阅官方文档学习。

# 文末
到这里，开发一般的组件，差不过够用了。更加厉害的组件开发可以详细学习官方文档和大神源码。

相信迎娶白富美走上人生巅峰离你不远了……