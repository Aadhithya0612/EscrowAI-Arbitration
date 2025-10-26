import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Gavel, Brain, FileText, TrendingUp } from "lucide-react";
import { EscrowDashboard } from "@/components/escrow/EscrowDashboard";
import { DisputeSystem } from "@/components/dispute/DisputeSystem";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "dispute">("dashboard");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="border-b border-border/50 glass-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Shield className="w-8 h-8 text-primary" />
                <div className="absolute inset-0 animate-pulse-glow rounded-full" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  PYUSD Escrow
                </h1>
                <p className="text-xs text-muted-foreground">AI-Powered Trustless Arbitration</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">MeTTa Reasoning</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gavel className="w-4 h-4 text-success" />
                  <span className="text-muted-foreground">GPT-4 Arbitration</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-primary/50 hover:bg-primary/10">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 mb-8">
          <Button
            variant={activeTab === "dashboard" ? "default" : "ghost"}
            onClick={() => setActiveTab("dashboard")}
            className="flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Dashboard
          </Button>
          <Button
            variant={activeTab === "dispute" ? "default" : "ghost"}
            onClick={() => setActiveTab("dispute")}
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Dispute Resolution
          </Button>
        </div>

        {/* Main Content */}
        {activeTab === "dashboard" ? <EscrowDashboard /> : <DisputeSystem />}
      </div>

      {/* Footer Stats */}
      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">$2.4M</div>
              <div className="text-sm text-muted-foreground mt-1">Total Escrowed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success">98.7%</div>
              <div className="text-sm text-muted-foreground mt-1">Resolution Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-warning">847</div>
              <div className="text-sm text-muted-foreground mt-1">Active Escrows</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">3.2s</div>
              <div className="text-sm text-muted-foreground mt-1">Avg Decision Time</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
