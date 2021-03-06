---
sidebar: auto
prev: ./es6
next: ./file

---

VUE学习并使用一段时间，虽然不能像大神一样开发一个前端框架，但是适当总结下学习成果还是很有必要的，然后共同学习，共同进步。本文罗列VUE的基础语法和DEMO。

VUE最新版脚手架安装教程：

# 文本
用的最多的地方就是使用双括号 {{ }}，中间放上需要绑定的值，就可以实现双向绑定。

```
<template>
    <div>
        <p>hello {{world}}</p>
        <p v-text="'hello ' + world"></p>
        <p>{{`hello ${world}`}}</p>
        <p v-text="`hello ${world}`"></p>
        <button @click="world='ziksang'">改变wrold值</button>
     </div>
</template>

<script>

export default {
     data () {
         return {
              world : "world"
         }
     }
}

</script>

```

以上是实现文本模版的四种写法
第一种是双括号写法
第二种是采用v-text的指令写法
第三种是双括号加es6的模版字符串
第四种是v-text指令加es6的模版字符串

tips:模版字符串是es6为了解决传统字符串拼接过程繁琐过程引入的新特性，使用反引号括上，可以方便处理字符串，设置多行，嵌入变量。

# v-once单次渲染指令
使用v-once指令标记过的下属元素只在第一次渲染元素的时候进行渲染，然后缓存下来，后续渲染过程就自动跳过子元素并不再更新，一般用来优化性能。

```
<!-- 单个元素 -->
<span v-once>This will never change: {{msg}}</span>
<!-- 有子元素 -->
<div v-once>
  <h1>comment</h1>
  <p>{{msg}}</p>
</div>
<!-- 组件 -->
<my-component v-once :comment="msg"></my-component>
<!-- `v-for` 指令-->
<ul>
  <li v-for="i in list" v-once>{{i}}</li>
</ul>
```

但是官方也提示了，少用。

> 试着不要过度使用这个模式。当你需要渲染大量静态内容时，极少数的情况下它会给你带来便利，除非你非常留意渲染变慢了，不然它完全是没有必要的——再加上它在后期会带来很多困惑。例如，设想另一个开发者并不熟悉 v-once 或漏看了它在模板中，他们可能会花很多个小时去找出模板为什么无法正确更新。



# v-html 普通HTML插入
v-html指令用来插入元素的innerHTML。默认直接使用双括号和v-text进行赋值的时候，html的内容会作为文本进行输出，显示所有的标签。

```
<div v-html="html"></div>
```

tips:使用v-html指令只是普通的进行html的输出，并不解析vue模版标签。想要使用vue模版标签，可以考虑通过创建一个组件来进行替代。

tips:在页面上渲染html是危险的操作，因为可能造成XSS攻击,只在可信内容上使用标签。

# 属性
进行数据绑定的时候，标签中间的内容使用双括号，但是类似a标签上的href之类标签上的属性值，vue使用v-bind:href进行传入值的。缩写只要写 :href就可以了。

```
<a :href='href'>href</a>
```

无论是标签还是向组件内部传输数据，都采用这种形式。另外，如果不是不需要绑定的值的话，而是一个纯静态的值的话，就可以直接使用 href=""就可以。也就是说，需要的值是从vue声明的，需要加冒号。

# JS表达式
{{}}和:进行赋值绑定的时候，可以使用JavaScript表达式，可以让代码更简洁，更清晰。比如三元运算符。

```
<p>{{ count < 0 ? '+' : '-'}} {{count + 1}}</p>
```

# 修饰符
修饰符 (Modifiers) 是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：

```
<form v-on:submit.prevent="onSubmit">...</form>
```

# 缩写
没啥好讲，就是个语法糖，直接看案例
```
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>

<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>
```

（语法糖：什么鬼东西？就是省事儿的写法，也可以减少报错。）

# 文末

（之前所在公司有写SOP的习惯，而且是那种巨细无比的SOP，这样下一位同事来用的时候，就不至于迷茫，还是推荐坚持下的。这里吐槽下某些公司写的SOP，写了等于没写。还要找人再来指导一遍。也吐槽某些员工，看到长篇幅的文本就不看自行开始脑子里面排斥：我看不懂，我看不懂，我看不懂……）