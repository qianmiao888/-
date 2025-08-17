import { useState, useEffect } from 'react';

interface TimeSelectorProps {
  currentTime: Date;
  onTimeChange: (time: Date) => void;
}

export default function TimeSelector({ currentTime, onTimeChange }: TimeSelectorProps) {
  const [date, setDate] = useState<string>(formatDate(currentTime));
  const [time, setTime] = useState<string>(formatTime(currentTime));
  
  // 当父组件传入的currentTime变化时更新本地状态
  useEffect(() => {
    setDate(formatDate(currentTime));
    setTime(formatTime(currentTime));
  }, [currentTime]);
  
  // 格式化日期为YYYY-MM-DD
  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // 格式化时间为HH:MM
  function formatTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  
  // 处理日期变化
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    updateParentTime();
  };
  
  // 处理时间变化
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
    updateParentTime();
  };
  
  // 更新父组件的时间
  const updateParentTime = () => {
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    
    const newTime = new Date(year, month - 1, day, hours, minutes);
    onTimeChange(newTime);
  };
  
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        选择时间
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">默认使用当前时间，可手动调整</p>
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">日期</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="time" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">时间</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={handleTimeChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
}