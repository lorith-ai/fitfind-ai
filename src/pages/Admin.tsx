import { useState } from "react";
import { Database, RefreshCw, Users, Building, Briefcase, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const seedData = {
  students: [
    { id: 1, student_name: "Ananya S", top_skills: ["Python", "Pandas", "Excel"], text: "B.Sc. CS, data cleaning, dashboards, internship in NGO data." },
    { id: 2, student_name: "Rohit K", top_skills: ["C++", "DSA", "OOP"], text: "B.Tech CSE, coding club, coding contests, problem-solving." },
    { id: 3, student_name: "Meera T", top_skills: ["HTML", "CSS", "JavaScript"], text: "Frontend basics, Figma-to-HTML, small NGO website." },
    { id: 4, student_name: "Irfan A", top_skills: ["SQL", "PowerBI", "ETL"], text: "Data pipelines, simple BI reports for small business." },
    { id: 5, student_name: "Kavya N", top_skills: ["Java", "Spring Basics"], text: "REST basics, college project: library API." },
    { id: 6, student_name: "Sanjay P", top_skills: ["Python", "NLP"], text: "Text cleaning, simple chatbot using rules." },
    { id: 7, student_name: "Divya R", top_skills: ["Canva", "Excel", "Social Media"], text: "Content posts, basic analytics, campaign calendars." },
    { id: 8, student_name: "Arun M", top_skills: ["Testing", "Jest", "Cypress"], text: "Wrote test cases, UI regression tests." },
    { id: 9, student_name: "Priya L", top_skills: ["React", "Node Basics"], text: "Simple MERN to-do app, deployments on free tier." },
    { id: 10, student_name: "Vikas G", top_skills: ["GIS", "QGIS", "Excel"], text: "Map layers, plotted points for field survey." }
  ],
  companies: [
    { id: 101, name: "DataBridge Analytics", sector: "Data", hq_location: "Bengaluru", website: "https://databridge.example" },
    { id: 102, name: "CivicTech Labs", sector: "GovTech", hq_location: "New Delhi", website: "https://civictech.example" },
    { id: 103, name: "EduReach", sector: "EdTech", hq_location: "Chennai", website: "https://edureach.example" },
    { id: 104, name: "GreenRoots", sector: "Sustainability", hq_location: "Pune", website: "https://greenroots.example" },
    { id: 105, name: "HealthFirst", sector: "HealthTech", hq_location: "Hyderabad", website: "https://healthfirst.example" },
    { id: 106, name: "SkillSpark", sector: "Skilling", hq_location: "Mumbai", website: "https://skillspark.example" }
  ],
  internships: [
    { id: 201, company_id: 101, title: "Data Intern", sector: "Data", required_skills: ["Python", "Pandas", "Excel"], location: "Bengaluru", stipend: 8000 },
    { id: 202, company_id: 101, title: "BI Intern", sector: "Data", required_skills: ["SQL", "PowerBI"], location: "Remote", stipend: 6000 },
    { id: 203, company_id: 102, title: "Frontend Intern", sector: "GovTech", required_skills: ["HTML", "CSS", "JavaScript"], location: "New Delhi", stipend: 7000 },
    { id: 204, company_id: 103, title: "React Intern", sector: "EdTech", required_skills: ["React", "Testing"], location: "Chennai", stipend: 9000 },
    { id: 205, company_id: 103, title: "Content & Social Intern", sector: "EdTech", required_skills: ["Canva", "Excel", "Social Media"], location: "Remote", stipend: 5000 },
    { id: 206, company_id: 104, title: "GIS Intern", sector: "Sustainability", required_skills: ["GIS", "QGIS", "Excel"], location: "Pune", stipend: 8500 },
    { id: 207, company_id: 105, title: "Java Intern", sector: "HealthTech", required_skills: ["Java", "Spring Basics"], location: "Hyderabad", stipend: 10000 },
    { id: 208, company_id: 105, title: "NLP Intern", sector: "HealthTech", required_skills: ["Python", "NLP"], location: "Remote", stipend: 8000 },
    { id: 209, company_id: 106, title: "Testing Intern", sector: "Skilling", required_skills: ["Testing", "Jest", "Cypress"], location: "Mumbai", stipend: 7000 },
    { id: 210, company_id: 102, title: "C++ Intern", sector: "GovTech", required_skills: ["C++", "DSA", "OOP"], location: "New Delhi", stipend: 10000 },
    { id: 211, company_id: 103, title: "SQL & ETL Intern", sector: "EdTech", required_skills: ["SQL", "ETL"], location: "Chennai", stipend: 7500 },
    { id: 212, company_id: 104, title: "Web Intern", sector: "Sustainability", required_skills: ["HTML", "CSS", "JavaScript"], location: "Pune", stipend: 6500 }
  ],
  credentials: [
    { provider: "Coursera", credential_id: "COU-9TZ3KQ-1AB2", skill_tags: ["Python", "Pandas"] },
    { provider: "Google", credential_id: "GGL-ML9X7Q", skill_tags: ["ML", "Python"] },
    { provider: "LinkedIn Learning", credential_id: "LIL-4D7QZ8", skill_tags: ["Excel", "Dashboards"] },
    { provider: "NPTEL", credential_id: "NPTEL-CS101-2024", skill_tags: ["Java", "Data Structures"] },
    { provider: "Udemy", credential_id: "UDM-TEST-1234", skill_tags: ["React", "Testing"] }
  ]
};

export default function Admin() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'companies' | 'internships' | 'credentials'>('overview');
  const [isReindexing, setIsReindexing] = useState(false);

  const handleReindex = async () => {
    setIsReindexing(true);
    
    // Simulate reindexing process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Reindex Complete",
      description: "FAISS index has been rebuilt successfully"
    });
    
    setIsReindexing(false);
  };

  const stats = {
    students: seedData.students.length,
    companies: seedData.companies.length,
    internships: seedData.internships.length,
    credentials: seedData.credentials.length
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage seed data and system operations</p>
        </header>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto text-primary mb-2" />
              <div className="text-2xl font-bold">{stats.students}</div>
              <div className="text-sm text-muted-foreground">Students</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <Building className="w-8 h-8 mx-auto text-accent mb-2" />
              <div className="text-2xl font-bold">{stats.companies}</div>
              <div className="text-sm text-muted-foreground">Companies</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <Briefcase className="w-8 h-8 mx-auto text-success mb-2" />
              <div className="text-2xl font-bold">{stats.internships}</div>
              <div className="text-sm text-muted-foreground">Internships</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <Award className="w-8 h-8 mx-auto text-warning mb-2" />
              <div className="text-2xl font-bold">{stats.credentials}</div>
              <div className="text-sm text-muted-foreground">Credentials</div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              System Operations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button 
                onClick={handleReindex} 
                disabled={isReindexing}
                className="shadow-button"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isReindexing ? 'animate-spin' : ''}`} />
                {isReindexing ? 'Reindexing...' : 'Rebuild FAISS Index'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {['overview', 'students', 'companies', 'internships', 'credentials'].map(tab => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab(tab as any)}
              className="capitalize whitespace-nowrap"
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="capitalize">{activeTab} Data</CardTitle>
          </CardHeader>
          <CardContent className="max-h-96 overflow-y-auto">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  This is the admin panel for the Right-Fit Internships prototype. 
                  Here you can view all seed data and perform system operations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Recent Activity</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• System initialized with seed data</li>
                      <li>• FAISS index built successfully</li>
                      <li>• Ready for student recommendations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">System Status</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Database</span>
                        <Badge variant="default" className="bg-success text-white">Active</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>RAG Engine</span>
                        <Badge variant="default" className="bg-success text-white">Ready</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Certificate Verification</span>
                        <Badge variant="default" className="bg-success text-white">Online</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'students' && (
              <div className="space-y-3">
                {seedData.students.map(student => (
                  <div key={student.id} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{student.student_name}</h4>
                      <Badge variant="outline">ID: {student.id}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {student.top_skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{student.text}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'companies' && (
              <div className="space-y-3">
                {seedData.companies.map(company => (
                  <div key={company.id} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{company.name}</h4>
                      <Badge variant="outline">ID: {company.id}</Badge>
                    </div>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span>Sector: {company.sector}</span>
                      <span>•</span>
                      <span>Location: {company.hq_location}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'internships' && (
              <div className="space-y-3">
                {seedData.internships.map(internship => (
                  <div key={internship.id} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{internship.title}</h4>
                      <Badge variant="outline">₹{internship.stipend.toLocaleString()}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {internship.required_skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span>{internship.sector}</span>
                      <span>•</span>
                      <span>{internship.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'credentials' && (
              <div className="space-y-3">
                {seedData.credentials.map((cred, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{cred.provider}</h4>
                      <Badge variant="outline" className="font-mono text-xs">{cred.credential_id}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {cred.skill_tags.map(skill => (
                        <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}