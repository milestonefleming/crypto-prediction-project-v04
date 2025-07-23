import { Button } from "@/components/ui/button";
import { Bot, BarChart3, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="glass-nav sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="relative p-3 bg-gradient-primary rounded-xl shadow-glow-primary group-hover:shadow-glow-neon transition-all duration-300">
              <Bot className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neon font-inter tracking-tight">
                CryptoPredictAI
              </h1>
              <p className="text-sm text-muted-foreground font-medium">AI Model Enhancements</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="nav-link px-6 py-2 font-medium text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
            >
              Dashboard
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/predictions')}
              className="nav-link px-6 py-2 font-medium text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Predictions
            </Button>
            <Button 
              className="ml-4 bg-gradient-primary hover:shadow-glow-primary font-medium px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/predictions')}
            >
              <Zap className="w-4 h-4 mr-2" />
              View Predictions
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;