module.exports = {
  port: 6060,
  base: "/notes/",
  title: "Hello Nuage",
  description: "Never Give Up",
  themeConfig: {
    //   导航栏
    nav: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "前端",
        items: [
          {
            text: "Web",
            link: "/web/",
          },
          {
            text: "Css",
            link: "/css/",
          },
          {
            text: "JavaScript",
            link: "/javascript/",
          },
          {
            text: "Vue",
            link: "/vue/",
          },
          {
            text: "Vite",
            link: "/vite/"
          },
          {
            text: "React",
            link: "/react/",
          },
          {
            text: "Vue-Next",
            link: "/vue-next/",
          },
          {
            text: "Nodejs",
            link: "/nodejs/",
          },
          {
            text: "Typescript",
            link: "/typescript/",
          },
          {
            text: "正则",
            link: "/regular/",
          },
          {
            text: "面试",
            link: "/interview/",
          },
        ],
      }
    ],
    sidebar: {
      "/typescript/": [
        {
          title: "Web",
          collapsable: false,
          children: ["", "base-type", "类型推断和兼容", "types自动生成"],
        },
      ],
      "/nodejs/": [
        {
          title: "Web",
          collapsable: false,
          children: ["", "nrm", "package"],
        },
      ],
      "/css/": [
        {
          title: "CSS",
          collapsable: false,
          children: ["", "css"],
        },
      ],
      "/web/": [
        {
          title: "Web",
          collapsable: false,
          children: ["", "单点登录", "kuayu", "proxy", "webpack", "emoji"],
        },
      ],
      "/javascript/": [
        {
          title: "JavaScript",
          collapsable: false,
          children: ["", "js1", "closure", "design", "canvas", "canvas_api"],
        },
      ],
      "/vue/": [
        {
          title: "Vue",
          collapsable: false,
          children: ["", "vue1", "vue2"],
        },
      ],
      "/vue-next/": [
        {
          title: "Vue-next",
          collapsable: false,
          children: ["", "vue-vite", "vue-api"],
        },
      ],
      "/react/": [
        {
          title: "React",
          collapsable: false,
          children: ["", "props", "vscode", "life", "other", "redux"],
        },
      ],
      "/regular/": [
        {
          title: "正则",
          collapsable: false,
          children: ["", "正则表达式特殊字符"],
        },
      ],
      "/interview/": [
        {
          title: "面试",
          collapsable: false,
          children: [
            "",
            "css",
            "javascript",
            "vue",
            "typescript",
            "react",
            "code",
            "type",
            "http",
            "catch",
          ],
        },
      ],
    },
    logo: 'https://vuejs.org/images/logo.png',
    repo: 'vincentzyc/notes',
    sidebarDepth: 2,
    lastUpdated: "最后更新时间",
  },
  markdown: {
    lineNumbers: true,
  },
  plugins: [
    "@vuepress/back-to-top",
    "fulltext-search",
    [
      "one-click-copy",
      {
        copySelector: [
          'div[class*="language-"] pre',
          'div[class*="aside-code"] aside',
        ],
        copyMessage: "代码拷贝成功",
        duration: 3000,
        showInMobile: false,
      },
    ],
  ]
}