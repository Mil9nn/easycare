type StatCardProps = {
    iconSrc: string;
    iconAlt: string;
    count: number | undefined;
    description: string;
    trend?: 'up' | 'down' | 'neutral';
    trendPercentage?: number;
    cardBg?: string;
    type?: 'scheduled' | 'pending' | 'cancelled';
}

const StatCard = ({ 
    iconSrc, 
    iconAlt, 
    count, 
    description,
    cardBg, 
    trendPercentage,
    type, 
}: StatCardProps) => {
  const getTrend = () => {
    if (trendPercentage === undefined || type === undefined) return 'neutral';

  if (type === 'scheduled') {
    if (trendPercentage >= 70) return 'up';
    if (trendPercentage <= 30) return 'down';
    return 'neutral';
  }

  if (type === 'pending') {
    if (trendPercentage >= 40) return 'down';
    if (trendPercentage <= 15) return 'up';
    return 'neutral';
  }

  if (type === 'cancelled') {
    if (trendPercentage >= 30) return 'down';
    if (trendPercentage <= 10) return 'up';
    return 'neutral';
  }

  return 'neutral'
}

const trend = getTrend();

const trendClass = trend === 'up' ? 'text-green-600 bg-green-100' : trend === 'down' ? 'text-red-600 bg-red-100' : 'text-gray-600 bg-gray-100';

  return (
    <div className={`stat-card ${cardBg} p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100`}>
      <div className="relative flex items-start mb-2">
        <img
          src={iconSrc}
          alt={iconAlt}
          className="w-10 h-10 p-2 mr-2 rounded-lg bg-gray-50"
        />
        
        {trendPercentage && (
          <span className={`absolute right-0 text-xs px-2 py-1 rounded-full ${trendClass}`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendPercentage}%
          </span>
        )}

        <div className="mb-1">
        <p className="text-2xl font-semibold text-gray-900">{count?.toLocaleString()}</p>
      </div>
      </div>
      
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default StatCard;