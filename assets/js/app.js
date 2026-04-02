// ╔══════════════════════════════════════════════════════════╗
//  CITYSTARS AI WAYFINDING — v2 Professional
//  Model: gpt-4o via OpenAI Responses API
//  Features: Persistent chat, End session, Premium UI
// ╚══════════════════════════════════════════════════════════╝

const OPENAI_MODEL = 'gpt-5.4-mini';

const VOICES = {
  male:   'ihycSANIrpHfhWoaq1g3',
  female: 'IES4nrmZdUBHByLBde0P'
};

const SILENCE_MS = 300;
const IDLE_TIMEOUT_MS = 60 * 1000;
const CUSTOMER_SERVICE_NUMBER = '1977';

// ── HINT CHIPS ──
const HINTS = [
  'زارا فين؟', 'عايز أكل بيتزا', 'الحمام فين؟',
  'فيه سينما؟', 'محلات رياضة', 'ستاربكس فين؟',
  'ماكدونالدز فين؟', 'سيفورا فين؟', 'الفود كورت',
  'عايزة كافيه كويس', 'الـ ATM فين؟', 'محلات شنط'
];

// ──────────────────────────────────────────────
//  MALL DATA
// ──────────────────────────────────────────────
const MALL_DATA = {
  restaurants: [
    { name: 'سي رانش',            floor: 'Level 2 - الفود كورت', desc: 'مأكولات بحرية وبيتزا جمبري وسمون تحفة', tags: ['بيتزا','مأكولات بحرية','جمبري','سمك','ستيك'] },
    { name: 'بي سي',             floor: 'Level 2 - الفود كورت', desc: 'إيطالي: بيتزا عجينة رقيقة وباستا كريمي ولازانيا', tags: ['بيتزا','باستا','إيطالي','لازانيا'] },
    { name: 'ستاربكس',           floor: 'Level 1, Level 2',     desc: 'قهوة ومشروبات ساخنة وباردة وسناكس', tags: ['قهوة','كافيه','حاجة حلوة'] },
    { name: 'كاريبو كوفي',       floor: 'Level 1',              desc: 'قهوة متخصصة ومشروبات سريعة', tags: ['قهوة','كافيه'] },
    { name: 'دانكن',             floor: 'Level 1',              desc: 'قهوة ودوناتس وسناكس', tags: ['قهوة','حاجة حلوة','دوناتس'] },
    { name: 'PAUL',              floor: 'Level 3',              desc: 'بيكري وكافيه وفطار خفيف وحلويات', tags: ['فطار','قهوة','حاجة حلوة','بيكري'] },
    { name: 'Espresso Lab',      floor: 'Level 3',              desc: 'قهوة متخصصة', tags: ['قهوة','كافيه'] },
    { name: 'سيلانترو',          floor: 'Level 5',              desc: 'كافيه وقهوة ومشروبات وحلويات', tags: ['قهوة','كافيه','حاجة حلوة'] },
    { name: 'Brioche Dorée',     floor: 'Level 2',              desc: 'مخبوزات وكافيه وفطار خفيف', tags: ['فطار','قهوة','حاجة حلوة'] },
    { name: 'Krispy Kreme',      floor: 'Level 1',              desc: 'دوناتس ومشروبات ساخنة وباردة', tags: ['حاجة حلوة','دوناتس','قهوة'] },
    { name: 'NOLA',              floor: 'Level 1',              desc: 'حلويات وكيك وميني حلو', tags: ['حاجة حلوة'] },
    { name: 'كوستا كوفي',        floor: 'Level 2',              desc: 'قهوة ومشروبات وحلويات', tags: ['قهوة','كافيه','حاجة حلوة'] },
    { name: 'La Mie',            floor: 'Level 0',              desc: 'بيكري وكافيه ومخبوزات', tags: ['فطار','حاجة حلوة','قهوة'] },
    { name: 'ماكدونالدز',        floor: 'Level 6, Level 8',     desc: 'برجر ووجبات سريعة', tags: ['برجر','أكل سريع'] },
    { name: 'كنتاكي',            floor: 'Level 6, Level 8',     desc: 'فرايد تشيكن ووجبات سريعة', tags: ['أكل سريع','دجاج'] },
    { name: 'Buffalo Burger',    floor: 'Level 8',              desc: 'برجر ووجبات سريعة', tags: ['برجر','أكل سريع'] },
    { name: 'Fuddruckers',       floor: 'Level 1',              desc: 'برجر ووجبات أمريكاني', tags: ['برجر','أكل سريع'] },
    { name: "Papa John's",       floor: 'Level 8',              desc: 'بيتزا وسايدز', tags: ['بيتزا'] },
    { name: 'أبو طارق',          floor: 'Level 6',              desc: 'كشري وأكل مصري سريع', tags: ['أكل مصري','أكل سريع','كشري'] },
    { name: 'زوبا',             floor: 'Level 4',              desc: 'أكل مصري حديث وسريع', tags: ['أكل مصري','أكل سريع','فطار'] },
    { name: "Chili's",          floor: 'Level 5',              desc: 'مطعم أمريكاني ووجبات رئيسية وبرجر', tags: ['برجر','مطعم'] },
    { name: "Casper & Gambini's",floor: 'Level 3',              desc: 'مطعم وكافيه وأكل وحلويات', tags: ['مطعم','قهوة','باستا'] },
    { name: 'Bosporus',          floor: 'Level 4',              desc: 'أطباق تركية ومشاوي', tags: ['مطعم','مشويات','تركي'] },
    { name: 'أبو السيد',         floor: 'Level 4',              desc: 'أكل شرقي ومصري', tags: ['مطعم','أكل مصري'] },
    { name: 'Maharaja',          floor: 'Level 5',              desc: 'أكل هندي', tags: ['مطعم','هندي'] },
    { name: 'Sizzler',           floor: 'Level 4',              desc: 'مشويات وستيك', tags: ['مطعم','ستيك','مشويات'] },
    { name: 'Sushi Bay',         floor: 'Level 0',              desc: 'سوشي وأكلات آسيوية', tags: ['سوشي','مطعم'] },
    { name: 'Mori Sushi',        floor: 'Level 0',              desc: 'سوشي ومأكولات آسيوية', tags: ['سوشي','مطعم'] },
    { name: 'Shogun Japanese Restaurant', floor: 'Level 1, Level 2', desc: 'مطعم ياباني وسوشي', tags: ['سوشي','ياباني','مطعم'] },
    { name: 'Maestro Italian Restaurant', floor: 'Level 1, Level 2', desc: 'بيتزا وباستا إيطالي', tags: ['بيتزا','باستا','مطعم'] },
    { name: 'VILLA DI NAPOLI',   floor: 'Level 0',              desc: 'بيتزا وباستا إيطالي', tags: ['بيتزا','باستا','مطعم'] },
    { name: 'Spectra',           floor: 'Level 6',              desc: 'مطعم وكافيه وجلسة', tags: ['مطعم','قهوة'] },
    { name: 'Planet Africa',     floor: 'Level 5, Level 6',     desc: 'مطعم جلسة ومنيو متنوع', tags: ['مطعم'] },
    { name: 'Nişantaşı',        floor: 'Level 5',              desc: 'مطعم وكافيه بطابع تركي', tags: ['مطعم','قهوة','تركي'] },
  ],
  stores: [
    // Fashion
    { name: 'زارا',            floor: 'Level 2', desc: 'ملابس كاجوال وأزياء موسمية', tags: ['ملابس','كاجوال','فاشون','هدوم','لبس'] },
    { name: 'H&M',             floor: 'Level 2', desc: 'ملابس كاجوال وأطفال وأساسيّات', tags: ['ملابس','كاجوال','أطفال','هدوم','لبس'] },
    { name: 'Mango',           floor: 'Level 2', desc: 'ملابس حريمي وكاجوال', tags: ['ملابس','حريمي','كاجوال','فستان'] },
    { name: 'Bershka',         floor: 'Level 2', desc: 'ملابس شبابي وكاجوال', tags: ['ملابس','شبابي','كاجوال'] },
    { name: 'Pull&Bear',       floor: 'Level 2', desc: 'ملابس كاجوال وشبابي', tags: ['ملابس','كاجوال','شبابي'] },
    { name: 'American Eagle',  floor: 'Level 2', desc: 'ملابس كاجوال وجينز', tags: ['ملابس','كاجوال','جينز'] },
    { name: 'Lefties',         floor: 'Level 2', desc: 'ملابس كاجوال وأساسيّات', tags: ['ملابس','كاجوال'] },
    { name: 'Reserved',        floor: 'Level 2', desc: 'ملابس كاجوال وحديثة', tags: ['ملابس','كاجوال'] },
    { name: "Colin's",         floor: 'Level 2', desc: 'جينز وكاجوال', tags: ['ملابس','جينز','كاجوال'] },
    { name: 'Lacoste',         floor: 'Level 2', desc: 'ملابس كاجوال وبولو', tags: ['ملابس','كاجوال','بولو'] },
    { name: 'Puma',            floor: 'Level 2', desc: 'ملابس وأحذية رياضية', tags: ['رياضة','ملابس رياضية','كوتشي'] },
    { name: 'New Balance',     floor: 'Level 2', desc: 'أحذية وملابس رياضية', tags: ['رياضة','كوتشي','أحذية'] },
    { name: 'Converse',        floor: 'Level 2', desc: 'أحذية وكاجوال', tags: ['أحذية','كاجوال','كوتشي'] },
    { name: 'ALDO',            floor: 'Level 2', desc: 'أحذية وشنط', tags: ['أحذية','شنط','جزمة'] },
    { name: 'Carpisa',         floor: 'Level 2', desc: 'شنط وإكسسوارات', tags: ['شنط','إكسسوارات'] },
    { name: 'Pandora',         floor: 'Level 2', desc: 'مجوهرات وإكسسوارات', tags: ['مجوهرات','إكسسوارات','هدية'] },
    { name: "L'azurde",        floor: 'Level 2, Level 3', desc: 'مجوهرات وذهب', tags: ['مجوهرات','ذهب'] },
    { name: 'Sunglass Hut',    floor: 'Level 2', desc: 'نظارات شمس', tags: ['نظارات','شمس'] },
    { name: 'AO! Optics',      floor: 'Level 2', desc: 'نظارات طبية وشمس', tags: ['نظارات','بصريات'] },
    { name: 'MOBACO COTTONS',  floor: 'Level 2', desc: 'ملابس وقمصان', tags: ['ملابس','كاجوال'] },
    { name: 'Koton',           floor: 'Level 2, Level 3', desc: 'ملابس كاجوال وأطفال', tags: ['ملابس','كاجوال','أطفال'] },
    { name: 'Massimo Dutti',   floor: 'Level 3', desc: 'أزياء كلاسيك وكاجوال', tags: ['ملابس','كلاسيك','فاشون'] },
    { name: 'Guess',           floor: 'Level 3', desc: 'ملابس وإكسسوارات', tags: ['ملابس','إكسسوارات','براند'] },
    { name: 'Tommy Hilfiger',  floor: 'Level 3', desc: 'ملابس وإكسسوارات أمريكي', tags: ['ملابس','براند','كاجوال'] },
    { name: "Levi's",          floor: 'Level 3', desc: 'جينز وملابس كاجوال', tags: ['جينز','ملابس'] },
    { name: 'LC Waikiki',      floor: 'Level 3', desc: 'ملابس كاجوال ورجالي وأطفال', tags: ['ملابس','كاجوال','أطفال'] },
    { name: 'CHARLES & KEITH', floor: 'Level 3', desc: 'أحذية وشنط وإكسسوارات', tags: ['أحذية','شنط','إكسسوارات','جزمة'] },
    { name: 'MICHAEL KORS',    floor: 'Level 3', desc: 'شنط وإكسسوارات فاخر', tags: ['شنط','براند فاخر','إكسسوارات'] },
    { name: 'SWAROVSKI',       floor: 'Level 3', desc: 'مجوهرات وإكسسوارات كريستال', tags: ['مجوهرات','هدية','إكسسوارات'] },
    { name: 'Magrabi Optical', floor: 'Level 3', desc: 'نظارات طبية وشمس', tags: ['نظارات','بصريات'] },
    { name: 'GEOX',            floor: 'Level 3', desc: 'أحذية وكاجوال', tags: ['أحذية','كاجوال','جزمة'] },
    { name: 'CONCRETE',        floor: 'Level 3', desc: 'ملابس رجالي', tags: ['ملابس','رجالي'] },
    { name: 'سيفورا',          floor: 'Level 3', desc: 'مكياج وعطور وسكينكير من أشهر الماركات', tags: ['مكياج','عطور','سكينكير','كريم'] },
    { name: 'سعودي ماركت',     floor: 'Level 1', desc: 'سوبرماركت: خضار وفاكهة ولحوم وألبان ومعلبات ومنظفات', tags: ['سوبرماركت','خضار','لحمة','بقالة','منظفات'] },
    { name: 'أديداس',          floor: 'Level 1', desc: 'ملابس وأحذية رياضية', tags: ['رياضة','ملابس رياضية','كوتشي'] },
    { name: 'Decathlon',       floor: 'Level 1', desc: 'معدات وملابس رياضية متنوعة', tags: ['رياضة','معدات رياضية','ملابس رياضية'] },
    { name: 'Skechers',        floor: 'Level 1', desc: 'أحذية مريحة وكاجوال ورياضية', tags: ['أحذية','كوتشي','مريح'] },
    { name: 'Clarks',          floor: 'Level 1', desc: 'أحذية جلد وكاجوال', tags: ['أحذية','جلد','جزمة'] },
    { name: 'Max',             floor: 'Level 1', desc: 'ملابس للعيلة كاملة', tags: ['ملابس','عيلة','كاجوال'] },
    { name: 'Marks & Spencer', floor: 'Level 1', desc: 'ملابس وأساسيّات شاملة', tags: ['ملابس','كاجوال'] },
    { name: 'Cortefiel',       floor: 'Level 1', desc: 'ملابس كاجوال وكلاسيك', tags: ['ملابس','كلاسيك'] },
    { name: 'Okaidi OBaiBi',   floor: 'Level 1', desc: 'ملابس أطفال', tags: ['أطفال','ملابس أطفال'] },
    { name: 'baby shop',       floor: 'Level 1', desc: 'ملابس ومستلزمات أطفال', tags: ['أطفال','مستلزمات أطفال'] },
    { name: 'Parfois',         floor: 'Level 1', desc: 'إكسسوارات وشنط', tags: ['إكسسوارات','شنط'] },
    { name: 'Samsonite',       floor: 'Level 1', desc: 'شنط سفر وحقائب', tags: ['شنط','شنط سفر','حقائب'] },
    { name: 'Alpha Optical',   floor: 'Level 1', desc: 'نظارات طبية وشمس', tags: ['نظارات','بصريات'] },
    { name: 'Reebok',          floor: 'Level 4', desc: 'أحذية وملابس رياضية', tags: ['رياضة','كوتشي','أحذية'] },
    { name: 'ASICS',           floor: 'Level 4', desc: 'أحذية رياضية للجري', tags: ['رياضة','كوتشي','جري'] },
    { name: 'Miniso',          floor: 'Level 4', desc: 'إكسسوارات ومنتجات منزلية وهدايا', tags: ['هدايا','إكسسوارات','منزلية'] },
    { name: 'DeFacto',         floor: 'Level 4', desc: 'ملابس كاجوال يومية', tags: ['ملابس','كاجوال'] },
    { name: 'Crocs',           floor: 'Level -2, Level 2', desc: 'أحذية كاجوال خفيفة', tags: ['أحذية','كاجوال','خفيف'] },
  ],
  facilities: [
    { name: 'المسجد / المصلى',  floor: 'Level 2',  landmarks: 'جنب الحمام وقريب من الـ ATM' },
    { name: 'مصلى الرجال',     floor: 'Level 2',  landmarks: 'جنب الحمام قريب من الممر الرئيسي' },
    { name: 'مصلى الدور الأول', floor: 'Level 1', landmarks: 'جنب الحمام' },
    { name: 'الحمام - دور 2',  floor: 'Level 2',  landmarks: 'جنب المصلى ومنطقة الـ ATM' },
    { name: 'الحمام - دور 1',  floor: 'Level 1',  landmarks: 'قريب من المصلى والمصعد' },
    { name: 'ATM - دور 2',     floor: 'Level 2',  landmarks: 'جنب الحمام في الممر الجانبي' },
    { name: 'ATM - دور 1',     floor: 'Level 1',  landmarks: 'قريب من المصعد الرئيسي' },
    { name: 'غرفة رعاية الأطفال', floor: 'Level 2', landmarks: 'جنب المصلى والحمام' },
    { name: 'الاستعلامات',     floor: 'Level 2',  landmarks: 'قريب من الفود كورت وبوابة 1' },
    { name: 'المصعد الرئيسي',  floor: 'Level 1',  landmarks: 'في منتصف الممر الرئيسي' },
    { name: 'السلم الكهربائي', floor: 'Level 1',  landmarks: 'واضح من الممر الرئيسي' },
  ],
  entertainment: [
    { name: 'Stars Cinema',           floor: 'Level 5',              desc: 'مجمع سينمات كبير' },
    { name: 'Golden Stars Cinema Deluxe', floor: 'Level 0',          desc: 'سينما ديلوكس فاخرة' },
    { name: 'Magic Galaxy',           floor: 'Level 4, Level 5',     desc: 'مدينة ألعاب داخلية كبيرة' },
    { name: 'Adventure Land',         floor: 'Level 4',              desc: 'ألعاب وترفيه للأطفال' },
    { name: 'Mickey Park',            floor: 'Level 4',              desc: 'ألعاب للأطفال' },
    { name: 'My Town',                floor: 'Level 4',              desc: 'مدينة تعليمية وترفيهية للأطفال' },
    { name: 'E-ZONE',                 floor: 'Level 5',              desc: 'ألعاب إلكترونية وترفيه' },
    { name: 'Snow City',              floor: 'Level 8',              desc: 'منطقة ترفيه وجو ثلجي' },
    { name: 'Xtreme Zone',            floor: 'Level 0',              desc: 'ترامبولين وألعاب حركة' },
  ],
  hotels: [
    { name: 'InterContinental Cairo Citystars', floor: 'Level 1, Level 2' },
    { name: 'Holiday Inn Cairo Citystars',      floor: 'Level 1' },
    { name: 'Staybridge Suites',                floor: 'Level 0' },
  ],
  gates: [
    { name: 'بوابة 1', floor: 'Level 2' },
    { name: 'بوابة 2', floor: 'Level 2' },
    { name: 'بوابة 3', floor: 'Level 2' },
    { name: 'بوابة 4', floor: 'Level 1' },
    { name: 'بوابة 5', floor: 'Level 1' },
    { name: 'بوابة 6', floor: 'Level 1' },
    { name: 'بوابة 7', floor: 'Level 0.5' },
  ]
};

// ──────────────────────────────────────────────
//  SYSTEM PROMPT BUILDER
// ──────────────────────────────────────────────
function buildSystemPrompt() {
  const allRestaurants = MALL_DATA.restaurants.map(r => `${r.name} (${r.floor}): ${r.desc}`).join('\n');
  const allStores = MALL_DATA.stores.map(s => `${s.name} (${s.floor}): ${s.desc}`).join('\n');
  const allFacilities = MALL_DATA.facilities.map(f => `${f.name} (${f.floor}): ${f.landmarks}`).join('\n');
  const allEntertainment = MALL_DATA.entertainment.map(e => `${e.name} (${e.floor}): ${e.desc}`).join('\n');
  const allHotels = MALL_DATA.hotels.map(h => `${h.name} (${h.floor})`).join('\n');
  const allGates = MALL_DATA.gates.map(g => `${g.name} في ${g.floor}`).join(' — ');

  return `أنت مساعد ذكاء اصطناعي متخصص ومتمرس في مول سيتي ستارز هليوبوليس بالقاهرة.
وظيفتك: مساعدة الزوار للتنقل داخل المول، اقتراح مطاعم ومحلات، والإجابة عن أسئلتهم.

قواعد الرد:
- تكلم بعامية مصرية طبيعية وودودة وذكية.
- الرد يكون 1-4 جمل فقط، مختصر ومفيد ومريح للسمع.
- لو فيه توجيه، اذكر الدور (Level) وأقرب معلم معروف.
- متبدأش بـ"سيتي ستارز" أو "كمساعد". ابدأ بالمعلومة مباشرة.
- لو في سياق محادثة سابقة، استخدمه للرد بشكل أذكى.
- لو الزبون قال تحية زي "صباح الخير" أو "مساء الخير" أو "أهلاً" أو "هاي" أو "سلام": رد عليه بتحية طبيعية ودودة وبعدين اسأله تقدر تساعده فيه إيه. ممنوع تقول عذرًا أو تتجاهل التحية.
- ممنوع تستخدم * أو ** أو أي تنسيق markdown في ردودك. اكتب نص عادي بس.
- اكتب الأرقام والأدوار بالعربي دايمًا: الدور الأول بدل Level 1، الدور التاني بدل Level 2، الدور التالت بدل Level 3، الدور الرابع بدل Level 4، الدور الخامس بدل Level 5، الدور السادس بدل Level 6، الدور الثامن بدل Level 8. لا تكتب أرقام إنجليزية في الرد.
- لو الموضوع خارج المول أو مش موجود في البيانات أو إنت مش متأكد من الإجابة: متخمنش.
- في الحالات دي قول بالنص بشكل لطيف: "معلش، المعلومة دي مش متاحة عندي دلوقتي. كلمي خدمة العملاء على 1977 وهيساعدوكي."

البوابات: ${allGates}

المطاعم والكافيهات:
${allRestaurants}

المحلات:
${allStores}

المرافق والخدمات:
${allFacilities}

الترفيه والسينما:
${allEntertainment}

الفنادق:
${allHotels}`;
}

// ──────────────────────────────────────────────
//  STATE
// ──────────────────────────────────────────────
let isRecording = false, isBusy = false, recognizer = null;
let silTimer = null, silBarTimer = null;
let idleTimer = null;
let accumulated = '', activeVoice = localStorage.getItem('voice') || 'female';
let conversationHistory = [];

const STORAGE_KEY = 'citystars_chat_history';
const getKey = k => localStorage.getItem('key_' + k) || '';

// ──────────────────────────────────────────────
//  INIT
// ──────────────────────────────────────────────
(function init() {
  if (location.protocol === 'file:') {
    console.warn('Open the project from localhost instead of file://');
  }
  const ok = getKey('openai'), ek = getKey('eleven');
  if (ok) document.getElementById('openaiKey').value = ok;
  if (ek) document.getElementById('elevenKey').value = ek;
  updateGearDot();
  applyVoiceUI(activeVoice);
  loadHistory();
  renderHints();
})();

// ──────────────────────────────────────────────
//  RENDER HINTS
// ──────────────────────────────────────────────
function renderHints() {
  const grid = document.getElementById('hintsGrid');
  grid.innerHTML = HINTS.map(h =>
    `<button class="hint-chip" onclick="triggerText('${h}')">${h}</button>`
  ).join('');
}

// ──────────────────────────────────────────────
//  PERSISTENT CHAT HISTORY
// ──────────────────────────────────────────────
function loadHistory() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      conversationHistory = JSON.parse(saved);
      renderHistory();
      resetIdleTimer();
    }
  } catch(e) { conversationHistory = []; }
}

function saveHistory() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(conversationHistory)); } catch(e) {}
}

function addToHistory(role, content) {
  conversationHistory.push({ role, content });
  if (conversationHistory.length > 30) conversationHistory = conversationHistory.slice(-30);
  saveHistory();
  appendHistoryMsg(role, content);
  scrollHistory();
}

function renderHistory() {
  const el = document.getElementById('chatHistory');
  el.innerHTML = '';
  conversationHistory.forEach(msg => appendHistoryMsg(msg.role, msg.content, false));
  scrollHistory();
}

function appendHistoryMsg(role, content, animate = true) {
  const el = document.getElementById('chatHistory');
  const div = document.createElement('div');
  div.className = `history-msg ${role}`;
  if (!animate) div.style.animation = 'none';
  const isUser = role === 'user';
  div.innerHTML = `
    <div class="history-avatar">${isUser ? '🗣' : '🤖'}</div>
    <div class="history-bubble">${escapeHtml(content)}</div>`;
  el.appendChild(div);
}

function scrollHistory() {
  const el = document.getElementById('chatHistory');
  setTimeout(() => { el.scrollTop = el.scrollHeight; }, 50);
}

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ──────────────────────────────────────────────
//  END CHAT
// ──────────────────────────────────────────────
function confirmEndChat() {
  if (isBusy || isRecording) return;
  document.getElementById('confirmOverlay').classList.add('show');
}
function closeConfirm() {
  document.getElementById('confirmOverlay').classList.remove('show');
}
function endChat(silent = false) {
  closeConfirm();
  clearTimeout(idleTimer);
  hideToast();
  conversationHistory = [];
  localStorage.removeItem(STORAGE_KEY);
  document.getElementById('chatHistory').innerHTML = '';
  hideCards();
  resetState();
  setStatus('قول عايز تروح فين');
  if (!silent) return;
}

// ──────────────────────────────────────────────
//  SETTINGS DRAWER
// ──────────────────────────────────────────────
let drawerOpen = false;
function toggleDrawer() {
  drawerOpen = !drawerOpen;
  document.getElementById('drawer').classList.toggle('open', drawerOpen);
  document.getElementById('drawerOverlay').classList.toggle('show', drawerOpen);
  document.getElementById('gearBtn').classList.toggle('open', drawerOpen);
}
function saveKey(model) {
  const inputId = model === 'openai' ? 'openaiKey' : 'elevenKey';
  const val = document.getElementById(inputId).value.trim();
  if (!val) { toast('❌ الـ Key فارغ', 'error'); return; }
  localStorage.setItem('key_' + model, val);
  updateGearDot();
  toast('✅ تم حفظ ' + (model === 'openai' ? 'OpenAI' : 'ElevenLabs') + ' Key', 'ok');
  setTimeout(() => { if (drawerOpen) toggleDrawer(); }, 650);
}
function updateGearDot() {
  document.getElementById('gearBtn').classList.toggle('has-key', !!(getKey('openai') || getKey('eleven')));
}

// ──────────────────────────────────────────────
//  VOICE
// ──────────────────────────────────────────────
function selectVoice(v) {
  activeVoice = v;
  localStorage.setItem('voice', v);
  applyVoiceUI(v);
  toast('🎭 ' + (v === 'female' ? 'صوت ستاتي' : 'صوت رجالي'), 'ok');
}
function applyVoiceUI(v) {
  document.getElementById('btnFemale').className = 'voice-btn' + (v === 'female' ? ' active-f' : '');
  document.getElementById('btnMale').className   = 'voice-btn' + (v === 'male'   ? ' active-m' : '');
}
function getActiveVoiceId() {
  return VOICES[activeVoice] || VOICES.female;
}

// ──────────────────────────────────────────────
//  UI HELPERS
// ──────────────────────────────────────────────
function setStatus(txt, mode) {
  document.getElementById('statusTxt').textContent = txt;
  document.getElementById('statusPill').className = 'status-pill ' + (mode || '');
}
function setOrb(s) { document.getElementById('orb').className = 'orb' + (s ? ' ' + s : ''); }
function setWave(on) { document.getElementById('wave').className = 'wave' + (on ? ' active' : ''); }
function showCard(id, txt) {
  document.getElementById(id + 'Txt').textContent = txt;
  document.getElementById(id).classList.add('show');
}
function hideCards() {
  ['cardUser','cardAi'].forEach(id => document.getElementById(id).classList.remove('show'));
}

function hasActiveSession() {
  return Boolean(conversationHistory.length || isRecording || isBusy || accumulated.trim());
}

function resetIdleTimer() {
  clearTimeout(idleTimer);
  if (!hasActiveSession()) return;
  idleTimer = setTimeout(() => {
    if (isBusy) {
      resetIdleTimer();
      return;
    }
    endChat(true);
  }, IDLE_TIMEOUT_MS);
}

function startSilBar() {
  const fill = document.getElementById('silFill');
  document.getElementById('silBar').classList.add('active');
  fill.style.width = '0%';
  const t0 = Date.now();
  clearInterval(silBarTimer);
  silBarTimer = setInterval(() => {
    const p = Math.min(100, (Date.now() - t0) / SILENCE_MS * 100);
    fill.style.width = p + '%';
    if (p >= 100) clearInterval(silBarTimer);
  }, 40);
}
function stopSilBar() {
  clearInterval(silBarTimer);
  document.getElementById('silBar').classList.remove('active');
  document.getElementById('silFill').style.width = '0%';
}

let _tt;
function hideToast() {
  const el = document.getElementById('toast');
  clearTimeout(_tt);
  el.className = 'toast';
  el.textContent = '';
}
function toast(msg, type) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast show' + (type ? ' ' + type : '');
  clearTimeout(_tt);
  _tt = setTimeout(() => { hideToast(); }, 3000);
}

function resetState() {
  clearTimeout(silTimer); stopSilBar();
  if (recognizer) {
    try { recognizer.onend = null; recognizer.stop(); } catch(e) {}
  }
  isBusy = false; isRecording = false; recognizer = null; accumulated = '';
  setOrb(''); setWave(false);
  setStatus('قول عايز تروح فين');
  resetIdleTimer();
}

// Merge speech-to-text chunks while removing duplicated overlap.
// Some browsers repeat the last spoken words when using continuous recognition.
function normWordForOverlap(w = '') {
  return (w + '')
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, '') // remove diacritics
    .replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و').replace(/ئ/g, 'ي')
    .replace(/[^\w\u0600-\u06FF&]+/g, '')
    .trim();
}

function splitWords(s = '') {
  return (s || '').trim().split(/\s+/).filter(Boolean);
}

function mergeTranscript(prev = '', next = '') {
  prev = (prev || '').trim();
  next = (next || '').trim();
  if (!prev) return next;
  if (!next) return prev;

  const prevWords = splitWords(prev);
  const nextWords = splitWords(next);
  if (!prevWords.length) return next;
  if (!nextWords.length) return prev;

  const prevNorm = prevWords.map(normWordForOverlap);
  const nextNorm = nextWords.map(normWordForOverlap);

  // Find the biggest overlap between end(prev) and start(next).
  const max = Math.min(prevNorm.length, nextNorm.length);
  for (let k = max; k > 0; k--) {
    let ok = true;
    for (let i = 0; i < k; i++) {
      if (prevNorm[prevNorm.length - k + i] !== nextNorm[i]) { ok = false; break; }
    }
    if (ok) {
      const rest = nextWords.slice(k).join(' ').trim();
      return rest ? (prevWords.join(' ') + ' ' + rest) : prevWords.join(' ');
    }
  }

  return prevWords.join(' ') + ' ' + nextWords.join(' ');
}

// ──────────────────────────────────────────────
//  KEYBOARD
// ──────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.code === 'Space' && e.target.tagName !== 'INPUT') { e.preventDefault(); toggleRecord(); }
  if (e.code === 'Escape') { closeConfirm(); if (drawerOpen) toggleDrawer(); }
});

// ──────────────────────────────────────────────
//  RECORDING
// ──────────────────────────────────────────────
function toggleRecord() {
  if (isBusy) return;
  if (!getKey('openai')) { if (!drawerOpen) toggleDrawer(); toast('❌ حط الـ OpenAI Key الأول', 'error'); return; }
  isRecording ? stopListening() : startListening();
}

function startListening() {
  resetIdleTimer();
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { toast('❌ استخدم Chrome أو Edge', 'error'); return; }
  accumulated = '';
  recognizer = new SR();
  recognizer.lang = 'ar-EG';
  recognizer.interimResults = true;
  recognizer.continuous = true;
  recognizer.maxAlternatives = 1;

  recognizer.onstart = () => {
    isRecording = true;
    setOrb('recording'); setWave(true);
    setStatus('🔴 بيسمعك...', 'recording');
    hideCards();
  };

  recognizer.onresult = e => {
    if (isBusy || !isRecording) return; // prevent late events from overwriting submitted text
    clearTimeout(silTimer); stopSilBar();
    let fin = '', interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      e.results[i].isFinal
        ? fin += e.results[i][0].transcript
        : interim += e.results[i][0].transcript;
    }
    if (fin) accumulated = mergeTranscript(accumulated, fin.trim());
    const preview = mergeTranscript(accumulated, interim ? interim.trim() : '');
    if (preview) showCard('cardUser', preview);
    silTimer = setTimeout(() => { if (accumulated.trim()) submit(accumulated.trim()); }, SILENCE_MS);
    startSilBar();
  };

  recognizer.onerror = e => {
    if (e.error === 'no-speech') return;
    if (e.error === 'not-allowed') { toast('❌ سمح للمتصفح يوصل الميكروفون', 'error'); resetState(); return; }
  };

  recognizer.onend = () => { if (isRecording && !isBusy) try { recognizer.start(); } catch(e){} };
  try { recognizer.start(); } catch(e) { toast('❌ ' + e.message, 'error'); resetState(); }
}

function stopListening() {
  isRecording = false;
  clearTimeout(silTimer); stopSilBar();
  if (recognizer) try { recognizer.stop(); } catch(e) {}
  setWave(false);
}

function submit(text) {
  stopListening();
  resetIdleTimer();
  isBusy = true; accumulated = '';
  setOrb('thinking');
  setStatus('⏳ بيفكر...', 'thinking');
  showCard('cardUser', text);
  run(text);
}

function triggerText(text) {
  if (isBusy || isRecording) return;
  resetIdleTimer();
  isBusy = true;
  setOrb('thinking');
  setStatus('⏳ بيفكر...', 'thinking');
  hideCards();
  showCard('cardUser', text);
  run(text);
}

// ──────────────────────────────────────────────
//  MAIN FLOW
// ──────────────────────────────────────────────
async function run(text) {
  let reply;
  try {
    setStatus('💬 بيفكر...', 'thinking');
    reply = await askOpenAI(text);
  } catch(err) {
    toast('❌ ' + err.message, 'error');
    resetState(); return;
  }
  showCard('cardAi', reply);
  setOrb('speaking');
  setStatus('🔊 بيتكلم...', 'speaking');
  try { await speak(reply); } catch(e) {}
  resetState();
}

// ──────────────────────────────────────────────
//  OPENAI API
// ──────────────────────────────────────────────
async function askOpenAI(text) {
  const key = getKey('openai');
  if (!key) return 'قوليلي نقطة بدايتك والمكان اللي عايزاه.';

  // Add user msg to history first
  addToHistory('user', text);

  // Responses API accepts simple message content strings.
  // Using `instructions` separately is cleaner and reduces payload mistakes.
  const input = conversationHistory.slice(-20).map(m => ({
    role: m.role === 'user' ? 'user' : 'assistant',
    content: m.content
  }));

  let res;
  let rawText = '';
  let data = null;

  try {
    res = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        instructions: buildSystemPrompt(),
        max_output_tokens: 220,
        input
      })
    });

    rawText = await res.text();
    try { data = rawText ? JSON.parse(rawText) : null; } catch (_) { data = null; }
  } catch (networkErr) {
    throw new Error('تعذر الوصول لـ OpenAI API. تأكدي إن النت شغال وإن الصفحة مفتوحة من localhost مش file://');
  }

  if (!res.ok) {
    const apiMsg = data?.error?.message || rawText || res.statusText;
    throw new Error(`OpenAI ${res.status}: ${apiMsg}${''}`);
  }

  const reply = (
    data?.output?.flatMap(item => item.content || []).find(c => c.type === 'output_text')?.text
    || data?.output_text
    || ''
  ).trim() || 'عذرًا، فيه مشكلة في الرد.';

  const finalReply = cleanReply(normalizeUnknownReply(reply));
  addToHistory('assistant', finalReply);
  return finalReply;
}

function cleanReply(text) {
  if (!text) return text;
  // Remove asterisks (markdown bold/italic)
  text = text.replace(/\*+/g, '');
  // Remove markdown headers
  text = text.replace(/#{1,6}\s*/g, '');
  // Convert English digits to Arabic words in floor context
  text = text.replace(/Level\s*1/gi, 'الدور الأول');
  text = text.replace(/Level\s*2/gi, 'الدور التاني');
  text = text.replace(/Level\s*3/gi, 'الدور التالت');
  text = text.replace(/Level\s*4/gi, 'الدور الرابع');
  text = text.replace(/Level\s*5/gi, 'الدور الخامس');
  text = text.replace(/Level\s*6/gi, 'الدور السادس');
  text = text.replace(/Level\s*7/gi, 'الدور السابع');
  text = text.replace(/Level\s*8/gi, 'الدور التامن');
  text = text.replace(/Level\s*0/gi, 'الدور الأرضي');
  // Clean up extra spaces
  text = text.replace(/  +/g, ' ').trim();
  return text;
}

function normalizeUnknownReply(reply) {
  const text = (reply || '').trim();
  if (!text) return `معلش، المعلومة دي مش متاحة عندي دلوقتي. كلمي خدمة العملاء على ${CUSTOMER_SERVICE_NUMBER} وهيساعدوكي.`;

  const uncertaintyPatterns = [
    /مش\s*(?:عارف|متأكد|متاك?د)/i,
    /مش\s*عندي/i,
    /غير\s*متاح/i,
    /غير\s*موجود/i,
    /لا\s*أعرف/i,
    /لا\s*اعرف/i,
    /لا\s*توجد/i,
    /not\s+sure/i,
    /i\s+don'?t\s+know/i,
    /not\s+available/i
  ];

  if (uncertaintyPatterns.some(pattern => pattern.test(text))) {
    return `معلش، المعلومة دي مش متاحة عندي دلوقتي. كلمي خدمة العملاء على ${CUSTOMER_SERVICE_NUMBER} وهيساعدوكي.`;
  }

  return text;
}

// ──────────────────────────────────────────────
//  TTS
// ──────────────────────────────────────────────
async function speak(text) {
  const elKey = getKey('eleven');
  const vid   = getActiveVoiceId();
  if (elKey && vid) {
    const ok = await speakEleven(text, elKey, vid);
    if (ok) return;
  }
  // Fallback to Web Speech
  await speakWebSpeech(text);
}

async function speakEleven(text, key, voiceId) {
  try {
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'xi-api-key': key },
      body: JSON.stringify({
        text,
        model_id: 'eleven_flash_v2_5',
        optimize_streaming_latency: 4,
        output_format: 'mp3_44100_64',
        voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.0, use_speaker_boost: false }
      })
    });
    if (!res.ok) return false;
    await playBlob(await res.blob());
    return true;
  } catch(e) { return false; }
}

async function speakWebSpeech(text) {
  return new Promise(resolve => {
    if (!window.speechSynthesis) { resolve(); return; }
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'ar-EG';
    utt.rate = 1.05;
    utt.onend = resolve; utt.onerror = resolve;
    speechSynthesis.speak(utt);
  });
}

async function playBlob(blob) {
  return new Promise(resolve => {
    const url = URL.createObjectURL(blob);
    const a   = new Audio(url);
    a.onended = () => { URL.revokeObjectURL(url); resolve(); };
    a.onerror = () => { URL.revokeObjectURL(url); resolve(); };
    a.play().catch(() => resolve());
  });
}
