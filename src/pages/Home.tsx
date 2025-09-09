import { ArrowRight, Target, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Right-Fit Internships</h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            EN
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-4 py-12">
        <div className="max-w-md mx-auto text-center text-white space-y-6">
          <div className="animate-float">
            <Target className="w-16 h-16 mx-auto mb-4 text-white drop-shadow-lg" />
          </div>
          
          <h2 className="text-3xl font-bold leading-tight">
            Find Your Perfect Internship Match
          </h2>
          
          <p className="text-lg text-white/90 leading-relaxed">
            Get personalized internship recommendations based on your skills, 
            certificates, and career goals through our AI-powered matching system.
          </p>

          <Link to="/student">
            <Button size="lg" className="w-full bg-white text-primary hover:bg-white/90 shadow-button">
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="max-w-md mx-auto mt-16 space-y-4">
          <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
            <div className="flex items-center gap-3 text-white">
              <Zap className="w-6 h-6 text-warning" />
              <div>
                <h3 className="font-semibold">Smart Matching</h3>
                <p className="text-sm text-white/80">AI-powered recommendations</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
            <div className="flex items-center gap-3 text-white">
              <Shield className="w-6 h-6 text-success" />
              <div>
                <h3 className="font-semibold">Verified Certificates</h3>
                <p className="text-sm text-white/80">Credential verification system</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
            <div className="flex items-center gap-3 text-white">
              <Target className="w-6 h-6 text-primary-glow" />
              <div>
                <h3 className="font-semibold">Personalized Results</h3>
                <p className="text-sm text-white/80">Tailored to your profile</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}