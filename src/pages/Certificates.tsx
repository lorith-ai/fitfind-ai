import { useState } from "react";
import { Upload, FileText, Shield, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Chip } from "@/components/ui/chip";

const providers = [
  "Coursera", "Google", "LinkedIn Learning", "NPTEL", "Udemy", "Other"
];

const seedCredentials = [
  { provider: "Coursera", credential_id: "COU-9TZ3KQ-1AB2", skill_tags: ["Python", "Pandas"] },
  { provider: "Google", credential_id: "GGL-ML9X7Q", skill_tags: ["ML", "Python"] },
  { provider: "LinkedIn Learning", credential_id: "LIL-4D7QZ8", skill_tags: ["Excel", "Dashboards"] },
  { provider: "NPTEL", credential_id: "NPTEL-CS101-2024", skill_tags: ["Java", "Data Structures"] },
  { provider: "Udemy", credential_id: "UDM-TEST-1234", skill_tags: ["React", "Testing"] }
];

interface Certificate {
  id: string;
  provider: string;
  credential_id: string;
  status: "verified" | "not_found" | "manual_review";
  skill_tags?: string[];
  uploaded_at: string;
}

export default function Certificates() {
  const { toast } = useToast();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [formData, setFormData] = useState({
    provider: "",
    credential_id: "",
    verification_url: ""
  });

  const validateCredentialId = (id: string): boolean => {
    const regex = /^([A-Z]{2,10}-)?[A-Z0-9]{6,10}(-[A-Z0-9]{4,6})?$/;
    return regex.test(id);
  };

  const verifyCredential = () => {
    if (!formData.credential_id || !formData.provider) {
      toast({
        title: "Missing Information",
        description: "Please provide both provider and credential ID",
        variant: "destructive"
      });
      return;
    }

    if (!validateCredentialId(formData.credential_id)) {
      toast({
        title: "Invalid Format",
        description: "Credential ID format is invalid",
        variant: "destructive"
      });
      return;
    }

    // Check against seed credentials
    const foundCredential = seedCredentials.find(
      cred => cred.credential_id === formData.credential_id
    );

    let status: "verified" | "not_found" | "manual_review" = "not_found";
    let skill_tags: string[] = [];

    if (foundCredential) {
      status = "verified";
      skill_tags = foundCredential.skill_tags;
    } else if (formData.verification_url) {
      status = "manual_review";
    }

    const newCertificate: Certificate = {
      id: Date.now().toString(),
      provider: formData.provider,
      credential_id: formData.credential_id,
      status,
      skill_tags,
      uploaded_at: new Date().toISOString()
    };

    setCertificates(prev => [...prev, newCertificate]);
    
    const statusMessages = {
      verified: "Certificate verified successfully!",
      manual_review: "Certificate submitted for manual review",
      not_found: "Certificate not found in our database"
    };

    toast({
      title: status === "verified" ? "Verified!" : status === "manual_review" ? "Under Review" : "Not Found",
      description: statusMessages[status],
      variant: status === "verified" ? "default" : "destructive"
    });

    setFormData({ provider: "", credential_id: "", verification_url: "" });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "manual_review":
        return <Clock className="w-5 h-5 text-warning" />;
      case "not_found":
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Certificates</h1>
          <p className="text-muted-foreground">Upload and verify your certificates</p>
        </header>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Verify Certificate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Provider *</Label>
              <Select value={formData.provider} onValueChange={(value) => setFormData(prev => ({ ...prev, provider: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  {providers.map(provider => (
                    <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="credential_id">Credential ID *</Label>
              <Input
                id="credential_id"
                value={formData.credential_id}
                onChange={(e) => setFormData(prev => ({ ...prev, credential_id: e.target.value.toUpperCase() }))}
                placeholder="e.g., COU-9TZ3KQ-1AB2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Format: [PREFIX-]XXXXXX[-XXXX] (letters and numbers)
              </p>
            </div>

            <div>
              <Label htmlFor="verification_url">Verification URL (Optional)</Label>
              <Input
                id="verification_url"
                value={formData.verification_url}
                onChange={(e) => setFormData(prev => ({ ...prev, verification_url: e.target.value }))}
                placeholder="https://..."
              />
            </div>

            <Button onClick={verifyCredential} className="w-full shadow-button">
              <Shield className="w-4 h-4 mr-2" />
              Verify Now
            </Button>
          </CardContent>
        </Card>

        {/* File Upload Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-accent" />
              Upload Certificate File
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag & drop your certificate or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supports PDF, JPG, PNG (max 5MB)
              </p>
              <Button variant="outline" className="mt-3">
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Verified Certificates */}
        {certificates.length > 0 && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Your Certificates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {certificates.map(cert => (
                <div key={cert.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(cert.status)}
                      <span className="font-medium text-sm">{cert.provider}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{cert.credential_id}</p>
                    {cert.skill_tags && cert.skill_tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {cert.skill_tags.map(skill => (
                          <Chip key={skill} label={skill} size="sm" variant="success" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Sample Credentials for Testing */}
        <Card className="shadow-card border-accent/20 bg-accent/5">
          <CardHeader>
            <CardTitle className="text-sm text-accent">Test Credentials</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-3">
              Try these sample credential IDs for testing:
            </p>
            <div className="space-y-2">
              {seedCredentials.map(cred => (
                <div key={cred.credential_id} className="flex justify-between items-center text-xs">
                  <span className="font-mono">{cred.credential_id}</span>
                  <div className="flex gap-1">
                    {cred.skill_tags.map(skill => (
                      <Chip key={skill} label={skill} size="sm" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}