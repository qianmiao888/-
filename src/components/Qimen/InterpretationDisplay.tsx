import { motion } from 'framer-motion';

interface InterpretationDisplayProps {
  content: string;
  isLoading?: boolean;
}

// 解析内容为段落数组
const parseContent = (content: string) => {
  // 假设内容使用换行分隔段落
  return content.split('\n').filter(paragraph => paragraph.trim() !== '');
};

export default function InterpretationDisplay({ content, isLoading = false }: InterpretationDisplayProps) {
  const paragraphs = parseContent(content);
  
  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-100 dark:border-gray-600 shadow-sm">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isLoading ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <i className="fa-solid fa-spinner fa-spin text-2xl mb-2"></i>
          <p>正在生成解读内容...</p>
          <p className="text-xs mt-1">请稍候，这可能需要几秒钟时间</p>
        </div>
      ) : paragraphs.length > 0 ? (
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          {paragraphs.map((paragraph, index) => (
            <p 
              key={index} 
              className="text-sm leading-relaxed"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <i className="fa-solid fa-comment-slash text-2xl mb-2"></i>
          <p>暂无解读内容</p>
          <p className="text-xs mt-1">请先输入问题并进行排盘</p>
        </div>
      )}
    </motion.div>
      
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-600 text-xs text-gray-500 dark:text-gray-400">
        <p className="flex items-center">
          <i className="fa-solid fa-info-circle mr-1"></i>
          注：以上解读仅供参考，人生道路仍需自己把握。奇门遁甲是传统文化的一部分，其解读结果需理性看待。
        </p>
      </div>
    </div>
  );
}