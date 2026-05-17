const BOTTOM_SAFE_AREA =
  "生成的每张图底部都额外多留出不少于 240px 的纯白色范围，或约占画面高度 12% 的底部安全留白区，用作后期放文字、排版或避免重要内容被底部平台信息遮挡；不要在这一区域放主体、注解、装饰元素或杂乱背景。";

const STORAGE_KEY = "photoKeywordsMiniProgram";

const defaultForm = {
  rawIdea: "",
  photoType: "日常照片",
  usageScene: "通用修图工具",
  keep: "",
  edit: "",
  subject: "",
  scene: "",
  actionRelation: "",
  mood: "",
  composition: "",
  aspectRatio: "",
  targetStyle: "",
  lighting: "",
  color: "",
  texture: "",
  quality: "",
  retouchStrength: "自然轻修",
  annotationObjects: "",
  annotationTextStyle: "",
  lineStyle: "",
  decorations: "",
  blankSpaceRule: "",
  negativePrompt: "",
  bottomSafeArea: BOTTOM_SAFE_AREA
};

const categories = [
  { id: "portrait", name: "人像变好看", desc: "自拍、合照、头像，自然干净不网红" },
  { id: "lifestyle", name: "日常变干净", desc: "房间、咖啡馆、书桌、餐桌更舒服" },
  { id: "film", name: "胶片氛围感", desc: "复古颗粒、低饱和、随手拍感觉" },
  { id: "travel", name: "旅行更出片", desc: "城市、路牌、海边、山野、记忆感" },
  { id: "pet_object", name: "小物更可爱", desc: "宠物、玩偶、杯子、书、本子" },
  { id: "cleanup", name: "去掉杂物", desc: "清理背景、补空白、改比例、留白" },
  { id: "general", name: "我也说不清", desc: "先帮我变自然、干净、好看" }
];

const templates = {
  portrait: {
    photoType: "人物照片",
    keep: "保留人物身份、五官特征、发型、服装、原始表情和真实光影",
    edit: "轻微提亮肤色，减少皮肤瑕疵，优化暗部，提升照片清晰度",
    targetStyle: "自然清透、真实照片感、轻微生活方式写真",
    mood: "舒服、干净、松弛",
    lighting: "柔和自然光，脸部不过曝，保留真实阴影",
    color: "低饱和暖白，肤色自然，不偏灰不偏黄",
    composition: "保留原构图，不裁切头发、手和身体关键部位",
    quality: "高清细节，自然锐化，保留皮肤纹理",
    retouchStrength: "自然轻修",
    negativePrompt: "不要改变人物长相，不要大眼瘦脸，不要过度磨皮，不要塑料皮肤，不要新增奇怪肢体和文字"
  },
  lifestyle: {
    photoType: "生活场景照片",
    keep: "保留原始空间结构、主要家具、物件位置、真实透视关系和生活痕迹",
    edit: "清理杂乱细节，提升光线层次，增强温暖生活氛围",
    targetStyle: "日系生活感、自然真实、干净温暖",
    mood: "安静、松弛、舒服",
    lighting: "柔和窗光，轻微暖光，阴影自然",
    color: "奶油色、木色、低饱和、干净白色",
    composition: "主体更突出，适当增加留白，不改变房间布局",
    texture: "真实材质、柔和纹理",
    quality: "高清自然，细节清楚，轻微胶片颗粒",
    negativePrompt: "不要改变空间结构，不要新增奇怪家具，不要过度 HDR，不要让画面像样板间"
  },
  film: {
    photoType: "旅行街拍或日常照片",
    keep: "保留原照片内容、人物真实特征、场景结构和自然曝光",
    edit: "增加轻微胶片颗粒、柔和对比、复古色偏、生活抓拍感",
    targetStyle: "胶片感、CCD感、低饱和、复古生活照",
    mood: "怀旧、松弛、随手记录感",
    lighting: "自然光或闪光灯直闪，保留真实阴影",
    color: "低饱和、轻微偏暖或偏青，黑位不死黑",
    texture: "胶片颗粒、轻微噪点",
    quality: "质感自然，颗粒细腻，清晰度不过度锐化",
    negativePrompt: "不要塑料感、不要过度锐化、不要过度噪点、不要脏黄、不要强烈 HDR"
  },
  note: {
    photoType: "餐桌/咖啡/甜品或日常照片",
    keep: "保留原照片构图、主体、真实光影和空白空间",
    edit: "添加白色手绘线条、物件轮廓描边、箭头或虚线引导、短句注解和少量可爱装饰",
    targetStyle: "手绘风注解、日系可爱手账、白色线稿、一笔画风格",
    mood: "日记感、小碎念、轻松、可爱但不油腻",
    lighting: "保留原照片光线，不额外改变照片主光源",
    color: "以白色手绘线为主，少量浅色小装饰，整体干净",
    composition: "注解围绕物件分布，保留空白，不遮挡主体和人物脸部",
    quality: "线条清晰但自然，不要机械感，文字可读",
    annotationObjects: "请先自动识别照片中的主要物件、空间元素和可注解的小细节",
    annotationTextStyle: "日系可爱手写风、小碎念，句子简短，带一点情绪",
    lineStyle: "白色细线、一笔画、随性不均匀、箭头或虚线引导",
    decorations: "爱心、星星、闪光、小表情、热气、虚线和圆圈，适度装饰",
    blankSpaceRule: "注解和装饰围绕主体分布，保留空白，不进入底部安全留白区",
    negativePrompt: "不要过度装饰、不要铺满画面、不要遮挡主体、不要生成乱码文字、不要改变原照片内容"
  },
  travel: {
    photoType: "风景旅行照片",
    keep: "保留旅行场景、人物或主体位置、城市/自然环境特征、真实光线和透视",
    edit: "增强旅行记忆感，优化天空、街景、色彩和画面层次",
    targetStyle: "旅行街拍、自然生活感、清爽干净、轻微胶片感",
    mood: "轻松、自然、记忆感",
    lighting: "晴天自然光、傍晚暖光，亮部不过曝",
    color: "清透、低饱和，天空和环境色自然",
    composition: "保留原始空间关系，增强层次，主体更突出",
    quality: "高清自然，纹理真实，远景不要糊成一片",
    negativePrompt: "不要过度换天，不要假 HDR，不要改变地标和人物特征，不要新增奇怪路人"
  },
  pet_object: {
    photoType: "宠物或小物件照片",
    keep: "保留宠物或物件的真实外形、表情、毛发/材质细节、原始光影",
    edit: "优化主体清晰度、背景干净度和可爱生活氛围",
    targetStyle: "自然可爱、生活随拍、干净柔和",
    mood: "可爱、生活感、轻松、治愈",
    lighting: "柔和自然光，毛发和材质保留层次",
    color: "柔和浅色、低饱和、主体颜色准确",
    texture: "真实、柔和，保留毛发或材质细节",
    quality: "高清细节，毛发/材质自然，不要糊边",
    negativePrompt: "不要改变主体形态，不要多生成肢体或物件，不要过度锐化，不要塑料质感"
  },
  cleanup: {
    photoType: "需要清理背景的照片",
    keep: "保留主体、人物身份、原始空间透视、光线方向和主要物件",
    edit: "去掉杂乱物品，补齐干净背景，增加适当留白",
    targetStyle: "自然修复、干净真实、无痕迹",
    mood: "简洁、舒服",
    lighting: "匹配原图光线方向和阴影",
    color: "匹配原图色彩，不突兀",
    composition: "保持主体位置，背景补全自然，不拉伸变形",
    quality: "修复区域纹理自然，边缘干净",
    negativePrompt: "不要改变主体，不要生成重复纹理，不要拉伸背景，不要新增奇怪物体，不要破坏透视"
  },
  doodle_snap: {
    photoType: "真实手持手机随拍快照",
    usageScene: "社交媒体故事批注、学生日记、杂志标记风格",
    keep: "保留真实手持手机随拍质感，场景可为校园、画廊、工作室、咖啡馆、夜市或街头；保留墙面艺术、标签、海报、货架、桌子、灯具、书籍、展示板、人群、织物、阴影、噪点、轻微模糊和不完美曝光",
    edit: "在照片上叠加非常强烈、密集、混乱的数字马克笔涂鸦；主体轮廓用亮粉色粗线勾勒，带青色偏移线条或光晕；主体周围向外放射黄橙尖刺、角、射线、鳄状物、太阳光芒般怪物形态；画面留白和四周加入大量粗糙手写文字，包括大标题、情绪标语、重复词、短笑话、日期标签、学习批注",
    subject: "学生、艺术家、朋友或安静路人，背影或四分之三侧面，可拿笔记本、帆布袋、咖啡、手机、速写本等道具",
    scene: "校园、画廊、工作室、咖啡馆、夜市或街头",
    actionRelation: "正在看展、学习、走路、等待、浏览或拿着日常道具",
    targetStyle: "真实手持手机随拍快照风格、学生日记、杂志标记、社交媒体故事批注感、霓虹混乱密集夸张涂鸦覆盖",
    mood: "俏皮、青春、走神、有点过度刺激、亲切又有个性",
    lighting: "保留现场光和不完美曝光，可有噪点、轻微模糊、阴影和手机快照感",
    color: "亮粉色主体粗线、青色偏移线条或光晕、黄橙色尖刺射线、霓虹高对比涂鸦",
    texture: "粗厚数字马克笔、摇晃黑色轮廓、粗糙笔刷边缘、随意压力变化",
    composition: "整体略微倾斜、不完美构图，主体位于画面中心或偏右；涂鸦层明显覆盖照片上方，可遮挡部分人物和物体，但底图仍清晰",
    quality: "底图保持真实快照清晰度，允许噪点、轻微糊、曝光不完美；涂鸦边缘粗糙有手写感",
    annotationObjects: "主体轮廓、周围空间、墙面艺术、海报、标签、桌面物件、人群和道具",
    annotationTextStyle: "大量粗糙手写文字，大标题、情绪标语、重复词、短笑话、日期标签、学习批注，像学生日记和社交媒体故事涂写",
    lineStyle: "粗厚数字马克笔线条、亮粉色粗描边、青色偏移线条、摇晃黑色轮廓、随意压力变化",
    decorations: "星星、爪印、蜘蛛网边角、光环、抽象眼睛、植物、花朵、爱心、箭头、计数符号、下划线、涂鸦条、黄橙尖刺和太阳光芒怪物形态",
    blankSpaceRule: "四周和留白处允许密集文字与符号，但底部安全留白区仍需保留给后期排版",
    retouchStrength: "明显风格化",
    negativePrompt: "不要做成干净极简风，不要只有少量装饰，不要柔和淡雅，不要把底图完全盖住，不要生成乱码文字，不要让主体完全不可辨认"
  },
  general: {
    photoType: "日常照片",
    keep: "保留原照片主体、真实光影、空间关系和照片感",
    edit: "提升清晰度、光线层次、色彩干净度和整体完成度",
    targetStyle: "自然真实、干净、轻微高级感",
    mood: "轻松、好看、日常记录感",
    lighting: "柔和自然光，画面通透不过曝",
    color: "干净明亮、低饱和、肤色和环境色自然",
    composition: "主体突出，适当留白，保持原始空间关系",
    quality: "高清自然，细节清楚，少一点 AI 味",
    negativePrompt: "不要过度滤镜，不要文字乱码，不要装饰过满，不要改变真实主体"
  }
};

const fields = [
  { key: "photoType", label: "照片类型" },
  { key: "usageScene", label: "使用场景" },
  { key: "keep", label: "保留内容", multiline: true },
  { key: "edit", label: "修改方向", multiline: true },
  { key: "subject", label: "主体" },
  { key: "scene", label: "场景" },
  { key: "actionRelation", label: "动作 / 关系" },
  { key: "mood", label: "氛围" },
  { key: "composition", label: "构图", multiline: true },
  { key: "aspectRatio", label: "画面比例" },
  { key: "targetStyle", label: "目标风格" },
  { key: "lighting", label: "光线" },
  { key: "color", label: "色彩" },
  { key: "texture", label: "质感" },
  { key: "quality", label: "画质" },
  { key: "retouchStrength", label: "修图强度" },
  { key: "annotationObjects", label: "注解对象" },
  { key: "annotationTextStyle", label: "注解文字风格" },
  { key: "lineStyle", label: "线条风格" },
  { key: "decorations", label: "装饰元素" },
  { key: "blankSpaceRule", label: "注解留白规则", multiline: true },
  { key: "negativePrompt", label: "禁止项", multiline: true },
  { key: "bottomSafeArea", label: "底部安全留白", multiline: true }
];

const tabs = [
  { id: "full", name: "完整" },
  { id: "layered", name: "分层" },
  { id: "compact", name: "一句话" },
  { id: "json", name: "JSON" }
];

const trendTemplates = [
  {
    id: "note",
    category: "note",
    name: "手账碎碎念",
    tag: "可爱注解",
    desc: "白色线条、小箭头、小字批注，适合咖啡、餐桌、日常照片。",
    rawIdea: "咖啡店或餐桌照片加白色手账小字，保留原图氛围，底部留白方便放文字",
    form: {
      ...templates.note,
      rawIdea: "咖啡店或餐桌照片加白色手账小字，保留原图氛围，底部留白方便放文字",
      edit: "添加白色手绘线条、物件轮廓描边、箭头或虚线引导、短句小碎念注解和少量可爱装饰；保留原图氛围，底部留白方便后期排版",
      mood: "日记感、小碎念、轻松、可爱但不幼稚",
      color: "以白色手绘线为主，少量奶油色、浅粉或浅蓝点缀，整体温柔干净",
      blankSpaceRule: "注解和装饰围绕主体分布，保留空白，不进入底部安全留白区"
    }
  },
  {
    id: "doodle_snap",
    category: "doodle_snap",
    name: "涂鸦快照风",
    tag: "高能出片",
    desc: "霓虹马克笔、密集涂鸦、杂志标记感，适合做社交平台故事图。",
    rawIdea: "真实手机随拍，加霓虹马克笔涂鸦，密集混乱一点，像学生日记和杂志标记",
    form: {
      ...templates.doodle_snap,
      rawIdea: "真实手机随拍，加霓虹马克笔涂鸦，密集混乱一点，像学生日记和杂志标记",
      edit: "叠加高能、密集、混乱的数字马克笔涂鸦；用亮粉色粗线圈出主体，加入青色偏移、黄橙尖刺、手写大字、星星、箭头、爪印、蜘蛛网和涂鸦条，像社交媒体故事批注",
      mood: "青春、俏皮、夸张、密集、有一点过度刺激但很好玩",
      color: "亮粉色、青色偏移、黄橙尖刺、黑色摇晃轮廓和霓虹高对比点缀",
      negativePrompt: "不要做成干净极简风，不要只有少量装饰，不要把底图完全盖住，不要生成乱码文字，不要让主体完全不可辨认"
    }
  },
  {
    id: "film",
    category: "film",
    name: "低饱和胶片",
    tag: "松弛氛围",
    desc: "轻颗粒、低对比、随手拍感，适合街拍、旅行和生活记录。",
    rawIdea: "旅行街拍调成低饱和胶片感，有一点随手拍颗粒，松弛自然",
    form: {
      ...templates.film,
      rawIdea: "旅行街拍调成低饱和胶片感，有一点随手拍颗粒，松弛自然",
      edit: "加入低饱和胶片色调、轻微颗粒、柔和对比和随手拍氛围；保留真实曝光和人物特征",
      targetStyle: "低饱和胶片感、CCD随手拍、复古生活照、轻颗粒",
      mood: "松弛、怀旧、自然、不刻意摆拍",
      color: "低饱和、轻微偏暖或偏青，黑位不死黑，高光柔和不过曝",
      negativePrompt: "不要过度锐化，不要强 HDR，不要脏黄，不要滤镜太重，不要塑料感"
    }
  },
  {
    id: "lifestyle",
    category: "lifestyle",
    name: "奶油生活感",
    tag: "温柔干净",
    desc: "暖白、奶油色、窗边自然光，适合房间、咖啡馆和书桌。",
    rawIdea: "房间或咖啡馆照片变成奶油生活感，温柔干净，保留生活痕迹",
    form: {
      ...templates.lifestyle,
      rawIdea: "房间或咖啡馆照片变成奶油生活感，温柔干净，保留生活痕迹",
      edit: "把画面整理得更干净温柔，增加奶油色和暖白生活感，清理明显杂乱但保留真实生活痕迹",
      targetStyle: "奶油生活感、温柔干净、日系自然、轻微胶片颗粒",
      lighting: "柔和窗边自然光，轻微暖光，阴影自然不过重",
      color: "奶油色、暖白、浅木色、低饱和柔和色彩",
      negativePrompt: "不要变成样板间，不要过度磨平质感，不要新增奇怪家具，不要过度 HDR"
    }
  }
];

const effectChips = [
  "自拍修自然一点，皮肤干净但保留真实纹理，不要网红脸",
  "咖啡店照片加白色手账小字，保留原图氛围，底部留白",
  "旅行街拍调成胶片感，低饱和，有一点随手拍颗粒",
  "真实手机随拍，加霓虹马克笔涂鸦，密集混乱一点",
  "房间照片变干净温暖，保留生活痕迹，不要像样板间",
  "餐桌照片加白色线条注解，小碎念文字，画面不要太满",
  "去掉背景杂物，补齐干净墙面，主体位置不要改变",
  "小物照片更可爱，奶油色，柔和自然光，细节清楚"
];

const rules = [
  { category: "doodle_snap", words: ["马克笔", "数字马克笔", "霓虹", "混乱涂鸦", "密集涂鸦", "涂鸦覆盖", "快照", "手持手机", "学生日记", "杂志标记", "故事批注"] },
  { category: "note", words: ["手账", "注解", "涂鸦", "标注", "箭头", "小字", "日系", "可爱", "白色线条", "描边", "doodle"] },
  { category: "cleanup", words: ["清理", "去掉", "去除", "擦除", "扩图", "补背景", "留白", "白边", "墙面", "杂物"] },
  { category: "film", words: ["胶片", "ccd", "复古", "日杂", "怀旧", "颗粒", "低饱和", "闪光灯", "拍立得", "film"] },
  { category: "portrait", words: ["自拍", "人像", "人物", "合照", "脸", "皮肤", "妆容", "穿搭", "证件照", "写真", "五官"] },
  { category: "travel", words: ["旅行", "街景", "风景", "海边", "天空", "城市", "山", "树", "日落", "咖啡店", "路牌", "公园"] },
  { category: "pet_object", words: ["猫", "狗", "宠物", "小物", "玩偶", "杯子", "花", "书", "桌面", "植物", "静物"] },
  { category: "lifestyle", words: ["房间", "卧室", "客厅", "咖啡馆", "餐厅", "书桌", "室内", "空间", "餐桌"] }
];

function clean(value) {
  return String(value || "").trim();
}

function hasAny(text, words) {
  return words.some((word) => text.includes(word));
}

function uniqueJoin(values) {
  const list = values
    .filter(Boolean)
    .flatMap((value) => String(value).split(/[；;，,]/))
    .map((value) => value.trim())
    .filter(Boolean);
  return Array.from(new Set(list)).join("；");
}

function detectCategory(rawIdea, fallback = "general") {
  const text = rawIdea.toLowerCase();
  const matched = rules.find((rule) => hasAny(text, rule.words));
  return matched ? matched.category : fallback;
}

function detectPhotoType(rawIdea, category) {
  const text = rawIdea.toLowerCase();
  if (hasAny(text, ["合照", "双人", "多人"])) return "双人/多人合照";
  if (hasAny(text, ["自拍", "人像", "人物", "脸", "皮肤", "五官", "穿搭"])) return "人物照片";
  if (hasAny(text, ["猫", "狗", "宠物"])) return "宠物照片";
  if (hasAny(text, ["杯子", "书", "花", "植物", "玩偶", "小物", "静物"])) return "物件静物";
  if (hasAny(text, ["餐桌", "咖啡", "甜品", "饮料", "饭", "食物"])) return "餐桌/咖啡/甜品";
  if (hasAny(text, ["快照", "手持手机", "马克笔", "霓虹", "涂鸦覆盖"])) return "真实手持手机随拍快照";
  if (hasAny(text, ["旅行", "街拍", "街道", "城市", "路牌"])) return "旅行街拍";
  if (hasAny(text, ["海边", "山", "天空", "风景", "公园", "草地"])) return "风景照片";
  if (hasAny(text, ["房间", "卧室", "客厅", "书桌", "室内", "咖啡馆", "餐厅"])) return "室内场景";
  return templates[category].photoType || defaultForm.photoType;
}

function ideaEnhancements(rawIdea) {
  const text = rawIdea.toLowerCase();
  return {
    targetStyle: uniqueJoin([
      hasAny(text, ["自然", "真实", "清透"]) ? "自然清透、真实照片感" : "",
      hasAny(text, ["日系", "生活感"]) ? "日系生活感" : "",
      hasAny(text, ["胶片", "film", "ccd", "复古", "拍立得"]) ? "胶片感、CCD感、复古生活照、轻微颗粒" : "",
      hasAny(text, ["手绘", "手账", "注解", "涂鸦", "doodle"]) ? "手绘风注解、日系可爱手账、白色线稿、一笔画风格" : "",
      hasAny(text, ["高级", "干净"]) ? "干净高级、简洁留白" : "",
      hasAny(text, ["电影", "电影感"]) ? "电影感、柔和对比" : ""
    ]),
    mood: uniqueJoin([
      hasAny(text, ["温暖", "暖"]) ? "温暖" : "",
      hasAny(text, ["松弛", "放松", "舒服"]) ? "松弛、舒服" : "",
      hasAny(text, ["可爱", "小碎念"]) ? "可爱、日记感" : "",
      hasAny(text, ["安静", "治愈"]) ? "安静、治愈" : "",
      hasAny(text, ["夏日", "海边"]) ? "夏日、清爽" : "",
      hasAny(text, ["怀旧", "复古", "ccd", "胶片"]) ? "怀旧、随手记录感" : ""
    ]),
    lighting: uniqueJoin([
      hasAny(text, ["窗光", "窗边"]) ? "柔和窗边散射光" : "",
      hasAny(text, ["自然光"]) ? "柔和自然光" : "",
      hasAny(text, ["傍晚", "夕阳", "黄昏"]) ? "傍晚暖光，阴影自然" : "",
      hasAny(text, ["夜景", "晚上"]) ? "夜景环境光，亮部不过曝" : "",
      hasAny(text, ["闪光灯", "ccd"]) ? "允许轻微闪光灯质感，但不要死白" : "",
      hasAny(text, ["提亮", "暗部"]) ? "适度提亮暗部，保留真实阴影" : ""
    ]),
    color: uniqueJoin([
      hasAny(text, ["低饱和"]) ? "低饱和、颜色克制" : "",
      hasAny(text, ["奶油", "暖白"]) ? "奶油色、暖白、柔和肤色" : "",
      hasAny(text, ["蓝", "清爽", "海边"]) ? "清透蓝绿、干净明亮" : "",
      hasAny(text, ["胶片", "ccd", "复古"]) ? "低饱和，轻微偏暖或偏青，黑位不死黑" : "",
      hasAny(text, ["粉", "可爱", "少女"]) ? "浅粉、浅蓝、柔和浅色点缀" : ""
    ]),
    composition: uniqueJoin([
      hasAny(text, ["留白", "文字", "排版"]) ? "增加适当留白，主体不要进入底部安全留白区" : "",
      hasAny(text, ["不裁", "不要裁", "保留构图"]) ? "保留原构图，不裁切头发、手和主体关键部位" : "",
      hasAny(text, ["竖图", "9:16"]) ? "适配 9:16 竖图，主体居中偏上，底部保留安全区" : "",
      hasAny(text, ["方图", "1:1"]) ? "适配 1:1 方图，主体清晰，边缘留白" : "",
      hasAny(text, ["突出主体", "主体更突出"]) ? "主体更突出，背景简洁不抢戏" : "",
      hasAny(text, ["手绘", "注解", "箭头"]) ? "注解围绕物件分布，保留空白，不遮挡主体和人物脸部" : ""
    ])
  };
}

function mergeForm(form, patch) {
  return { ...form, ...patch, bottomSafeArea: patch.bottomSafeArea || form.bottomSafeArea || BOTTOM_SAFE_AREA };
}

function resetTrendForm(patch) {
  return {
    ...defaultForm,
    ...patch,
    bottomSafeArea: patch.bottomSafeArea || BOTTOM_SAFE_AREA
  };
}

function resetCategoryForm(currentForm, category) {
  const template = templates[category] || templates.general;
  return resetTrendForm({
    ...template,
    rawIdea: currentForm.rawIdea
  });
}

function applyFillMode(currentForm, patch, mode, category) {
  if (mode === "overwrite") return mergeForm(currentForm, patch);

  const next = { ...currentForm };
  Object.keys(patch).forEach((key) => {
    if (!patch[key]) return;
    if (!next[key] || next[key] === defaultForm[key]) next[key] = patch[key];
  });

  next.rawIdea = patch.rawIdea;
  if (
    patch.edit &&
    (!currentForm.edit ||
      currentForm.edit === defaultForm.edit ||
      currentForm.edit === (templates[category] && templates[category].edit))
  ) {
    next.edit = patch.edit;
  }
  next.bottomSafeArea = next.bottomSafeArea || BOTTOM_SAFE_AREA;
  return next;
}

function analyzeOffline(rawIdea, currentForm, mode, fallbackCategory) {
  const category = detectCategory(rawIdea, fallbackCategory);
  const template = templates[category] || templates.general;
  const enhancements = ideaEnhancements(rawIdea);
  const patch = {
    ...template,
    rawIdea,
    photoType: detectPhotoType(rawIdea, category),
    edit: uniqueJoin([rawIdea, template.edit]),
    targetStyle: uniqueJoin([template.targetStyle, enhancements.targetStyle]),
    mood: uniqueJoin([template.mood, enhancements.mood]),
    lighting: uniqueJoin([template.lighting, enhancements.lighting]),
    color: uniqueJoin([template.color, enhancements.color]),
    composition: uniqueJoin([template.composition, enhancements.composition])
  };
  return { category, form: applyFillMode(currentForm, patch, mode, category) };
}

function line(label, value) {
  return `${label}：${clean(value) || "未填写"}`;
}

function annotationRules(form) {
  const parts = [
    clean(form.annotationObjects) ? `注解对象：${form.annotationObjects}` : "",
    clean(form.annotationTextStyle) ? `文字风格：${form.annotationTextStyle}` : "",
    clean(form.lineStyle) ? `线条：${form.lineStyle}` : "",
    clean(form.decorations) ? `装饰：${form.decorations}` : "",
    clean(form.blankSpaceRule) ? `留白：${form.blankSpaceRule}` : ""
  ].filter(Boolean);
  return parts.length ? `${parts.join("\n")}\n如包含文字，文字必须清晰可读，不要生成乱码。` : "";
}

function buildOutputs(form) {
  const annotations = annotationRules(form);
  const full = [
    line("修图目标", `${form.photoType || "日常照片"}；${form.usageScene || "通用修图工具"}`),
    line("保留内容", form.keep),
    line("修改方向", form.edit),
    line("主体与场景", [form.subject, form.scene, form.actionRelation].filter(Boolean).join("；")),
    line("风格要求", [form.targetStyle, form.mood, form.retouchStrength].filter(Boolean).join("；")),
    line("光线与色彩", [form.lighting, form.color, form.texture].filter(Boolean).join("；")),
    line("构图与画质", [form.composition, form.aspectRatio, form.quality].filter(Boolean).join("；")),
    annotations ? line("注解与涂鸦规则", annotations) : "",
    line("底部安全留白", form.bottomSafeArea || BOTTOM_SAFE_AREA),
    line("禁止项", form.negativePrompt)
  ].filter(Boolean).join("\n\n");

  const layered = [
    line("主体", form.subject || form.photoType),
    line("场景", form.scene || form.usageScene),
    line("动作 / 关系", form.actionRelation),
    line("氛围", form.mood),
    line("光线", form.lighting),
    line("色彩", form.color),
    line("质感", form.texture),
    line("构图", [form.composition, form.aspectRatio].filter(Boolean).join("；")),
    line("画质", form.quality),
    annotations ? line("注解 / 涂鸦", annotations) : "",
    line("底部安全留白", form.bottomSafeArea || BOTTOM_SAFE_AREA),
    line("负面词", form.negativePrompt)
  ].filter(Boolean).join("\n");

  const compact = [
    form.photoType || "日常照片修图",
    form.edit,
    form.targetStyle,
    form.mood,
    form.lighting,
    form.color,
    form.quality,
    annotations ? "加入清晰可读的注解或涂鸦覆盖，保留底图可辨识" : "",
    "底部额外预留不少于 240px 纯白色范围，或约占画面高度 12% 的底部安全留白区",
    form.negativePrompt ? `不要：${form.negativePrompt}` : ""
  ].filter(Boolean).join("，");

  const json = JSON.stringify({
    photo_type: form.photoType,
    task: form.edit,
    keep: form.keep,
    edit: form.edit,
    subject: form.subject,
    scene: form.scene,
    style: form.targetStyle,
    lighting: form.lighting,
    color: form.color,
    composition: form.composition,
    quality: form.quality,
    annotations,
    bottom_safe_area: form.bottomSafeArea || BOTTOM_SAFE_AREA,
    negative_prompt: form.negativePrompt
  }, null, 2);

  return { full, layered, compact, json };
}

Page({
  data: {
    selectedCategory: "general",
    categories,
    fields,
    tabs,
    effectChips,
    trendTemplates,
    activeTab: "full",
    advancedOpen: false,
    examplesOpen: false,
    trendsOpen: false,
    form: { ...defaultForm },
    outputs: buildOutputs(defaultForm),
    currentOutput: buildOutputs(defaultForm).full,
    filledScore: 0
  },

  onLoad() {
    const saved = wx.getStorageSync(STORAGE_KEY);
    if (saved && saved.form) {
      this.setData({
        form: mergeForm(defaultForm, saved.form),
        selectedCategory: saved.selectedCategory || "general",
        activeTab: saved.activeTab || "full",
        advancedOpen: !!saved.advancedOpen,
        examplesOpen: !!saved.examplesOpen,
        trendsOpen: !!saved.trendsOpen
      });
    }
    this.refreshOutputs();
  },

  persist() {
    wx.setStorageSync(STORAGE_KEY, {
      form: this.data.form,
      selectedCategory: this.data.selectedCategory,
      activeTab: this.data.activeTab,
      advancedOpen: this.data.advancedOpen,
      examplesOpen: this.data.examplesOpen,
      trendsOpen: this.data.trendsOpen
    });
  },

  refreshOutputs() {
    const outputs = buildOutputs(this.data.form);
    const filled = Object.keys(this.data.form).filter((key) => clean(this.data.form[key])).length;
    this.setData({
      outputs,
      currentOutput: outputs[this.data.activeTab],
      filledScore: Math.min(100, Math.round((filled / fields.length) * 100))
    });
    this.persist();
  },

  onRawIdeaInput(event) {
    this.setData({ "form.rawIdea": event.detail.value });
    this.refreshOutputs();
  },

  onFieldInput(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({ [`form.${key}`]: event.detail.value });
    this.refreshOutputs();
  },

  selectCategory(event) {
    const id = event.currentTarget.dataset.id;
    this.setData({
      selectedCategory: id,
      form: resetCategoryForm(this.data.form, id)
    });
    this.refreshOutputs();
  },

  selectTrendTemplate(event) {
    const index = Number(event.currentTarget.dataset.index);
    const trend = this.data.trendTemplates[index];
    const category = trend.category || trend.id;
    const template = templates[category] || templates.general;
    const patch = {
      ...template,
      ...(trend.form || {}),
      rawIdea: trend.rawIdea || (trend.form && trend.form.rawIdea) || this.data.form.rawIdea
    };
    this.setData({
      selectedCategory: category,
      form: resetTrendForm(patch)
    });
    this.refreshOutputs();
    wx.showToast({ title: "已换成这套灵感", icon: "success" });
  },

  addEffectChip(event) {
    const text = event.currentTarget.dataset.text;
    const current = clean(this.data.form.rawIdea);
    const next = current.includes(text) ? current : `${current}${current ? "，" : ""}${text}`;
    this.setData({ "form.rawIdea": next });
    this.refreshOutputs();
  },

  toggleExamples() {
    this.setData({ examplesOpen: !this.data.examplesOpen });
    this.persist();
  },

  toggleTrends() {
    this.setData({ trendsOpen: !this.data.trendsOpen });
    this.persist();
  },

  analyzeOverwrite() {
    this.analyze("overwrite");
  },

  analyzeFillEmpty() {
    this.analyze("fill-empty");
  },

  analyze(mode) {
    const rawIdea = clean(this.data.form.rawIdea);
    if (!rawIdea) {
      wx.showToast({ title: "先写一句原始想法", icon: "none" });
      return;
    }
    const analyzed = analyzeOffline(rawIdea, this.data.form, mode, this.data.selectedCategory);
    this.setData({
      selectedCategory: analyzed.category,
      form: analyzed.form
    });
    this.refreshOutputs();
    wx.showToast({ title: mode === "overwrite" ? "已覆盖填充" : "已补齐空项", icon: "success" });
  },

  toggleAdvanced() {
    this.setData({ advancedOpen: !this.data.advancedOpen });
    this.persist();
  },

  clearAll() {
    this.setData({
      form: { ...defaultForm },
      selectedCategory: "general",
      activeTab: "full",
      advancedOpen: false,
      examplesOpen: false,
      trendsOpen: false
    });
    this.refreshOutputs();
    wx.showToast({ title: "已清空", icon: "success" });
  },

  setTab(event) {
    const id = event.currentTarget.dataset.id;
    this.setData({ activeTab: id, currentOutput: this.data.outputs[id] });
    this.persist();
  },

  copyCurrent() {
    wx.setClipboardData({
      data: this.data.currentOutput,
      success: () => wx.showToast({ title: "已复制", icon: "success" })
    });
  },

  copyAll() {
    const text = `【完整提示词】\n${this.data.outputs.full}\n\n【分层关键词】\n${this.data.outputs.layered}\n\n【一句话压缩版】\n${this.data.outputs.compact}\n\n【JSON 结构化提示词】\n${this.data.outputs.json}`;
    wx.setClipboardData({
      data: text,
      success: () => wx.showToast({ title: "已复制全部", icon: "success" })
    });
  }
});
