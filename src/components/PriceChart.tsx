import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

interface PriceChartProps {
  symbol: string;
  name: string;
  color: string;
}

// Generate mock price data for demo
const generatePriceData = (days: number, basePrice: number) => {
  const data = [];
  let price = basePrice;
  
  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.5) * 0.1;
    price = price * (1 + change);
    
    data.push({
      time: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      price: price,
      volume: Math.random() * 1000000000
    });
  }
  
  return data;
};

const timeframes = [
  { label: '1D', days: 1 },
  { label: '7D', days: 7 },
  { label: '1M', days: 30 }
];

const PriceChart = ({ symbol, name, color }: PriceChartProps) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7D');
  const timeframe = timeframes.find(t => t.label === selectedTimeframe) || timeframes[1];
  
  const basePrice = symbol === 'BTC' ? 65000 : symbol === 'ETH' ? 3500 : 0.30;
  const data = generatePriceData(timeframe.days, basePrice);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border-none">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-lg font-bold text-neon">
            ${payload[0].value.toLocaleString(undefined, { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="interactive-card animate-scale-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-neon">{name} ({symbol})</CardTitle>
          <div className="flex space-x-1">
            {timeframes.map((tf) => (
              <Button
                key={tf.label}
                variant={selectedTimeframe === tf.label ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedTimeframe(tf.label)}
                className={`transition-all duration-300 ${
                  selectedTimeframe === tf.label 
                    ? "bg-gradient-primary hover:shadow-glow-primary" 
                    : "hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {tf.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))" 
                opacity={0.3}
              />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke={color}
                strokeWidth={3}
                dot={false}
                activeDot={{ 
                  r: 6, 
                  fill: color,
                  stroke: "hsl(var(--background))",
                  strokeWidth: 2,
                  style: { filter: `drop-shadow(0 0 8px ${color})` }
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceChart;