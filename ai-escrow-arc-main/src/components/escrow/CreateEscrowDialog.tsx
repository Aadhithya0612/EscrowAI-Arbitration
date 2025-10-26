import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Shield } from "lucide-react";
import { toast } from "sonner";

interface CreateEscrowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateEscrowDialog = ({ open, onOpenChange }: CreateEscrowDialogProps) => {
  const [formData, setFormData] = useState({
    seller: "",
    amount: "",
    description: "",
  });

  const handleCreate = () => {
    if (!formData.seller || !formData.amount || !formData.description) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success("Escrow created successfully!", {
      description: "Transaction submitted to blockchain",
    });
    onOpenChange(false);
    setFormData({ seller: "", amount: "", description: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-primary/20">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <DialogTitle>Create New Escrow</DialogTitle>
          </div>
          <DialogDescription>
            Lock PYUSD tokens in a trustless escrow protected by AI arbitration
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="seller">Seller Address</Label>
            <Input
              id="seller"
              placeholder="0x..."
              className="font-mono"
              value={formData.seller}
              onChange={(e) => setFormData({ ...formData, seller: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (PYUSD)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What is this escrow for?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-sm">
            <p className="text-muted-foreground">
              🤖 This escrow is protected by AI arbitration. Any disputes will be resolved using MeTTa reasoning and GPT-4 analysis.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleCreate} className="flex-1 gap-2">
            <Shield className="w-4 h-4" />
            Create Escrow
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
