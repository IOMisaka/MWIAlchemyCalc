// ==UserScript==
// @name         MWIAlchemyCalc

// @namespace    http://tampermonkey.net/
// @version      2025-03-25.3
// @description  显示炼金收益 milkywayidle 银河奶牛放置

// @author       IOMisaka
// @match        https://www.milkywayidle.com/*
// @match        https://test.milkywayidle.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    let itemNamesCN = {
        '/items/coin': '金币',
        '/items/task_token': '任务代币',
        '/items/chimerical_token': '奇幻代币',
        '/items/sinister_token': '阴森代币',
        '/items/enchanted_token': '秘法代币',
        '/items/cowbell': '牛铃',
        '/items/bag_of_10_cowbells': '牛铃袋 (10个)',
        '/items/purples_gift': '小紫牛的礼物',
        '/items/small_meteorite_cache': '小陨石舱',
        '/items/medium_meteorite_cache': '中陨石舱',
        '/items/large_meteorite_cache': '大陨石舱',
        '/items/small_artisans_crate': '小工匠匣',
        '/items/medium_artisans_crate': '中工匠匣',
        '/items/large_artisans_crate': '大工匠匣',
        '/items/small_treasure_chest': '小宝箱',
        '/items/medium_treasure_chest': '中宝箱',
        '/items/large_treasure_chest': '大宝箱',
        '/items/chimerical_chest': '奇幻宝箱',
        '/items/sinister_chest': '阴森宝箱',
        '/items/enchanted_chest': '秘法宝箱',
        '/items/blue_key_fragment': '蓝色钥匙碎片',
        '/items/green_key_fragment': '绿色钥匙碎片',
        '/items/purple_key_fragment': '紫色钥匙碎片',
        '/items/white_key_fragment': '白色钥匙碎片',
        '/items/orange_key_fragment': '橙色钥匙碎片',
        '/items/brown_key_fragment': '棕色钥匙碎片',
        '/items/stone_key_fragment': '石头钥匙碎片',
        '/items/dark_key_fragment': '黑暗钥匙碎片',
        '/items/burning_key_fragment': '燃烧钥匙碎片',
        '/items/chimerical_entry_key': '奇幻钥匙',
        '/items/chimerical_chest_key': '奇幻宝箱钥匙',
        '/items/sinister_entry_key': '阴森钥匙',
        '/items/sinister_chest_key': '阴森宝箱钥匙',
        '/items/enchanted_entry_key': '秘法钥匙',
        '/items/enchanted_chest_key': '秘法宝箱钥匙',
        '/items/donut': '甜甜圈',
        '/items/blueberry_donut': '蓝莓甜甜圈',
        '/items/blackberry_donut': '黑莓甜甜圈',
        '/items/strawberry_donut': '草莓甜甜圈',
        '/items/mooberry_donut': '哞莓甜甜圈',
        '/items/marsberry_donut': '火星莓甜甜圈',
        '/items/spaceberry_donut': '太空莓甜甜圈',
        '/items/cupcake': '纸杯蛋糕',
        '/items/blueberry_cake': '蓝莓蛋糕',
        '/items/blackberry_cake': '黑莓蛋糕',
        '/items/strawberry_cake': '草莓蛋糕',
        '/items/mooberry_cake': '哞莓蛋糕',
        '/items/marsberry_cake': '火星莓蛋糕',
        '/items/spaceberry_cake': '太空莓蛋糕',
        '/items/gummy': '软糖',
        '/items/apple_gummy': '苹果软糖',
        '/items/orange_gummy': '橙子软糖',
        '/items/plum_gummy': '李子软糖',
        '/items/peach_gummy': '桃子软糖',
        '/items/dragon_fruit_gummy': '火龙果软糖',
        '/items/star_fruit_gummy': '杨桃软糖',
        '/items/yogurt': '酸奶',
        '/items/apple_yogurt': '苹果酸奶',
        '/items/orange_yogurt': '橙子酸奶',
        '/items/plum_yogurt': '李子酸奶',
        '/items/peach_yogurt': '桃子酸奶',
        '/items/dragon_fruit_yogurt': '火龙果酸奶',
        '/items/star_fruit_yogurt': '杨桃酸奶',
        '/items/milking_tea': '挤奶茶',
        '/items/foraging_tea': '采摘茶',
        '/items/woodcutting_tea': '伐木茶',
        '/items/cooking_tea': '烹饪茶',
        '/items/brewing_tea': '冲泡茶',
        '/items/alchemy_tea': '炼金茶',
        '/items/enhancing_tea': '强化茶',
        '/items/cheesesmithing_tea': '奶酪锻造茶',
        '/items/crafting_tea': '制作茶',
        '/items/tailoring_tea': '缝纫茶',
        '/items/super_milking_tea': '超级挤奶茶',
        '/items/super_foraging_tea': '超级采摘茶',
        '/items/super_woodcutting_tea': '超级伐木茶',
        '/items/super_cooking_tea': '超级烹饪茶',
        '/items/super_brewing_tea': '超级冲泡茶',
        '/items/super_alchemy_tea': '超级炼金茶',
        '/items/super_enhancing_tea': '超级强化茶',
        '/items/super_cheesesmithing_tea': '超级奶酪锻造茶',
        '/items/super_crafting_tea': '超级制作茶',
        '/items/super_tailoring_tea': '超级缝纫茶',
        '/items/ultra_milking_tea': '究极挤奶茶',
        '/items/ultra_foraging_tea': '究极采摘茶',
        '/items/ultra_woodcutting_tea': '究极伐木茶',
        '/items/ultra_cooking_tea': '究极烹饪茶',
        '/items/ultra_brewing_tea': '究极冲泡茶',
        '/items/ultra_alchemy_tea': '究极炼金茶',
        '/items/ultra_enhancing_tea': '究极强化茶',
        '/items/ultra_cheesesmithing_tea': '究极奶酪锻造茶',
        '/items/ultra_crafting_tea': '究极制作茶',
        '/items/ultra_tailoring_tea': '究极缝纫茶',
        '/items/gathering_tea': '采集茶',
        '/items/gourmet_tea': '美食茶',
        '/items/wisdom_tea': '经验茶',
        '/items/processing_tea': '加工茶',
        '/items/efficiency_tea': '效率茶',
        '/items/artisan_tea': '工匠茶',
        '/items/catalytic_tea': '催化茶',
        '/items/blessed_tea': '福气茶',
        '/items/stamina_coffee': '耐力咖啡',
        '/items/intelligence_coffee': '智力咖啡',
        '/items/defense_coffee': '防御咖啡',
        '/items/attack_coffee': '攻击咖啡',
        '/items/power_coffee': '力量咖啡',
        '/items/ranged_coffee': '远程咖啡',
        '/items/magic_coffee': '魔法咖啡',
        '/items/super_stamina_coffee': '超级耐力咖啡',
        '/items/super_intelligence_coffee': '超级智力咖啡',
        '/items/super_defense_coffee': '超级防御咖啡',
        '/items/super_attack_coffee': '超级攻击咖啡',
        '/items/super_power_coffee': '超级力量咖啡',
        '/items/super_ranged_coffee': '超级远程咖啡',
        '/items/super_magic_coffee': '超级魔法咖啡',
        '/items/ultra_stamina_coffee': '究极耐力咖啡',
        '/items/ultra_intelligence_coffee': '究极智力咖啡',
        '/items/ultra_defense_coffee': '究极防御咖啡',
        '/items/ultra_attack_coffee': '究极攻击咖啡',
        '/items/ultra_power_coffee': '究极力量咖啡',
        '/items/ultra_ranged_coffee': '究极远程咖啡',
        '/items/ultra_magic_coffee': '究极魔法咖啡',
        '/items/wisdom_coffee': '经验咖啡',
        '/items/lucky_coffee': '幸运咖啡',
        '/items/swiftness_coffee': '迅捷咖啡',
        '/items/channeling_coffee': '吟唱咖啡',
        '/items/critical_coffee': '暴击咖啡',
        '/items/poke': '破胆之刺',
        '/items/impale': '透骨之刺',
        '/items/puncture': '破甲之刺',
        '/items/penetrating_strike': '贯心之刺',
        '/items/scratch': '爪影斩',
        '/items/cleave': '分裂斩',
        '/items/maim': '血刃斩',
        '/items/crippling_slash': '致残斩',
        '/items/smack': '重碾',
        '/items/sweep': '重扫',
        '/items/stunning_blow': '重锤',
        '/items/quick_shot': '快速射击',
        '/items/aqua_arrow': '流水箭',
        '/items/flame_arrow': '烈焰箭',
        '/items/rain_of_arrows': '箭雨',
        '/items/silencing_shot': '沉默之箭',
        '/items/steady_shot': '稳定射击',
        '/items/pestilent_shot': '疫病射击',
        '/items/penetrating_shot': '贯穿射击',
        '/items/water_strike': '流水冲击',
        '/items/ice_spear': '冰枪术',
        '/items/frost_surge': '冰霜爆裂',
        '/items/mana_spring': '法力喷泉',
        '/items/entangle': '缠绕',
        '/items/toxic_pollen': '剧毒粉尘',
        '/items/natures_veil': '自然菌幕',
        '/items/fireball': '火球',
        '/items/flame_blast': '熔岩爆裂',
        '/items/firestorm': '火焰风暴',
        '/items/smoke_burst': '烟爆灭影',
        '/items/minor_heal': '初级自愈术',
        '/items/heal': '自愈术',
        '/items/quick_aid': '快速治疗术',
        '/items/rejuvenate': '群体治疗术',
        '/items/taunt': '嘲讽',
        '/items/provoke': '挑衅',
        '/items/toughness': '坚韧',
        '/items/elusiveness': '闪避',
        '/items/precision': '精确',
        '/items/berserk': '狂暴',
        '/items/elemental_affinity': '元素增幅',
        '/items/frenzy': '狂速',
        '/items/spike_shell': '尖刺防护',
        '/items/arcane_reflection': '奥术反射',
        '/items/vampirism': '吸血',
        '/items/revive': '复活',
        '/items/insanity': '疯狂',
        '/items/invincible': '无敌',
        '/items/fierce_aura': '物理光环',
        '/items/aqua_aura': '流水光环',
        '/items/sylvan_aura': '自然光环',
        '/items/flame_aura': '火焰光环',
        '/items/speed_aura': '速度光环',
        '/items/critical_aura': '暴击光环',
        '/items/gobo_stabber': '哥布林长剑',
        '/items/gobo_slasher': '哥布林关刀',
        '/items/gobo_smasher': '哥布林狼牙棒',
        '/items/spiked_bulwark': '尖刺盾',
        '/items/werewolf_slasher': '狼人关刀',
        '/items/griffin_bulwark': '狮鹫重盾',
        '/items/gobo_shooter': '哥布林弹弓',
        '/items/vampiric_bow': '吸血弓',
        '/items/cursed_bow': '咒怨之弓',
        '/items/gobo_boomstick': '哥布林火棍',
        '/items/cheese_bulwark': '奶酪重盾',
        '/items/verdant_bulwark': '翠绿重盾',
        '/items/azure_bulwark': '蔚蓝重盾',
        '/items/burble_bulwark': '深紫重盾',
        '/items/crimson_bulwark': '绛红重盾',
        '/items/rainbow_bulwark': '彩虹重盾',
        '/items/holy_bulwark': '神圣重盾',
        '/items/wooden_bow': '木弓',
        '/items/birch_bow': '桦木弓',
        '/items/cedar_bow': '雪松弓',
        '/items/purpleheart_bow': '紫心弓',
        '/items/ginkgo_bow': '银杏弓',
        '/items/redwood_bow': '红杉弓',
        '/items/arcane_bow': '神秘弓',
        '/items/stalactite_spear': '石钟长枪',
        '/items/granite_bludgeon': '花岗岩大棒',
        '/items/regal_sword': '君王之剑',
        '/items/chaotic_flail': '混沌连枷',
        '/items/soul_hunter_crossbow': '灵魂猎手弩',
        '/items/sundering_crossbow': '裂空之弩',
        '/items/frost_staff': '冰霜法杖',
        '/items/infernal_battlestaff': '炼狱法杖',
        '/items/jackalope_staff': '鹿角兔之杖',
        '/items/cheese_sword': '奶酪剑',
        '/items/verdant_sword': '翠绿剑',
        '/items/azure_sword': '蔚蓝剑',
        '/items/burble_sword': '深紫剑',
        '/items/crimson_sword': '绛红剑',
        '/items/rainbow_sword': '彩虹剑',
        '/items/holy_sword': '神圣剑',
        '/items/cheese_spear': '奶酪长枪',
        '/items/verdant_spear': '翠绿长枪',
        '/items/azure_spear': '蔚蓝长枪',
        '/items/burble_spear': '深紫长枪',
        '/items/crimson_spear': '绛红长枪',
        '/items/rainbow_spear': '彩虹长枪',
        '/items/holy_spear': '神圣长枪',
        '/items/cheese_mace': '奶酪钉头锤',
        '/items/verdant_mace': '翠绿钉头锤',
        '/items/azure_mace': '蔚蓝钉头锤',
        '/items/burble_mace': '深紫钉头锤',
        '/items/crimson_mace': '绛红钉头锤',
        '/items/rainbow_mace': '彩虹钉头锤',
        '/items/holy_mace': '神圣钉头锤',
        '/items/wooden_crossbow': '木弩',
        '/items/birch_crossbow': '桦木弩',
        '/items/cedar_crossbow': '雪松弩',
        '/items/purpleheart_crossbow': '紫心弩',
        '/items/ginkgo_crossbow': '银杏弩',
        '/items/redwood_crossbow': '红杉弩',
        '/items/arcane_crossbow': '神秘弩',
        '/items/wooden_water_staff': '木制水法杖',
        '/items/birch_water_staff': '桦木水法杖',
        '/items/cedar_water_staff': '雪松水法杖',
        '/items/purpleheart_water_staff': '紫心水法杖',
        '/items/ginkgo_water_staff': '银杏水法杖',
        '/items/redwood_water_staff': '红杉水法杖',
        '/items/arcane_water_staff': '神秘水法杖',
        '/items/wooden_nature_staff': '木制自然法杖',
        '/items/birch_nature_staff': '桦木自然法杖',
        '/items/cedar_nature_staff': '雪松自然法杖',
        '/items/purpleheart_nature_staff': '紫心自然法杖',
        '/items/ginkgo_nature_staff': '银杏自然法杖',
        '/items/redwood_nature_staff': '红杉自然法杖',
        '/items/arcane_nature_staff': '神秘自然法杖',
        '/items/wooden_fire_staff': '木火法杖',
        '/items/birch_fire_staff': '桦木火法杖',
        '/items/cedar_fire_staff': '雪松火法杖',
        '/items/purpleheart_fire_staff': '紫心火法杖',
        '/items/ginkgo_fire_staff': '银杏火法杖',
        '/items/redwood_fire_staff': '红杉火法杖',
        '/items/arcane_fire_staff': '神秘火法杖',
        '/items/eye_watch': '掌上监工',
        '/items/snake_fang_dirk': '蛇牙短剑',
        '/items/vision_shield': '视觉盾',
        '/items/gobo_defender': '哥布林防御者',
        '/items/vampire_fang_dirk': '吸血鬼短剑',
        '/items/knights_aegis': '骑士盾',
        '/items/treant_shield': '树人盾',
        '/items/manticore_shield': '蝎狮盾',
        '/items/tome_of_healing': '治疗之书',
        '/items/tome_of_the_elements': '元素之书',
        '/items/watchful_relic': '警戒遗物',
        '/items/bishops_codex': '主教法典',
        '/items/cheese_buckler': '奶酪圆盾',
        '/items/verdant_buckler': '翠绿圆盾',
        '/items/azure_buckler': '蔚蓝圆盾',
        '/items/burble_buckler': '深紫圆盾',
        '/items/crimson_buckler': '绛红圆盾',
        '/items/rainbow_buckler': '彩虹圆盾',
        '/items/holy_buckler': '神圣圆盾',
        '/items/wooden_shield': '木盾',
        '/items/birch_shield': '桦木盾',
        '/items/cedar_shield': '雪松盾',
        '/items/purpleheart_shield': '紫心盾',
        '/items/ginkgo_shield': '银杏盾',
        '/items/redwood_shield': '红杉盾',
        '/items/arcane_shield': '神秘盾',
        '/items/sinister_cape': '阴森斗篷',
        '/items/chimerical_quiver': '奇幻箭袋',
        '/items/enchanted_cloak': '秘法披风',
        '/items/red_culinary_hat': '红色厨师帽',
        '/items/snail_shell_helmet': '蜗牛壳头盔',
        '/items/vision_helmet': '视觉头盔',
        '/items/fluffy_red_hat': '蓬松红帽子',
        '/items/acrobatic_hood': '杂技师兜帽',
        '/items/magicians_hat': '魔术师帽',
        '/items/cheese_helmet': '奶酪头盔',
        '/items/verdant_helmet': '翠绿头盔',
        '/items/azure_helmet': '蔚蓝头盔',
        '/items/burble_helmet': '深紫头盔',
        '/items/crimson_helmet': '绛红头盔',
        '/items/rainbow_helmet': '彩虹头盔',
        '/items/holy_helmet': '神圣头盔',
        '/items/rough_hood': '粗糙兜帽',
        '/items/reptile_hood': '爬行动物兜帽',
        '/items/gobo_hood': '哥布林兜帽',
        '/items/beast_hood': '野兽兜帽',
        '/items/umbral_hood': '暗影兜帽',
        '/items/cotton_hat': '棉帽',
        '/items/linen_hat': '亚麻帽',
        '/items/bamboo_hat': '竹帽',
        '/items/silk_hat': '丝帽',
        '/items/radiant_hat': '光辉帽',
        '/items/dairyhands_top': '挤奶工上衣',
        '/items/foragers_top': '采摘者上衣',
        '/items/lumberjacks_top': '伐木工上衣',
        '/items/cheesemakers_top': '奶酪师上衣',
        '/items/crafters_top': '工匠上衣',
        '/items/tailors_top': '裁缝上衣',
        '/items/chefs_top': '厨师上衣',
        '/items/brewers_top': '饮品师上衣',
        '/items/alchemists_top': '炼金师上衣',
        '/items/enhancers_top': '强化师上衣',
        '/items/gator_vest': '鳄鱼马甲',
        '/items/turtle_shell_body': '龟壳胸甲',
        '/items/colossus_plate_body': '巨像胸甲',
        '/items/demonic_plate_body': '恶魔胸甲',
        '/items/marine_tunic': '海洋皮衣',
        '/items/revenant_tunic': '亡灵皮衣',
        '/items/griffin_tunic': '狮鹫皮衣',
        '/items/icy_robe_top': '冰霜袍服',
        '/items/flaming_robe_top': '烈焰袍服',
        '/items/luna_robe_top': '月神袍服',
        '/items/royal_water_robe_top': '皇家水系袍服',
        '/items/royal_nature_robe_top': '皇家自然系袍服',
        '/items/royal_fire_robe_top': '皇家火系袍服',
        '/items/cheese_plate_body': '奶酪胸甲',
        '/items/verdant_plate_body': '翠绿胸甲',
        '/items/azure_plate_body': '蔚蓝胸甲',
        '/items/burble_plate_body': '深紫胸甲',
        '/items/crimson_plate_body': '绛红胸甲',
        '/items/rainbow_plate_body': '彩虹胸甲',
        '/items/holy_plate_body': '神圣胸甲',
        '/items/rough_tunic': '粗糙皮衣',
        '/items/reptile_tunic': '爬行动物皮衣',
        '/items/gobo_tunic': '哥布林皮衣',
        '/items/beast_tunic': '野兽皮衣',
        '/items/umbral_tunic': '暗影皮衣',
        '/items/cotton_robe_top': '棉布袍服',
        '/items/linen_robe_top': '亚麻袍服',
        '/items/bamboo_robe_top': '竹袍服',
        '/items/silk_robe_top': '丝绸袍服',
        '/items/radiant_robe_top': '光辉袍服',
        '/items/dairyhands_bottoms': '挤奶工下装',
        '/items/foragers_bottoms': '采摘者下装',
        '/items/lumberjacks_bottoms': '伐木工下装',
        '/items/cheesemakers_bottoms': '奶酪师下装',
        '/items/crafters_bottoms': '工匠下装',
        '/items/tailors_bottoms': '裁缝下装',
        '/items/chefs_bottoms': '厨师下装',
        '/items/brewers_bottoms': '饮品师下装',
        '/items/alchemists_bottoms': '炼金师下装',
        '/items/enhancers_bottoms': '强化师下装',
        '/items/turtle_shell_legs': '龟壳腿甲',
        '/items/colossus_plate_legs': '巨像腿甲',
        '/items/demonic_plate_legs': '恶魔腿甲',
        '/items/marine_chaps': '航海皮裤',
        '/items/revenant_chaps': '亡灵皮裤',
        '/items/griffin_chaps': '狮鹫皮裤',
        '/items/icy_robe_bottoms': '冰霜袍裙',
        '/items/flaming_robe_bottoms': '烈焰袍裙',
        '/items/luna_robe_bottoms': '月神袍裙',
        '/items/royal_water_robe_bottoms': '皇家水系袍裙',
        '/items/royal_nature_robe_bottoms': '皇家自然系袍裙',
        '/items/royal_fire_robe_bottoms': '皇家火系袍裙',
        '/items/cheese_plate_legs': '奶酪腿甲',
        '/items/verdant_plate_legs': '翠绿腿甲',
        '/items/azure_plate_legs': '蔚蓝腿甲',
        '/items/burble_plate_legs': '深紫腿甲',
        '/items/crimson_plate_legs': '绛红腿甲',
        '/items/rainbow_plate_legs': '彩虹腿甲',
        '/items/holy_plate_legs': '神圣腿甲',
        '/items/rough_chaps': '粗糙皮裤',
        '/items/reptile_chaps': '爬行动物皮裤',
        '/items/gobo_chaps': '哥布林皮裤',
        '/items/beast_chaps': '野兽皮裤',
        '/items/umbral_chaps': '暗影皮裤',
        '/items/cotton_robe_bottoms': '棉袍裙',
        '/items/linen_robe_bottoms': '亚麻袍裙',
        '/items/bamboo_robe_bottoms': '竹袍裙',
        '/items/silk_robe_bottoms': '丝绸袍裙',
        '/items/radiant_robe_bottoms': '光辉袍裙',
        '/items/enchanted_gloves': '附魔手套',
        '/items/pincer_gloves': '蟹钳手套',
        '/items/panda_gloves': '熊猫手套',
        '/items/magnetic_gloves': '磁力手套',
        '/items/dodocamel_gauntlets': '渡渡驼护手',
        '/items/sighted_bracers': '瞄准护腕',
        '/items/chrono_gloves': '时空手套',
        '/items/cheese_gauntlets': '奶酪护手',
        '/items/verdant_gauntlets': '翠绿护手',
        '/items/azure_gauntlets': '蔚蓝护手',
        '/items/burble_gauntlets': '深紫护手',
        '/items/crimson_gauntlets': '绛红护手',
        '/items/rainbow_gauntlets': '彩虹护手',
        '/items/holy_gauntlets': '神圣护手',
        '/items/rough_bracers': '粗糙护腕',
        '/items/reptile_bracers': '爬行动物护腕',
        '/items/gobo_bracers': '哥布林护腕',
        '/items/beast_bracers': '野兽护腕',
        '/items/umbral_bracers': '暗影护腕',
        '/items/cotton_gloves': '棉手套',
        '/items/linen_gloves': '亚麻手套',
        '/items/bamboo_gloves': '竹手套',
        '/items/silk_gloves': '丝手套',
        '/items/radiant_gloves': '光辉手套',
        '/items/collectors_boots': '收藏家靴',
        '/items/shoebill_shoes': '鲸头鹳鞋',
        '/items/black_bear_shoes': '黑熊鞋',
        '/items/grizzly_bear_shoes': '棕熊鞋',
        '/items/polar_bear_shoes': '北极熊鞋',
        '/items/centaur_boots': '半人马靴',
        '/items/sorcerer_boots': '巫师靴',
        '/items/cheese_boots': '奶酪靴',
        '/items/verdant_boots': '翠绿靴',
        '/items/azure_boots': '蔚蓝靴',
        '/items/burble_boots': '深紫靴',
        '/items/crimson_boots': '绛红靴',
        '/items/rainbow_boots': '彩虹靴',
        '/items/holy_boots': '神圣靴',
        '/items/rough_boots': '粗糙靴',
        '/items/reptile_boots': '爬行动物靴',
        '/items/gobo_boots': '哥布林靴',
        '/items/beast_boots': '野兽靴',
        '/items/umbral_boots': '暗影靴',
        '/items/cotton_boots': '棉靴',
        '/items/linen_boots': '亚麻靴',
        '/items/bamboo_boots': '竹靴',
        '/items/silk_boots': '丝靴',
        '/items/radiant_boots': '光辉靴',
        '/items/small_pouch': '小袋子',
        '/items/medium_pouch': '中袋子',
        '/items/large_pouch': '大袋子',
        '/items/giant_pouch': '巨大袋子',
        '/items/gluttonous_pouch': '贪食之袋',
        '/items/guzzling_pouch': '暴饮之囊',
        '/items/necklace_of_efficiency': '效率项链',
        '/items/fighter_necklace': '战士项链',
        '/items/ranger_necklace': '射手项链',
        '/items/wizard_necklace': '巫师项链',
        '/items/necklace_of_wisdom': '经验项链',
        '/items/necklace_of_speed': '速度项链',
        '/items/philosophers_necklace': '贤者项链',
        '/items/earrings_of_gathering': '采集耳环',
        '/items/earrings_of_essence_find': '精华发现耳环',
        '/items/earrings_of_armor': '护甲耳环',
        '/items/earrings_of_regeneration': '恢复耳环',
        '/items/earrings_of_resistance': '抗性耳环',
        '/items/earrings_of_rare_find': '稀有发现耳环',
        '/items/earrings_of_critical_strike': '暴击耳环',
        '/items/philosophers_earrings': '贤者耳环',
        '/items/ring_of_gathering': '采集戒指',
        '/items/ring_of_essence_find': '精华发现戒指',
        '/items/ring_of_armor': '护甲戒指',
        '/items/ring_of_regeneration': '恢复戒指',
        '/items/ring_of_resistance': '抗性戒指',
        '/items/ring_of_rare_find': '稀有发现戒指',
        '/items/ring_of_critical_strike': '暴击戒指',
        '/items/philosophers_ring': '贤者戒指',
        '/items/basic_task_badge': '基础任务徽章',
        '/items/advanced_task_badge': '高级任务徽章',
        '/items/expert_task_badge': '专家任务徽章',
        '/items/celestial_brush': '星空刷子',
        '/items/cheese_brush': '奶酪刷子',
        '/items/verdant_brush': '翠绿刷子',
        '/items/azure_brush': '蔚蓝刷子',
        '/items/burble_brush': '深紫刷子',
        '/items/crimson_brush': '绛红刷子',
        '/items/rainbow_brush': '彩虹刷子',
        '/items/holy_brush': '神圣刷子',
        '/items/celestial_shears': '星空剪刀',
        '/items/cheese_shears': '奶酪剪刀',
        '/items/verdant_shears': '翠绿剪刀',
        '/items/azure_shears': '蔚蓝剪刀',
        '/items/burble_shears': '深紫剪刀',
        '/items/crimson_shears': '绛红剪刀',
        '/items/rainbow_shears': '彩虹剪刀',
        '/items/holy_shears': '神圣剪刀',
        '/items/celestial_hatchet': '星空斧头',
        '/items/cheese_hatchet': '奶酪斧头',
        '/items/verdant_hatchet': '翠绿斧头',
        '/items/azure_hatchet': '蔚蓝斧头',
        '/items/burble_hatchet': '深紫斧头',
        '/items/crimson_hatchet': '绛红斧头',
        '/items/rainbow_hatchet': '彩虹斧头',
        '/items/holy_hatchet': '神圣斧头',
        '/items/celestial_hammer': '星空锤子',
        '/items/cheese_hammer': '奶酪锤子',
        '/items/verdant_hammer': '翠绿锤子',
        '/items/azure_hammer': '蔚蓝锤子',
        '/items/burble_hammer': '深紫锤子',
        '/items/crimson_hammer': '绛红锤子',
        '/items/rainbow_hammer': '彩虹锤子',
        '/items/holy_hammer': '神圣锤子',
        '/items/celestial_chisel': '星空凿子',
        '/items/cheese_chisel': '奶酪凿子',
        '/items/verdant_chisel': '翠绿凿子',
        '/items/azure_chisel': '蔚蓝凿子',
        '/items/burble_chisel': '深紫凿子',
        '/items/crimson_chisel': '绛红凿子',
        '/items/rainbow_chisel': '彩虹凿子',
        '/items/holy_chisel': '神圣凿子',
        '/items/celestial_needle': '星空针',
        '/items/cheese_needle': '奶酪针',
        '/items/verdant_needle': '翠绿针',
        '/items/azure_needle': '蔚蓝针',
        '/items/burble_needle': '深紫针',
        '/items/crimson_needle': '绛红针',
        '/items/rainbow_needle': '彩虹针',
        '/items/holy_needle': '神圣针',
        '/items/celestial_spatula': '星空锅铲',
        '/items/cheese_spatula': '奶酪锅铲',
        '/items/verdant_spatula': '翠绿锅铲',
        '/items/azure_spatula': '蔚蓝锅铲',
        '/items/burble_spatula': '深紫锅铲',
        '/items/crimson_spatula': '绛红锅铲',
        '/items/rainbow_spatula': '彩虹锅铲',
        '/items/holy_spatula': '神圣锅铲',
        '/items/celestial_pot': '星空壶',
        '/items/cheese_pot': '奶酪壶',
        '/items/verdant_pot': '翠绿壶',
        '/items/azure_pot': '蔚蓝壶',
        '/items/burble_pot': '深紫壶',
        '/items/crimson_pot': '绛红壶',
        '/items/rainbow_pot': '彩虹壶',
        '/items/holy_pot': '神圣壶',
        '/items/celestial_alembic': '星空蒸馏器',
        '/items/cheese_alembic': '奶酪蒸馏器',
        '/items/verdant_alembic': '翠绿蒸馏器',
        '/items/azure_alembic': '蔚蓝蒸馏器',
        '/items/burble_alembic': '深紫蒸馏器',
        '/items/crimson_alembic': '绛红蒸馏器',
        '/items/rainbow_alembic': '彩虹蒸馏器',
        '/items/holy_alembic': '神圣蒸馏器',
        '/items/celestial_enhancer': '星空强化器',
        '/items/cheese_enhancer': '奶酪强化器',
        '/items/verdant_enhancer': '翠绿强化器',
        '/items/azure_enhancer': '蔚蓝强化器',
        '/items/burble_enhancer': '深紫强化器',
        '/items/crimson_enhancer': '绛红强化器',
        '/items/rainbow_enhancer': '彩虹强化器',
        '/items/holy_enhancer': '神圣强化器',
        '/items/milk': '牛奶',
        '/items/verdant_milk': '翠绿牛奶',
        '/items/azure_milk': '蔚蓝牛奶',
        '/items/burble_milk': '深紫牛奶',
        '/items/crimson_milk': '绛红牛奶',
        '/items/rainbow_milk': '彩虹牛奶',
        '/items/holy_milk': '神圣牛奶',
        '/items/cheese': '奶酪',
        '/items/verdant_cheese': '翠绿奶酪',
        '/items/azure_cheese': '蔚蓝奶酪',
        '/items/burble_cheese': '深紫奶酪',
        '/items/crimson_cheese': '绛红奶酪',
        '/items/rainbow_cheese': '彩虹奶酪',
        '/items/holy_cheese': '神圣奶酪',
        '/items/log': '原木',
        '/items/birch_log': '白桦原木',
        '/items/cedar_log': '雪松原木',
        '/items/purpleheart_log': '紫心原木',
        '/items/ginkgo_log': '银杏原木',
        '/items/redwood_log': '红杉原木',
        '/items/arcane_log': '神秘原木',
        '/items/lumber': '木板',
        '/items/birch_lumber': '白桦木板',
        '/items/cedar_lumber': '雪松木板',
        '/items/purpleheart_lumber': '紫心木板',
        '/items/ginkgo_lumber': '银杏木板',
        '/items/redwood_lumber': '红杉木板',
        '/items/arcane_lumber': '神秘木板',
        '/items/rough_hide': '粗糙兽皮',
        '/items/reptile_hide': '爬行动物皮',
        '/items/gobo_hide': '哥布林皮',
        '/items/beast_hide': '野兽皮',
        '/items/umbral_hide': '暗影皮',
        '/items/rough_leather': '粗糙皮革',
        '/items/reptile_leather': '爬行动物皮革',
        '/items/gobo_leather': '哥布林皮革',
        '/items/beast_leather': '野兽皮革',
        '/items/umbral_leather': '暗影皮革',
        '/items/cotton': '棉花',
        '/items/flax': '亚麻',
        '/items/bamboo_branch': '竹子',
        '/items/cocoon': '蚕茧',
        '/items/radiant_fiber': '光辉纤维',
        '/items/cotton_fabric': '棉花布料',
        '/items/linen_fabric': '亚麻布料',
        '/items/bamboo_fabric': '竹子布料',
        '/items/silk_fabric': '丝绸',
        '/items/radiant_fabric': '光辉布料',
        '/items/egg': '鸡蛋',
        '/items/wheat': '小麦',
        '/items/sugar': '糖',
        '/items/blueberry': '蓝莓',
        '/items/blackberry': '黑莓',
        '/items/strawberry': '草莓',
        '/items/mooberry': '哞梅',
        '/items/marsberry': '火星梅',
        '/items/spaceberry': '太空梅',
        '/items/apple': '苹果',
        '/items/orange': '橙子',
        '/items/plum': '李子',
        '/items/peach': '桃子',
        '/items/dragon_fruit': '火龙果',
        '/items/star_fruit': '杨桃',
        '/items/arabica_coffee_bean': '低级咖啡豆',
        '/items/robusta_coffee_bean': '中级咖啡豆',
        '/items/liberica_coffee_bean': '高级咖啡豆',
        '/items/excelsa_coffee_bean': '特级咖啡豆',
        '/items/fieriosa_coffee_bean': '火山咖啡豆',
        '/items/spacia_coffee_bean': '太空咖啡豆',
        '/items/green_tea_leaf': '绿茶叶',
        '/items/black_tea_leaf': '黑茶叶',
        '/items/burble_tea_leaf': '紫茶叶',
        '/items/moolong_tea_leaf': '哞龙茶叶',
        '/items/red_tea_leaf': '红茶叶',
        '/items/emp_tea_leaf': '虚空茶叶',
        '/items/catalyst_of_coinification': '点金催化剂',
        '/items/catalyst_of_decomposition': '分解催化剂',
        '/items/catalyst_of_transmutation': '转化催化剂',
        '/items/prime_catalyst': '至高催化剂',
        '/items/snake_fang': '蛇牙',
        '/items/shoebill_feather': '鲸头鹳羽毛',
        '/items/snail_shell': '蜗牛壳',
        '/items/crab_pincer': '蟹钳',
        '/items/turtle_shell': '乌龟壳',
        '/items/marine_scale': '海洋鳞片',
        '/items/treant_bark': '树皮',
        '/items/centaur_hoof': '半人马蹄',
        '/items/luna_wing': '月神翼',
        '/items/gobo_rag': '哥布林抹布',
        '/items/goggles': '护目镜',
        '/items/magnifying_glass': '放大镜',
        '/items/eye_of_the_watcher': '观察者之眼',
        '/items/icy_cloth': '冰霜织物',
        '/items/flaming_cloth': '烈焰织物',
        '/items/sorcerers_sole': '魔法师鞋底',
        '/items/chrono_sphere': '时空球',
        '/items/frost_sphere': '冰霜球',
        '/items/panda_fluff': '熊猫绒',
        '/items/black_bear_fluff': '黑熊绒',
        '/items/grizzly_bear_fluff': '棕熊绒',
        '/items/polar_bear_fluff': '北极熊绒',
        '/items/red_panda_fluff': '小熊猫绒',
        '/items/magnet': '磁铁',
        '/items/stalactite_shard': '钟乳石碎片',
        '/items/living_granite': '花岗岩',
        '/items/colossus_core': '巨像核心',
        '/items/vampire_fang': '吸血鬼之牙',
        '/items/werewolf_claw': '狼人之爪',
        '/items/revenant_anima': '亡者之魂',
        '/items/soul_fragment': '灵魂碎片',
        '/items/infernal_ember': '地狱余烬',
        '/items/demonic_core': '恶魔核心',
        '/items/griffin_leather': '狮鹫之皮',
        '/items/manticore_sting': '蝎狮之刺',
        '/items/jackalope_antler': '鹿角兔之角',
        '/items/dodocamel_plume': '渡渡驼之翎',
        '/items/griffin_talon': '狮鹫之爪',
        '/items/acrobats_ribbon': '杂技师彩带',
        '/items/magicians_cloth': '魔术师织物',
        '/items/chaotic_chain': '混沌锁链',
        '/items/cursed_ball': '诅咒之球',
        '/items/royal_cloth': '皇家织物',
        '/items/knights_ingot': '骑士之锭',
        '/items/bishops_scroll': '主教卷轴',
        '/items/regal_jewel': '君王宝石',
        '/items/sundering_jewel': '裂空宝石',
        '/items/butter_of_proficiency': '精通之油',
        '/items/thread_of_expertise': '专精之线',
        '/items/branch_of_insight': '洞察之枝',
        '/items/gluttonous_energy': '贪食能量',
        '/items/guzzling_energy': '暴饮能量',
        '/items/milking_essence': '挤奶精华',
        '/items/foraging_essence': '采摘精华',
        '/items/woodcutting_essence': '伐木精华',
        '/items/cheesesmithing_essence': '奶酪锻造精华',
        '/items/crafting_essence': '制作精华',
        '/items/tailoring_essence': '缝纫精华',
        '/items/cooking_essence': '烹饪精华',
        '/items/brewing_essence': '冲泡精华',
        '/items/alchemy_essence': '炼金精华',
        '/items/enhancing_essence': '强化精华',
        '/items/swamp_essence': '沼泽精华',
        '/items/aqua_essence': '海洋精华',
        '/items/jungle_essence': '丛林精华',
        '/items/gobo_essence': '哥布林精华',
        '/items/eyessence': '眼精华',
        '/items/sorcerer_essence': '法师精华',
        '/items/bear_essence': '熊熊精华',
        '/items/golem_essence': '魔像精华',
        '/items/twilight_essence': '暮光精华',
        '/items/abyssal_essence': '地狱精华',
        '/items/chimerical_essence': '奇幻精华',
        '/items/sinister_essence': '阴森精华',
        '/items/enchanted_essence': '秘法精华',
        '/items/task_crystal': '任务水晶',
        '/items/star_fragment': '星光碎片',
        '/items/pearl': '珍珠',
        '/items/amber': '琥珀',
        '/items/garnet': '石榴石',
        '/items/jade': '翡翠',
        '/items/amethyst': '紫水晶',
        '/items/moonstone': '月亮石',
        '/items/sunstone': '太阳石',
        '/items/philosophers_stone': '贤者之石',
        '/items/crushed_pearl': '珍珠碎片',
        '/items/crushed_amber': '琥珀碎片',
        '/items/crushed_garnet': '石榴石碎片',
        '/items/crushed_jade': '翡翠碎片',
        '/items/crushed_amethyst': '紫水晶碎片',
        '/items/crushed_moonstone': '月亮石碎片',
        '/items/crushed_sunstone': '太阳石碎片',
        '/items/crushed_philosophers_stone': '贤者之石碎片',
        '/items/shard_of_protection': '保护碎片',
        '/items/mirror_of_protection': '保护之镜'
    };
    let itemNames = {
        '/items/coin': 'Coin',
        '/items/task_token': 'Task Token',
        '/items/chimerical_token': 'Chimerical Token',
        '/items/sinister_token': 'Sinister Token',
        '/items/enchanted_token': 'Enchanted Token',
        '/items/cowbell': 'Cowbell',
        '/items/bag_of_10_cowbells': 'Bag Of 10 Cowbells',
        '/items/purples_gift': 'Purple\'s Gift',
        '/items/small_meteorite_cache': 'Small Meteorite Cache',
        '/items/medium_meteorite_cache': 'Medium Meteorite Cache',
        '/items/large_meteorite_cache': 'Large Meteorite Cache',
        '/items/small_artisans_crate': 'Small Artisan\'s Crate',
        '/items/medium_artisans_crate': 'Medium Artisan\'s Crate',
        '/items/large_artisans_crate': 'Large Artisan\'s Crate',
        '/items/small_treasure_chest': 'Small Treasure Chest',
        '/items/medium_treasure_chest': 'Medium Treasure Chest',
        '/items/large_treasure_chest': 'Large Treasure Chest',
        '/items/chimerical_chest': 'Chimerical Chest',
        '/items/sinister_chest': 'Sinister Chest',
        '/items/enchanted_chest': 'Enchanted Chest',
        '/items/blue_key_fragment': 'Blue Key Fragment',
        '/items/green_key_fragment': 'Green Key Fragment',
        '/items/purple_key_fragment': 'Purple Key Fragment',
        '/items/white_key_fragment': 'White Key Fragment',
        '/items/orange_key_fragment': 'Orange Key Fragment',
        '/items/brown_key_fragment': 'Brown Key Fragment',
        '/items/stone_key_fragment': 'Stone Key Fragment',
        '/items/dark_key_fragment': 'Dark Key Fragment',
        '/items/burning_key_fragment': 'Burning Key Fragment',
        '/items/chimerical_entry_key': 'Chimerical Entry Key',
        '/items/chimerical_chest_key': 'Chimerical Chest Key',
        '/items/sinister_entry_key': 'Sinister Entry Key',
        '/items/sinister_chest_key': 'Sinister Chest Key',
        '/items/enchanted_entry_key': 'Enchanted Entry Key',
        '/items/enchanted_chest_key': 'Enchanted Chest Key',
        '/items/donut': 'Donut',
        '/items/blueberry_donut': 'Blueberry Donut',
        '/items/blackberry_donut': 'Blackberry Donut',
        '/items/strawberry_donut': 'Strawberry Donut',
        '/items/mooberry_donut': 'Mooberry Donut',
        '/items/marsberry_donut': 'Marsberry Donut',
        '/items/spaceberry_donut': 'Spaceberry Donut',
        '/items/cupcake': 'Cupcake',
        '/items/blueberry_cake': 'Blueberry Cake',
        '/items/blackberry_cake': 'Blackberry Cake',
        '/items/strawberry_cake': 'Strawberry Cake',
        '/items/mooberry_cake': 'Mooberry Cake',
        '/items/marsberry_cake': 'Marsberry Cake',
        '/items/spaceberry_cake': 'Spaceberry Cake',
        '/items/gummy': 'Gummy',
        '/items/apple_gummy': 'Apple Gummy',
        '/items/orange_gummy': 'Orange Gummy',
        '/items/plum_gummy': 'Plum Gummy',
        '/items/peach_gummy': 'Peach Gummy',
        '/items/dragon_fruit_gummy': 'Dragon Fruit Gummy',
        '/items/star_fruit_gummy': 'Star Fruit Gummy',
        '/items/yogurt': 'Yogurt',
        '/items/apple_yogurt': 'Apple Yogurt',
        '/items/orange_yogurt': 'Orange Yogurt',
        '/items/plum_yogurt': 'Plum Yogurt',
        '/items/peach_yogurt': 'Peach Yogurt',
        '/items/dragon_fruit_yogurt': 'Dragon Fruit Yogurt',
        '/items/star_fruit_yogurt': 'Star Fruit Yogurt',
        '/items/milking_tea': 'Milking Tea',
        '/items/foraging_tea': 'Foraging Tea',
        '/items/woodcutting_tea': 'Woodcutting Tea',
        '/items/cooking_tea': 'Cooking Tea',
        '/items/brewing_tea': 'Brewing Tea',
        '/items/alchemy_tea': 'Alchemy Tea',
        '/items/enhancing_tea': 'Enhancing Tea',
        '/items/cheesesmithing_tea': 'Cheesesmithing Tea',
        '/items/crafting_tea': 'Crafting Tea',
        '/items/tailoring_tea': 'Tailoring Tea',
        '/items/super_milking_tea': 'Super Milking Tea',
        '/items/super_foraging_tea': 'Super Foraging Tea',
        '/items/super_woodcutting_tea': 'Super Woodcutting Tea',
        '/items/super_cooking_tea': 'Super Cooking Tea',
        '/items/super_brewing_tea': 'Super Brewing Tea',
        '/items/super_alchemy_tea': 'Super Alchemy Tea',
        '/items/super_enhancing_tea': 'Super Enhancing Tea',
        '/items/super_cheesesmithing_tea': 'Super Cheesesmithing Tea',
        '/items/super_crafting_tea': 'Super Crafting Tea',
        '/items/super_tailoring_tea': 'Super Tailoring Tea',
        '/items/ultra_milking_tea': 'Ultra Milking Tea',
        '/items/ultra_foraging_tea': 'Ultra Foraging Tea',
        '/items/ultra_woodcutting_tea': 'Ultra Woodcutting Tea',
        '/items/ultra_cooking_tea': 'Ultra Cooking Tea',
        '/items/ultra_brewing_tea': 'Ultra Brewing Tea',
        '/items/ultra_alchemy_tea': 'Ultra Alchemy Tea',
        '/items/ultra_enhancing_tea': 'Ultra Enhancing Tea',
        '/items/ultra_cheesesmithing_tea': 'Ultra Cheesesmithing Tea',
        '/items/ultra_crafting_tea': 'Ultra Crafting Tea',
        '/items/ultra_tailoring_tea': 'Ultra Tailoring Tea',
        '/items/gathering_tea': 'Gathering Tea',
        '/items/gourmet_tea': 'Gourmet Tea',
        '/items/wisdom_tea': 'Wisdom Tea',
        '/items/processing_tea': 'Processing Tea',
        '/items/efficiency_tea': 'Efficiency Tea',
        '/items/artisan_tea': 'Artisan Tea',
        '/items/catalytic_tea': 'Catalytic Tea',
        '/items/blessed_tea': 'Blessed Tea',
        '/items/stamina_coffee': 'Stamina Coffee',
        '/items/intelligence_coffee': 'Intelligence Coffee',
        '/items/defense_coffee': 'Defense Coffee',
        '/items/attack_coffee': 'Attack Coffee',
        '/items/power_coffee': 'Power Coffee',
        '/items/ranged_coffee': 'Ranged Coffee',
        '/items/magic_coffee': 'Magic Coffee',
        '/items/super_stamina_coffee': 'Super Stamina Coffee',
        '/items/super_intelligence_coffee': 'Super Intelligence Coffee',
        '/items/super_defense_coffee': 'Super Defense Coffee',
        '/items/super_attack_coffee': 'Super Attack Coffee',
        '/items/super_power_coffee': 'Super Power Coffee',
        '/items/super_ranged_coffee': 'Super Ranged Coffee',
        '/items/super_magic_coffee': 'Super Magic Coffee',
        '/items/ultra_stamina_coffee': 'Ultra Stamina Coffee',
        '/items/ultra_intelligence_coffee': 'Ultra Intelligence Coffee',
        '/items/ultra_defense_coffee': 'Ultra Defense Coffee',
        '/items/ultra_attack_coffee': 'Ultra Attack Coffee',
        '/items/ultra_power_coffee': 'Ultra Power Coffee',
        '/items/ultra_ranged_coffee': 'Ultra Ranged Coffee',
        '/items/ultra_magic_coffee': 'Ultra Magic Coffee',
        '/items/wisdom_coffee': 'Wisdom Coffee',
        '/items/lucky_coffee': 'Lucky Coffee',
        '/items/swiftness_coffee': 'Swiftness Coffee',
        '/items/channeling_coffee': 'Channeling Coffee',
        '/items/critical_coffee': 'Critical Coffee',
        '/items/poke': 'Poke',
        '/items/impale': 'Impale',
        '/items/puncture': 'Puncture',
        '/items/penetrating_strike': 'Penetrating Strike',
        '/items/scratch': 'Scratch',
        '/items/cleave': 'Cleave',
        '/items/maim': 'Maim',
        '/items/crippling_slash': 'Crippling Slash',
        '/items/smack': 'Smack',
        '/items/sweep': 'Sweep',
        '/items/stunning_blow': 'Stunning Blow',
        '/items/quick_shot': 'Quick Shot',
        '/items/aqua_arrow': 'Aqua Arrow',
        '/items/flame_arrow': 'Flame Arrow',
        '/items/rain_of_arrows': 'Rain Of Arrows',
        '/items/silencing_shot': 'Silencing Shot',
        '/items/steady_shot': 'Steady Shot',
        '/items/pestilent_shot': 'Pestilent Shot',
        '/items/penetrating_shot': 'Penetrating Shot',
        '/items/water_strike': 'Water Strike',
        '/items/ice_spear': 'Ice Spear',
        '/items/frost_surge': 'Frost Surge',
        '/items/mana_spring': 'Mana Spring',
        '/items/entangle': 'Entangle',
        '/items/toxic_pollen': 'Toxic Pollen',
        '/items/natures_veil': 'Nature\'s Veil',
        '/items/fireball': 'Fireball',
        '/items/flame_blast': 'Flame Blast',
        '/items/firestorm': 'Firestorm',
        '/items/smoke_burst': 'Smoke Burst',
        '/items/minor_heal': 'Minor Heal',
        '/items/heal': 'Heal',
        '/items/quick_aid': 'Quick Aid',
        '/items/rejuvenate': 'Rejuvenate',
        '/items/taunt': 'Taunt',
        '/items/provoke': 'Provoke',
        '/items/toughness': 'Toughness',
        '/items/elusiveness': 'Elusiveness',
        '/items/precision': 'Precision',
        '/items/berserk': 'Berserk',
        '/items/elemental_affinity': 'Elemental Affinity',
        '/items/frenzy': 'Frenzy',
        '/items/spike_shell': 'Spike Shell',
        '/items/arcane_reflection': 'Arcane Reflection',
        '/items/vampirism': 'Vampirism',
        '/items/revive': 'Revive',
        '/items/insanity': 'Insanity',
        '/items/invincible': 'Invincible',
        '/items/fierce_aura': 'Fierce Aura',
        '/items/aqua_aura': 'Aqua Aura',
        '/items/sylvan_aura': 'Sylvan Aura',
        '/items/flame_aura': 'Flame Aura',
        '/items/speed_aura': 'Speed Aura',
        '/items/critical_aura': 'Critical Aura',
        '/items/gobo_stabber': 'Gobo Stabber',
        '/items/gobo_slasher': 'Gobo Slasher',
        '/items/gobo_smasher': 'Gobo Smasher',
        '/items/spiked_bulwark': 'Spiked Bulwark',
        '/items/werewolf_slasher': 'Werewolf Slasher',
        '/items/griffin_bulwark': 'Griffin Bulwark',
        '/items/gobo_shooter': 'Gobo Shooter',
        '/items/vampiric_bow': 'Vampiric Bow',
        '/items/cursed_bow': 'Cursed Bow',
        '/items/gobo_boomstick': 'Gobo Boomstick',
        '/items/cheese_bulwark': 'Cheese Bulwark',
        '/items/verdant_bulwark': 'Verdant Bulwark',
        '/items/azure_bulwark': 'Azure Bulwark',
        '/items/burble_bulwark': 'Burble Bulwark',
        '/items/crimson_bulwark': 'Crimson Bulwark',
        '/items/rainbow_bulwark': 'Rainbow Bulwark',
        '/items/holy_bulwark': 'Holy Bulwark',
        '/items/wooden_bow': 'Wooden Bow',
        '/items/birch_bow': 'Birch Bow',
        '/items/cedar_bow': 'Cedar Bow',
        '/items/purpleheart_bow': 'Purpleheart Bow',
        '/items/ginkgo_bow': 'Ginkgo Bow',
        '/items/redwood_bow': 'Redwood Bow',
        '/items/arcane_bow': 'Arcane Bow',
        '/items/stalactite_spear': 'Stalactite Spear',
        '/items/granite_bludgeon': 'Granite Bludgeon',
        '/items/regal_sword': 'Regal Sword',
        '/items/chaotic_flail': 'Chaotic Flail',
        '/items/soul_hunter_crossbow': 'Soul Hunter Crossbow',
        '/items/sundering_crossbow': 'Sundering Crossbow',
        '/items/frost_staff': 'Frost Staff',
        '/items/infernal_battlestaff': 'Infernal Battlestaff',
        '/items/jackalope_staff': 'Jackalope Staff',
        '/items/cheese_sword': 'Cheese Sword',
        '/items/verdant_sword': 'Verdant Sword',
        '/items/azure_sword': 'Azure Sword',
        '/items/burble_sword': 'Burble Sword',
        '/items/crimson_sword': 'Crimson Sword',
        '/items/rainbow_sword': 'Rainbow Sword',
        '/items/holy_sword': 'Holy Sword',
        '/items/cheese_spear': 'Cheese Spear',
        '/items/verdant_spear': 'Verdant Spear',
        '/items/azure_spear': 'Azure Spear',
        '/items/burble_spear': 'Burble Spear',
        '/items/crimson_spear': 'Crimson Spear',
        '/items/rainbow_spear': 'Rainbow Spear',
        '/items/holy_spear': 'Holy Spear',
        '/items/cheese_mace': 'Cheese Mace',
        '/items/verdant_mace': 'Verdant Mace',
        '/items/azure_mace': 'Azure Mace',
        '/items/burble_mace': 'Burble Mace',
        '/items/crimson_mace': 'Crimson Mace',
        '/items/rainbow_mace': 'Rainbow Mace',
        '/items/holy_mace': 'Holy Mace',
        '/items/wooden_crossbow': 'Wooden Crossbow',
        '/items/birch_crossbow': 'Birch Crossbow',
        '/items/cedar_crossbow': 'Cedar Crossbow',
        '/items/purpleheart_crossbow': 'Purpleheart Crossbow',
        '/items/ginkgo_crossbow': 'Ginkgo Crossbow',
        '/items/redwood_crossbow': 'Redwood Crossbow',
        '/items/arcane_crossbow': 'Arcane Crossbow',
        '/items/wooden_water_staff': 'Wooden Water Staff',
        '/items/birch_water_staff': 'Birch Water Staff',
        '/items/cedar_water_staff': 'Cedar Water Staff',
        '/items/purpleheart_water_staff': 'Purpleheart Water Staff',
        '/items/ginkgo_water_staff': 'Ginkgo Water Staff',
        '/items/redwood_water_staff': 'Redwood Water Staff',
        '/items/arcane_water_staff': 'Arcane Water Staff',
        '/items/wooden_nature_staff': 'Wooden Nature Staff',
        '/items/birch_nature_staff': 'Birch Nature Staff',
        '/items/cedar_nature_staff': 'Cedar Nature Staff',
        '/items/purpleheart_nature_staff': 'Purpleheart Nature Staff',
        '/items/ginkgo_nature_staff': 'Ginkgo Nature Staff',
        '/items/redwood_nature_staff': 'Redwood Nature Staff',
        '/items/arcane_nature_staff': 'Arcane Nature Staff',
        '/items/wooden_fire_staff': 'Wooden Fire Staff',
        '/items/birch_fire_staff': 'Birch Fire Staff',
        '/items/cedar_fire_staff': 'Cedar Fire Staff',
        '/items/purpleheart_fire_staff': 'Purpleheart Fire Staff',
        '/items/ginkgo_fire_staff': 'Ginkgo Fire Staff',
        '/items/redwood_fire_staff': 'Redwood Fire Staff',
        '/items/arcane_fire_staff': 'Arcane Fire Staff',
        '/items/eye_watch': 'Eye Watch',
        '/items/snake_fang_dirk': 'Snake Fang Dirk',
        '/items/vision_shield': 'Vision Shield',
        '/items/gobo_defender': 'Gobo Defender',
        '/items/vampire_fang_dirk': 'Vampire Fang Dirk',
        '/items/knights_aegis': 'Knight\'s Aegis',
        '/items/treant_shield': 'Treant Shield',
        '/items/manticore_shield': 'Manticore Shield',
        '/items/tome_of_healing': 'Tome Of Healing',
        '/items/tome_of_the_elements': 'Tome Of The Elements',
        '/items/watchful_relic': 'Watchful Relic',
        '/items/bishops_codex': 'Bishop\'s Codex',
        '/items/cheese_buckler': 'Cheese Buckler',
        '/items/verdant_buckler': 'Verdant Buckler',
        '/items/azure_buckler': 'Azure Buckler',
        '/items/burble_buckler': 'Burble Buckler',
        '/items/crimson_buckler': 'Crimson Buckler',
        '/items/rainbow_buckler': 'Rainbow Buckler',
        '/items/holy_buckler': 'Holy Buckler',
        '/items/wooden_shield': 'Wooden Shield',
        '/items/birch_shield': 'Birch Shield',
        '/items/cedar_shield': 'Cedar Shield',
        '/items/purpleheart_shield': 'Purpleheart Shield',
        '/items/ginkgo_shield': 'Ginkgo Shield',
        '/items/redwood_shield': 'Redwood Shield',
        '/items/arcane_shield': 'Arcane Shield',
        '/items/sinister_cape': 'Sinister Cape',
        '/items/chimerical_quiver': 'Chimerical Quiver',
        '/items/enchanted_cloak': 'Enchanted Cloak',
        '/items/red_culinary_hat': 'Red Culinary Hat',
        '/items/snail_shell_helmet': 'Snail Shell Helmet',
        '/items/vision_helmet': 'Vision Helmet',
        '/items/fluffy_red_hat': 'Fluffy Red Hat',
        '/items/acrobatic_hood': 'Acrobatic Hood',
        '/items/magicians_hat': 'Magician\'s Hat',
        '/items/cheese_helmet': 'Cheese Helmet',
        '/items/verdant_helmet': 'Verdant Helmet',
        '/items/azure_helmet': 'Azure Helmet',
        '/items/burble_helmet': 'Burble Helmet',
        '/items/crimson_helmet': 'Crimson Helmet',
        '/items/rainbow_helmet': 'Rainbow Helmet',
        '/items/holy_helmet': 'Holy Helmet',
        '/items/rough_hood': 'Rough Hood',
        '/items/reptile_hood': 'Reptile Hood',
        '/items/gobo_hood': 'Gobo Hood',
        '/items/beast_hood': 'Beast Hood',
        '/items/umbral_hood': 'Umbral Hood',
        '/items/cotton_hat': 'Cotton Hat',
        '/items/linen_hat': 'Linen Hat',
        '/items/bamboo_hat': 'Bamboo Hat',
        '/items/silk_hat': 'Silk Hat',
        '/items/radiant_hat': 'Radiant Hat',
        '/items/dairyhands_top': 'Dairyhand\'s Top',
        '/items/foragers_top': 'Forager\'s Top',
        '/items/lumberjacks_top': 'Lumberjack\'s Top',
        '/items/cheesemakers_top': 'Cheesemaker\'s Top',
        '/items/crafters_top': 'Crafter\'s Top',
        '/items/tailors_top': 'Tailor\'s Top',
        '/items/chefs_top': 'Chef\'s Top',
        '/items/brewers_top': 'Brewer\'s Top',
        '/items/alchemists_top': 'Alchemist\'s Top',
        '/items/enhancers_top': 'Enhancer\'s Top',
        '/items/gator_vest': 'Gator Vest',
        '/items/turtle_shell_body': 'Turtle Shell Body',
        '/items/colossus_plate_body': 'Colossus Plate Body',
        '/items/demonic_plate_body': 'Demonic Plate Body',
        '/items/marine_tunic': 'Marine Tunic',
        '/items/revenant_tunic': 'Revenant Tunic',
        '/items/griffin_tunic': 'Griffin Tunic',
        '/items/icy_robe_top': 'Icy Robe Top',
        '/items/flaming_robe_top': 'Flaming Robe Top',
        '/items/luna_robe_top': 'Luna Robe Top',
        '/items/royal_water_robe_top': 'Royal Water Robe Top',
        '/items/royal_nature_robe_top': 'Royal Nature Robe Top',
        '/items/royal_fire_robe_top': 'Royal Fire Robe Top',
        '/items/cheese_plate_body': 'Cheese Plate Body',
        '/items/verdant_plate_body': 'Verdant Plate Body',
        '/items/azure_plate_body': 'Azure Plate Body',
        '/items/burble_plate_body': 'Burble Plate Body',
        '/items/crimson_plate_body': 'Crimson Plate Body',
        '/items/rainbow_plate_body': 'Rainbow Plate Body',
        '/items/holy_plate_body': 'Holy Plate Body',
        '/items/rough_tunic': 'Rough Tunic',
        '/items/reptile_tunic': 'Reptile Tunic',
        '/items/gobo_tunic': 'Gobo Tunic',
        '/items/beast_tunic': 'Beast Tunic',
        '/items/umbral_tunic': 'Umbral Tunic',
        '/items/cotton_robe_top': 'Cotton Robe Top',
        '/items/linen_robe_top': 'Linen Robe Top',
        '/items/bamboo_robe_top': 'Bamboo Robe Top',
        '/items/silk_robe_top': 'Silk Robe Top',
        '/items/radiant_robe_top': 'Radiant Robe Top',
        '/items/dairyhands_bottoms': 'Dairyhand\'s Bottoms',
        '/items/foragers_bottoms': 'Forager\'s Bottoms',
        '/items/lumberjacks_bottoms': 'Lumberjack\'s Bottoms',
        '/items/cheesemakers_bottoms': 'Cheesemaker\'s Bottoms',
        '/items/crafters_bottoms': 'Crafter\'s Bottoms',
        '/items/tailors_bottoms': 'Tailor\'s Bottoms',
        '/items/chefs_bottoms': 'Chef\'s Bottoms',
        '/items/brewers_bottoms': 'Brewer\'s Bottoms',
        '/items/alchemists_bottoms': 'Alchemist\'s Bottoms',
        '/items/enhancers_bottoms': 'Enhancer\'s Bottoms',
        '/items/turtle_shell_legs': 'Turtle Shell Legs',
        '/items/colossus_plate_legs': 'Colossus Plate Legs',
        '/items/demonic_plate_legs': 'Demonic Plate Legs',
        '/items/marine_chaps': 'Marine Chaps',
        '/items/revenant_chaps': 'Revenant Chaps',
        '/items/griffin_chaps': 'Griffin Chaps',
        '/items/icy_robe_bottoms': 'Icy Robe Bottoms',
        '/items/flaming_robe_bottoms': 'Flaming Robe Bottoms',
        '/items/luna_robe_bottoms': 'Luna Robe Bottoms',
        '/items/royal_water_robe_bottoms': 'Royal Water Robe Bottoms',
        '/items/royal_nature_robe_bottoms': 'Royal Nature Robe Bottoms',
        '/items/royal_fire_robe_bottoms': 'Royal Fire Robe Bottoms',
        '/items/cheese_plate_legs': 'Cheese Plate Legs',
        '/items/verdant_plate_legs': 'Verdant Plate Legs',
        '/items/azure_plate_legs': 'Azure Plate Legs',
        '/items/burble_plate_legs': 'Burble Plate Legs',
        '/items/crimson_plate_legs': 'Crimson Plate Legs',
        '/items/rainbow_plate_legs': 'Rainbow Plate Legs',
        '/items/holy_plate_legs': 'Holy Plate Legs',
        '/items/rough_chaps': 'Rough Chaps',
        '/items/reptile_chaps': 'Reptile Chaps',
        '/items/gobo_chaps': 'Gobo Chaps',
        '/items/beast_chaps': 'Beast Chaps',
        '/items/umbral_chaps': 'Umbral Chaps',
        '/items/cotton_robe_bottoms': 'Cotton Robe Bottoms',
        '/items/linen_robe_bottoms': 'Linen Robe Bottoms',
        '/items/bamboo_robe_bottoms': 'Bamboo Robe Bottoms',
        '/items/silk_robe_bottoms': 'Silk Robe Bottoms',
        '/items/radiant_robe_bottoms': 'Radiant Robe Bottoms',
        '/items/enchanted_gloves': 'Enchanted Gloves',
        '/items/pincer_gloves': 'Pincer Gloves',
        '/items/panda_gloves': 'Panda Gloves',
        '/items/magnetic_gloves': 'Magnetic Gloves',
        '/items/dodocamel_gauntlets': 'Dodocamel Gauntlets',
        '/items/sighted_bracers': 'Sighted Bracers',
        '/items/chrono_gloves': 'Chrono Gloves',
        '/items/cheese_gauntlets': 'Cheese Gauntlets',
        '/items/verdant_gauntlets': 'Verdant Gauntlets',
        '/items/azure_gauntlets': 'Azure Gauntlets',
        '/items/burble_gauntlets': 'Burble Gauntlets',
        '/items/crimson_gauntlets': 'Crimson Gauntlets',
        '/items/rainbow_gauntlets': 'Rainbow Gauntlets',
        '/items/holy_gauntlets': 'Holy Gauntlets',
        '/items/rough_bracers': 'Rough Bracers',
        '/items/reptile_bracers': 'Reptile Bracers',
        '/items/gobo_bracers': 'Gobo Bracers',
        '/items/beast_bracers': 'Beast Bracers',
        '/items/umbral_bracers': 'Umbral Bracers',
        '/items/cotton_gloves': 'Cotton Gloves',
        '/items/linen_gloves': 'Linen Gloves',
        '/items/bamboo_gloves': 'Bamboo Gloves',
        '/items/silk_gloves': 'Silk Gloves',
        '/items/radiant_gloves': 'Radiant Gloves',
        '/items/collectors_boots': 'Collector\'s Boots',
        '/items/shoebill_shoes': 'Shoebill Shoes',
        '/items/black_bear_shoes': 'Black Bear Shoes',
        '/items/grizzly_bear_shoes': 'Grizzly Bear Shoes',
        '/items/polar_bear_shoes': 'Polar Bear Shoes',
        '/items/centaur_boots': 'Centaur Boots',
        '/items/sorcerer_boots': 'Sorcerer Boots',
        '/items/cheese_boots': 'Cheese Boots',
        '/items/verdant_boots': 'Verdant Boots',
        '/items/azure_boots': 'Azure Boots',
        '/items/burble_boots': 'Burble Boots',
        '/items/crimson_boots': 'Crimson Boots',
        '/items/rainbow_boots': 'Rainbow Boots',
        '/items/holy_boots': 'Holy Boots',
        '/items/rough_boots': 'Rough Boots',
        '/items/reptile_boots': 'Reptile Boots',
        '/items/gobo_boots': 'Gobo Boots',
        '/items/beast_boots': 'Beast Boots',
        '/items/umbral_boots': 'Umbral Boots',
        '/items/cotton_boots': 'Cotton Boots',
        '/items/linen_boots': 'Linen Boots',
        '/items/bamboo_boots': 'Bamboo Boots',
        '/items/silk_boots': 'Silk Boots',
        '/items/radiant_boots': 'Radiant Boots',
        '/items/small_pouch': 'Small Pouch',
        '/items/medium_pouch': 'Medium Pouch',
        '/items/large_pouch': 'Large Pouch',
        '/items/giant_pouch': 'Giant Pouch',
        '/items/gluttonous_pouch': 'Gluttonous Pouch',
        '/items/guzzling_pouch': 'Guzzling Pouch',
        '/items/necklace_of_efficiency': 'Necklace Of Efficiency',
        '/items/fighter_necklace': 'Fighter Necklace',
        '/items/ranger_necklace': 'Ranger Necklace',
        '/items/wizard_necklace': 'Wizard Necklace',
        '/items/necklace_of_wisdom': 'Necklace Of Wisdom',
        '/items/necklace_of_speed': 'Necklace Of Speed',
        '/items/philosophers_necklace': 'Philosopher\'s Necklace',
        '/items/earrings_of_gathering': 'Earrings Of Gathering',
        '/items/earrings_of_essence_find': 'Earrings Of Essence Find',
        '/items/earrings_of_armor': 'Earrings Of Armor',
        '/items/earrings_of_regeneration': 'Earrings Of Regeneration',
        '/items/earrings_of_resistance': 'Earrings Of Resistance',
        '/items/earrings_of_rare_find': 'Earrings Of Rare Find',
        '/items/earrings_of_critical_strike': 'Earrings Of Critical Strike',
        '/items/philosophers_earrings': 'Philosopher\'s Earrings',
        '/items/ring_of_gathering': 'Ring Of Gathering',
        '/items/ring_of_essence_find': 'Ring Of Essence Find',
        '/items/ring_of_armor': 'Ring Of Armor',
        '/items/ring_of_regeneration': 'Ring Of Regeneration',
        '/items/ring_of_resistance': 'Ring Of Resistance',
        '/items/ring_of_rare_find': 'Ring Of Rare Find',
        '/items/ring_of_critical_strike': 'Ring Of Critical Strike',
        '/items/philosophers_ring': 'Philosopher\'s Ring',
        '/items/basic_task_badge': 'Basic Task Badge',
        '/items/advanced_task_badge': 'Advanced Task Badge',
        '/items/expert_task_badge': 'Expert Task Badge',
        '/items/celestial_brush': 'Celestial Brush',
        '/items/cheese_brush': 'Cheese Brush',
        '/items/verdant_brush': 'Verdant Brush',
        '/items/azure_brush': 'Azure Brush',
        '/items/burble_brush': 'Burble Brush',
        '/items/crimson_brush': 'Crimson Brush',
        '/items/rainbow_brush': 'Rainbow Brush',
        '/items/holy_brush': 'Holy Brush',
        '/items/celestial_shears': 'Celestial Shears',
        '/items/cheese_shears': 'Cheese Shears',
        '/items/verdant_shears': 'Verdant Shears',
        '/items/azure_shears': 'Azure Shears',
        '/items/burble_shears': 'Burble Shears',
        '/items/crimson_shears': 'Crimson Shears',
        '/items/rainbow_shears': 'Rainbow Shears',
        '/items/holy_shears': 'Holy Shears',
        '/items/celestial_hatchet': 'Celestial Hatchet',
        '/items/cheese_hatchet': 'Cheese Hatchet',
        '/items/verdant_hatchet': 'Verdant Hatchet',
        '/items/azure_hatchet': 'Azure Hatchet',
        '/items/burble_hatchet': 'Burble Hatchet',
        '/items/crimson_hatchet': 'Crimson Hatchet',
        '/items/rainbow_hatchet': 'Rainbow Hatchet',
        '/items/holy_hatchet': 'Holy Hatchet',
        '/items/celestial_hammer': 'Celestial Hammer',
        '/items/cheese_hammer': 'Cheese Hammer',
        '/items/verdant_hammer': 'Verdant Hammer',
        '/items/azure_hammer': 'Azure Hammer',
        '/items/burble_hammer': 'Burble Hammer',
        '/items/crimson_hammer': 'Crimson Hammer',
        '/items/rainbow_hammer': 'Rainbow Hammer',
        '/items/holy_hammer': 'Holy Hammer',
        '/items/celestial_chisel': 'Celestial Chisel',
        '/items/cheese_chisel': 'Cheese Chisel',
        '/items/verdant_chisel': 'Verdant Chisel',
        '/items/azure_chisel': 'Azure Chisel',
        '/items/burble_chisel': 'Burble Chisel',
        '/items/crimson_chisel': 'Crimson Chisel',
        '/items/rainbow_chisel': 'Rainbow Chisel',
        '/items/holy_chisel': 'Holy Chisel',
        '/items/celestial_needle': 'Celestial Needle',
        '/items/cheese_needle': 'Cheese Needle',
        '/items/verdant_needle': 'Verdant Needle',
        '/items/azure_needle': 'Azure Needle',
        '/items/burble_needle': 'Burble Needle',
        '/items/crimson_needle': 'Crimson Needle',
        '/items/rainbow_needle': 'Rainbow Needle',
        '/items/holy_needle': 'Holy Needle',
        '/items/celestial_spatula': 'Celestial Spatula',
        '/items/cheese_spatula': 'Cheese Spatula',
        '/items/verdant_spatula': 'Verdant Spatula',
        '/items/azure_spatula': 'Azure Spatula',
        '/items/burble_spatula': 'Burble Spatula',
        '/items/crimson_spatula': 'Crimson Spatula',
        '/items/rainbow_spatula': 'Rainbow Spatula',
        '/items/holy_spatula': 'Holy Spatula',
        '/items/celestial_pot': 'Celestial Pot',
        '/items/cheese_pot': 'Cheese Pot',
        '/items/verdant_pot': 'Verdant Pot',
        '/items/azure_pot': 'Azure Pot',
        '/items/burble_pot': 'Burble Pot',
        '/items/crimson_pot': 'Crimson Pot',
        '/items/rainbow_pot': 'Rainbow Pot',
        '/items/holy_pot': 'Holy Pot',
        '/items/celestial_alembic': 'Celestial Alembic',
        '/items/cheese_alembic': 'Cheese Alembic',
        '/items/verdant_alembic': 'Verdant Alembic',
        '/items/azure_alembic': 'Azure Alembic',
        '/items/burble_alembic': 'Burble Alembic',
        '/items/crimson_alembic': 'Crimson Alembic',
        '/items/rainbow_alembic': 'Rainbow Alembic',
        '/items/holy_alembic': 'Holy Alembic',
        '/items/celestial_enhancer': 'Celestial Enhancer',
        '/items/cheese_enhancer': 'Cheese Enhancer',
        '/items/verdant_enhancer': 'Verdant Enhancer',
        '/items/azure_enhancer': 'Azure Enhancer',
        '/items/burble_enhancer': 'Burble Enhancer',
        '/items/crimson_enhancer': 'Crimson Enhancer',
        '/items/rainbow_enhancer': 'Rainbow Enhancer',
        '/items/holy_enhancer': 'Holy Enhancer',
        '/items/milk': 'Milk',
        '/items/verdant_milk': 'Verdant Milk',
        '/items/azure_milk': 'Azure Milk',
        '/items/burble_milk': 'Burble Milk',
        '/items/crimson_milk': 'Crimson Milk',
        '/items/rainbow_milk': 'Rainbow Milk',
        '/items/holy_milk': 'Holy Milk',
        '/items/cheese': 'Cheese',
        '/items/verdant_cheese': 'Verdant Cheese',
        '/items/azure_cheese': 'Azure Cheese',
        '/items/burble_cheese': 'Burble Cheese',
        '/items/crimson_cheese': 'Crimson Cheese',
        '/items/rainbow_cheese': 'Rainbow Cheese',
        '/items/holy_cheese': 'Holy Cheese',
        '/items/log': 'Log',
        '/items/birch_log': 'Birch Log',
        '/items/cedar_log': 'Cedar Log',
        '/items/purpleheart_log': 'Purpleheart Log',
        '/items/ginkgo_log': 'Ginkgo Log',
        '/items/redwood_log': 'Redwood Log',
        '/items/arcane_log': 'Arcane Log',
        '/items/lumber': 'Lumber',
        '/items/birch_lumber': 'Birch Lumber',
        '/items/cedar_lumber': 'Cedar Lumber',
        '/items/purpleheart_lumber': 'Purpleheart Lumber',
        '/items/ginkgo_lumber': 'Ginkgo Lumber',
        '/items/redwood_lumber': 'Redwood Lumber',
        '/items/arcane_lumber': 'Arcane Lumber',
        '/items/rough_hide': 'Rough Hide',
        '/items/reptile_hide': 'Reptile Hide',
        '/items/gobo_hide': 'Gobo Hide',
        '/items/beast_hide': 'Beast Hide',
        '/items/umbral_hide': 'Umbral Hide',
        '/items/rough_leather': 'Rough Leather',
        '/items/reptile_leather': 'Reptile Leather',
        '/items/gobo_leather': 'Gobo Leather',
        '/items/beast_leather': 'Beast Leather',
        '/items/umbral_leather': 'Umbral Leather',
        '/items/cotton': 'Cotton',
        '/items/flax': 'Flax',
        '/items/bamboo_branch': 'Bamboo Branch',
        '/items/cocoon': 'Cocoon',
        '/items/radiant_fiber': 'Radiant Fiber',
        '/items/cotton_fabric': 'Cotton Fabric',
        '/items/linen_fabric': 'Linen Fabric',
        '/items/bamboo_fabric': 'Bamboo Fabric',
        '/items/silk_fabric': 'Silk Fabric',
        '/items/radiant_fabric': 'Radiant Fabric',
        '/items/egg': 'Egg',
        '/items/wheat': 'Wheat',
        '/items/sugar': 'Sugar',
        '/items/blueberry': 'Blueberry',
        '/items/blackberry': 'Blackberry',
        '/items/strawberry': 'Strawberry',
        '/items/mooberry': 'Mooberry',
        '/items/marsberry': 'Marsberry',
        '/items/spaceberry': 'Spaceberry',
        '/items/apple': 'Apple',
        '/items/orange': 'Orange',
        '/items/plum': 'Plum',
        '/items/peach': 'Peach',
        '/items/dragon_fruit': 'Dragon Fruit',
        '/items/star_fruit': 'Star Fruit',
        '/items/arabica_coffee_bean': 'Arabica Coffee Bean',
        '/items/robusta_coffee_bean': 'Robusta Coffee Bean',
        '/items/liberica_coffee_bean': 'Liberica Coffee Bean',
        '/items/excelsa_coffee_bean': 'Excelsa Coffee Bean',
        '/items/fieriosa_coffee_bean': 'Fieriosa Coffee Bean',
        '/items/spacia_coffee_bean': 'Spacia Coffee Bean',
        '/items/green_tea_leaf': 'Green Tea Leaf',
        '/items/black_tea_leaf': 'Black Tea Leaf',
        '/items/burble_tea_leaf': 'Burble Tea Leaf',
        '/items/moolong_tea_leaf': 'Moolong Tea Leaf',
        '/items/red_tea_leaf': 'Red Tea Leaf',
        '/items/emp_tea_leaf': 'Emp Tea Leaf',
        '/items/catalyst_of_coinification': 'Catalyst Of Coinification',
        '/items/catalyst_of_decomposition': 'Catalyst Of Decomposition',
        '/items/catalyst_of_transmutation': 'Catalyst Of Transmutation',
        '/items/prime_catalyst': 'Prime Catalyst',
        '/items/snake_fang': 'Snake Fang',
        '/items/shoebill_feather': 'Shoebill Feather',
        '/items/snail_shell': 'Snail Shell',
        '/items/crab_pincer': 'Crab Pincer',
        '/items/turtle_shell': 'Turtle Shell',
        '/items/marine_scale': 'Marine Scale',
        '/items/treant_bark': 'Treant Bark',
        '/items/centaur_hoof': 'Centaur Hoof',
        '/items/luna_wing': 'Luna Wing',
        '/items/gobo_rag': 'Gobo Rag',
        '/items/goggles': 'Goggles',
        '/items/magnifying_glass': 'Magnifying Glass',
        '/items/eye_of_the_watcher': 'Eye Of The Watcher',
        '/items/icy_cloth': 'Icy Cloth',
        '/items/flaming_cloth': 'Flaming Cloth',
        '/items/sorcerers_sole': 'Sorcerer\'s Sole',
        '/items/chrono_sphere': 'Chrono Sphere',
        '/items/frost_sphere': 'Frost Sphere',
        '/items/panda_fluff': 'Panda Fluff',
        '/items/black_bear_fluff': 'Black Bear Fluff',
        '/items/grizzly_bear_fluff': 'Grizzly Bear Fluff',
        '/items/polar_bear_fluff': 'Polar Bear Fluff',
        '/items/red_panda_fluff': 'Red Panda Fluff',
        '/items/magnet': 'Magnet',
        '/items/stalactite_shard': 'Stalactite Shard',
        '/items/living_granite': 'Living Granite',
        '/items/colossus_core': 'Colossus Core',
        '/items/vampire_fang': 'Vampire Fang',
        '/items/werewolf_claw': 'Werewolf Claw',
        '/items/revenant_anima': 'Revenant Anima',
        '/items/soul_fragment': 'Soul Fragment',
        '/items/infernal_ember': 'Infernal Ember',
        '/items/demonic_core': 'Demonic Core',
        '/items/griffin_leather': 'Griffin Leather',
        '/items/manticore_sting': 'Manticore Sting',
        '/items/jackalope_antler': 'Jackalope Antler',
        '/items/dodocamel_plume': 'Dodocamel Plume',
        '/items/griffin_talon': 'Griffin Talon',
        '/items/acrobats_ribbon': 'Acrobat\'s Ribbon',
        '/items/magicians_cloth': 'Magician\'s Cloth',
        '/items/chaotic_chain': 'Chaotic Chain',
        '/items/cursed_ball': 'Cursed Ball',
        '/items/royal_cloth': 'Royal Cloth',
        '/items/knights_ingot': 'Knight\'s Ingot',
        '/items/bishops_scroll': 'Bishop\'s Scroll',
        '/items/regal_jewel': 'Regal Jewel',
        '/items/sundering_jewel': 'Sundering Jewel',
        '/items/butter_of_proficiency': 'Butter Of Proficiency',
        '/items/thread_of_expertise': 'Thread Of Expertise',
        '/items/branch_of_insight': 'Branch Of Insight',
        '/items/gluttonous_energy': 'Gluttonous Energy',
        '/items/guzzling_energy': 'Guzzling Energy',
        '/items/milking_essence': 'Milking Essence',
        '/items/foraging_essence': 'Foraging Essence',
        '/items/woodcutting_essence': 'Woodcutting Essence',
        '/items/cheesesmithing_essence': 'Cheesesmithing Essence',
        '/items/crafting_essence': 'Crafting Essence',
        '/items/tailoring_essence': 'Tailoring Essence',
        '/items/cooking_essence': 'Cooking Essence',
        '/items/brewing_essence': 'Brewing Essence',
        '/items/alchemy_essence': 'Alchemy Essence',
        '/items/enhancing_essence': 'Enhancing Essence',
        '/items/swamp_essence': 'Swamp Essence',
        '/items/aqua_essence': 'Aqua Essence',
        '/items/jungle_essence': 'Jungle Essence',
        '/items/gobo_essence': 'Gobo Essence',
        '/items/eyessence': 'Eyessence',
        '/items/sorcerer_essence': 'Sorcerer Essence',
        '/items/bear_essence': 'Bear Essence',
        '/items/golem_essence': 'Golem Essence',
        '/items/twilight_essence': 'Twilight Essence',
        '/items/abyssal_essence': 'Abyssal Essence',
        '/items/chimerical_essence': 'Chimerical Essence',
        '/items/sinister_essence': 'Sinister Essence',
        '/items/enchanted_essence': 'Enchanted Essence',
        '/items/task_crystal': 'Task Crystal',
        '/items/star_fragment': 'Star Fragment',
        '/items/pearl': 'Pearl',
        '/items/amber': 'Amber',
        '/items/garnet': 'Garnet',
        '/items/jade': 'Jade',
        '/items/amethyst': 'Amethyst',
        '/items/moonstone': 'Moonstone',
        '/items/sunstone': 'Sunstone',
        '/items/philosophers_stone': 'Philosopher\'s Stone',
        '/items/crushed_pearl': 'Crushed Pearl',
        '/items/crushed_amber': 'Crushed Amber',
        '/items/crushed_garnet': 'Crushed Garnet',
        '/items/crushed_jade': 'Crushed Jade',
        '/items/crushed_amethyst': 'Crushed Amethyst',
        '/items/crushed_moonstone': 'Crushed Moonstone',
        '/items/crushed_sunstone': 'Crushed Sunstone',
        '/items/crushed_philosophers_stone': 'Crushed Philosopher\'s Stone',
        '/items/shard_of_protection': 'Shard Of Protection',
        '/items/mirror_of_protection': 'Mirror Of Protection'
    };

    const nameDict = {
        ...Object.fromEntries(Object.entries(itemNamesCN).map(([k, v]) => [v, k])),
        ...Object.fromEntries(Object.entries(itemNames).map(([k, v]) => [v, k]))
    };


    ////////////////code//////////////////
    function hookWS() {
        const dataProperty = Object.getOwnPropertyDescriptor(MessageEvent.prototype, "data");
        const oriGet = dataProperty.get;
        dataProperty.get = hookedGet;
        Object.defineProperty(MessageEvent.prototype, "data", dataProperty);

        function hookedGet() {
            const socket = this.currentTarget;
            if (!(socket instanceof WebSocket)) {
                return oriGet.call(this);
            }
            if (socket.url.indexOf("api.milkywayidle.com/ws") <= -1 && socket.url.indexOf("api-test.milkywayidle.com/ws") <= -1) {
                return oriGet.call(this);
            }
            const message = oriGet.call(this);
            Object.defineProperty(this, "data", { value: message }); // Anti-loop
            handleMessage(message);
            return message;
        }
    }

    let clientData = null;
    let characterData = null;
    function loadClientData() {
        if (localStorage.getItem("initClientData")) {
            const obj = JSON.parse(localStorage.getItem("initClientData"));
            clientData = obj;
        }
    }

    function handleMessage(message) {
        let obj = JSON.parse(message);
        if (obj) {
            if (obj.type === "init_character_data") {
                characterData = obj;
            } else if (obj && obj.endCharacterItems) {
                let newIds = obj.endCharacterItems.map(i => i.id);
                characterData.characterItems = characterData.characterItems.filter(e => !newIds.includes(e.id));//移除存在的物品
                characterData.characterItems.push(...obj.endCharacterItems);//放入新物品
            } else if (obj.type === "action_type_consumable_slots_updated") {//更新饮料和食物槽数据
                characterData.actionTypeDrinkSlotsMap = obj.actionTypeDrinkSlotsMap;
                characterData.actionTypeFoodSlotsMap = obj.actionTypeFoodSlotsMap;

                handleAlchemyDetailChanged();
            } else if (obj.type === "consumable_buffs_updated") {
                characterData.consumableActionTypeBuffsMap = obj.consumableActionTypeBuffsMap;
                handleAlchemyDetailChanged();
            } else if (obj.type === "community_buffs_updated") {
                characterData.communityActionTypeBuffsMap = obj.communityActionTypeBuffsMap;
                handleAlchemyDetailChanged();
            } else if (obj.type === "equipment_buffs_updated") {//装备buff
                characterData.equipmentActionTypeBuffsMap = obj.equipmentActionTypeBuffsMap;
                characterData.equipmentTaskActionBuffs = obj.equipmentTaskActionBuffs;
                handleAlchemyDetailChanged();
            } else if (obj.type === "house_rooms_updated") {//房屋更新
                characterData.characterHouseRoomMap = obj.characterHouseRoomMap;
                characterData.houseActionTypeBuffsMap = obj.houseActionTypeBuffsMap;
            }
        }
        return message;
    }
    /////////辅助函数,角色动态数据///////////

    function getConsumableBuffs(actionTypeHrid) {
        return characterData.consumableActionTypeBuffsMap[actionTypeHrid];
    }
    function getBuffValueByType(actionTypeHrid, buffTypeHrid) {
        let returnValue = 0;
        //社区buff

        for (let buff of characterData.communityActionTypeBuffsMap[actionTypeHrid]) {
            if (buff.typeHrid === buffTypeHrid) returnValue += buff.flatBoost;
        }
        //装备buff
        for (let buff of characterData.equipmentActionTypeBuffsMap[actionTypeHrid]) {
            if (buff.typeHrid === buffTypeHrid) returnValue += buff.flatBoost;
        }
        //房屋buff
        for (let buff of characterData.houseActionTypeBuffsMap[actionTypeHrid]) {
            if (buff.typeHrid === buffTypeHrid) returnValue += buff.flatBoost;
        }
        //茶饮buff
        for (let buff of characterData.consumableActionTypeBuffsMap[actionTypeHrid]) {
            if (buff.typeHrid === buffTypeHrid) returnValue += buff.flatBoost;
        }
        return returnValue;
    }
    /**
     * 获取角色ID
     *
     * @returns {string|null} 角色ID，如果不存在则返回null
     */
    function getCharacterId() {
        return characterData?.character.id;
    }
    /**
     * 获取指定物品的数量
     *
     * @param itemHrid 物品的唯一标识
     * @param enhancementLevel 物品强化等级，默认为0
     * @returns 返回指定物品的数量，如果未找到该物品则返回0
     */
    function getItemCount(itemHrid, enhancementLevel = 0) {
        return characterData.characterItems.find(item => item.itemHrid === itemHrid && item.itemLocationHrid === "/item_locations/inventory" && item.enhancementLevel === enhancementLevel)?.count || 0;//背包里面的物品
    }
    //获取饮料状态，传入类型/action_types/brewing,返回列表

    function getDrinkSlots(actionTypeHrid) {
        return characterData.actionTypeDrinkSlotsMap[actionTypeHrid]
    }
    /////////游戏静态数据////////////
    //中英文都有可能
    function getItemHridByShowName(showName) {
        return nameDict[showName] || showName
    }
    //类似这样的名字blackberry_donut,knights_ingot
    function getItemDataByHridName(hrid_name) {
        return clientData.itemDetailMap["/items/" + hrid_name];
    }
    //类似这样的名字/items/blackberry_donut,/items/knights_ingot
    function getItemDataByHrid(itemHrid) {
        return clientData.itemDetailMap[itemHrid];
    }
    //类似这样的名字Blackberry Donut,Knight's Ingot
    function getItemDataByName(name) {
        return Object.entries(clientData.itemDetailMap).find(([k, v]) => v.name == name);
    }
    function getOpenableItems(itemHrid) {
        let items = [];
        for (let openItem of clientData.openableLootDropMap[itemHrid]) {
            items.push({
                itemHrid: openItem.itemHrid,
                count: (openItem.minCount + openItem.maxCount) / 2 * openItem.dropRate
            });
        }
        return items;
    }
    ////////////观察节点变化/////////////
    function observeNode(nodeSelector, rootSelector, addFunc = null, updateFunc = null, removeFunc = null) {
        const rootNode = document.querySelector(rootSelector);
        if (!rootNode) {
            console.error(`Root node with selector "${rootSelector}" not found.wait for 1s to try again...`);
            setTimeout(() => observeNode(nodeSelector, rootSelector, addFunc, updateFunc, removeFunc), 1000);
            return;
        }
        console.info(`observing "${rootSelector}"`);

        function delayCall(func, observer, delay = 100) {
            //判断func是function类型
            if (typeof func !== 'function') return;
            // 延迟执行，如果再次调用则在原有基础上继续延时
            func.timeout && clearTimeout(func.timeout);
            func.timeout = setTimeout(() => func(observer), delay);
        }

        const observer = new MutationObserver((mutationsList, observer) => {

            mutationsList.forEach((mutation) => {
                mutation.addedNodes.forEach((addedNode) => {
                    if (addedNode.matches && addedNode.matches(nodeSelector)) {
                        addFunc?.(observer);
                    }
                });

                mutation.removedNodes.forEach((removedNode) => {
                    if (removedNode.matches && removedNode.matches(nodeSelector)) {
                        removeFunc?.(observer);
                    }
                });

                // 处理子节点变化
                if (mutation.type === 'childList') {
                    let node = mutation.target.matches(nodeSelector) ? mutation.target : mutation.target.closest(nodeSelector);
                    if (node) {
                        delayCall(updateFunc, observer); // 延迟 100ms 合并变动处理，避免频繁触发
                    }

                } else if (mutation.type === 'characterData') {
                    // 文本内容变化（如文本节点修改）
                    delayCall(updateFunc, observer);
                }
            });
        });


        const config = {
            childList: true,
            subtree: true,
            characterData: true
        };
        observer.reobserve = function () {
            observer.observe(rootNode, config);
        }//重新观察
        observer.observe(rootNode, config);
        return observer;
    }

    loadClientData();//加载游戏数据
    hookWS();//hook收到角色信息

    //模块逻辑代码
    const MARKET_API_URL = "https://raw.githubusercontent.com/holychikenz/MWIApi/main/milkyapi.json";

    let marketData = JSON.parse(localStorage.getItem("MWIAPI_JSON") || localStorage.getItem("MWITools_marketAPI_json"));//Use MWITools的API数据
    fetch(MARKET_API_URL).then(res => {
        res.json().then(data => {
            marketData = data;
            //更新本地缓存数据
            localStorage.setItem("MWIAPI_JSON", JSON.stringify(data));//更新本地缓存数据
            console.info("MWIAPI_JSON updated:", new Date(marketData.time * 1000).toLocaleString());
        })
    });


    //返回[买,卖]
    function getPrice(itemHrid) {
        ///一些特殊物品单独处理，比如金币和牛铃
        switch (itemHrid) {
            case "/items/coin"://金币
                return { bid: 1, ask: 1 };
            case "/items/cowbell"://牛铃
                marketData.market["Cowbell"];
                let cowbells = getPrice("/items/bag_of_10_cowbells");
                return { bid: cowbells.bid / 10, ask: cowbells.ask / 10 };
            default:
                let price = marketData.market[itemNames[itemHrid]];
                if (price.bid < 0) {//取原材料

                }
                if (price.ask < 0) {

                }
                return price;
        }
    }

    //计算每次的收益
    function calculateProfit(data) {
        let profit = 0;
        let input = 0;
        let output = 0;
        let essence = 0;
        let rare = 0;
        let tea = 0;
        let catalyst = 0;
        for (let item of data.inputItems) {//消耗物品每次必定消耗

            input -= getPrice(item.itemHrid).ask * item.count;//买入材料价格*数量

        }
        for (let item of data.teaUsage) {//茶每次必定消耗
            tea -= getPrice(item.itemHrid).ask * item.count;//买入材料价格*数量
        }

        for (let item of data.outputItems) {//产出物品每次不一定产出，需要计算成功率
            output += getPrice(item.itemHrid).bid * item.count * data.successRate;//卖出产出价格*数量*成功率

        }
        for (let item of data.essenceDrops) {//精华和宝箱都要算成功率 -> 不
            essence += getPrice(item.itemHrid).bid * item.count;//采集数据的地方已经算进去了
        }
        for (let item of data.rareDrops) {//宝箱也是按自己的几率出 -> 不
            getOpenableItems(item.itemHrid).forEach(openItem => {
                rare += getPrice(openItem.itemHrid).bid * openItem.count * item.count;//已折算
            });
        }
        //催化剂
        for (let item of data.catalystItems) {//催化剂,成功才会用
            catalyst -= getPrice(item.itemHrid).ask * item.count * data.successRate;//买入材料价格*数量
        }

        profit = input + tea + output + essence + rare + catalyst;
        let description = `Last Update：${new Date(marketData.time * 1000).toLocaleString()}\n(效率+${(data.effeciency * 100).toFixed(2)}%)每次收益${profit}=\n\t材料(${input})\n\t茶(${tea})\n\t催化剂(${catalyst})\n\t产出(${output})\n\t精华(${essence})\n\t稀有(${rare})`;
        //console.info(description);
        return [profit, description];//再乘以次数
    }
    function showNumber(num) {
        if (num === 0) return "0";  // 单独处理0的情况

        const sign = num > 0 ? '+' : '';
        const absNum = Math.abs(num);

        return absNum >= 1e10 ? `${sign}${Math.floor(num / 1e9)}B` :
            absNum >= 1e7 ? `${sign}${Math.floor(num / 1e6)}M` :
                absNum >= 1e4 ? `${sign}${Math.floor(num / 1e3)}K` :
                    `${sign}${Math.floor(num)}`;
    }
    function handleAlchemyDetailChanged(observer) {
        let inputItems = [];
        let outputItems = [];
        let essenceDrops = [];
        let rareDrops = [];
        let teaUsage = [];
        let catalystItems = [];

        let costNodes = document.querySelector(".SkillActionDetail_itemRequirements__3SPnA");
        if (!costNodes) return;//没有炼金详情就不处理

        let costs = Array.from(costNodes.children);
        //每三个元素取textContent拼接成一个字符串，用空格和/分割
        for (let i = 0; i < costs.length; i += 3) {

            let costStr = costs[i].textContent + costs[i + 1].textContent + costs[i + 2].textContent;
            //30M / 100,000    K M B
            let costArr = costStr.replaceAll(",", "").split(/[\s/]/).filter(s => s);
            inputItems.push({ itemHrid: getItemHridByShowName(costArr[2]), count: parseInt(costArr[1]) });
        }
        //炼金输出
        for (let line of document.querySelectorAll(".SkillActionDetail_alchemyOutput__6-92q .SkillActionDetail_drop__26KBZ")) {
            let count = parseFloat(line.children[0].textContent.replaceAll(",", ""));
            let itemName = line.children[1].textContent;
            let rate = line.children[2].textContent ? parseFloat(line.children[2].textContent.substring(1, line.children[2].textContent.length - 1) / 100.0) : 1;//默认1
            outputItems.push({ itemHrid: getItemHridByShowName(itemName), count: count * rate });
        }
        //精华输出
        for (let line of document.querySelectorAll(".SkillActionDetail_essenceDrops__2skiB .SkillActionDetail_drop__26KBZ")) {
            let count = parseFloat(line.children[0].textContent);
            let itemName = line.children[1].textContent;
            let rate = line.children[2].textContent ? parseFloat(line.children[2].textContent.substring(1, line.children[2].textContent.length - 1) / 100.0) : 1;//默认1
            essenceDrops.push({ itemHrid: getItemHridByShowName(itemName), count: count * rate });
        }
        //稀有输出
        for (let line of document.querySelectorAll(".SkillActionDetail_rareDrops__3OTzu .SkillActionDetail_drop__26KBZ")) {
            let count = parseFloat(line.children[0].textContent);
            let itemName = line.children[1].textContent;
            let rate = line.children[2].textContent ? parseFloat(line.children[2].textContent.substring(1, line.children[2].textContent.length - 1) / 100.0) : 1;//默认1
            rareDrops.push({ itemHrid: getItemHridByShowName(itemName), count: count * rate });
        }
        //成功率
        let successRateStr = document.querySelector(".SkillActionDetail_successRate__2jPEP .SkillActionDetail_value__dQjYH").textContent;
        let successRate = parseFloat(successRateStr.substring(0, successRateStr.length - 1)) / 100.0;

        //消耗时间
        let costTimeStr = document.querySelector(".SkillActionDetail_timeCost__1jb2x .SkillActionDetail_value__dQjYH").textContent;
        let costSeconds = parseFloat(costTimeStr.substring(0, costTimeStr.length - 1));//秒，有分再改



        //催化剂
        let catalystItem = document.querySelector(".SkillActionDetail_catalystItemInput__2ERjq .Icon_icon__2LtL_");
        if (catalystItem) {
            catalystItems = [{ itemHrid: getItemHridByShowName(catalystItem.getAttribute("aria-label")), count: 1 }];
        }

        //计算效率buff
        let effeciency = 0;
        let buffs = Object.entries(document.querySelectorAll(".SkillActionDetail_buffs__val5d .SkillActionDetail_buffsIconContainer__1hyy-")[0])[1][1].children.props.buffs;
        for (let buff of buffs) {//buff加成，包含了社区buff，装备buff,房屋buff,包含了炼金茶？
            if (buff.uniqueHrid && buff.typeHrid === "/buff_types/efficiency") {
                effeciency += buff.flatBoost;
            }
        }

        //炼金茶buff配置
        for (let buff of getConsumableBuffs("/action_types/alchemy")) {
            if (buff.typeHrid === "/buff_types/efficiency") {
                effeciency += buff.flatBoost;
            }

        }
        let newEffeciency = getBuffValueByType("/action_types/alchemy","/buff_types/efficiency");
        effeciency = newEffeciency;

        costSeconds = costSeconds * (1 - effeciency);//效率，相当于减少每次的时间
        //茶饮，茶饮的消耗就减少了
        let teas = getDrinkSlots("/action_types/alchemy");//炼金茶配置
        for (let tea of teas) {
            if (tea) {//有可能空位
                teaUsage.push({ itemHrid: tea.itemHrid, count: costSeconds / 300 });//300秒消耗一个茶
            }
        }
        console.info("效率", effeciency);


        //返回结果
        let ret = {
            inputItems: inputItems,
            outputItems: outputItems,
            essenceDrops: essenceDrops,
            rareDrops: rareDrops,
            successRate: successRate,
            costTime: costSeconds,
            teaUsage: teaUsage,
            catalystItems: catalystItems,
            effeciency: effeciency
        }

        //次数,收益
        let result = calculateProfit(ret);
        let profit = result[0];
        let desc = result[1];

        let timesPerHour = 3600 / costSeconds;//加了效率相当于增加了次数
        let profitPerHour = profit * timesPerHour;

        let timesPerDay = 24 * timesPerHour;
        let profitPerDay = profit * timesPerDay;

        observer?.disconnect();//断开观察

        //显示位置
        let showParent = document.querySelector(".SkillActionDetail_notes__2je2F");
        let label = showParent.querySelector("#alchemoo");
        if (!label) {
            label = document.createElement("div");
            label.id = "alchemoo";
            showParent.appendChild(label);
        }

        let color = "white";
        if (profitPerHour > 0) {
            color = "lime";
        } else if (profitPerHour < 0) {
            color = "red";
        }
        label.innerHTML = `
        <div id="alchemoo" style="color: ${color};">
            <span title="${desc}">预估收益ℹ️：</span><br/>
            <span>🪙${showNumber(profit)}/次</span><br/>
            <span title="${showNumber(timesPerHour)}次">🪙${showNumber(profitPerHour)}/时</span><br/>
            <span title="${showNumber(timesPerDay)}次">🪙${showNumber(profitPerDay)}/天</span>
            </div>`;

        //console.log(ret);
        observer?.reobserve();
    }
    observeNode(".SkillActionDetail_alchemyComponent__1J55d", ".MainPanel_mainPanel__Ex2Ir", handleAlchemyDetailChanged, handleAlchemyDetailChanged);
})();