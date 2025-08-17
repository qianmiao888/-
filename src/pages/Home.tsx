import { useState } from 'react';
import TimeSelector from '@/components/Qimen/TimeSelector';
import QuestionInput from '@/components/Qimen/QuestionInput';
import QimenPlate from '@/components/Qimen/QimenPlate';
import FortuneJudgment from '@/components/Qimen/FortuneJudgment';
import InterpretationDisplay from '@/components/Qimen/InterpretationDisplay';
import { generateQimenPlate, generateFortuneJudgment, generateInterpretation } from '@/lib/utils';

export default function Home() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [question, setQuestion] = useState<string>('');
  const [qimenData, setQimenData] = useState<any>(null);
  const [fortuneJudgment, setFortuneJudgment] = useState<any>(null);
  const [interpretation, setInterpretation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTimeChange = (time: Date) => {
    setCurrentTime(time);
  };

  const handleQuestionChange = (text: string) => {
    setQuestion(text);
  };

  const handleGenerateQimen = () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    
    // 模拟API调用延迟
    setTimeout(async () => {
      // 生成奇门遁甲排盘数据
      const plateData = generateQimenPlate(currentTime);
      setQimenData(plateData);
      
      // 生成吉凶判断
      const judgment = generateFortuneJudgment(plateData);
      setFortuneJudgment(judgment);
      
       // 调用通义千问API生成解读
       try {
         const 解读 = await generateInterpretation(plateData, judgment, question);
         setInterpretation(解读);
       } catch (error) {
         console.error('生成解读失败:', error);
         setInterpretation('生成解读时出错，请重试。');
       } finally {
         setIsLoading(false);
       }
     }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-amber-800 dark:text-amber-300 mb-2">奇门遁甲排盘系统</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">探索时间与空间的奥秘，解读人生疑惑</p>
        </header>
        
        {/* 输入区域 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 transform transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
            <i className="fa-solid fa-circle-question mr-2 text-amber-600"></i>
            请输入信息
          </h2>
          
          <div className="space-y-6">
            <TimeSelector currentTime={currentTime} onTimeChange={handleTimeChange} />
            
            <QuestionInput 
              question={question} 
              onQuestionChange={handleQuestionChange} 
              onSubmit={handleGenerateQimen} 
              isLoading={isLoading}
            />
          </div>
        </div>
        
        {/* 结果显示区域 */}
        {qimenData && (
          <div className="space-y-8">
            {/* 奇门遁甲排盘 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                <i className="fa-solid fa-square-full mr-2 text-amber-600"></i>
                奇门遁甲排盘
              </h2>
              <QimenPlate plateData={qimenData} />
            </div>
            
            {/* 吉凶判断 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                <i className="fa-solid fa-balance-scale mr-2 text-amber-600"></i>
                吉凶判断
              </h2>
               {fortuneJudgment && <FortuneJudgment judgmentData={fortuneJudgment} />}
            </div>
            
            {/* LLM生成解读 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                <i className="fa-solid fa-comment-dots mr-2 text-amber-600"></i>
                解读分析
              </h2>
               <InterpretationDisplay content={interpretation} isLoading={isLoading} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}