import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SentimentIndicator from "./SentimentIndicator";
import PriceChart from "./PriceChart";
import { type CoinSentiment } from "@/services/sentimentAnalysis";

interface CoinCardProps {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  icon: string;
  sentiment?: CoinSentiment;
}

// Generate mock sparkline data for demo purposes
const generateSparklineData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    value: Math.random() * 100 + 50,
    day: i
  }));
};

const Sparkline = ({ data, isPositive }: { data: any[], isPositive: boolean }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;
  
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 60;
    const y = 20 - ((d.value - minValue) / range) * 20;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="sparkline" viewBox="0 0 60 20" fill="none">
      <polyline
        points={points}
        stroke={isPositive ? "hsl(var(--crypto-green))" : "hsl(var(--crypto-red))"}
        strokeWidth="1.5"
        fill="none"
        className="animate-pulse"
      />
      <defs>
        <linearGradient id={`gradient-${isPositive ? 'up' : 'down'}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isPositive ? "hsl(var(--crypto-green))" : "hsl(var(--crypto-red))"} stopOpacity="0.3" />
          <stop offset="100%" stopColor={isPositive ? "hsl(var(--crypto-green))" : "hsl(var(--crypto-red))"} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const getCoinGradient = (symbol: string) => {
  switch (symbol.toLowerCase()) {
    case 'btc': return 'from-crypto-bitcoin to-crypto-orange';
    case 'eth': return 'from-crypto-ethereum to-primary';
    case 'doge': return 'from-crypto-dogecoin to-accent';
    default: return 'from-primary to-secondary';
  }
};

const getCoinChartColor = (symbol: string) => {
  switch (symbol.toLowerCase()) {
    case 'btc': return 'hsl(var(--crypto-bitcoin))';
    case 'eth': return 'hsl(var(--crypto-ethereum))';
    case 'doge': return 'hsl(var(--crypto-dogecoin))';
    default: return 'hsl(var(--primary))';
  }
};

const CoinCard = ({ symbol, name, price, change24h, icon, sentiment }: CoinCardProps) => {
  const navigate = useNavigate();
  const isPositive = change24h >= 0;
  const sparklineData = generateSparklineData();

  const handleClick = () => {
    navigate(`/coin/${symbol.toLowerCase()}`);
  };

  return (
    <Card 
      className="interactive-card relative overflow-hidden group animate-slide-up"
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-300" 
           style={{ background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))` }}></div>
      
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`text-4xl p-2 rounded-xl bg-gradient-to-br ${getCoinGradient(symbol)} shadow-glow-primary group-hover:animate-float`}>
              {icon}
            </div>
            <div>
              <h3 className="font-bold text-xl text-neon">{name}</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{symbol}</p>
            </div>
          </div>
          <div className="text-right space-y-1">
            <Sparkline data={sparklineData} isPositive={isPositive} />
            <p className="text-sm text-muted-foreground">7d trend</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-3xl font-bold text-glow animate-price-update">
              ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <Badge 
              variant={isPositive ? "default" : "destructive"}
              className={`mt-2 ${isPositive ? "bg-crypto-green hover:shadow-glow-accent" : "bg-crypto-red"} text-white font-medium px-3 py-1 transition-all duration-300`}
            >
              {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              {Math.abs(change24h).toFixed(2)}%
            </Badge>
          </div>
          
          {sentiment && (
            <div className="text-right">
              <SentimentIndicator sentiment={sentiment} compact />
            </div>
          )}
        </div>

        <div className="mt-6">
          <PriceChart 
            symbol={symbol} 
            name={name} 
            color={getCoinChartColor(symbol)}
            compact={true}
          />
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Sparkles className="w-5 h-5 text-accent animate-glow-pulse" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CoinCard;