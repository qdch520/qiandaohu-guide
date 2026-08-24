export type SpotPhoto = {
  src: string;
  alt: string;
  year: string;
  credit: string;
  caption: string;
};

export type Spot = {
  id: string;
  name: string;
  area: string;
  see: string;
  kid: string;
  pay: string;
  photos: SpotPhoto[];
  noPhoto?: string;
  xhsKeyword: string;
  liveNote?: string;
};

export const PHOTO_POLICY =
  "嵌进攻略的照片，只放能核对拍摄对象和年份的实拍。小红书网页要登录，公开搜图又会把张家界、高铁、水乐园标成千岛湖，那些图一张都没用。每个景点给了小红书搜索词：去 App 里搜，筛选近一年、6–10 月。";

export const XHS_FILTER =
  "小红书里选「最新」，看笔记日期是不是 2025–2026 年 6–10 月。今年（2026）目前只有 6–8 月。";

export function xhsSearchUrl(keyword: string) {
  return `https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(keyword)}&source=web_search_result_notes`;
}

export const SPOTS: Spot[] = [
  {
    id: "lake-overview",
    name: "千岛湖镇与湖面",
    area: "淳安县城",
    see: "从空中看县城半岛伸进湖里。这是千岛湖镇，不是界首华美胜地。",
    kid: "到镇上吃饭、坐中心 / 东南湖区的船，才会经过这一带。",
    pay: "镇区免费。上岛另计船票。",
    xhsKeyword: "千岛湖镇 夜游码头",
    photos: [
      {
        src: "/spots/chunan-aerial-2020.jpg",
        alt: "2020年航拍淳安县城与千岛湖",
        year: "2020-07",
        credit: "MasaneMiyaPA · Wikimedia CC BY-SA 4.0",
        caption: "航拍淳安县城（千岛湖镇），不是郝力克酒店所在的界首。",
      },
    ],
  },
  {
    id: "meifeng",
    name: "梅峰岛 · 缆车揽胜",
    area: "中心湖区",
    see: "中心湖区最高观景点。缆车上山，顶上能看见密密麻麻的岛。老话说「不上梅峰观群岛，不识千岛真面目」。",
    kid: "6 岁不用爬山。车厢遮阳有限，湖面反光强，备帽和防晒。缆车里坐好、别探身。",
    pay: "含在中心湖区船线里上岛；缆车往返另付，常见约 50–60 元，儿童政策以窗口为准。",
    xhsKeyword: "千岛湖梅峰岛 缆车",
    liveNote:
      "三特千岛湖索道官方微博 2026 年 6–8 月仍在发梅峰缆车（含车厢布置、山顶活动），今夏能坐。下面 2022 年 10 月图核对过就是梅峰缆车和群岛；季节也对，设施今夏还在。近照请用小红书词搜。",
    photos: [
      {
        src: "/spots/meifeng-view.jpg",
        alt: "2022年从梅峰岛看千岛湖群岛",
        year: "2022-10",
        credit: "EditQ · Wikimedia CC BY-SA 4.0",
        caption: "梅峰岛上看到的群岛。这就是方案 A 要你看的那一眼。",
      },
      {
        src: "/spots/meifeng-cable.jpg",
        alt: "2022年梅峰岛缆车与湖面",
        year: "2022-10",
        credit: "EditQ · Wikimedia CC BY-SA 4.0",
        caption: "梅峰岛缆车。三特 2026 年夏仍在运营这种索道，票价以现场为准。",
      },
      {
        src: "/spots/meifeng-cabin.jpg",
        alt: "2022年缆车经过岛上亭阁",
        year: "2022-10",
        credit: "EditQ · Wikimedia CC BY-SA 4.0",
        caption: "缆车从岛上建筑上空经过。",
      },
      {
        src: "/spots/meifeng-island.jpg",
        alt: "2022年梅峰岛码头与游船",
        year: "2022-10",
        credit: "EditQ · Wikimedia CC BY-SA 4.0",
        caption: "梅峰岛码头。船型会换，登岛方式还是游船靠泊。",
      },
    ],
  },
  {
    id: "central-other",
    name: "月光岛 · 龙山岛 · 渔乐岛",
    area: "中心湖区",
    see: "同一条船线常停这几岛：月光岛（五龙岛）偏爱情步道、状元桥；龙山岛有海瑞祠、书院，偏人文；渔乐岛是吃饭补给点，不是喂鱼点。2026 年夏一手笔记写喂鱼在月光岛「鱼乐桥」。船班不同，停哪几岛不一样。",
    kid: "6 岁把时间留给梅峰缆车；若停月光岛可看鱼乐桥。祠堂走马观花。",
    pay: "上岛一般含在中心湖区船票。月光岛喂鱼、渔乐岛餐另付。",
    xhsKeyword: "千岛湖 月光岛 鱼乐桥",
    photos: [],
    noPhoto:
      "渔乐岛喂鱼无合格近照（项目本身对不上）。别把别的湖区或天池岛锦鲤当成渔乐岛。",
  },
  {
    id: "huangshanjian",
    name: "黄山尖 · 天下为公",
    area: "东南湖区",
    see: "东南湖区的登高点。缆车上山，向西北看，岛屿轮廓常被指认为「公」字，是「天下为公」的观景点。全景力度接近梅峰，角度不同。",
    kid: "同样坐缆车，不用爬山。山顶风大，穿一件外套。",
    pay: "含在东南湖区船线；缆车往返另付，窗口为准。",
    xhsKeyword: "千岛湖黄山尖 天下为公",
    liveNote:
      "三特官方微博 2026 年 7–8 月仍在发黄山尖缆车和水枪泡泡，今夏开着。不要用梅峰的群岛照代替这里。",
    photos: [],
    noPhoto:
      "搜到的「黄山尖」图经常其实是梅峰或其他湖面航拍，对不上就不配。请用小红书词看山顶「公」字角度。",
  },
  {
    id: "tianchi-guihua",
    name: "天池岛喂鱼 · 桂花岛猴子",
    area: "东南湖区",
    see: "天池岛是南宋采石遗迹，常见喂鱼、电瓶车。桂花岛以散养猴出名，另有表演。这是东南湖区和中心湖区最大的体验差：这边更「互动」，那边更「看景」。",
    kid: "喂鱼、看猴通常是 6 岁当天最高光。不自带投喂，不追猴子，护栏外看。鹦鹉或表演以当日为准。",
    pay: "上岛含船票。喂鱼、电瓶车、猴表演常见另付，价格以岛上公示为准。",
    xhsKeyword: "千岛湖桂花岛 猴子",
    liveNote:
      "桂花岛 2025 年 10 月刚升级「五色灵猴」、喂猴区和剧场。2024 年以前的猴岛图可能过时，小红书请看 2025 国庆之后的笔记。",
    photos: [],
    noPhoto:
      "网上「猴岛」图经常张冠李戴，且岛上 2025 年 10 月刚改过。不配旧图。",
  },
  {
    id: "wildworld",
    name: "WILD WORLD 7 号探索乐园",
    area: "华美胜地（原格林 7 号）",
    see: "酒店步行可达的户外轻探险乐园，现用名 WILD WORLD / 7 号探索乐园，路牌上可能仍写格林 7 号。陆地：蹦床、丛林、攀岩、飞拉达、UTV；水上另见 UPUP。傍晚有千岛迷宫落日游船，走界首列岛，约 90 分钟，不是中心 / 东南湖区大船。",
    kid: "6 岁优先：蹦床、萌宠、青山营听鸟 / 昆虫旅馆、家长陪同的水上自行车或桨板。飞拉达、UTV、高空秋千、卡丁车先量身高，常见 1.2 米门槛。乐园开放多在 09:30–17:30；1.2 米以下入园常见免费，项目另计。",
    pay: "入园和单项分开卖。问前台当天哪些适合 6 岁，不要按旧攻略一次性买陆地通票。",
    xhsKeyword: "千岛湖华美胜地 格林7号",
    liveNote:
      "搜「格林7号」或「WILD WORLD」都能找到。重点看蹦床、身高牌、萌宠近照，不要看别的水乐园。",
    photos: [],
    noPhoto:
      "搜图结果里混进了别的水乐园（有大白球、滑道的不是这里）。不配未核对宣传图。",
  },
  {
    id: "upup",
    name: "UPUP 水上与绿道",
    area: "华美胜地",
    see: "皮划艇、独木舟、桨板、水上自行车、漂浮运动场；沿湖有亚运主题绿道可骑行。水上项目必须穿救生衣、家长下水或贴边看护。",
    kid: "碰碰船 / 卡丁船先问身高。备两套换洗衣物。不会游泳也能玩有救生衣的项目，但不能放手。",
    pay: "按项目计时或计次，前台或码头买。",
    xhsKeyword: "千岛湖华美胜地 碰碰船",
    photos: [],
    noPhoto: "无已核对实拍，不配图。水面就是酒店门口那片湖湾。",
  },
  {
    id: "longchuan",
    name: "龙川湾湿地",
    area: "西南湖区一带",
    see: "湿地、浅水、森林小火车 / 泛舟，节奏比大船慢。和中心湖区不是同一张船票。",
    kid: "小火车和浅水观察最合适。防蚊，穿防滑鞋。",
    pay: "景区门票与小火车 / 船另计，以窗口为准。",
    xhsKeyword: "千岛湖龙川湾 小火车",
    liveNote:
      "龙川湾是湿地 + 小火车，不是千岛全景航拍。搜到只有群岛、没有火车的图，多半不是这里。",
    photos: [],
    noPhoto:
      "公开搜图把高铁、张家界标成龙川湾。不配图。小红书请认湿地、芦苇、小火车。",
  },
  {
    id: "qinchuan",
    name: "芹川古村",
    area: "西南方向徽派村",
    see: "免费进村的徽派村落，溪水、石桥、宗祠。适合走走停停，不是游乐场。",
    kid: "溪边看好脚下。没有机动项目，兴趣取决于孩子能不能逛老房子。",
    pay: "进村免费。农家乐吃饭另算。",
    xhsKeyword: "千岛湖芹川古村",
    photos: [
      {
        src: "/spots/qinchuan-temple-2014.jpg",
        alt: "2014年芹川村王氏宗祠大门",
        year: "2014-11",
        credit: "猫猫的日记本 · Wikimedia CC BY-SA 4.0",
        caption: "芹川村王氏宗祠（光裕堂）大门。古建筑还在；巷弄细节以现场为准。",
      },
    ],
  },
  {
    id: "tianyu",
    name: "天屿山观景台",
    area: "千岛湖镇附近",
    see: "镇上登高看日落的点，可坐电梯上山。傍晚去，不要占用全天。",
    kid: "电梯省力。日落前后人会多，拉好孩子。找正规停车，不要路边乱停。",
    pay: "观景与电梯收费以现场为准。啤酒小镇灯塔一带可顺路，本身免费。",
    xhsKeyword: "千岛湖天屿山 日落",
    photos: [
      {
        src: "/spots/tianyu-overlook-2012.jpg",
        alt: "2012年从天屿山道俯瞰千岛湖",
        year: "2012-06",
        credit: "fish4fish · Wikimedia CC BY-SA 3.0",
        caption: "从天屿山道俯瞰湖面。岛屿格局未变；观景台和电梯是后来完善的。日落近照请用小红书词搜。",
      },
    ],
  },
  {
    id: "xiajiang",
    name: "下姜村",
    area: "返程可顺路",
    see: "田园村庄，免费进村散步，不是 5A 岛景。适合周日不想再坐船时换换风景。",
    kid: "节奏很慢。没有游乐设施。",
    pay: "进村免费。",
    xhsKeyword: "千岛湖下姜村",
    photos: [],
    noPhoto: "没有已核对的授权近照，不配图。",
  },
];

export function spotsByIds(ids: string[]): Spot[] {
  return ids
    .map((id) => SPOTS.find((s) => s.id === id))
    .filter((s): s is Spot => Boolean(s));
}
