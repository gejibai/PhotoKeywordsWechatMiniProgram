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
  { id: "portrait", name: "人物照片轻修", desc: "自拍、合照、头像、证件感轻修" },
  { id: "lifestyle", name: "生活场景增强", desc: "房间、咖啡馆、书桌、餐桌" },
  { id: "film", name: "胶片 / CCD", desc: "复古颗粒、低饱和、氛围感" },
  { id: "note", name: "照片手账注解", desc: "白色手绘线、箭头、小碎念" },
  { id: "travel", name: "风景旅行", desc: "城市、海边、山野、记忆感" },
  { id: "pet_object", name: "宠物 / 小物件", desc: "猫狗、玩偶、杯子、书" },
  { id: "cleanup", name: "背景清理", desc: "去杂物、补背景、留白" },
  { id: "general", name: "通用修图增强", desc: "自然、干净、真实" }
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
  { key: "annotationObjects", label: "注解对象", noteOnly: true },
  { key: "annotationTextStyle", label: "注解文字风格", noteOnly: true },
  { key: "lineStyle", label: "线条风格", noteOnly: true },
  { key: "decorations", label: "装饰元素", noteOnly: true },
  { key: "blankSpaceRule", label: "注解留白规则", multiline: true, noteOnly: true },
  { key: "negativePrompt", label: "禁止项", multiline: true },
  { key: "bottomSafeArea", label: "底部安全留白", multiline: true }
];

const tabs = [
  { id: "full", name: "完整" },
  { id: "layered", name: "分层" },
  { id: "compact", name: "一句话" },
  { id: "json", name: "JSON" }
];

function hasAny(text, words) {
  return words.some((word) => text.includes(word));
}

function detectCategory(rawIdea) {
  const text = rawIdea.toLowerCase();
  if (hasAny(text, ["手账", "注解", "涂鸦", "标注", "箭头", "小字", "日系", "可爱", "白色线条", "描边"])) return "note";
  if (hasAny(text, ["清理", "去掉", "去除", "擦除", "扩图", "补背景", "留白", "白边", "墙面", "杂物"])) return "cleanup";
  if (hasAny(text, ["胶片", "ccd", "复古", "日杂", "怀旧", "颗粒", "低饱和", "闪光灯", "拍立得"])) return "film";
  if (hasAny(text, ["自拍", "人像", "人物", "合照", "脸", "皮肤", "妆容", "穿搭", "证件照", "写真", "五官"])) return "portrait";
  if (hasAny(text, ["旅行", "街景", "风景", "海边", "天空", "城市", "山", "树", "日落", "咖啡店", "路牌"])) return "travel";
  if (hasAny(text, ["猫", "狗", "宠物", "小物", "玩偶", "杯子", "花", "书", "桌面", "植物"])) return "pet_object";
  if (hasAny(text, ["房间", "卧室", "客厅", "咖啡馆", "餐厅", "书桌", "室内", "空间", "餐桌"])) return "lifestyle";
  return "general";
}

function fillEmpty(form, patch) {
  const next = { ...form };
  Object.keys(patch).forEach((key) => {
    if (patch[key] && !next[key]) next[key] = patch[key];
  });
  next.bottomSafeArea = next.bottomSafeArea || BOTTOM_SAFE_AREA;
  return next;
}

function mergeForm(form, patch) {
  return { ...form, ...patch, bottomSafeArea: patch.bottomSafeArea || form.bottomSafeArea || BOTTOM_SAFE_AREA };
}

function noteRules(form) {
  const parts = [
    form.annotationObjects ? `注解对象：${form.annotationObjects}` : "",
    form.annotationTextStyle ? `文字风格：${form.annotationTextStyle}` : "",
    form.lineStyle ? `线条：${form.lineStyle}` : "",
    form.decorations ? `装饰：${form.decorations}` : "",
    form.blankSpaceRule ? `留白：${form.blankSpaceRule}` : ""
  ].filter(Boolean);
  return parts.length ? `${parts.join("\n")}\n文字必须清晰可读，不要生成乱码。` : "无特殊手账注解要求。";
}

function buildOutputs(form) {
  const full = [
    `修图目标：${form.photoType || "日常照片"}；${form.usageScene || "通用修图工具"}`,
    `保留内容：${form.keep || "未填写"}`,
    `修改方向：${form.edit || "未填写"}`,
    `主体与场景：${[form.subject, form.scene, form.actionRelation].filter(Boolean).join("；") || "未填写"}`,
    `风格要求：${[form.targetStyle, form.mood, form.retouchStrength].filter(Boolean).join("；") || "未填写"}`,
    `光线与色彩：${[form.lighting, form.color, form.texture].filter(Boolean).join("；") || "未填写"}`,
    `构图与画质：${[form.composition, form.aspectRatio, form.quality].filter(Boolean).join("；") || "未填写"}`,
    `手账注解规则：${noteRules(form)}`,
    `底部安全留白：${form.bottomSafeArea || BOTTOM_SAFE_AREA}`,
    `禁止项：${form.negativePrompt || "未填写"}`
  ].join("\n\n");

  const layered = [
    `主体：${form.subject || form.photoType || "未填写"}`,
    `场景：${form.scene || form.usageScene || "未填写"}`,
    `动作 / 关系：${form.actionRelation || "未填写"}`,
    `氛围：${form.mood || "未填写"}`,
    `光线：${form.lighting || "未填写"}`,
    `色彩：${form.color || "未填写"}`,
    `质感：${form.texture || "未填写"}`,
    `构图：${[form.composition, form.aspectRatio].filter(Boolean).join("；") || "未填写"}`,
    `画质：${form.quality || "未填写"}`,
    `手账注解：${noteRules(form)}`,
    `底部安全留白：${form.bottomSafeArea || BOTTOM_SAFE_AREA}`,
    `负面词：${form.negativePrompt || "未填写"}`
  ].join("\n");

  const compact = [
    form.photoType || "日常照片修图",
    form.edit,
    form.targetStyle,
    form.mood,
    form.lighting,
    form.color,
    form.quality,
    form.annotationObjects || form.lineStyle ? "白色手绘注解、短句小碎念、保留空白" : "",
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
    activeTab: "full",
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
        activeTab: saved.activeTab || "full"
      });
    }
    this.refreshOutputs();
  },

  persist() {
    wx.setStorageSync(STORAGE_KEY, {
      form: this.data.form,
      selectedCategory: this.data.selectedCategory,
      activeTab: this.data.activeTab
    });
  },

  refreshOutputs() {
    const outputs = buildOutputs(this.data.form);
    const filled = Object.keys(this.data.form).filter((key) => String(this.data.form[key] || "").trim()).length;
    this.setData({
      outputs,
      currentOutput: outputs[this.data.activeTab],
      filledScore: Math.min(100, Math.round((filled / 24) * 100))
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
    this.setData({ selectedCategory: id, form: fillEmpty(this.data.form, templates[id] || templates.general) });
    this.refreshOutputs();
  },

  analyzeOverwrite() {
    this.analyze("overwrite");
  },

  analyzeFillEmpty() {
    this.analyze("fill-empty");
  },

  analyze(mode) {
    const rawIdea = (this.data.form.rawIdea || "").trim();
    if (!rawIdea) {
      wx.showToast({ title: "先写一句原始想法", icon: "none" });
      return;
    }
    const category = detectCategory(rawIdea);
    const patch = { ...templates[category], rawIdea };
    this.setData({
      selectedCategory: category,
      form: mode === "overwrite" ? mergeForm(this.data.form, patch) : fillEmpty(this.data.form, patch)
    });
    this.refreshOutputs();
    wx.showToast({ title: mode === "overwrite" ? "已覆盖填充" : "已补齐空项", icon: "success" });
  },

  clearAll() {
    this.setData({ form: { ...defaultForm }, selectedCategory: "general", activeTab: "full" });
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
