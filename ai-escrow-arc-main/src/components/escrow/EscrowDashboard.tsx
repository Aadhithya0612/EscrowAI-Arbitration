import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, CheckCircle, AlertTriangle, ExternalLink } from "lucide-react";
import { CreateEscrowDialog } from "./CreateEscrowDialog";

interface Escrow {
  id: string;
  buyer: string;
  seller: string;
  amount: number;
  status: "pending" | "funded" | "disputed" | "completed";
  description: string;
  created: string;
}

const mockEscrows: Escrow[] = [
  {
    id: "ESC-001",
    buyer: "0x742d...3f9a",
    seller: "0x8c3e...7b2d",
    amount: 5000,
    status: "funded",
    description: "Website Development Services",
    created: "2024-01-15",
  },
  {
    id: "ESC-002",
    buyer: "0x1a2b...4c5d",
    seller: "0x9e8f...6d7c",
    amount: 12500,
    status: "disputed",
    description: "Smart Contract Audit",
    created: "2024-01-14",
  },
  {
    id: "ESC-003",
    buyer: "0x5f6g...8h9i",
    seller: "0x2b3c...1a0z",
    amount: 3200,
    status: "completed",
    description: "Logo Design Package",
    created: "2024-01-12",
  },
];

const statusConfig = {
  pending: { color: "text-muted-foreground", bg: "bg-muted", icon: Clock, label: "Pending" },
  funded: { color: "text-warning", bg: "bg-warning/10", icon: Clock, label: "In Progress" },
  disputed: { color: "text-destructive", bg: "bg-destructive/10", icon: AlertTriangle, label: "Disputed" },
  completed: { color: "text-success", bg: "bg-success/10", icon: CheckCircle, label: "Completed" },
};

export const EscrowDashboard = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Your Escrows</h2>
          <p className="text-muted-foreground mt-1">Manage and track PYUSD escrow transactions</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Escrow
        </Button>
      </div>

      <div className="grid gap-4">
        {mockEscrows.map((escrow) => {
          const config = statusConfig[escrow.status];
          const StatusIcon = config.icon;

          return (
            <Card key={escrow.id} className="glass-card p-6 hover:shadow-lg transition-smooth">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold">{escrow.description}</h3>
                    <Badge className={`${config.bg} ${config.color} gap-1`}>
                      <StatusIcon className="w-3 h-3" />
                      {config.label}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Escrow ID</div>
                      <div className="font-mono font-semibold">{escrow.id}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Amount</div>
                      <div className="font-semibold text-primary">{escrow.amount.toLocaleString()} PYUSD</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Buyer</div>
                      <div className="font-mono text-xs">{escrow.buyer}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Seller</div>
                      <div className="font-mono text-xs">{escrow.seller}</div>
                    </div>
                  </div>
                </div>

                <Button variant="ghost" size="sm" className="gap-2">
                  Details
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <CreateEscrowDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  );
};
