import { motion } from 'framer-motion';

// 宫位接口定义
interface Palace {
  position: number; // 1-9 宫位
  name: string; // 宫位名称
  direction: string; // 方位
  heavenlyStem: string; // 天干
  earthlyBranch: string; // 地支
  deity: string; // 神盘
  door: string; // 门盘
  star: string; // 星盘
  isLucky: boolean; // 是否吉利
}

interface QimenPlateProps {
  plateData: {
    date: string;
    time: string;
    palaces: Palace[];
  };
}

export default function QimenPlate({ plateData }: QimenPlateProps) {
  // 九宫格布局样式
  const gridLayout = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    gap: '0.5rem',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
  };
  
  // 宫位位置映射
  const positionMap = {
    1: 'start',        // 坎宫 (下)
    2: 'start',        // 坤宫 (左下)
    3: 'center',       // 震宫 (左中)
    4: 'center',       // 巽宫 (右中)
    5: 'center',       // 中宫 (中心)
    6: 'center',       // 乾宫 (左上)
    7: 'center',       // 兑宫 (右上)
    8: 'end',          // 艮宫 (右下)
    9: 'end',          // 离宫 (上)
  };
  
  // 获取宫位样式
  const getPalaceStyle = (position: number) => {
    const baseStyle = {
      padding: '0.75rem',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      textAlign: 'center' as const,
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center' as const,
      aspectRatio: '1/1',
    };
    
    // 根据宫位位置设置网格位置
    let gridArea = '';
    switch(position) {
      case 1: gridArea = '3 / 2 / 4 / 3'; break; // 坎宫 (下中)
      case 2: gridArea = '2 / 1 / 3 / 2'; break; // 坤宫 (中左)
      case 3: gridArea = '2 / 2 / 3 / 3'; break; // 震宫 (中中)
      case 4: gridArea = '2 / 3 / 3 / 4'; break; // 巽宫 (中右)
      case 5: gridArea = '1 / 2 / 2 / 3'; break; // 中宫 (上中)
      case 6: gridArea = '1 / 1 / 2 / 2'; break; // 乾宫 (上左)
      case 7: gridArea = '1 / 3 / 2 / 4'; break; // 兑宫 (上右)
      case 8: gridArea = '3 / 1 / 4 / 2'; break; // 艮宫 (下左)
      case 9: gridArea = '3 / 3 / 4 / 4'; break; // 离宫 (下右)
      default: gridArea = 'auto';
    }
    
    return { ...baseStyle, gridArea };
  };
  
  // 获取吉凶颜色
  const getLuckColor = (isLucky: boolean) => {
    return isLucky ? 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400';
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>排盘时间: {plateData.date} {plateData.time}</p>
      </div>
      
      <div style={gridLayout} className="relative">
        {/* 九宫格宫位 */}
        {plateData.palaces.map((palace) => (
          <motion.div
            key={palace.position}
            style={getPalaceStyle(palace.position)}
            className={`bg-white dark:bg-gray-700 shadow-sm transition-all duration-300 hover:shadow-md ${palace.position === 5 ? 'ring-2 ring-amber-500' : ''}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: palace.position * 0.05 }}
          >
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{palace.name}宫 ({palace.direction})</div>
            
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 w-full text-xs">
              <div className="text-left">天干: <span className="font-medium">{palace.heavenlyStem}</span></div>
              <div className="text-right">地支: <span className="font-medium">{palace.earthlyBranch}</span></div>
              
              <div className="text-left">神盘: <span className="font-medium">{palace.deity}</span></div>
              <div className="text-right">门盘: <span className="font-medium">{palace.door}</span></div>
              
              <div className="col-span-2 text-center mt-1">
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium">
                  星盘: {palace.star}
                </span>
              </div>
            </div>
            
            <div className="mt-2">
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getLuckColor(palace.isLucky)}`}>
                {palace.isLucky ? '吉' : '凶'}
              </span>
            </div>
          </motion.div>
        ))}
        
        {/* 方位标记 */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full text-xs text-gray-500 dark:text-gray-400">
          南
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full text-xs text-gray-500 dark:text-gray-400">
          北
        </div>
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full text-xs text-gray-500 dark:text-gray-400">
          西
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full text-xs text-gray-500 dark:text-gray-400">
          东
        </div>
      </div>
      
      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
        <p className="font-medium text-center mb-1">奇门遁甲排盘说明</p>
        <p>九宫格对应不同方位，每个宫位包含天干、地支、神盘、门盘和星盘信息，显示该方位的吉凶情况。</p>
      </div>
    </div>
  );
}