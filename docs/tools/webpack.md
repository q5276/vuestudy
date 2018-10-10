现代前端开发中，由于要不断的站在巨人的肩膀上前行，导致脚下巨人越来越多。项目结构越来越复杂，用到的技术越来越牛X，html+css+js各自在自己的发展路上一骑绝尘，甩的后方的前端开发者已经看不到前方。

![image](https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=767416906,3061741789&fm=26&gp=0.jpg)

Webpack的出现，将前端不断出现的新模块、新资源、新需求，进行自动化整合、梳理、输出，使得前端开发者更加专注业务需求。

# 核心和概念
> 本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

什么鬼东西，webpack就是把你写好的只有你自己认识的程序，整理翻译打包成漂亮的，大家都能看的程序。

webpack中有四个核心的概念。 entry、output、loader、plugins。
按照流程这四个概念应该是

 1. 入口entry（你要从哪里收拾）
 2. 加载loader（开始收拾）
 3. 插件plugins（收拾完还觉的不满意就再加点功能）
 4. 出口output（收拾整理完之后放哪里）

当然这是个基本理解。实际配置文件格式直接去官网上扒个模版就好,这里是个样子。

```
const path = require('path');
module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```
不过对于我们这种英文不好的小伙伴，明明是loader，配置里面用的却是module里面的rules，我只想说：神经病啊！
![image](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538113962141&di=d4f6dbc084cf7c95cf306c0267203807&imgtype=0&src=http%3A%2F%2Fwx3.sinaimg.cn%2Forj360%2F006mqIjwgy1ffz6c3hj5fj30jg0ddjsa.jpg)

到webpack4.0之后，不用自己添加配置文件也可以直接运行了，这个点赞。

# 入口(entry)
webpack中提供了多种定义入口属性的方式。提供单个入口语法和对象语法。不过呢，常用的配置方法是对象方法，用来包含你引入的第三方库。比如我常用的vue开发框架，带入到webpack配置文件里面就需要如下配置。

```
const config = {
  entry: {
    app: './src/main.js',
    vendors: ["vue", "vue-router"]
  }
};
```

当然，多页面应用程序的也是可以的，直接配置里面配多个入口就行了。

```
const config = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};
```

# 出口（output）
用来配置打包整理完的文件放哪里，但是有规定，不管单入口还是多入口，都只能放在一个地方。

所以配置信息需要配置输出的文件名filename和输出目录的绝对地址path。输出也分为单入口和多入口配置，但是呢多入口也兼容单入口，所以直接用一个配置就行了。

```
{
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
}
```

# 加载器（loader）
laoder一定程度上其实是个翻译器，可以对代码在加载的时候就进行预处理，并且可以将不同的语言文件都转换成可理解的对象，Typescript转化成JavaScript，图片转化成data url，等等。

要想使用loader，就要先安装对应的loader包文件。对css有 css-loader，ts文件有  ts-loader, vue文件有 vue-loader，各种文件、图片、视频使用 url-loader，js转化使用 babel-loader，其他还有 style-loader、file-loader、csv-loader、xml-loader等等。


```
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, use: 'url-loader' },
      { test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, use: 'file-loader' },
    ]
  }
};
```

**loader特性**
- loader支持链式操作。一个传一个
- loader可同步可异步。
- loader执行再node中，可以执行任何可能的操作
- loader接受查询参数
- laoder能有使用options进行配置
- 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段。
- 插件(plugin)可以为 loader 带来更多特性。
- loader 能够产生额外的任意文件。

# 插件（plugins）
插件属于对loader的补充，loader不能实现的功能都可以在插件中进行。


```
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

# webpack官方插件
webpack 有着丰富的插件接口(rich plugin interface)。webpack 自身的多数功能都使用这个插件接口。这个插件接口使 webpack 变得极其灵活。


Name  |	Description
---|---
AggressiveSplittingPlugin | 将原来的 chunk 分成更小的 chunk
BabelMinifyWebpackPlugin | 使用 babel-minify进行压缩
BannerPlugin | 在每个生成的 chunk 顶部添加 banner
CommonsChunkPlugin | 提取 chunks 之间共享的通用模块
CompressionWebpackPlugin | 预先准备的资源压缩版本，使用 Content-Encoding 提供访问服务
ContextReplacementPlugin | 重写 require 表达式的推断上下文
CopyWebpackPlugin | 将单个文件或整个目录复制到构建目录
DefinePlugin | 允许在编译时(compile time)配置的全局常量
DllPlugin | 为了极大减少构建时间，进行分离打包
EnvironmentPlugin | DefinePlugin 中 process.env 键的简写方式。
ExtractTextWebpackPlugin | 从 bundle 中提取文本（CSS）到单独的文件
HotModuleReplacementPlugin | 启用模块热替换(Enable Hot Module Replacement - HMR)
HtmlWebpackPlugin | 简单创建 HTML 文件，用于服务器访问
I18nWebpackPlugin | 为 bundle 增加国际化支持
IgnorePlugin | 从 bundle 中排除某些模块
LimitChunkCountPlugin | 设置 chunk 的最小/最大限制，以微调和控制 chunk
LoaderOptionsPlugin | 用于从 webpack 1 迁移到 webpack 2
MinChunkSizePlugin | 确保 chunk 大小超过指定限制
NoEmitOnErrorsPlugin | 在输出阶段时，遇到编译错误跳过
NormalModuleReplacementPlugin | 替换与正则表达式匹配的资源
NpmInstallWebpackPlugin | 在开发时自动安装缺少的依赖
ProvidePlugin | 不必通过 import/require 使用模块
SourceMapDevToolPlugin | 对 source map 进行更细粒度的控制
EvalSourceMapDevToolPlugin | 对 eval source map 进行更细粒度的控制
UglifyjsWebpackPlugin | 可以控制项目中 UglifyJS 的版本
ZopfliWebpackPlugin | 通过 node-zopfli 将资源预先压缩的版本

# 文末
当然，本文只是对webpack的最最基本的介绍文档。真正webpack里面可配置的东西太多了，更加输入了解可以直接去通读webpack的官方指南和api文档。
