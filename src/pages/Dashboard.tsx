import { useState, useEffect } from "react";
import Header from "@/components/Header";
import CoinCard from "@/components/CoinCard";
import PriceChart from "@/components/PriceChart";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bot, 
  TrendingUp, 
  Users, 
  Clock, 
  MessageCircle, 
  Database, 
  Brain, 
  Target,
  Zap,
  BarChart3,
  Activity,
  Sparkles
} from "lucide-react";
import { fetchCoinData, type CoinData } from "@/services/coinGeckoApi";
import { useSentimentData } from "@/hooks/useSentimentData";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { sentimentData, loading: sentimentLoading } = useSentimentData(
    coins.map(coin => coin.symbol)
  );

  // Fetch real cryptocurrency data from CoinGecko API
  useEffect(() => {
    const loadCoinData = async () => {
      setLoading(true);
      const data = await fetchCoinData();
      setCoins(data);
      setLoading(false);
    };

    loadCoinData();
    
    // Update data every 60 seconds
    const interval = setInterval(loadCoinData, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <Header />
      
      <main className="container mx-auto px-6 py-12 relative z-10">
        {/* Hero Section */}
        <section className="text-center mb-20 animate-slide-up">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-neon">AI-Powered</span>
              <br />
              <span className="text-glow">Crypto Predictions</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Smarter, more beautiful insights for Bitcoin, Ethereum, and Dogecoin using cutting-edge AI
            </p>
            <Button 
              className="bg-gradient-primary hover:shadow-glow-neon text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 neon-glow"
              onClick={() => navigate('/predictions')}
            >
              <Zap className="w-5 h-5 mr-2" />
              View Predictions
            </Button>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="interactive-card animate-scale-in">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-gradient-primary rounded-xl w-fit mx-auto mb-4 shadow-glow-primary">
                  <Sparkles className="w-8 h-8 text-primary-foreground" />
                </div>
                <p className="text-3xl font-bold text-neon mb-2">87%</p>
                <p className="text-sm text-muted-foreground font-medium">Accuracy Rate</p>
              </CardContent>
            </Card>
            
            <Card className="interactive-card animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-gradient-secondary rounded-xl w-fit mx-auto mb-4 shadow-glow-secondary">
                  <BarChart3 className="w-8 h-8 text-secondary-foreground" />
                </div>
                <p className="text-3xl font-bold text-neon mb-2">12.5K</p>
                <p className="text-sm text-muted-foreground font-medium">Predictions Made</p>
              </CardContent>
            </Card>
            
            <Card className="interactive-card animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-gradient-primary rounded-xl w-fit mx-auto mb-4 shadow-glow-accent">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <p className="text-3xl font-bold text-neon mb-2">3.2K</p>
                <p className="text-sm text-muted-foreground font-medium">Active Users</p>
              </CardContent>
            </Card>
            
            <Card className="interactive-card animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-gradient-secondary rounded-xl w-fit mx-auto mb-4 shadow-glow-accent">
                  <MessageCircle className="w-8 h-8 text-secondary-foreground" />
                </div>
                <p className="text-3xl font-bold text-neon mb-2">AI-Powered</p>
                <p className="text-sm text-muted-foreground font-medium">Sentiment Analysis</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Live Crypto Prices Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-neon">Live Cryptocurrency Prices</h2>
            <Badge className="bg-gradient-primary hover:shadow-glow-primary text-lg px-4 py-2 font-medium animate-neon-glow">
              <Activity className="w-4 h-4 mr-2 animate-pulse" />
              Live Data
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeleton with enhanced animation
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="glass-card animate-pulse">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-secondary rounded-xl"></div>
                        <div>
                          <div className="h-5 bg-secondary rounded w-24 mb-2"></div>
                          <div className="h-4 bg-secondary rounded w-16"></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="h-4 bg-secondary rounded w-20 mb-2"></div>
                        <div className="h-3 bg-secondary rounded w-16"></div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-8 bg-secondary rounded w-32"></div>
                      <div className="h-6 bg-secondary rounded w-20"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              coins.map((coin, index) => (
                <div key={coin.symbol} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CoinCard
                    symbol={coin.symbol}
                    name={coin.name}
                    price={coin.price}
                    change24h={coin.change24h}
                    icon={coin.icon}
                    sentiment={sentimentData[coin.symbol]}
                  />
                </div>
              ))
            )}
          </div>
        </section>


        {/* How Our AI Works */}
        <section className="mb-20">
          <Card className="glass-card animate-scale-in border-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-neon opacity-5"></div>
            <CardHeader className="text-center pb-8 relative z-10">
              <CardTitle className="text-3xl md:text-4xl font-bold text-neon mb-4">
                How Our AI Works
              </CardTitle>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Advanced machine learning pipeline delivering accurate cryptocurrency predictions
              </p>
            </CardHeader>
            <CardContent className="p-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-glow-primary group-hover:shadow-glow-neon transition-all duration-300 group-hover:scale-110">
                      <Database className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                      1
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-neon mb-3">Data Collection</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Real-time data aggregation from multiple exchanges, news sources, and social sentiment analysis
                  </p>
                </div>
                
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto shadow-glow-secondary group-hover:shadow-glow-neon transition-all duration-300 group-hover:scale-110">
                      <Brain className="w-10 h-10 text-secondary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                      2
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-neon mb-3">AI Analysis</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Advanced LSTM neural networks combined with transformer models for pattern recognition and sentiment analysis
                  </p>
                </div>
                
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-glow-accent group-hover:shadow-glow-neon transition-all duration-300 group-hover:scale-110">
                      <Target className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                      3
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-neon mb-3">Smart Predictions</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Accurate 1-7 day price forecasts with confidence intervals, updated every 24 hours
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;