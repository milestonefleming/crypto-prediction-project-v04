import { Github, Twitter, Linkedin, Mail, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-background/50 backdrop-blur-xl border-t border-white/10 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-neon">CryptoPredictAI</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Advanced AI-powered cryptocurrency prediction platform with real-time market analysis.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Platform</h4>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start p-0 h-auto font-normal text-muted-foreground hover:text-primary">
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto font-normal text-muted-foreground hover:text-primary">
                Predictions
              </Button>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto font-normal text-muted-foreground hover:text-primary">
                API Documentation
              </Button>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Legal</h4>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start p-0 h-auto font-normal text-muted-foreground hover:text-primary">
                <Shield className="w-4 h-4 mr-2" />
                Privacy Policy
              </Button>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto font-normal text-muted-foreground hover:text-primary">
                <FileText className="w-4 h-4 mr-2" />
                Terms of Service
              </Button>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto font-normal text-muted-foreground hover:text-primary">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Connect</h4>
            <div className="flex space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-10 h-10 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-10 h-10 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-10 h-10 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 CryptoPredictAI. Built with advanced machine learning for smarter trading decisions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;