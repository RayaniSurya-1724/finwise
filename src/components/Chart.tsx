
import { useEffect, useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

type ChartType = 'line' | 'area' | 'bar' | 'pie';

interface ChartProps {
  type: ChartType;
  data: any[];
  height?: number;
  colors?: string[];
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  dataKeys?: string[];
  xAxisDataKey?: string;
  animate?: boolean;
}

const Chart = ({
  type = 'line',
  data,
  height = 300,
  colors = ['#3B82F6', '#FBBF24', '#10B981', '#EF4444', '#8B5CF6'],
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  dataKeys = ['value'],
  xAxisDataKey = 'name',
  animate = true
}: ChartProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simple animation to make chart appear after mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const renderTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 shadow-lg rounded-lg border border-gray-100 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`tooltip-${index}`} className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span className="text-xs font-medium" style={{ color: entry.color }}>
                {entry.name}: {entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const opacity = isVisible ? 1 : 0;
  const transition = animate ? 'all 0.7s ease-out' : 'none';

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" strokeOpacity={0.3} />}
            <XAxis 
              dataKey={xAxisDataKey} 
              tick={{ fontSize: 12, fill: '#888' }} 
              axisLine={{ stroke: '#e0e0e0' }} 
              tickLine={{ stroke: '#e0e0e0' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#888' }} 
              axisLine={{ stroke: '#e0e0e0' }} 
              tickLine={{ stroke: '#e0e0e0' }}
            />
            {showTooltip && <Tooltip content={renderTooltip} />}
            {showLegend && <Legend wrapperStyle={{ paddingTop: 10 }} />}
            {dataKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                style={{ opacity, transition }}
              />
            ))}
          </LineChart>
        );
        
      case 'area':
        return (
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" strokeOpacity={0.3} />}
            <XAxis 
              dataKey={xAxisDataKey} 
              tick={{ fontSize: 12, fill: '#888' }} 
              axisLine={{ stroke: '#e0e0e0' }} 
              tickLine={{ stroke: '#e0e0e0' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#888' }} 
              axisLine={{ stroke: '#e0e0e0' }} 
              tickLine={{ stroke: '#e0e0e0' }}
            />
            {showTooltip && <Tooltip content={renderTooltip} />}
            {showLegend && <Legend wrapperStyle={{ paddingTop: 10 }} />}
            {dataKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                fillOpacity={0.2}
                fill={colors[index % colors.length]}
                style={{ opacity, transition }}
              />
            ))}
          </AreaChart>
        );
        
      case 'bar':
        return (
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" strokeOpacity={0.3} />}
            <XAxis 
              dataKey={xAxisDataKey} 
              tick={{ fontSize: 12, fill: '#888' }} 
              axisLine={{ stroke: '#e0e0e0' }} 
              tickLine={{ stroke: '#e0e0e0' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#888' }} 
              axisLine={{ stroke: '#e0e0e0' }} 
              tickLine={{ stroke: '#e0e0e0' }}
            />
            {showTooltip && <Tooltip content={renderTooltip} />}
            {showLegend && <Legend wrapperStyle={{ paddingTop: 10 }} />}
            {dataKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[index % colors.length]}
                radius={[4, 4, 0, 0]}
                style={{ opacity, transition }}
              />
            ))}
          </BarChart>
        );
        
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={40}
              fill="#8884d8"
              dataKey={dataKeys[0]}
              nameKey={xAxisDataKey}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              style={{ opacity, transition }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            {showLegend && <Legend wrapperStyle={{ paddingTop: 20 }} />}
            {showTooltip && <Tooltip content={renderTooltip} />}
          </PieChart>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700">
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
