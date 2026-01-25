const fs = require('fs');

const products = JSON.parse(fs.readFileSync('./src/data/products.json', 'utf8'));

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
        targetAudiences: ['建築工人', '水電師傅', '裝潢師傅', '維修技師', 'DIY愛好者'],
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

let updated = 0;
products.forEach(product => {
    if (product.targetAudiences && product.targetIndustries) return;

    const defaults = categoryDefaults[product.category];
    if (defaults) {
        product.targetAudiences = defaults.targetAudiences;
        product.targetIndustries = defaults.targetIndustries;
        updated++;
    }
});

fs.writeFileSync('./src/data/products.json', JSON.stringify(products, null, 4), 'utf8');
console.log('Updated ' + updated + ' products');
