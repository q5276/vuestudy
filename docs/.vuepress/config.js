module.exports = {
  markdown: {
    lineNumbers: true,
    toc: { includeLevel: [1, 2] },
  },
  title: 'Vue教程',
  description: 'Tingno记编写的VUE教程',
  base:'/docs/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '基础', items: [
        { text: '入门', link: '/base/base' },
        { text: '常见文件', link: '/base/file' },
        { text: '组件化', link: '/base/package' },
        { text: 'ES6新特性', link: '/base/es6' },
      ]},
      { text: '核心', items: [
        { text: '路由Router', link: '/core/Route' },
        { text: '状态Vuex', link: '/core/Vuex' },
      ]},
      { text: '工具', items: [
        { text: 'git', link: '/tools/git' },
        { text: 'webpack', link: '/tools/webpack' },
      ]},
      { text: '博客', link: 'https://notes.tingno.com' },
    ],
    sidebar: [
      '/',
      ['/base/base','入门'],
      ['/base/es6', 'ES6新特性'],
      ['/base/file', '常见文件'],
      ['/base/package', '组件化'],
      {
        title: '核心',
        collapsable: false,
        children: [
          ['/core/Route', '路由Router'],
          ['/core/Vuex', '状态Vuex']
        ]
      },
      {
        title: '工具',
        children: [
          ['/tools/git', '版本管理工具git'],
          ['/tools/webpack', 'webpack']
        ]
      }
    ],
    sidebarDepth:0,
    displayAllHeaders: true, // 默认值：false
    lastUpdated: 'Last Updated',

    //帮助编辑
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'q5276/vuestudy',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: '查看源码',

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'q5276/vuestudy',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我们改善此页面！'
  }
}