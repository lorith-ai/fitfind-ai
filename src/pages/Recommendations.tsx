import { useState, useEffect } from "react";
import { ExternalLink, MapPin, DollarSign, Target, Award, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Chip } from "@/components/ui/chip";

interface StudentData {
  name: string;
  email: string;
  degree: string;
  year: string;
  skills: string[];
  sectorPrefs: string[];
  locationPrefs: string[];
}

interface Internship {
  id: number;
  company_id: number;
  title: string;
  sector: string;
  required_skills: string[];
  degree_pref: string[];
  location: string;
  stipend: number;
  internship_id_external: string;
  description: string;
  company_name: string;
  match_score: number;
  match_reasons: string[];
  skills_overlap: string[];
}

const companies = [
  { id: 101, name: "DataBridge Analytics", sector: "Data", hq_location: "Bengaluru" },
  { id: 102, name: "CivicTech Labs", sector: "GovTech", hq_location: "New Delhi" },
  { id: 103, name: "EduReach", sector: "EdTech", hq_location: "Chennai" },
  { id: 104, name: "GreenRoots", sector: "Sustainability", hq_location: "Pune" },
  { id: 105, name: "HealthFirst", sector: "HealthTech", hq_location: "Hyderabad" },
  { id: 106, name: "SkillSpark", sector: "Skilling", hq_location: "Mumbai" }
];

const internships = [
  { id: 201, company_id: 101, title: "Data Intern", sector: "Data", required_skills: ["Python", "Pandas", "Excel"], degree_pref: ["B.Sc CS", "BCA", "B.Tech CSE"], location: "Bengaluru", stipend: 8000, internship_id_external: "PM-DB-001", description: "Assist in data cleaning and basic dashboards." },
  { id: 202, company_id: 101, title: "BI Intern", sector: "Data", required_skills: ["SQL", "PowerBI"], degree_pref: ["B.Com", "BBA", "B.Tech"], location: "Remote", stipend: 6000, internship_id_external: "PM-DB-002", description: "Create simple BI reports and ETL checks." },
  { id: 203, company_id: 102, title: "Frontend Intern", sector: "GovTech", required_skills: ["HTML", "CSS", "JavaScript"], degree_pref: ["Any"], location: "New Delhi", stipend: 7000, internship_id_external: "PM-CTL-003", description: "Landing pages and public info UI." },
  { id: 204, company_id: 103, title: "React Intern", sector: "EdTech", required_skills: ["React", "Testing"], degree_pref: ["B.Tech", "BCA"], location: "Chennai", stipend: 9000, internship_id_external: "PM-EDU-004", description: "React components, write basic tests." },
  { id: 205, company_id: 103, title: "Content & Social Intern", sector: "EdTech", required_skills: ["Canva", "Excel", "Social Media"], degree_pref: ["BA", "BBA"], location: "Remote", stipend: 5000, internship_id_external: "PM-EDU-005", description: "Posts, calendars, basic analytics." },
  { id: 206, company_id: 104, title: "GIS Intern", sector: "Sustainability", required_skills: ["GIS", "QGIS", "Excel"], degree_pref: ["B.Sc Geo", "Any"], location: "Pune", stipend: 8500, internship_id_external: "PM-GR-006", description: "Map layers and field survey plots." },
  { id: 207, company_id: 105, title: "Java Intern", sector: "HealthTech", required_skills: ["Java", "Spring Basics"], degree_pref: ["B.Tech CSE", "BCA"], location: "Hyderabad", stipend: 10000, internship_id_external: "PM-HF-007", description: "APIs and unit tests." },
  { id: 208, company_id: 105, title: "NLP Intern", sector: "HealthTech", required_skills: ["Python", "NLP"], degree_pref: ["Any"], location: "Remote", stipend: 8000, internship_id_external: "PM-HF-008", description: "Text classification experiments." },
  { id: 209, company_id: 106, title: "Testing Intern", sector: "Skilling", required_skills: ["Testing", "Jest", "Cypress"], degree_pref: ["Any"], location: "Mumbai", stipend: 7000, internship_id_external: "PM-SS-009", description: "Regression suites for UI." },
  { id: 210, company_id: 102, title: "C++ Intern", sector: "GovTech", required_skills: ["C++", "DSA", "OOP"], degree_pref: ["B.Tech CSE"], location: "New Delhi", stipend: 10000, internship_id_external: "PM-CTL-010", description: "Algorithmic utilities and performance checks." },
  { id: 211, company_id: 103, title: "SQL & ETL Intern", sector: "EdTech", required_skills: ["SQL", "ETL"], degree_pref: ["Any"], location: "Chennai", stipend: 7500, internship_id_external: "PM-EDU-011", description: "Data pipelines and quality checks." },
  { id: 212, company_id: 104, title: "Web Intern", sector: "Sustainability", required_skills: ["HTML", "CSS", "JavaScript"], degree_pref: ["Any"], location: "Pune", stipend: 6500, internship_id_external: "PM-GR-012", description: "Public site updates and forms." }
];

export default function Recommendations() {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [recommendations, setRecommendations] = useState<Internship[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("studentData");
    if (stored) {
      const data = JSON.parse(stored);
      setStudentData(data);
      generateRecommendations(data);
    }
  }, []);

  const generateRecommendations = (student: StudentData) => {
    const scoredInternships = internships.map(internship => {
      const company = companies.find(c => c.id === internship.company_id)!;
      
      let ruleScore = 0;
      const reasons: string[] = [];
      const skillsOverlap: string[] = [];
      
      // Degree match (25 points)
      if (internship.degree_pref.includes(student.degree) || internship.degree_pref.includes("Any")) {
        ruleScore += 25;
        reasons.push("degree_fit");
      }
      
      // Skills overlap (35 points)
      const overlap = student.skills.filter(skill => 
        internship.required_skills.includes(skill)
      );
      skillsOverlap.push(...overlap);
      
      if (overlap.length > 0) {
        const overlapRatio = overlap.length / internship.required_skills.length;
        if (overlapRatio >= 0.4) {
          ruleScore += 35;
          reasons.push("skills_overlap");
        } else if (overlapRatio >= 0.2) {
          ruleScore += 20;
          reasons.push("partial_skills");
        }
      }
      
      // Location match (20 points)
      if (student.locationPrefs.includes(internship.location)) {
        ruleScore += 20;
        reasons.push("location_fit");
      }
      
      // Sector match (10 points)
      if (student.sectorPrefs.includes(internship.sector)) {
        ruleScore += 10;
        reasons.push("sector_fit");
      }
      
      // Verified certificate bonus (10 points)
      // This would check verified certificates in real implementation
      if (skillsOverlap.length > 0) {
        ruleScore += 10;
        reasons.push("verified_skills");
      }
      
      return {
        ...internship,
        company_name: company.name,
        match_score: Math.min(ruleScore, 100),
        match_reasons: reasons,
        skills_overlap: skillsOverlap
      };
    });

    // Sort by score and take top 5
    const topRecommendations = scoredInternships
      .sort((a, b) => b.match_score - a.match_score)
      .slice(0, 5);
      
    setRecommendations(topRecommendations);
  };

  const getMatchColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-muted-foreground";
  };

  const formatReasons = (reasons: string[]) => {
    const reasonMap: Record<string, string> = {
      degree_fit: "Degree match",
      skills_overlap: "Strong skills match", 
      partial_skills: "Some skills match",
      location_fit: "Preferred location",
      sector_fit: "Preferred sector",
      verified_skills: "Verified certificates"
    };
    
    return reasons.map(r => reasonMap[r] || r).join(" • ");
  };

  if (!studentData) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <Card className="max-w-md w-full text-center p-8">
          <Target className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold mb-2">No Profile Found</h2>
          <p className="text-muted-foreground mb-4">
            Please complete your profile first to get recommendations.
          </p>
          <Button onClick={() => window.location.href = "/student"}>
            Create Profile
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Your Recommendations</h1>
          <p className="text-muted-foreground">Personalized internship matches for {studentData.name}</p>
        </header>

        {/* Profile Summary */}
        <Card className="shadow-card bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Award className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold">{studentData.name}</h3>
                <p className="text-sm text-muted-foreground">{studentData.degree} • {studentData.year}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {studentData.skills.slice(0, 5).map(skill => (
                <Chip key={skill} label={skill} size="sm" />
              ))}
              {studentData.skills.length > 5 && (
                <Chip label={`+${studentData.skills.length - 5} more`} size="sm" />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <div className="space-y-4">
          {recommendations.map((internship, index) => (
            <Card key={internship.id} className="shadow-card hover:shadow-glow transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{internship.title}</CardTitle>
                    <p className="text-muted-foreground">{internship.company_name}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getMatchColor(internship.match_score)}`}>
                      {internship.match_score}%
                    </div>
                    <p className="text-xs text-muted-foreground">match</p>
                  </div>
                </div>
                
                <Progress value={internship.match_score} className="h-2" />
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{internship.description}</p>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>{internship.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-success" />
                    <span>₹{internship.stipend.toLocaleString()}/mo</span>
                  </div>
                </div>

                {internship.skills_overlap.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Matching Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {internship.skills_overlap.map(skill => (
                        <Chip key={skill} label={skill} size="sm" variant="success" />
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-xs text-muted-foreground">
                  <strong>Why it fits:</strong> {formatReasons(internship.match_reasons)}
                </div>

                <Button className="w-full shadow-button" asChild>
                  <a 
                    href={`/apply?internship_id=${internship.internship_id_external}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Briefcase className="w-4 h-4" />
                    Apply on PM Portal
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {recommendations.length === 0 && (
          <Card className="text-center p-8">
            <Target className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Recommendations Yet</h3>
            <p className="text-muted-foreground">
              Update your profile with more skills and preferences to get better matches.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}