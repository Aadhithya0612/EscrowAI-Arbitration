import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, File, Image, ExternalLink, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Evidence {
  id: string;
  type: "document" | "image" | "link";
  name: string;
  uploadedBy: "buyer" | "seller";
  verified: boolean;
  ipfsHash?: string;
}

const mockEvidence: Evidence[] = [
  {
    id: "EV-001",
    type: "document",
    name: "contract_agreement.pdf",
    uploadedBy: "buyer",
    verified: true,
    ipfsHash: "Qm...abc123",
  },
  {
    id: "EV-002",
    type: "image",
    name: "feature_screenshot.png",
    uploadedBy: "seller",
    verified: true,
    ipfsHash: "Qm...def456",
  },
  {
    id: "EV-003",
    type: "link",
    name: "demo_deployment_link",
    uploadedBy: "seller",
    verified: false,
  },
];

export const EvidenceUploader = () => {
  const [evidence] = useState<Evidence[]>(mockEvidence);

  const handleUpload = () => {
    toast.success("Evidence uploaded to IPFS", {
      description: "Hash: Qm...xyz789",
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "document":
        return File;
      case "image":
        return Image;
      case "link":
        return ExternalLink;
      default:
        return File;
    }
  };

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Evidence Vault</h3>
        <Button onClick={handleUpload} className="gap-2">
          <Upload className="w-4 h-4" />
          Upload Evidence
        </Button>
      </div>

      <div className="space-y-3">
        {evidence.map((item) => {
          const Icon = getIcon(item.type);

          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-smooth animate-slide-in"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="w-5 h-5 text-primary" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{item.name}</p>
                    {item.verified && <CheckCircle className="w-4 h-4 text-success" />}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {item.uploadedBy === "buyer" ? "Buyer" : "Seller"}
                    </Badge>
                    {item.ipfsHash && (
                      <span className="text-xs text-muted-foreground font-mono">{item.ipfsHash}</span>
                    )}
                  </div>
                </div>
              </div>

              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <p className="text-sm text-muted-foreground">
          📦 All evidence is stored on IPFS for immutability and verified on-chain for authenticity
        </p>
      </div>
    </Card>
  );
};
