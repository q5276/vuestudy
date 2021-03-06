Vue开发会涉及到很多各种各样的配置包、功能包对开发进行加持。虽然实际开发不用去天天配置这些东西，但是了解下还是很有必要的。

当初最开始使用github的时候，根据教程git clone下来代码之后，看着那一堆文件！呃，啥啥啥，这是啥啊这是？这是什么？这又是什么？

![image](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537275097218&di=cc757befb62fecfcf7d3cc3964804417&imgtype=0&src=http%3A%2F%2Fvpic.video.qq.com%2F45689166%2Fg0322mrbnbo_ori_3.jpg)

# Package包文件
使用vue，安装完之后多出来的文件中包含package.json和package-lock.json。

package.json 的作用就是告诉npm你的项目基本信息、快捷的启动命令，比如npm run dev/build/server等等运行的时候使用或者依赖的包开发的时候使用或者依赖的包。具体里面的结构信息有：

- description：描述信息，有助于搜索
- main: 入口文件，一般都是 js
- scripts：支持的脚本，默认是一个空的 test
- keywords：关键字，有助于在人们使用 npm search 搜索时发现你的项目
- author：作者信息
- license：默认是 MIT
- bugs：当前项目的一些错误信息，如果有的话
- dependencies：在生产环境中需要用到的依赖
- devDependencies：在开发、测试环境中用到的依赖
 

这样在你的代码分享给其他开发者的时候直接通过npm install就可以方便把所有的运行包和依赖包都安装好。

package-lock.json里面记录了更加详细的包的版本，一般在团队协作的时候，可以统一大家的包的版本。毕竟经常会遇到有的包版本弃用，更新，更换等等，出现问题了就使用统一文件重新安装下。

使用npm init命令就可以方便的创建这个文件。里面会问一些项目名称啊，作者啊，版本之类的问题。不过呢，一般脚手架工具都会把他创建好的，所以也不需要怎么关注。

# Git版本管理工具
.gitignore 这个文件是git版本控制工具需要的文件。现在开发都是用git来进行代码分享，发布。尤其是很多时候自认为不错的代码还有发布到github上去。Github上的代码默认等于发送给了全世界。每次发布都把全部代码发上去的话，就要手动去脱敏，很麻烦。直接填写.gitignore文件就可以把一些不需要版本管理的文件从版本管理工具中剔除掉。

![image](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537275139704&di=6b71295acabc1e3afcc8feb755893863&imgtype=0&src=http%3A%2F%2Figeekbar.com%2Figeekbar%2Fnetworks%2Fuploadimgthumb%2F3e7387f5-e28c-4486-8c22-afa0731f6e4b.jpg)

举个栗子：之前某国内知名酒店发生顾客信息泄漏的安全事故，最后发现问题居然是开发人员把外网的数据库链接参数同步到了github上去，这不是告诉全世界你的公网数据库链接账号密码了嘛。

有一些开源程序的设定是config文件里面会有一个config.base.来代替，运行的时候引用config文件，开源发布的时候发布config.base。发布的版本只有配置的格式，然后使用的人复制config.base文件，填写对应的链接参数和配置就行了。

Git版本管理工具的具体使用回头再说。

README.md文件就是字面意思，.md格式文件是markdown编辑器编辑出来的文件。开源程序的说明文件一般都使用这个文件。

# Babel转译工具
.babelrc文件是babel转译的时候使用的配置文件，非必须。babel官网正中间一行黄色大字写着“babel is a javascript compiler”，翻译一下就是babel是一个javascript转译器。

为啥会有这种东西呢，出现的目的是，JavaScript的规则制定者不停的进步，开发新的规范，新的特性。但是浏览器跟不上啊，浏览器更新跟上了，但是大部分客户不会更新浏览器啊。这就导致了，你使用最新最牛叉的es6+css3+html5开发了各种高大上的特效，项目，工具等等，一上线，发现除了你自己兴冲冲的更新的最新版，你的客户99%都还用的三年前五年前甚至十年前的版本，你就哭去吧。

![image](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537275174131&di=134ba87e3b41b2dffc737a4d0f7070f2&imgtype=0&src=http%3A%2F%2Fwww.th7.cn%2Fd%2Ffile%2Fp%2F2015%2F11%2F02%2Faaef2620f520e9c8d40b9a53c035f2a4.jpg)

这里简单讲下JavaScript的版本，JavaScript是Netscape 开发的脚本语言，1996年以ECMAScript的名字成为标准。1997年ES1.0，1999年发布了ES3.0，这个版本支持比较广泛。2007年发布了4.0的草案，但是由于太过激进，遭到大公司抵制夭折。之后左右，发布了ES3.1，后2009年12月被改名为ES5.0，完成标准化，现在主流浏览器都支持这个版本。2015年发布es6.0并且更名为“ECMAScript 2015”，后续规定每年发布一个版本，也就是ES2016、ES2017。所以有人问你ES2015你会嘛，其实还是ES6。

es6更新了很多新特性，箭头函数、块作用域、Symbol、Promise等等，这些特性浏览器不一定支持，为了实现他们，就需要babel这个翻译器来翻译成低版本可用的特性。而.babelrc这个文件就是翻译中各种配置项了。

Babel里面包含转译插件和转译器：

转译插件用来转译单一功能比如transform-es2015-arrow-functions，这个插件只负责转译es2015新增的箭头函数。

转译器是一堆转译插件的集合，比如比如babel-preset-es2015就包含了es2015新增语法的所有转译插件。


Babel提供了各个版本对应的转换器：

- babel-preset-es2015 将es2015版本的js转译为es5。
- babel-preset-es2016 将es2016版本的js转译为es5。
- babel-preset-es2017 将es2017版本的js转译为es5。

JavaScript的规范指定的过程分为四个阶段：Stage0（草案），Stage1（草案提案），Stage2（草案规范），Stage3（候选），Stage4（验收实现包含下一修订版）

Babel也提供对应的阶段转换器：

- Stage0：preset-stage-0
- Stage1：preset-stage-1
- Stage2：preset-stage-2
- Stage3：preset-stage-3

 

常用转译器

1.babel-preset-env

通过在.babelrc中配置env选项，可以让代码兼容不同版本的浏览器或者node。浏览器或者node已经支持的语法将不再转译了，不支持的才转译。如果不配置env选项，该转译器等同于babel-preset-latest。
```
{
    "presets": [
        ["env", {
            "targets": {
                "browsers": ["last 2 versions", "safari >= 7"]
            }
        }]
    ]
}
```
2.Plugins

配置转译所需要的插件。使用插件的顺序是按照插件在数组中的顺序依次调用的。比如如下命令，转译的时候先使用transform-decorators-legacy转译，再使用transform-class-properties转译
```
{
    "plugins": [
        "transform-decorators-legacy",
        "transform-class-properties"
    ]
}
```
3.presets

配置你要使用的转译器。使用转译器的顺序是按照转译器在数组中的反顺序进行调用的。先使用数组最末尾的转译器，然后使用倒数第2个，倒数第3个，依次类推。比如使用下面命令的时候，先使用stage-2转译器转译，再react转译器转译，最后使用es2015转译器转译。
```
{
    "presets": [
        "es2015",
        "react",
        "stage-2"
    ]
}
```
更详细的参数配置自行网络学习，毕竟这研究也是复杂的一大堆东西。

# Postcss处理工具
.postcssrc.js是Postcss工具运行的时候需要的配置文件，还有postcss.config.js。

上面讲了JS的发展历史各种问题，css也存在。Postcss本身功能比较单一，使用JavaScript代码来处理CSS。但是他优秀的插件机制使得其不断壮大，超过200多中插件来解决各种问题，也可以根据需要自行开发插件。

在前端不断进化的这些年，CSS的发展也不容小觑。CSS（Cascading Style Sheets，层叠样式表）是给web化妆的语言， 1996年W3C发布CSS1.0，1998年发布CSS2.0，从2001年开始制定CSS3标准制订完成草案，并将CSS切分成独立的模块各自进行更新，浏览器按照CSS模块发展的节奏进行创新，支持度也不同，也就造成了各种奇奇怪怪的浏览器兼容性问题。来感受下各个模块和特性的发布时间。

由于CSS的发展和浏览器厂商给已经不能满足开发者日益增长的诉求，SASS和LESS等预处理语言开始流行。Postcss凭借插件系统逐步演化成先进的css处理平台，通过插件毫无疑问一样可以实现LESS和SASS的效果。

PostCSS 一般不单独使用，而是与已有的构建工具进行集成。PostCSS 与主流的构建工具，如 Webpack、Grunt 和 Gulp 都可以进行集成。完成集成之后，选择满足功能需求的 PostCSS 插件并进行配置。下面将具体介绍如何在 Webpack、Grunt 和 Gulp 中使用 PostCSS 的 Autoprefixer 插件。Autoprefixer 其作用是为 CSS 中的属性添加浏览器特定的前缀。

PostCss的配置也是有一大堆体系的东西，每个插件的每个配置，版本啊等等，学不完。

 

# Webpack模块打包
Webpack.config.js是webpack的配置文件，有时候会在config或者build文件夹下面，更加细分成为webpack.dev.conf.js和webpack.prod.dev.js或者更多来应对不同的打包需求下，不同的打包配置。

![image](https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=767416906,3061741789&fm=26&gp=0.jpg)

Webpack用来干嘛呢？现今浏览器做功能复杂丰富的应用的时候，他们使用了更复杂的JavaScript代码和各种依赖包。为了简化开发，前端涌现出来各种实现方法，模块化（复杂程序拆分比如vue）,TypeScript（微软拓展js的新的编程语言）,SASS/LESS（CSS预处理器）等等，这些虽然大大提高了开发效率，但是都需要做到让浏览器识别，就需要各种技术配置，比如上面提到好多技术。Webpack干的就是这个事情，分析你项目结构，知道JavaScript模块和其他浏览器不能直接运行的新技术，将其转化打包成合适的格式供浏览器使用。

Webpack有很多高级的功能直接通过配置文件讲他们串起来，基础案例如下：
```
module.exports = {
    entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/public",//打包后的文件存放的地方
        filename: "bundle.js"//打包后输出文件的文件名
    }
}
```
注：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。

 
Webpack里面可以设置的东西就更多了！

- 生成Source Maps：方便调试，方便追查源文件位置，需要配合devtool
- 构建本地服务器：方便开发，实时更新结果
- Loaders：导入不同的功能处理不同的打包需求
- Babel：上面的Babel在这里就可以显示作用了
- Plugins：进一步拓展webpack
- ……
 

总之，webpack也是很牛叉的技术，可玩性大大的，不过实际开发过程中，配置好就不再动了。

 
# IDE文件或其他
做开发肯定要使用开发工具，某些编辑器就会产生各种配置文件文件夹。

.idea文件夹 是Intellij IDEA编辑器产生，注意是文件夹，具体配置看编辑器吧。

.DS_Store 文件是 Mac OS上特有的用于表示当前文件夹在苹果电脑上的位置啊，图标之类的文件。你项目里面有使用mac电脑做开发的同事，并且没有在git里面屏蔽就会出现。

.vscode 是Visual Studio Code编辑器生成的配置文件。

……

# 文末
实际开发过程中，其实上面这些应该都是有架构师或者脚手架工具都配置搭建好，作为开发本身是基本上不会去动的。一般只有在出现因为这类配置或者引用了新的插件来解决新需求来处理对应的bug的时候，才需要去对症下药的看看。这些问题直接度娘，有条件的Google一下。

不过我们也发现，技术发展也是分久必合，合久必分的过程。从只是代码，拆分成html+css+js。逐步演化推进过程中html5  css3  es3/es6分别发展。跟不上节奏逐渐增加less/sass/typescript，因为要配置配置的太多，各种自动化工具开始发展。需要越来越大，代码越来越多，开始打包优化压缩。

开发越来越苦，学的越来越多。但是未来发展谁知道呢？

微软刚出的AI可以根据草图，直接生成对应的前端代码，是不是应该考虑换岗啊。