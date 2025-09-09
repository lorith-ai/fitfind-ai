import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Upload, User, BookOpen, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Chip } from "@/components/ui/chip";
import { useToast } from "@/hooks/use-toast";

const skills = [
  "Python", "JavaScript", "React", "Java", "SQL", "HTML", "CSS", "Excel",
  "PowerBI", "Pandas", "C++", "Spring", "Testing", "Jest", "Cypress",
  "NLP", "GIS", "QGIS", "Canva", "Social Media", "ETL", "DSA", "OOP"
];

const sectors = [
  "Data", "GovTech", "EdTech", "HealthTech", "Sustainability", "Skilling"
];

const locations = [
  "Bengaluru", "New Delhi", "Chennai", "Mumbai", "Hyderabad", "Pune", "Remote"
];

const degrees = [
  "B.Tech CSE", "B.Sc CS", "BCA", "B.Tech", "B.Com", "BBA", "BA", "B.Sc Geo", "Any"
];

export default function Student() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    degree: "",
    year: "",
    skills: [] as string[],
    sectorPrefs: [] as string[],
    locationPrefs: [] as string[]
  });

  const [skillInput, setSkillInput] = useState("");

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({ 
      ...prev, 
      skills: prev.skills.filter(s => s !== skill) 
    }));
  };

  const toggleSector = (sector: string) => {
    setFormData(prev => ({
      ...prev,
      sectorPrefs: prev.sectorPrefs.includes(sector)
        ? prev.sectorPrefs.filter(s => s !== sector)
        : [...prev.sectorPrefs, sector]
    }));
  };

  const toggleLocation = (location: string) => {
    setFormData(prev => ({
      ...prev,
      locationPrefs: prev.locationPrefs.includes(location)
        ? prev.locationPrefs.filter(l => l !== location)
        : [...prev.locationPrefs, location]
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.degree || !formData.year) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Store student data in localStorage for demo
    localStorage.setItem("studentData", JSON.stringify(formData));
    
    toast({
      title: "Profile Saved!",
      description: "Your profile has been saved successfully"
    });
    
    navigate("/recommendations");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Your Profile</h1>
          <p className="text-muted-foreground">Tell us about yourself to get personalized recommendations</p>
        </header>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@example.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Degree *</Label>
                <Select value={formData.degree} onValueChange={(value) => setFormData(prev => ({ ...prev, degree: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {degrees.map(degree => (
                      <SelectItem key={degree} value={degree}>{degree}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                  placeholder="2024"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" />
              Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="skills">Add Skills</Label>
              <div className="flex gap-2">
                <Input
                  id="skills"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Type a skill..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill(skillInput);
                    }
                  }}
                />
                <Button onClick={() => addSkill(skillInput)} disabled={!skillInput}>
                  Add
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <button
                  key={skill}
                  onClick={() => addSkill(skill)}
                  className="px-3 py-1 text-sm bg-muted hover:bg-accent hover:text-accent-foreground rounded-full transition-colors"
                  disabled={formData.skills.includes(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>

            {formData.skills.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Skills:</Label>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map(skill => (
                    <Chip
                      key={skill}
                      label={skill}
                      onRemove={() => removeSkill(skill)}
                      variant="success"
                    />
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Preferred Sectors</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {sectors.map(sector => (
                  <button
                    key={sector}
                    onClick={() => toggleSector(sector)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                      formData.sectorPrefs.includes(sector)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background border-border hover:bg-muted'
                    }`}
                  >
                    {sector}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label>Preferred Locations</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {locations.map(location => (
                  <button
                    key={location}
                    onClick={() => toggleLocation(location)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                      formData.locationPrefs.includes(location)
                        ? 'bg-accent text-accent-foreground border-accent'
                        : 'bg-background border-border hover:bg-muted'
                    }`}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button onClick={handleSave} className="flex-1 shadow-button">
            Save & See Recommendations <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/certificates")}
            className="px-6"
          >
            <Upload className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}