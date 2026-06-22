const BOTTOM_SAFE_AREA =
  "生成的每张图底部都额外多留出不少于 240px 的纯白色范围，或约占画面高度 12% 的底部安全留白区，用作后期放文字、排版或避免重要内容被底部平台信息遮挡；不要在这一区域放主体、注解、装饰元素或杂乱背景。";

const STORAGE_KEY = "photoKeywordsMiniProgram";
const SHARE_TITLE = "修图魔法铺｜一句话整理修图关键词";
const SHARE_PATH = "/pages/index/index";

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
  { id: "meme", name: "表情包编辑", desc: "做聊天梗图，保留文字区和表情" },
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
  meme: {
    photoType: "表情包 / 梗图素材",
    usageScene: "聊天表情、朋友圈吐槽图、社交平台梗图",
    keep: "保留主体表情、动作、身份特征和最有梗的瞬间；不要改变人物、宠物或物件的核心特征",
    edit: "整理成适合聊天发送的 1:1 表情包构图，主体居中或略偏上，底部或画面空白处预留大字文案区",
    subject: "照片里的主要人物、宠物或物件",
    scene: "保留原始场景的关键信息，背景可以适度简化",
    actionRelation: "突出最有反应感的表情、动作或互动瞬间",
    targetStyle: "干净好笑、轻量夸张、聊天表情包、社交媒体梗图",
    mood: "根据用户填写的梗来决定情绪，可以是无语、震惊、敷衍、开心、崩溃、阴阳怪气",
    composition: "1:1 方图，主体不要被文字遮挡，文字区清楚，适合手机聊天里一眼看懂",
    aspectRatio: "1:1",
    lighting: "保持照片原本光线，适度提亮主体，让表情和动作更清楚",
    color: "干净明亮，轻微增强对比，文字和贴纸需要清晰可见",
    texture: "保留真实照片质感，可以轻微锐化主体边缘",
    quality: "适合聊天窗口预览的小图清晰度，主体表情一眼可辨认",
    retouchStrength: "中等修图",
    annotationObjects: "主体表情、动作、手势、道具和空白文字区",
    annotationTextStyle: "粗体大字、短句、清晰可读，适合聊天窗口里一眼看懂",
    lineStyle: "可用少量描边、高亮线、箭头或气泡强调表情和动作",
    decorations: "少量贴纸、气泡、箭头、感叹号、描边、高亮线，不要铺满画面",
    blankSpaceRule: "底部或画面空白处保留文字区，文字不要遮挡脸、表情和关键动作",
    negativePrompt: "不要生成乱码文字，不要过度贴纸，不要遮挡脸和关键动作，不要把表情改得太离谱"
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
    quality: "高清自然，细节清楚，少一点机器感",
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
    name: "手账注解碎碎念",
    tag: "白线小批注",
    desc: "白色手绘线、小箭头、小字批注和可爱装饰，适合咖啡、餐桌、Plog、日常随拍。",
    rawIdea: "日常照片加白色手账注解，小箭头指向细节，小字碎碎念，可爱装饰少量点缀，保留原图氛围和底部留白",
    form: {
      ...templates.note,
      rawIdea: "日常照片加白色手账注解，小箭头指向细节，小字碎碎念，可爱装饰少量点缀，保留原图氛围和底部留白",
      photoType: "咖啡/餐桌/Plog/日常随拍",
      usageScene: "小红书生活笔记、朋友圈日常图、照片注解模板",
      keep: "保留原照片构图、主体、真实光影、食物或小物细节和生活氛围",
      edit: "添加白色手绘线条、物件轮廓描边、小箭头或虚线引导、短句小字批注、圆圈标记和少量可爱装饰；线条要像真实手账笔迹，保留原图氛围",
      targetStyle: "手账注解、白色手绘线稿、日系可爱小批注、生活感Plog",
      mood: "日记感、小碎念、轻松、可爱但不幼稚、真实分享感",
      lighting: "保留原照片自然光，不额外制造强滤镜；必要时轻微提亮暗部",
      color: "以白色手绘线为主，少量奶油色、浅粉、浅蓝或浅黄点缀，整体温柔干净",
      texture: "真实照片底图、清晰手绘线条、轻微纸感或手写笔触",
      composition: "注解围绕主体和细节分布，箭头指向咖啡、甜品、书本、包包、桌面小物或背景亮点，不遮挡主体和人物脸部",
      quality: "线条清晰自然，文字可读，照片细节保留，不要机械矢量感",
      annotationObjects: "自动识别画面中的食物、饮料、小物、穿搭、空间角落、光影和适合被箭头指向的小细节",
      annotationTextStyle: "小字手写批注、短句碎碎念、温柔口吻，像朋友在照片旁写的日记备注",
      lineStyle: "白色细线、一笔画、轻微抖动、箭头、虚线、圆圈、局部轮廓描边",
      decorations: "小星星、爱心、闪光、热气、笑脸、花朵、胶带边、小圆点，少量点缀",
      blankSpaceRule: "注解和装饰围绕主体分布，保留明显空白，不进入底部安全留白区；底部留给后期放标题或文案",
      negativePrompt: "不要铺满画面，不要遮挡脸和主体，不要生成乱码文字，不要改掉原照片内容，不要使用品牌logo或影视角色元素"
    }
  },
  {
    id: "doodle_snap",
    category: "doodle_snap",
    name: "涂鸦快照故事风",
    tag: "霓虹马克笔",
    desc: "真实手机随拍、霓虹马克笔、密集混乱涂鸦和杂志标记感，适合故事批注图。",
    rawIdea: "真实手机随拍，加霓虹马克笔和密集混乱涂鸦，像杂志标记和社交媒体故事批注，底图仍然能看清",
    form: {
      ...templates.doodle_snap,
      rawIdea: "真实手机随拍，加霓虹马克笔和密集混乱涂鸦，像杂志标记和社交媒体故事批注，底图仍然能看清",
      photoType: "真实手持手机随拍快照",
      usageScene: "抖音/Instagram/TikTok故事图、朋友随拍、校园或街头Plog",
      keep: "保留真实手机随拍感、现场光、不完美构图、人物或物件主体、背景环境和轻微噪点",
      edit: "叠加高能、密集、混乱的数字马克笔涂鸦；用亮粉色或荧光色粗线圈出主体，加入青色偏移、黄橙尖刺、手写大字、杂志标记、故事批注、箭头、下划线、涂鸦条和随机小符号",
      targetStyle: "真实手机快照、霓虹马克笔涂鸦、杂志标记、社交媒体故事批注、学生日记感",
      mood: "青春、俏皮、夸张、密集、反差感、有一点过度刺激但很好玩",
      lighting: "保留现场光和手机曝光，允许轻微糊、噪点、闪光灯或夜景环境光",
      color: "亮粉色、荧光绿、青色偏移、黄橙尖刺、黑色摇晃轮廓和高对比霓虹点缀",
      texture: "粗糙数字马克笔、手写笔压变化、涂鸦覆盖层、轻微扫描杂志质感",
      composition: "涂鸦层可明显覆盖画面上方和四周，主体周围有圈选和箭头，但底图和人物表情仍可辨认；底部安全留白不要被涂满",
      quality: "底图保持真实快照清晰度，涂鸦边缘粗糙有手写感，文字尽量短且可读",
      annotationObjects: "主体轮廓、表情、动作、手中道具、背景海报、路牌、桌面物件、光源和人群",
      annotationTextStyle: "粗糙手写大字、情绪短词、重复词、日期标签、杂志旁注、故事贴纸感",
      lineStyle: "粗马克笔线、荧光描边、青色偏移线、摇晃黑色轮廓、箭头、下划线和涂鸦框",
      decorations: "星星、闪电、感叹号、贴纸块、胶带条、光环、爱心、抽象眼睛、花朵、计数符号",
      blankSpaceRule: "四周允许密集批注和符号，但底部安全留白区仍要保留给后期排版，不要完全盖住照片信息",
      negativePrompt: "不要做成干净极简风，不要只有少量装饰，不要柔和淡雅，不要把底图完全盖住，不要生成乱码文字，不要让主体完全不可辨认"
    }
  },
  {
    id: "photo_dump_collage",
    category: "lifestyle",
    name: "照片拼贴Plog",
    tag: "碎片日常",
    desc: "多张日常碎片、白边拼贴、日期贴纸和轻手写，适合朋友圈/小红书九宫格封面。",
    rawIdea: "把日常照片做成Plog照片拼贴，白边相纸、轻微错位、日期贴纸和短句手写，像真实生活碎片合集",
    form: {
      ...templates.lifestyle,
      rawIdea: "把日常照片做成Plog照片拼贴，白边相纸、轻微错位、日期贴纸和短句手写，像真实生活碎片合集",
      photoType: "日常Plog、旅行碎片、咖啡餐桌或穿搭照片",
      usageScene: "小红书封面、朋友圈九宫格首图、Instagram/TikTok photo dump",
      keep: "保留每张照片的真实主体、生活场景、人物特征和原始氛围，不改变身份和重要物件",
      edit: "整理成轻拼贴版式，加入白边相纸、轻微错位叠放、日期标签、简短手写标题、小贴纸和少量胶带元素；整体像真实生活碎片合集",
      targetStyle: "photo dump、Plog拼贴、白边相纸、轻复古、手写标签、生活碎片",
      mood: "松弛、真实、轻怀旧、亲密分享感、不刻意摆拍",
      lighting: "统一为柔和自然光，避免单张照片过曝或过暗，保留抓拍感",
      color: "低饱和暖白、轻微胶片偏色、奶油白边、少量红蓝日期贴纸点缀",
      texture: "相纸白边、轻颗粒、胶带纸感、扫描感、真实照片纹理",
      composition: "主体照片最大，其他碎片错位围绕；保留标题区和底部安全留白，拼贴不要过度拥挤",
      quality: "照片边缘干净，拼贴层级清楚，文字短且可读，整体适合移动端预览",
      annotationObjects: "日期、地点、小物、餐桌、路牌、穿搭细节、票据、花、咖啡杯、书页",
      annotationTextStyle: "短句手写、日期编号、地点小标签、像Plog标题的温柔备注",
      lineStyle: "细手写线、轻微下划线、圆圈、胶带边框、相纸白边",
      decorations: "胶带、贴纸点、票根、迷你星星、圆点、相机时间戳、白色边框",
      blankSpaceRule: "拼贴元素围绕主体排布，底部安全留白区保持干净，方便后期放标题或平台文案",
      negativePrompt: "不要变成商业海报，不要使用真实品牌logo，不要塞满文字，不要让照片主体被切碎，不要生成乱码日期"
    }
  },
  {
    id: "soft_real_life",
    category: "lifestyle",
    name: "柔光真实生活感",
    tag: "清透不网红",
    desc: "柔光、浅色、真实生活痕迹和干净构图，适合自拍、房间、咖啡馆和日常记录。",
    rawIdea: "把日常照片修成柔光真实生活感，清透干净但保留生活痕迹和真实肤色，不要网红滤镜",
    form: {
      ...templates.lifestyle,
      rawIdea: "把日常照片修成柔光真实生活感，清透干净但保留生活痕迹和真实肤色，不要网红滤镜",
      photoType: "自拍、合照、房间、咖啡馆、书桌或餐桌日常照片",
      usageScene: "小红书日常笔记、头像背景、朋友圈生活图、轻修图模板",
      keep: "保留人物五官、肤色、发型、服装、空间结构、物件位置和生活痕迹",
      edit: "提亮暗部和肤色，压住杂乱高饱和颜色，清理明显干扰物，保留真实纹理和自然瑕疵，画面更柔和清透",
      targetStyle: "柔光自然风、真实生活感、浅色干净、低痕迹AI修图、轻日系",
      mood: "温柔、舒服、松弛、亲近、真实但更好看",
      lighting: "柔和窗边散射光或自然光，脸部不过曝，阴影自然，有轻微梦幻柔光",
      color: "暖白、浅木色、低饱和粉米色、自然肤色、少量清透蓝绿，不脏黄",
      texture: "真实皮肤纹理、布料和木纹细节、轻微胶片颗粒、柔和高光",
      composition: "主体清楚，背景简洁但不空洞，保留生活感物件；底部安全留白区干净",
      quality: "高清自然，不要过度磨皮或AI塑料质感，移动端看起来清透",
      annotationObjects: "可选标注窗光、桌面小物、穿搭细节、咖啡杯、书、花和房间角落",
      annotationTextStyle: "如需文字，用极少量小字，温柔短句，不抢画面",
      lineStyle: "可选细白线或浅色圆圈，保持克制",
      decorations: "少量闪光、圆点、浅色贴纸或无装饰，优先保持干净",
      blankSpaceRule: "留白自然，不要把主体放到底部安全区；需要封面时保留标题空间",
      negativePrompt: "不要网红脸，不要大眼瘦脸，不要过度磨皮，不要样板间，不要强HDR，不要改变真实身份和空间结构"
    }
  },
  {
    id: "ai_sticker_cutout",
    category: "pet_object",
    name: "AI贴纸小卡",
    tag: "可爱可套用",
    desc: "主体抠出、柔和描边、贴纸阴影和小卡片排版，适合宠物、小物、自拍和头像素材。",
    rawIdea: "把照片主体做成原创可爱贴纸小卡，干净抠图、柔和描边、轻阴影、小装饰和留白，不用任何IP角色",
    form: {
      ...templates.pet_object,
      rawIdea: "把照片主体做成原创可爱贴纸小卡，干净抠图、柔和描边、轻阴影、小装饰和留白，不用任何IP角色",
      photoType: "宠物、小物、自拍半身、头像或穿搭主体照片",
      usageScene: "头像、聊天贴纸、社交媒体封面、小红书收藏卡片",
      keep: "保留主体真实外形、表情、毛发或材质、服装和关键特征，不套用任何现成IP形象",
      edit: "将主体清晰抠出，加入柔和白色或浅色描边、轻微投影、圆角小卡片背景、可爱贴纸装饰和短标题留白",
      targetStyle: "原创AI贴纸、干净抠图、小卡片排版、可爱但不幼稚、社交头像素材",
      mood: "可爱、轻松、治愈、精致、适合收藏",
      lighting: "主体光线自然均匀，补足暗部，投影方向一致",
      color: "奶油白、浅粉、浅蓝、薄荷绿或柔和浅黄，主体颜色准确不过饱和",
      texture: "贴纸白边、柔和纸卡质感、轻阴影、真实主体纹理",
      composition: "主体居中或略偏上，四周留出描边和装饰空间，底部保留文字安全区",
      quality: "抠图边缘干净，毛发或细节自然，描边统一，适合小图预览",
      annotationObjects: "主体、表情、手势、宠物毛发、小物材质、可做贴纸的轮廓边缘",
      annotationTextStyle: "短标题、可爱小标签、1到4个字为主，清晰可读",
      lineStyle: "柔和白色粗描边、浅色二层描边、小圆点边框、轻阴影",
      decorations: "小星星、闪光、爱心、花朵、圆点、胶带、小标签、迷你气泡",
      blankSpaceRule: "主体不要贴边，底部安全留白保持干净，文字和装饰不要遮挡脸或宠物表情",
      negativePrompt: "不要使用知名动漫、影视、游戏IP风格或角色，不要改变主体身份，不要多生成肢体，不要抠图毛边，不要乱码文字"
    }
  },
  {
    id: "wilderkind_garden",
    category: "travel",
    name: "小森林自然感",
    tag: "自然治愈",
    desc: "花草、斑驳光、柔雾和自然纹理，适合公园、露营、花店、旅行和户外人像。",
    rawIdea: "把户外或花草照片修成小森林自然感，斑驳阳光、柔雾、叶子花朵点缀，真实治愈不夸张",
    form: {
      ...templates.travel,
      rawIdea: "把户外或花草照片修成小森林自然感，斑驳阳光、柔雾、叶子花朵点缀，真实治愈不夸张",
      photoType: "公园、花店、露营、旅行、户外人像或植物照片",
      usageScene: "小红书治愈系笔记、旅行封面、春夏户外Plog、自然风头像背景",
      keep: "保留真实地点、人物特征、植物种类大致形态、自然光线方向和空间透视",
      edit: "增强自然绿意和花草层次，加入轻柔雾感、斑驳阳光、浅景深和少量植物系小标注；整体真实治愈，不做奇幻大片",
      targetStyle: "小森林、自然治愈、wilderkind灵感、花草日记、柔雾户外写真",
      mood: "安静、清新、自由、治愈、轻微童话但仍真实",
      lighting: "树影斑驳光、傍晚暖光或阴天柔光，高光不过曝，暗部有层次",
      color: "清透绿、苔藓绿、奶油白、浅黄阳光、少量花朵粉紫点缀，避免脏绿",
      texture: "叶片纹理、花瓣、草地、木头、轻雾、细颗粒和自然空气感",
      composition: "主体置于自然环境中，前景可有少量叶片或花朵虚化，保留底部安全留白和标题空间",
      quality: "高清自然，植物边缘不要糊成一团，人物肤色保持真实",
      annotationObjects: "花朵、叶片、阳光、篮子、书、帽子、露营小物、路牌和自然纹理",
      annotationTextStyle: "很少量手写小字，像植物观察日记或旅行备注",
      lineStyle: "细白线、浅绿色虚线、圆圈、小箭头，保持轻盈",
      decorations: "小花、叶片、闪光、蝴蝶形状、圆点、胶片日期，不使用真实品牌元素",
      blankSpaceRule: "装饰和注解只放在边缘或空白处，不遮挡人物脸部、花草主体和底部安全留白",
      negativePrompt: "不要过度梦幻，不要生成不存在的大型动物或奇怪植物，不要脏绿，不要强HDR，不要改变真实地标和人物身份"
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
  "小物照片更可爱，奶油色，柔和自然光，细节清楚",
  "做成 1:1 表情包，底部留文字区，我自己填写想表达的梗"
];

const rules = [
  { category: "meme", words: ["表情包", "梗图", "斗图", "聊天表情", "吐槽图", "吐槽", "阴阳怪气", "无语", "破防", "崩溃", "笑死", "发疯"] },
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
  if (hasAny(text, ["表情包", "梗图", "斗图", "聊天表情", "吐槽图"])) return "表情包 / 梗图素材";
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
      hasAny(text, ["电影", "电影感"]) ? "电影感、柔和对比" : "",
      hasAny(text, ["表情包", "梗图", "斗图", "吐槽"]) ? "聊天表情包、社交媒体梗图、干净好笑" : ""
    ]),
    mood: uniqueJoin([
      hasAny(text, ["温暖", "暖"]) ? "温暖" : "",
      hasAny(text, ["松弛", "放松", "舒服"]) ? "松弛、舒服" : "",
      hasAny(text, ["可爱", "小碎念"]) ? "可爱、日记感" : "",
      hasAny(text, ["安静", "治愈"]) ? "安静、治愈" : "",
      hasAny(text, ["夏日", "海边"]) ? "夏日、清爽" : "",
      hasAny(text, ["怀旧", "复古", "ccd", "胶片"]) ? "怀旧、随手记录感" : "",
      hasAny(text, ["无语", "震惊", "敷衍", "崩溃", "阴阳怪气", "破防", "笑死", "发疯"]) ? "情绪明确、反应感强、适合聊天表达" : ""
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
      hasAny(text, ["手绘", "注解", "箭头"]) ? "注解围绕物件分布，保留空白，不遮挡主体和人物脸部" : "",
      hasAny(text, ["表情包", "梗图", "斗图", "文字区"]) ? "1:1 方图，主体居中或略偏上，底部或空白处保留大字文字区" : ""
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
    if (wx.showShareMenu) {
      wx.showShareMenu({
        menus: ["shareAppMessage", "shareTimeline"]
      });
    }

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

  onShareAppMessage() {
    return {
      title: SHARE_TITLE,
      path: SHARE_PATH
    };
  },

  onShareTimeline() {
    return {
      title: SHARE_TITLE,
      query: ""
    };
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
    wx.showToast({ title: mode === "overwrite" ? "已生成提示词" : "已补齐空项", icon: "success" });
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
