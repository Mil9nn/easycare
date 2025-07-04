type StatCardProps = {
    iconSrc: string;
    iconAlt: string;
    count: number;
    description: string;
    trend?: 'up' | 'down' | 'neutral';
    trendPercentage?: number;
    cardBg?: string;
}

const StatCard = ({ 
    iconSrc, 
    iconAlt, 
    count, 
    description,
    cardBg, 
    trend = 'neutral',
    trendPercentage 
}: StatCardProps) => {
  return (
    <div className={`stat-card ${cardBg} p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100`}>
      <div className="relative flex items-start mb-2">
        <img
          src={iconSrc}
          alt={iconAlt}
          className="w-10 h-10 p-2 rounded-lg bg-gray-50"
        />
        
        {trendPercentage && (
          <span className={`absolute right-0 text-xs px-2 py-1 rounded-full ${
            trend === 'up' ? 'bg-green-50 text-green-600' : 
            trend === 'down' ? 'bg-red-50 text-red-600' : 
            'bg-gray-50 text-gray-600'
          }`}>
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