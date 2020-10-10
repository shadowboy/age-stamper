/**
 * App info
 */
const appInfo = {
  appId: "1",
  appName: "Age Stamper",
  buildVersion: 1,
  version: "0.1",
  dataVersion: 1
};

const scenes = [
  {
    id: 1,
    label: "How old is your baby?",
    image: "scene_growth.jpg",
    value: "1",
    format: "age",
    explain: "Record baby, it can also be pets, cats, dogs, as long as the current age enters the birthday",
    pretip: "My",
    modifyTip: "修改宝宝昵称",
    atTip: "出生于",
    status: ["Today %time% 了", "Today %name% is %time% old."],
    entityTip: "Boby"
  },
  {
    id: 2,
    label: "How long have you been with her/him/it?",
    image: "scene_company.jpg",
    value: "2",
    format: "year",
    explain:
      "How many days spent with boyfriend/girlfriend husband/wife is worth remembering, just input the day together",
    pretip: "I and",
    modifyTip: "Modify your companion",
    atTip: "Acquainted at",
    status: ["在一起 %time% 了", "和 %name% 在一起 %time% 了"],
    entityTip: "伴侣"
  },
  {
    id: 3,
    label: "How long have you started doing sports/remembering words/reading?",
    image: "scene_insistent.jpg",
    value: "3",
    format: "year",
    explain:
      "每次拍照都可以看到你坚持的时间，不管是健身、读书、还是背单词，让记录和坚持都更加显而易见",
    pretip: "坚持",
    modifyTip: "修改坚持的活动名称",
    atTip: "开始于",
    status: ["坚持 %time% 了", "坚持 %name% %time% 了"],
    entityTip: "一件事"
  }
];

const covers = [
  {
    id: 1,
    image: "wel_swiper_1.jpg",
    title: "她多大了",
    desc: "记住她/他的年龄，留下带时间刻度的印记。"
  },
  {
    id: 2,
    image: "wel_swiper_2.jpg",
    title: "坚持多久了",
    desc: "每一次努力都值得铭记。"
  },
  {
    id: 3,
    image: "wel_swiper_3.jpg",
    title: "和他/她在一起多久了",
    desc: "相识相知，都印在那些瞬间里。"
  }
];

/**
 * Share infomations
 */
const shareInfo = {
  default: {
    title: "嘿！我发现了一个给照片标注『时间』和『年龄』的小程序~",
    path: "/pages/index/index?from=share",
    image: "share_wxapp_image_2.jpg"
  },
  friend: {
    title: "推荐给你一个标注『时间』和『年龄』的小程序~",
    path: "/pages/index/index?from=share2friend",
    image: "share_wxapp_image_2.jpg"
  },
  photo2friend: {
    title: "我刚刚做了一个照片",
    path: "/pages/content/photo-view?id=12232",
    image: null
  }
};

/**
 * 可以显示的时间格式
 * adaption 自适应
 * week 多少周
 * day 多少天
 * ...
 */
const timeFormats = ["adaption", "month", "week", "day", "second"];

/**
 * Sth about server side settings
 * 关于服务端配置
 */
const serverSettings = {
  apiBaseURL: "https://www.f1982.com/app/time-signet/"
};

export { appInfo, scenes, covers, shareInfo, serverSettings, timeFormats };
