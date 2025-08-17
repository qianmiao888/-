import { motion } from 'framer-motion';

// 定义吉凶判断数据接口
interface DirectionFortune {
  name: string;
  direction: string;
  isLucky: boolean;
  score: number;
  description: string;
}

interface TimeFortune {
  hour: string;
  isLucky: boolean;
  score: number;
  description: string;
}

interface MatterFortune {
  category: string;
  isLucky: boolean;
  score: number;
  description: string;
}

interface FortuneJudgmentProps {
  judgmentData: {
    directions: DirectionFortune[];
    time: TimeFortune;
    matters: MatterFortune[];
    overallScore: number;
    overallDescription: string;
  };
}

export default function FortuneJudgment({ judgmentData }: FortuneJudgmentProps) {
  // 获取吉凶颜色和文本
  const getLuckInfo = (isLucky: boolean, score: number) => {
    if (isLucky) {
      if (score >= 80) return { bg: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', text: '大吉' };
      if (score >= 60) return { bg: 'bg-green-50 text-green-700 dark:bg-green-800/30 dark:text-green-400', text: '吉' };
      return { bg: 'bg-blue-50 text-blue-700 dark:bg-blue-800/30 dark:text-blue-400', text: '小吉' };
    } else {
      if (score <= 20) return { bg: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300', text: '大凶' };
      if (score <= 40) return { bg: 'bg-red-50 text-red-700 dark:bg-red-800/30 dark:text-red-400', text: '凶' };
      return { bg: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-800/30 dark:text-yellow-400', text: '小凶' };
    }
  };
  
  // 获取综合评分颜色
  const getOverallScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-blue-600 dark:text-blue-400';
    if (score >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };
  
  return (
    <div className="space-y-6">
      {/* 综合判断 */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800/30">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
          <i className="fa-solid fa-compass mr-2 text-amber-600"></i>
          综合判断
        </h3>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">整体吉凶评分</span>
           <span className={`text-xl font-bold ${getOverallScoreColor(judgmentData?.overallScore || 0)}`}>
             {judgmentData?.overallScore || 0}
           </span>
        </div>
        
        <p className="text-sm text-gray-700 dark:text-gray-300 italic">"{judgmentData.overallDescription}"</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 方位吉凶 */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white flex items-center">
            <i className="fa-solid fa-location-arrow mr-2 text-blue-600"></i>
            方位吉凶
          </h3>
          
          <div className="space-y-2">
            {judgmentData.directions.map((direction, index) => {
              const luckInfo = getLuckInfo(direction.isLucky, direction.score);
              return (
                <motion.div
                  key={index}
                  className={`p-3 rounded-lg border border-gray-100 dark:border-gray-600 ${luckInfo.bg} transition-all duration-300 hover:shadow-sm`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{direction.name}方</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/70 dark:bg-gray-800/70">
                      {luckInfo.text}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{direction.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* 时辰吉凶 */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white flex items-center">
            <i className="fa-solid fa-clock mr-2 text-purple-600"></i>
            时辰吉凶
          </h3>
          
          <motion.div
            className={`p-4 rounded-lg border border-gray-100 dark:border-gray-600 transition-all duration-300 hover:shadow-sm`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {(() => {
              const luckInfo = getLuckInfo(judgmentData.time.isLucky, judgmentData.time.score);
              return (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{judgmentData.time.hour}时</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${luckInfo.bg}`}>
                      {luckInfo.text}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{judgmentData.time.description}</p>
                </>
              );
            })()}
          </motion.div>
        </div>
        
        {/* 事项吉凶 */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white flex items-center">
            <i className="fa-solid fa-list-check mr-2 text-green-600"></i>
            事项吉凶
          </h3>
          
          <div className="space-y-2">
            {judgmentData.matters.map((matter, index) => {
              const luckInfo = getLuckInfo(matter.isLucky, matter.score);
              return (
                <motion.div
                  key={index}
                  className={`p-3 rounded-lg border border-gray-100 dark:border-gray-600 ${luckInfo.bg} transition-all duration-300 hover:shadow-sm`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{matter.category}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/70 dark:bg-gray-800/70">
                      {luckInfo.text}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{matter.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}