import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 奇门遁甲排盘相关工具函数

// 天干
const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
// 地支
const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
// 神盘
const deities = ['值符', '螣蛇', '太阴', '六合', '白虎', '玄武', '九地', '九天'];
// 门盘
const doors = ['休门', '生门', '伤门', '杜门', '景门', '死门', '惊门', '开门'];
// 星盘
const stars = ['天蓬星', '天芮星', '天冲星', '天辅星', '天禽星', '天心星', '天柱星', '天任星', '天英星'];
// 宫位名称和方位
const palaceInfo = [
  { position: 1, name: '坎', direction: '北' },
  { position: 2, name: '坤', direction: '西南' },
  { position: 3, name: '震', direction: '东' },
  { position: 4, name: '巽', direction: '东南' },
  { position: 5, name: '中', direction: '中' },
  { position: 6, name: '乾', direction: '西北' },
  { position: 7, name: '兑', direction: '西' },
  { position: 8, name: '艮', direction: '东北' },
  { position: 9, name: '离', direction: '南' },
];

// 生成随机数
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// 生成奇门遁甲排盘数据
export function generateQimenPlate(date: Date): {
  date: string;
  time: string;
  palaces: Array<{
    position: number;
    name: string;
    direction: string;
    heavenlyStem: string;
    earthlyBranch: string;
    deity: string;
    door: string;
    star: string;
    isLucky: boolean;
  }>
} {
  // 格式化日期和时间
  const formattedDate = date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  const formattedTime = date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  
  // 生成九宫格数据
  const palaces = palaceInfo.map(palace => {
    const seed = palace.position + date.getDate();
    const randomWithSeed = (min: number, max: number) => {
      const x = Math.sin(seed) * 10000;
      return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
    };
    
    return {
      ...palace,
      heavenlyStem: heavenlyStems[randomWithSeed(0, heavenlyStems.length - 1)],
      earthlyBranch: earthlyBranches[randomWithSeed(0, earthlyBranches.length - 1)],
      deity: deities[randomWithSeed(0, deities.length - 1)],
      door: doors[randomWithSeed(0, doors.length - 1)],
      star: stars[randomWithSeed(0, stars.length - 1)],
      isLucky: randomWithSeed(0, 10) > 4, // 50%概率吉凶
    };
  });
  
  return {
    date: formattedDate,
    time: formattedTime,
    palaces,
  };
}

// 生成吉凶判断数据
export function generateFortuneJudgment(plateData: ReturnType<typeof generateQimenPlate>) {
  // 方位吉凶
  const directions = [
    { name: '东', direction: '震宫' },
    { name: '南', direction: '离宫' },
    { name: '西', direction: '兑宫' },
    { name: '北', direction: '坎宫' },
  ].map(dir => {
    const score = random(30, 85);
    const isLucky = score > 50;
    
    const descriptions = [
      '此方位有利发展，可积极进取',
      '此方位运势平稳，宜守不宜攻',
      '此方位有阻碍，需谨慎行事',
      '此方位机遇与挑战并存，需把握时机',
      '此方位有贵人相助，可寻求合作',
      '此方位需防小人，注意人际关系',
    ];
    
    return {
      name: dir.name,
      direction: dir.direction,
      isLucky,
      score,
      description: descriptions[random(0, descriptions.length - 1)],
    };
  });
  
  // 时辰吉凶
  const hour = plateData.time.split(':')[0];
  const timeScore = random(40, 80);
  const timeIsLucky = timeScore > 55;
  
  const timeDescriptions = [
    '此时辰气场稳定，适合决策和行动',
    '此时辰运势上扬，有利于开展新计划',
    '此时辰宜静不宜动，适合思考和规划',
    '此时辰有变动之象，需灵活应对',
    '此时辰贵人运旺，可寻求他人帮助',
    '此时辰需防意外，行事谨慎为上',
  ];
  
  // 事项吉凶
  const matters = [
    { category: '事业' },
    { category: '财运' },
    { category: '感情' },
    { category: '健康' },
  ].map(matter => {
    const score = random(35, 85);
    const isLucky = score > 50;
    
      // 根据事项类型和吉凶生成不同描述
      const 事业Descriptions = isLucky 
      ? ['事业发展顺利，有晋升机会', '工作得心应手，易获认可', '事业有新机遇，可积极把握']
      : ['事业遇瓶颈，需调整策略', '工作压力大，注意劳逸结合', '事业发展缓慢，需耐心等待'];
      
    const 财运Descriptions = isLucky
      ? ['财运亨通，有意外收获', '投资有望获利，可适当投入', '正财稳定，偏财可期']
      : ['财运不佳，需谨慎理财', '易有破财之虞，注意节约', '财务压力大，需合理规划'];
      
    const 感情Descriptions = isLucky
      ? ['感情和睦，关系升温', '单身者有良缘，可多社交', '感情稳定，有望更进一步']
      : ['感情有波折，需多沟通', '情绪波动大，注意控制脾气', '感情平淡，需用心经营'];
      
    const 健康Descriptions = isLucky
      ? ['身体健康，精力充沛', '体质转强，适合锻炼', '身心舒畅，压力减轻']
      : ['需注意健康，避免劳累', '作息不规律，易影响健康', '情绪紧张，需放松心情'];
    
    let description = '';
    switch(matter.category) {
      case '事业': description =事业Descriptions[random(0,事业Descriptions.length - 1)]; break;
      case '财运': description =财运Descriptions[random(0,财运Descriptions.length - 1)]; break;
      case '感情': description =感情Descriptions[random(0,感情Descriptions.length - 1)]; break;
      case '健康': description =健康Descriptions[random(0,健康Descriptions.length - 1)]; break;
    }
    
    return {
      ...matter,
      isLucky,
      score,
      description,
    };
  });
  
  // 综合评分
  const overallScore = Math.round(
    (directions.reduce((sum, d) => sum + d.score, 0) / directions.length * 0.3) +
    (timeScore * 0.2) +
    (matters.reduce((sum, m) => sum + m.score, 0) / matters.length * 0.5)
  );
  
  // 综合描述
  const overallDescriptions = [
    '整体运势良好，机遇与挑战并存，积极把握可获成功',
    '运势平稳上升，稳步前进可达成目标',
    '运势有起伏，需审时度势，灵活应对变化',
    '整体运势一般，宜守不宜攻，积蓄力量等待时机',
    '运势面临挑战，需谨慎行事，避免冒险',
  ];
  
  const overallDescription = overallDescriptions[
    overallScore >= 80 ? 0 :
    overallScore >= 65 ? 1 :
    overallScore >= 50 ? 2 :
    overallScore >= 35 ? 3 : 4
  ];
  
  return {
    directions,
    time: {
      hour,
      isLucky: timeIsLucky,
      score: timeScore,
      description: timeDescriptions[random(0, timeDescriptions.length - 1)],
    },
    matters,
    overallScore,
    overallDescription,
  };
}

// 生成LLM解读内容 - 调用通义千问API
import axios from 'axios';

export async function generateInterpretation(
  plateData: ReturnType<typeof generateQimenPlate>,
  judgmentData: ReturnType<typeof generateFortuneJudgment>,
  question: string
): Promise<string> {
  // 构建提示词
  const prompt = `我现在进行奇门遁甲排盘，得到以下结果：
  
排盘时间: ${plateData.date} ${plateData.time}
整体运势评分: ${judgmentData.overallScore}分
吉凶判断: ${judgmentData.overallDescription}
吉利宫位: ${plateData.palaces.filter(p => p.isLucky).map(p => p.name).join('、')}
凶险宫位: ${plateData.palaces.filter(p => !p.isLucky).map(p => p.name).join('、')}
时辰吉凶: ${judgmentData.time.isLucky ? '当前时辰有利' : '当前时辰运势一般'}，${judgmentData.time.description}
方位吉凶: ${judgmentData.directions.filter(d => d.isLucky).map(d => d.name + '方' + d.description).join('；')}

我的问题是: "${question}"

请根据以上奇门遁甲排盘结果，结合我的问题，给出专业、详细的解读和建议。解读应包括对问题的直接回答、运势分析和具体建议。语言要自然流畅，避免使用过于专业的术语，让普通人也能理解。`;

  try {
    // 调用通义千问API
     const response = await axios.post(
       'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
       {
         model: 'qwen-plus',
         messages: [
           { role: 'system', content: 'You are a helpful assistant specializing in Qimen Dunjia interpretations.' },
           { role: 'user', content: prompt }
         ],
         max_tokens: 1000,
         temperature: 0.7,
         top_p: 0.9
       },
       {
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer key`
         }
       }
     );

    // 解析API响应
     if (response.data && response.data.choices && response.data.choices.length > 0) {
       return response.data.choices[0].message.content;
     } else {
       throw new Error('API响应格式不正确');
     }
  } catch (error) {
    console.error('调用通义千问API失败:', error);
    
    // 生成备用解读（当API调用失败时使用）
    const luckyPalaces = plateData.palaces.filter(p => p.isLucky).map(p => p.name).join('、');
    const unluckyPalaces = plateData.palaces.filter(p => !p.isLucky).map(p => p.name).join('、');
    
    return `根据奇门遁甲排盘分析，针对你的问题"${question}"，得出以下解读：
当前时间为${plateData.date} ${plateData.time}，整体运势评分为${judgmentData.overallScore}分，${judgmentData.overallDescription}。

从九宫格排盘来看，${luckyPalaces}宫为吉，${unluckyPalaces}宫为凶。${judgmentData.time.isLucky ? '当前时辰有利' : '当前时辰运势一般'}，${judgmentData.time.description}。

方位方面，${judgmentData.directions.filter(d => d.isLucky).map(d => d.name + '方' + d.description).join('；')}。

（注：API调用失败，以上为本地生成的基础解读。）`;
  }
}
