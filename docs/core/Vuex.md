vue在进行组建开发过程中，本组建直接操作数据实现数据绑定，父子组件传递通过传参和外传方式传递，在多层组件和同级组件开发过程中，小范围数据状态管理使用vue-bus，或者直接自行建立一个全局变量进行操作。vue的数据通信有时候还是很令人崩溃的。

在进行更大范围vue状态管理或者数据管理时，就可以使用vuex，官方提供的vue集中式状态管理工具了。所以，如果你的应用很简单，就不要用vuex。

# 安装使用
直接使用命令进行安装 npm install vuex --save

然后在main.js中加入包的使用：

```
import vuex from 'vuex'
Vue.use(vuex);
var store = new vuex.Store({//store对象
    state:{
        count:0
    }
})

new Vue({
  el: '#app',
  router,
  store,//使用store
  template: '<App/>',
  components: { App }
})
```

然后就可以在需要的地方使用 $store.state.count 了。

当然这是最最简单的应用，数据模块拆分比较多，想看起来结构清晰的话，也可以进行拆分，拆分之前，先理解了解下vuex里面的核心概念。

# 核心概念

任何状态管理或者数据存储的工具，无非就是分为把数据存进去的过程，数据本身，数据输出展示过程，vuex也不例外。上个图，可能跟想象的不太一样

![image](https://vuex.vuejs.org/vuex.png)

存储过程：

Actions，数据存储进去的前置，操作Mutation，可忽略。

Mutation，唯一可以直接操作State的部分。

数据本身：

State，就属于存储的数据本身了。

Getter，State数据本身可以通过计算进行衍生的数据。

数据取出展示：

数据取出部分就直接在需要的板块进行使用就可以了。通常会在组件的计算属性computed中可以进行进一步过滤操作，然后输出到页面上来。

其他：

Module，vuex由于使用的是单一状态数结构，数据较多时，进行模块拆分时使用。对应里面的所有的部分 state，getter，action，mutation都可以拆分到模块里面去。

了解完核心概念之后，针对复杂应用，我们就可以把store拆掉了。在src文件夹下面新建store文件夹，下方将vuex的每个模块都进行拆分，因为每个模块都有可能会有一大堆数据。

```
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import add from './module/add'

Vue.use(Vuex)
export default new Vuex.Store({
	state,
	mutations,
	modules: {
		a:add
	}
})
```
对应main.js的引用就变化了。

```
import store from './store'

new Vue({
  el: '#app',
  router,
  store,//使用store
  template: '<App/>',
  components: { App }
})
```

对应的文件结构就变成如下

![image](https://notes.tingno.com/wp-content/uploads/2018/09/微信截图_20180930104047.png)

下面是里面细节板块的使用了。

# State
state属于数据中心，内容来源数据初始化，变更来自于mutations，读取的话，通常使用computed属性进行读取。state里面内容变更后会触发计算属性重新获取，并且同步渲染到页面中。

```
// 创建一个 Counter 组件
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```

多条state读取的时候，引入mapState辅助函数。使用之前要import。
然后在需要的时候直接引入一个数组。

```
computed: {
  ...mapState(['count'])
}
```
如果引入的元素需要过滤的话，就可以单独处理。

这里要提供一个初始化时候来源数据，可以拓展很多东西，比如来自localStage,database等等。

# Getter
Getter是State元素的派生元素。跟vue里面的computed功能差不多。某些通过计算或者过滤State里面的元素就可以得到的元素，就可以直接使用getter来生成。

举个例子，在State里面存储了一堆学生的成绩，这个时候，就可以使用getter设置计算出对应学生的个数，成绩的总和，平均值，几个及格，几个优秀。在添加新的学生成绩之后，对应的这些数值就都会同步的进行刷新。

当然，上面问题会有很多中方式解决这种问题，上面只是举个这个例子。下面代码的案例就todolist案例，state中只存储所有的数据，对应的过滤元素都可以在getter中取得，代码中放一个计算属性是doneTodos就是过滤之后的元素，在展示的时候，直接使用就可以了

设置方法：

```
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

在使用的时候，同State类似，直接使用this.$store.getters.doneTodos，就可以了。

getter取值的时候，也可以传递参数进去。

```
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

这里，针对访问多个计算属性getter也有一个辅助函数，mapGetters。使用方法类似，也要先引用，后加入computed

```
export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

# Mutation 
Mutation是同步操作state改变唯一的区域，这里操作state中间再去操作点其他事情就看你自己了，比如变化同步写入localstage，方便浏览器刷新，state取默认值的时候，就可以使用本地数据了，达到优化体验的效果。

基本用例：
```
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state, n) {
      // 变更状态
      state.count += n
    }
  }
})

store.commit('increment',n)
```

提交的方法可以增加参数，参数就参数，官方非要起个载荷（Payload）的名字，不知道为啥。
需要注意的是，mutations必须是同步的操作。

不过，在mutation里面执行异步操作会怎么样呢？好像也没有发生什么奇怪的事情。官方是建议这么做了。

# Action
在进行多个mutation操作state时，维护起来比较麻烦，就用到了action的功能。action操作的是mutation，而且是可以包含任意的异步操作。


```
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

同样，action也有对应的mapAction辅助函数，功能一样的。

# Module
各种方法，生成，数据较多的时候，方便管理就可以使用Module进行模块的拆分。
```
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```
不过，getter，action，mutation默认情况下都是注册在全局命名下。同名的方法在不同模块下调用，会整体进行响应。然后可以通过namespaced: true，和root:true在模块命名的时候全局的变局部的，局部里面声明全局的，来回折腾。

```
{
  actions: {
    someOtherAction ({dispatch}) {
      dispatch('someAction')
    }
  },
  modules: {
    foo: {
      namespaced: true,

      actions: {
        someAction: {
          root: true,
          handler (namespacedContext, payload) { ... } // -> 'someAction'
        }
      }
    }
  }
}

computed: {
  ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  })
},
methods: {
  ...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar' // -> this['some/nested/module/bar']()
  ])
}

```

由于这一块儿我也没用过，你自行理解吧。更多的还有涉及到动态注册、模块重用等等，插件编写等等。

整个介绍完之后放上官方推荐的文件结构,购物车的例子
```
|── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```

# vue-devtools
vue开发强烈推荐使用的浏览器插件工具。尤其可以看到vuex里面这些元素的变化。并且每一步操作之前产生的影响都可以直观的看出来。回头单独介绍安装使用截图等。

# 文末
到这里，差不多vuex常用的东西都介绍完了。这个能大致了解，就可以去通读vuex的官方文档了。还是要强调，如果你涉及到的数据量比较小，状态管理的东西较少，就不建议使用vuex了。


