import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Upload, MessageSquare, FileText, CheckCircle, Loader2 } from "lucide-react";
import { DisputeChat } from "./DisputeChat";
import { EvidenceUploader } from "./EvidenceUploader";

interface Dispute {
  id: string;
  escrowId: string;
  status: "analyzing" | "awaiting_evidence" | "resolved";
  reason: string;
  aiDecision?: string;
  confidence?: number;
}

const mockDispute: Dispute = {
  id: "DIS-001",
  escrowId: "ESC-002",
  status: "analyzing",
  reason: "Incomplete deliverables - seller provided only 60% of agreed features",
  aiDecision: "Based on contract terms and evidence, partial release of 60% to seller, 40% refund to buyer",
  confidence: 94.3,
};

export const DisputeSystem = () => {
  const [activeView, setActiveView] = useState<"overview" | "evidence" | "reasoning">("overview");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">AI Dispute Resolution</h2>
        <p className="text-muted-foreground mt-1">Transparent, explainable arbitration powered by MeTTa + GPT-4</p>
      </div>

      {/* Dispute Overview Card */}
      <Card className="glass-card p-6 border-primary/30">
        <div className="flex items-start justify-between mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-semibold">Dispute {mockDispute.id}</h3>
              <Badge className="bg-warning/10 text-warning">
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                AI Analyzing
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Escrow: {mockDispute.escrowId}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Confidence Score</div>
            <div className="text-3xl font-bold text-primary">{mockDispute.confidence}%</div>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-lg p-4 mb-6">
          <div className="text-sm text-muted-foreground mb-1">Dispute Reason</div>
          <p className="text-foreground">{mockDispute.reason}</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={activeView === "overview" ? "default" : "outline"}
            onClick={() => setActiveView("overview")}
            className="gap-2"
          >
            <FileText className="w-4 h-4" />
            Overview
          </Button>
          <Button
            variant={activeView === "evidence" ? "default" : "outline"}
            onClick={() => setActiveView("evidence")}
            className="gap-2"
          >
            <Upload className="w-4 h-4" />
            Evidence
          </Button>
          <Button
            variant={activeView === "reasoning" ? "default" : "outline"}
            onClick={() => setActiveView("reasoning")}
            className="gap-2"
          >
            <Brain className="w-4 h-4" />
            AI Reasoning
          </Button>
        </div>
      </Card>

      {/* Dynamic Content Based on View */}
      {activeView === "overview" && (
        <Card className="glass-card p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-primary/10 glow-ai">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold mb-2">AI Decision</h4>
              <p className="text-muted-foreground">{mockDispute.aiDecision}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">MeTTa Rules Applied</div>
              <div className="text-2xl font-bold text-primary">17</div>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Evidence Analyzed</div>
              <div className="text-2xl font-bold text-success">8 items</div>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Processing Time</div>
              <div className="text-2xl font-bold text-accent">2.8s</div>
            </div>
          </div>
        </Card>
      )}

      {activeView === "evidence" && <EvidenceUploader />}

      {activeView === "reasoning" && <DisputeChat />}
    </div>
  );
};
