/**
* App info
*/
const appInfo = {
    appId: "wxada53099098fa7a4",
    buildVersion: 1001,
    version: "1.0.3",
    dataVersion: 1
};

/**
* Scenes config
*/
const scenes = [{
    id: 0,
    label: "宝贝多大了？",
    image: "/res/images/scene_growth.jpg",
    value: "1",
    format: "age",
    explain: "记录宝贝，也可以是宠物，猫猫、狗狗，当前的年纪只要输入生日就可以",
    pretip: "我的",
    modifyTip: "修改宝宝昵称",
    atTip: "出生于",
    status: ["当前 %time% 了", "当前 %name% %time% 了"],
    entityTip: "宝宝"
},
{
    id: 1,
    label: "和 她/他/它 在一起多久了？",
    image: "/res/images/scene_company.jpg",
    value: "2",
    format: "year",
    explain: "和男朋友/女朋友 老公/老婆 在一起的多少天都值得纪念，只要输入在一起的那一天就好",
    pretip: "我和",
    modifyTip: "修改陪伴对象",
    atTip: "相识于",
    status: ["在一起 %time% 了", "和 %name% 在一起 %time% 了"],
    entityTip: "伴侣"
}, {
    id: 2,
    label: "开始 做运动/背单词/读书 多久了？",
    image: "/res/images/scene_insistent.jpg",
    value: "3",
    format: "year",
    explain: "每次拍照都可以看到你坚持的时间，不管是健身、读书、还是背单词，让记录和坚持都更加显而易见",
    pretip: "坚持",
    modifyTip: "修改坚持的活动名称",
    atTip: "开始于",
    status: ["坚持 %time% 了", "坚持 %name% %time% 了"],
    entityTip: "一件事"
}
];

const covers = [{
    id: 1,
    image: "/res/images/wel_swiper_1.jpg",
    title: "她多大了",
    desc: "记住她/他的年龄，留下带时间刻度的印记。"
},
{
    id: 2,
    image: "/res/images/wel_swiper_2.jpg",
    title: "坚持多久了",
    desc: "每一次努力都值得铭记。"
},
{
    id: 3,
    image: "/res/images/wel_swiper_3.jpg",
    title: "和他/她在一起多久了",
    desc: "相识相知，都印在那些瞬间里。"
}
];

/**
* Share infomations
*/
const shareInfo = {
    "default": {
        title: "嘿！我发现了一个给照片标注『时间』和『年龄』的小程序~",
        path: "/pages/index/index?from=share",
        image: "/res/images/share_wxapp_image_2.jpg"
    },
    "friend": {
        title: "推荐给你一个标注『时间』和『年龄』的小程序~",
        path: "/pages/index/index?from=share2friend",
        image: "/res/images/share_wxapp_image_2.jpg"
    },
    "photo2friend": {
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
const timeFormats = [
    //'hours', 'minute',
    'adaption', 'month', 'week', 'day', 'second'
];

/**
* Sth about server side settings
* 关于服务端配置
*/
const serverSettings = {
    apiBaseURL: "https://www.f1982.com/app/time-signet/"
};

module.exports = {
    appInfo: appInfo,
    scenes: scenes,
    covers: covers,
    shareInfo: shareInfo,
    serverSettings: serverSettings,
    timeFormats: timeFormats
}