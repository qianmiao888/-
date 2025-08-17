import { useState } from 'react';
import { cn } from '@/lib/utils';

interface QuestionInputProps {
  question: string;
  onQuestionChange: (text: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function QuestionInput({ question, onQuestionChange, onSubmit, isLoading }: QuestionInputProps) {
  const [localQuestion, setLocalQuestion] = useState<string>(question);
  
  // 当父组件传入的question变化时更新本地状态
  useState(() => {
    setLocalQuestion(question);
  }, [question]);
  
  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setLocalQuestion(value);
    onQuestionChange(value);
  };
  
  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 简单验证
    if (!localQuestion.trim()) {
      alert('请输入您想占卜的问题');
      return;
    }
    
    onSubmit();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="question" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        您想占卜的问题
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">请简明扼要地描述您想了解的事情</p>
      </label>
      
      <textarea
        id="question"
        value={localQuestion}
        onChange={handleInputChange}
        rows={4}
        placeholder="例如：我近期的事业发展如何？或我与某人的关系会如何发展？"
        className={cn(
          "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-amber-500 dark:bg-gray-700 dark:text-white",
          localQuestion.trim() 
            ? "border-gray-300 dark:border-gray-600 focus:ring-amber-500" 
            : "border-red-300 dark:border-red-600 focus:ring-red-500"
        )}
        disabled={isLoading}
      />
      
      <button
        type="submit"
        disabled={!localQuestion.trim() || isLoading}
        className={cn(
          "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center",
          (isLoading || !localQuestion.trim())
            ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            : "bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-lg"
        )}
      >
        {isLoading ? (
          <>
            <i className="fa-solid fa-spinner fa-spin mr-2"></i>
            正在排盘...
          </>
        ) : (
          <>
            <i className="fa-solid fa-calculator mr-2"></i>
            开始奇门排盘
          </>
        )}
      </button>
    </form>
  );
}