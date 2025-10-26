import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Brain, Send, User, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "ai";
  content: string;
  reasoning?: string;
}

const initialMessages: Message[] = [
  {
    role: "ai",
    content: "I've analyzed the contract terms and evidence. The seller delivered 3 out of 5 agreed features. Based on MeTTa rule #42 (partial delivery) and GPT-4 contract analysis, I recommend a 60/40 split.",
    reasoning: "MeTTa Rule: IF deliverables < 100% AND quality_acceptable THEN proportional_release",
  },
  {
    role: "user",
    content: "Can you explain why 60/40 instead of 50/50?",
  },
  {
    role: "ai",
    content: "The delivered features (authentication, dashboard, API integration) represent core functionality worth ~60% of project value. The missing features (admin panel, reporting) are supplementary. ASI:One fairness protocol weights core deliverables higher.",
    reasoning: "Weighted value analysis: Core features (3) = 60%, Supplementary (2) = 40%",
  },
];

export const DisputeChat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "That's a great question. Let me apply additional reasoning to address your concern...",
          reasoning: "Applying MeTTa rules #12, #34 for contextual analysis",
        },
      ]);
    }, 1000);
  };

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-semibold">AI Reasoning Conversation</h3>
        <Badge className="bg-primary/10 text-primary gap-1">
          <Sparkles className="w-3 h-3" />
          MeTTa + GPT-4
        </Badge>
      </div>

      <div className="space-y-4 mb-4 max-h-[500px] overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "ai" && (
              <div className="p-2 rounded-lg bg-primary/10 h-fit">
                <Brain className="w-5 h-5 text-primary" />
              </div>
            )}

            <div className={`flex-1 max-w-[80%] ${msg.role === "user" ? "text-right" : ""}`}>
              <div
                className={`rounded-lg p-4 ${
                  msg.role === "ai" ? "bg-secondary/50 text-left" : "bg-primary/20 text-right"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                {msg.reasoning && (
                  <div className="mt-2 pt-2 border-t border-border/30">
                    <p className="text-xs text-muted-foreground font-mono">{msg.reasoning}</p>
                  </div>
                )}
              </div>
            </div>

            {msg.role === "user" && (
              <div className="p-2 rounded-lg bg-accent/10 h-fit">
                <User className="w-5 h-5 text-accent" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Ask about the AI's reasoning..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend} className="gap-2">
          <Send className="w-4 h-4" />
          Send
        </Button>
      </div>
    </Card>
  );
};
