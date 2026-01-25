const fs = require('fs');
const path = require('path');

const productsPath = './src/data/products.json';
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// 根據產品類別定義適用對象和行業
const categoryDefaults = {
    'cotton-gloves': {
        targetAudiences: ['工地作業員', '搬運工人', '機械操作員', '倉儲人員', '一般勞工'],
        targetIndustries: ['建築營造', '製造業', '物流倉儲', '電子業', '食品加工']
    },
    'rubber-gloves': {
        targetAudiences: ['機械操作員', '化學處理員', '食品加工人員', '清潔人員', '醫護人員'],
        targetIndustries: ['製造業', '化工業', '食品加工', '醫療護理', '電子業']
    },
    'nylon-gloves': {
        targetAudiences: ['採果人員', '園藝工作者', '電子組裝員', '品管人員', '包裝作業員'],
        targetIndustries: ['農業園藝', '電子業', '食品加工', '紡織業', '包裝業']
    },
    'white-dragon-gloves': {
        targetAudiences: ['食品加工人員', '電子組裝員', '無塵室作業員', '品管人員', '精密作業員'],
        targetIndustries: ['食品加工', '電子業', '精密製造', '醫療器材', '製藥業']
    },
    'flower-dragon-gloves': {
        targetAudiences: ['農漁業人員', '冷凍倉儲員', '一般作業員', '包裝人員', '清潔人員'],
        targetIndustries: ['農漁業', '冷凍物流', '製造業', '包裝業', '清潔服務']
    },
    'masks': {
        targetAudiences: ['醫護人員', '食品加工人員', '清潔人員', '一般民眾', '服務業人員'],
        targetIndustries: ['醫療護理', '食品加工', '服務業', '製造業', '大眾運輸']
    },
    'packaging': {
        targetAudiences: ['物流人員', '倉儲人員', '包裝作業員', '電商從業者', '辦公人員'],
        targetIndustries: ['物流倉儲', '電商零售', '製造業', '辦公文具', '印刷業']
    },
    'hardware': {
        targetAudiences: ['建築工人', '水電師傅', '裝潢師傅', '維修技師', 'DIY 愛好者'],
        targetIndustries: ['建築營造', '裝潢工程', '水電工程', '維修服務', '五金零售']
    },
    'bulk-bags': {
        targetAudiences: ['營造業人員', '廢棄物處理員', '農業工作者', '化工人員', '物流人員'],
        targetIndustries: ['營造業', '廢棄物處理', '農業', '化工業', '紡織業']
    },
    'cleaning': {
        targetAudiences: ['機械維修員', '汽修技師', '工廠作業員', '清潔人員', '廚房工作者'],
        targetIndustries: ['汽車維修', '機械製造', '餐飲業', '工業清潔', '石化業']
    },
    'special-gloves': {
        targetAudiences: ['一般消費者', '家庭主婦', '美容從業者', '飯店清潔員'],
        targetIndustries: ['家用消費', '美容護膚', '飯店旅館', '清潔服務']
    }
};

// 特定產品的客製化設定
const productOverrides = {
    '1468541': { // 小尺寸棉紗
        targetAudiences: ['女性作業員', '手部較小者', '精密作業員', '園藝愛好者'],
        targetIndustries: ['電子業', '食品加工', '園藝農業', '包裝業', '清潔服務']
    },
    '1468521': { // NBR手套(多倍)
        targetAudiences: ['化學處理員', '實驗室人員', '油漆工', '汽修技師', '食品加工人員'],
        targetIndustries: ['汽車維修', '印刷油漆', '化工業', '食品加工', '實驗室']
    },
    '1468545': { // NBR手套(ChemMax)
        targetAudiences: ['化學處理員', '實驗室人員', '油漆工', '汽修技師', '食品加工人員'],
        targetIndustries: ['汽車維修', '印刷油漆', '化工業', '食品加工', '實驗室']
    },
    '1468547': { // 丁晴膠手套
        targetAudiences: ['物流搬運員', '精密組裝員', '園藝工作者', '維修技師', '包裝人員'],
        targetIndustries: ['物流倉儲', '電子組裝', '園藝農業', '維修服務', '製造業']
    },
    '1468548': { // 花紋手套
        targetAudiences: ['建築工人', '板模工', '鐵工', '水電師傅', '搬運工人'],
        targetIndustries: ['建築營造', '鐵工土木', '水電工程', '物流倉儲', '製造業']
    },
    '1468550': { // PVC無粉手套(多倍)
        targetAudiences: ['醫護人員', '食品加工人員', '清潔人員', '實驗室人員', '美容師'],
        targetIndustries: ['醫療護理', '食品加工', '清潔服務', '實驗室', '美容美髮']
    },
    '1468551': { // PVC無粉手套(ChemMax)
        targetAudiences: ['醫護人員', '食品加工人員', '清潔人員', '實驗室人員', '美容師'],
        targetIndustries: ['醫療護理', '食品加工', '清潔服務', '實驗室', '美容美髮']
    },
    '1468606': { // 13針花紋手套
        targetAudiences: ['建築工人', '板模工', '鐵工', '水電師傅', '搬運工人'],
        targetIndustries: ['建築營造', '鐵工土木', '水電工程', '物流倉儲', '製造業']
    },
    '1468554': { // 三層防護口罩
        targetAudiences: ['醫護人員', '服務業人員', '通勤族', '一般民眾', '食品業人員'],
        targetIndustries: ['醫療護理', '服務業', '大眾運輸', '食品加工', '辦公場所']
    },
    '1468555': { // 活性碳口罩
        targetAudiences: ['塗裝作業員', '機車通勤族', '清潔人員', '化工人員', '木工師傅'],
        targetIndustries: ['塗裝噴漆', '化工業', '木工裝潢', '清潔服務', '印刷業']
    },
    '1467669': { // PE膜
        targetAudiences: ['物流人員', '倉儲人員', '包裝作業員', '外貿人員', '工廠作業員'],
        targetIndustries: ['物流倉儲', '外貿出口', '製造業', '電商零售', '農產運銷']
    },
    '1467511': { // 藍白帆布
        targetAudiences: ['建築工人', '農業工作者', '貨運司機', '露營愛好者', '攤販業者'],
        targetIndustries: ['建築營造', '農業', '貨運物流', '戶外休閒', '市集攤販']
    },
    '1468573': { // 電火布
        targetAudiences: ['水電師傅', '電機技師', '維修人員', '家庭DIY者', '工程人員'],
        targetIndustries: ['水電工程', '電機維修', '建築營造', '家庭修繕', '製造業']
    },
    '1468572': { // 警示膠帶
        targetAudiences: ['工安人員', '廠務人員', '施工人員', '倉管人員', '物業管理員'],
        targetIndustries: ['建築營造', '製造業', '物流倉儲', '物業管理', '公共工程']
    },
    '1464797': { // 沐浴手套
        targetAudiences: ['一般消費者', '家庭主婦', '美容愛好者', '運動族群'],
        targetIndustries: ['家用消費', '美容護膚', '飯店旅館', '健身中心']
    }
};

let updated = 0;
products.forEach(product => {
    // 如果已有資料則跳過
    if (product.targetAudiences && product.targetIndustries) {
        return;
    }

    // 優先使用特定產品設定
    if (productOverrides[product.id]) {
        product.targetAudiences = productOverrides[product.id].targetAudiences;
        product.targetIndustries = productOverrides[product.id].targetIndustries;
        updated++;
        return;
    }

    // 使用類別預設值
    const defaults = categoryDefaults[product.category];
    if (defaults) {
        product.targetAudiences = defaults.targetAudiences;
        product.targetIndustries = defaults.targetIndustries;
        updated++;
    }
});

fs.writeFileSync(productsPath, JSON.stringify(products, null, 4), 'utf8');
console.log(`Updated ${updated} products with targetAudiences and targetIndustries`);
