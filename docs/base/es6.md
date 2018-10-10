---
sidebar: false
---

JavaScript发展至今，从ES5到ES6可以说实现了跨越式的进步。从原来的脚本语言，变成了可以做面向对象编程的编程语言。虽然原来也可以通过各种模拟的方式实现，但是实现起来已经不是常人可以理解的程度了。

![image](http://upload-images.jianshu.io/upload_images/1504317-805392e6d4ad6f43.jpg)

ES6从常变量、作用域、字符串、数值、数组、函数、对象、数据类型、异步处理等等方面都进行了升级。下面我们来逐一分解梳理。
（这里感谢阮一峰大神的ECMAScript 6 入门，建议大家详细通读下）

# let const var与作用域
ES6之前的版本没有作用域的，一个var搞定。但是有利有弊。如果在块儿内var声明了变量，代码外面仍然是可见的。es6完善了作用域的的规范，并且增加了let和const用来声明块作用域下的变量。

let是声明变量，后续程序运行过程中，可以进行更改。
const声明了一个常量，声明好之后，就不能变更了。

举个栗子：你声明了一个对象，对象声明的时候let 爱好 = 看电视，const 性别 = 女， var name = 某某 。后续你这个对象怎么变化，爱好从看电视变成了睡觉，但是性别无论如何都变化不了（变性手术之类不再考虑范围内）

对应块作用域的范围就是，里面的声明只有对象自己知道。外面不知道。别人只知道你声明了个对象，但是除非你告诉他，别人没办法知道你对象是男是女，什么爱好，但是你填表格的时候填过你的对象name是某某，大家就都知道了。

let和const好用的不得了，是不是var就完全被let替代了呢？不是的，let好用，但是局限也是在块作用域。如果我们想拥有函数作用域的话，就可以用var了。

这里就不得不提到一个经典面试题了：


```
var callbacks = [];
(function() {
 for (var i = 0; i < 5; i++) {
 callbacks.push( function() { return i; } );
 }
})();
console.log(callbacks.map( function(cb) { return cb(); } ));
```

循环5次，将结果都推送给callback，最后统一输出。按照正常逻辑应该是 [0,1,2,3,4] 的结果，但是由于var这个声明方式会把作用域提到顶部，这样后续的所有操作都是对变量i的变更而已。最后输出的时候都是最后的的i而已。也就变成了[5,5,5,5,5]

对应声明的时候变成 let来声明，就正常了。

提示：const声明结束了就是完全不能更改的嘛？涉及到一个数据类型的问题，基础类型String、undefined、null、boolean、number是不能更改的。复杂类型Object就可以更改，为啥，你自己去探索。

# 箭头函数与默认参数
es6全新引入的书写方式，其实也算是一个语法糖，但是顺手也解决了一些作用域的问题。
原来书写函数使用使用function进行声明是这样的：

```
function a(x){
    var self = this
    var x1 = x || 0
    return x+1
}
```

es6版本呢

```
var a = (x=2)=>x+1
```

es6版本是书写更加方便，涉及的新特性还有默认参数和减少了this作用域的变更。

尤其在进行vue组件开发过程中，经常各种函数嵌套变来变去，函数里面套函数。如果都使用function进行书写的时候，会把本组件里面使用最用的this调整到函数内部的this。
解决方案 1.在函数声明前使用 var声明一个对象_this或者self进行复制vue的this,然后在函数内部进行操作。 2.书写方式简化使用箭头函数，压根就不存在这个问题，this不会进行变更的，还是指向了vue的全局this，用起来不要太爽啊。

至于默认参数，做过后端开发的有没有很熟悉！比如PHP，JAVA里面天天这么用的好不好。这也进一步展示了js要行程一套体系完整的编程体系，把他们的好处全部都吸收过来。


# 解构赋值
解构赋值相当于也是一种语法糖。原来的对象取值是这样的
```
let obj = {a:true,b:false}
let a = obj.a
let b = obj.b
```

es6使用解构这种新特效简化这种取值方式，将数据结构打破拆分进行赋值,变更后如下：

```
let obj = {a:true,b:false}
let {a,b} = obj
```

注意上述方式只是进行了对象解构，解构内容赋值给新声明的变量，如果原来要赋值的对象有内容时，则需要花括号括上。语法规定，代码块语句不允许出现在赋值语句左侧。如下
```
let obj = {a:true,b:false}
a = false
b = true
({a,b} = obj)
```

在结构赋值的过程中，默认参数同样适用。
上面的都是同名赋值，非同名赋值呢，如下：

```
let obj = {a:true,b:false}
let {a:c,b:d} = obj
```
这样 c d就直接声明赋值了。

对应其他的解构赋值类型还包含 嵌套对象解构、数组解构、混合解构、字符串解构、数值和布尔值解构等等，都可以学习学习。

# Proxy对象代理
关于对象代理部分，最开始了解还是一脸懵的，充分理解后的本质还是字面意思（废话）。

es6的这个特性可以给对象包一层代理，复写下原生的对象内部的所有方法，在复写做成中做很多事情。

举个栗子：你要申明的对象是个明星，然后给明星找了个经纪人（就是对象代理），你所有的想要对明星的操作都要找联系人。明星的微博、微信、电话号码全都对外人公布了，但是你私信、加好友、打电话全是这个经纪人给过滤的。

整个对象代理，其实也就是对象拦截器，可以拦截的操作有13种：

1. get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
1. set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
1. has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
1. deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
1. ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
1. getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
1. defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
1. preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
1. getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
1. isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
1. setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
1. apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
1. construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。


举个栗子：Web 服务的客户端

Web 服务的客户端处理客户发送上来的数据都应该作为不信任的处理。所以所有发送上来的内容全部都要经过安全过滤，方式SQL注入、安全攻击、内容重编码或者权限校验。
Proxy 对象可以拦截目标对象的任意属性，这使得它很合适用来写 Web 服务的客户端。

```
const service = createWebService('http://example.com/data');

service.employees().then(json => {
  const employees = JSON.parse(json);
  // ···
});
```

上面代码新建了一个 Web 服务的接口，这个接口返回各种数据。Proxy 可以拦截这个对象的任意属性，所以不用为每一种数据写一个适配方法，只要写一个 Proxy 拦截就可以了。

```
function createWebService(baseUrl) {
  return new Proxy({}, {
    get(target, propKey, receiver) {
      return () => httpGet(baseUrl+'/' + propKey);
    }
  });
}
```

# 文末
上面提到的es6的新特性只是冰山一角，es6发展至今，js已经不单单是作为前端脚本语言存在，nodejs的兴起使得使用js进行后端开发也不再是幻想。前后端语言也越来越模糊，也对前端人员的能力要求进一步拔高。

你觉得未来js发展会是怎么样的呢？