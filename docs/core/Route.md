路由，其实是指向的意思。点按钮跳转到哪里，执行完代码调整到哪里，检测没有登陆调整登陆，保存数据跳转列表，等等等等。应用开发中，路由是必不可少的部分。vue开发尤其是单页面应用的开发中，vue-router作为官方路由管理组件出现，让应用开发更加顺畅。


# 概念
安装完之后，在路由引用中，如何使用，就需要进行页面配置了。配置前先了解基本概念，路由中包含 route,routes,router三个基本元素。

**route**是一条路由，home按钮到home内容是一条路由。about按钮到about内容就是另一条内容。

**routes**是一组路由，多条route形成一个数组。

**router**是路由管理器，是一个管理者。因为上面的route和routes是静态的路由，真正的请求地址来了就需要router来进行管理。

而在vue前端中，关于路由的切换，实际上是各种dom的显示和隐藏。当路由访问home时，其他的元素隐藏。

而判断路由的方式当然主要就通过访问的url了。url变化，对应的内容变化。采用的方式有两种，一种是**hash模式**，也就是键值对的方式，另一种是 **history模式**，也是通过html5的history API的方式。至于两者差别后续再说。

Vue-Router使用到的标签就两个 router-link和router-view。

**router-link**用来做链接，负责显示指向哪里，默认会被渲染成一个a标签。

**router-view**表示显示部分，路由指示完之后，对应的内容就需要显示在需要的区域。

# 安装
其他方式不说，一般默认脚手架工具都会带上。如果没带，直接通过 npm install vue-router 进行包安装就可以了。

包安装完之后，页面中也要进行引用，在页面中就可以进一步开始配置使用了。
```
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```

经常会在src文件夹下面在创建一个router文件夹的index.js，里面放所有的路由配置项，在main中引入该配置。


```
import Vue from 'vue'
import Router from 'vue-router'

//路由需要指向的页面
import Home from "@/pages/Home"

//按需加载的页面
const List =resolve => require(['@/components/List'], resolve);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/list',
            name: 'List',
            component: List
        },
    ],
    // mode:'history'
})

```

在入口文件main.js中将router配置引入，并应用到页面中

```
import router from './router'

new Vue({
  el: '#app',
  router,
  components: { App},
  template: '<App/>'
})
```


# 使用
默认在入口vue中进行定义，第一层的路由，在路由显示标签外部可以放入公用的部分的信息。比如后台管理系统中的顶部菜单和左侧菜单都属于公共部分，无论跳到那一页都会显示,变化的只右侧部分，那结构就会变成下面。

```
<template>
  <div id="app">
    <header></header>
    <main>
        <left>
            <router-link to="/">Go to Foo</router-link>
            <router-link to="/list">Go to Foo</router-link>
        </left>
        <right>
            <router-view></router-view>
        </right>
    </main>
  </div>
</template>
```

根据上面配置信息中页面只用/的话，右侧下方会显示默认的home页面。有没有一种iframe的感觉。而在home页面里面可以进一步嵌套router-view。router-link对照着a标签就行了。

还有就是通过管理器router来进行跳转也可以，我用这个比较多。


```
// Home.vue
export default {
  computed: {
    username () {
      // 我们很快就会看到 `params` 是什么
      return this.$route.params.username
    }
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
```

# 动态路由映射
个人理解，就是路由地址上带参数。
配置的时候使用如下格式：


```
/user/:username
/user/:username/post/:post_id
```

使用的时候格式：

```
/user/a
/user/a/post/221
```

获取参数进行计算的时候使用$route.params获取。

```
$route.params.username
$route.params.post_id
```

> 提示：
> 这里加入从/user/a到/user/b的时候，对于vue来说使用的是一个组件，然后页面就不再重新渲染，没有变化刷新了。这里就需要通过watch监听路由的变化，或者使用专门在vue2.2之后增加的beforeRouteUpdate来进行变化的处理。

# 嵌套路由
实际使用过程中，经常会多层路由嵌套。使用vue-router，通过children配置选项，逐层向下。组件中也通过router-view来进行每个组件的逐层传递。


```
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

# 配置说明
单条路由配置中，很多配置项目这里集中了解下。

- path 最直接跳转的地址
- name 命名路由，给对应的地址起名，方便使用
- component 组件，对应层级中route-view中显示的内容。
- components 同级路由多个内容时使用，需要default
- redirect 跳转链接，地址会变化
- alias 别名，另外起个名字，和path都能访问，内容相同。
- props 默认false，设置true之后，路由带的参数会传递到组件中props选项中。也可以直接传对象或者函数返回值进去。

对于总得路由管理器router来说，就是配置模式：
- mode 默认hash,可以配置history


# 编程式导航
也就是将原来route-link中 to的方式进行路由调整，放到router中进行。
在vue内部的时候，需要通过访问实例调用，也就是 this.$router.push。需要导航到不同的地址，传递不同的参数给push方法就可以了。
方法如下：

```
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})

const userId = 123
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

使用router.go(n)方法可以实现前进后退的功能。+1就前进，-1就后退。没有就失败。

# 路由模式 Hash模式 和History模式 
默认模式是hash模式，通过url上# 号后面内容，进行url与内容的匹配。由于#号之前在url上属于锚链接用来做一个页面不同区域跳转用的，不会造成dom刷新，也就符合vue单页面应用功能，相应的url会比较丑。

要解决比较丑的问题的话，需要使用history模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。但是呢，这个功能需要后端来支持，通过页面重定向将所有的页面跳转都指向index.html页面，来达到页面不变的效果。相应的404页面也就不存在了，因为都执行了index.html了。为了解决这种情况，就需要vue-router来解决这个问题了。vue-router配置里面覆盖所有的情况之后，增加一条404页面的路由，配置格式如下：

```
{ path: '*', component: NotFoundComponent }
```

# 路由懒加载
vue的一个特点就是第一次打开需要把所有的资源都下载下来，然后后续dom操作其实都属于在本地脚本运行。项目如果大的话，第一次加载就很慢，影响体验。
这时候，我们将不同功能的路由对应的组件进行异步加载就可以提高首次加载的效率，其他组价只有页面访问的时候，才异步加载下来。对应代码是在加载的时候，增加一个异步函数就行了。


```
const Foo = () => import('./Foo.vue')
```

> 提示：上述的import语法是webpack2中的动态import语法，使用babel进行转化的话，需要使用syntax-dynamic-import组件。


# 文末
vue-router基本使用方面就这些了，更多的比如导航卫士、路由元信息、过度效果等等，由于我基本上没用过，也就不存在什么理解了。也欢迎有实战案例的同志和大神来讨论。



