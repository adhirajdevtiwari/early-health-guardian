import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Activity, 
  Thermometer, 
  User, 
  Plus, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  LogOut
} from "lucide-react";
import { HealthChart } from "@/components/HealthChart";
import { RiskIndicator } from "@/components/RiskIndicator";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  // Mock health data
  const vitals = {
    heartRate: 72,
    bloodPressure: "120/80",
    temperature: 98.6,
    weight: 165,
    bloodSugar: 95,
    lastUpdated: "2 hours ago"
  };

  const riskScores = {
    diabetes: 25,
    heartDisease: 40,
    alzheimer: 15
  };

  const recentReadings = [
    { date: "2024-01-08", heartRate: 72, bp: "120/80", sugar: 95 },
    { date: "2024-01-07", heartRate: 75, bp: "118/78", sugar: 92 },
    { date: "2024-01-06", heartRate: 70, bp: "122/82", sugar: 98 },
    { date: "2024-01-05", heartRate: 73, bp: "119/79", sugar: 94 },
    { date: "2024-01-04", heartRate: 74, bp: "121/81", sugar: 96 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">EarlyDiseaseAI</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user.name}
            </span>
            <Badge variant={user.userType === "patient" ? "default" : "secondary"}>
              {user.userType}
            </Badge>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Current Vitals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                  <Heart className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{vitals.heartRate}</div>
                  <p className="text-xs text-muted-foreground">bpm</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
                  <Activity className="h-4 w-4 text-info" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{vitals.bloodPressure}</div>
                  <p className="text-xs text-muted-foreground">mmHg</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blood Sugar</CardTitle>
                  <Thermometer className="h-4 w-4 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{vitals.bloodSugar}</div>
                  <p className="text-xs text-muted-foreground">mg/dL</p>
                </CardContent>
              </Card>
            </div>

            {/* Health Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Health Trends (Last 5 Days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <HealthChart data={recentReadings} />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center gap-2"
                    onClick={() => navigate("/add-data")}
                  >
                    <Plus className="h-6 w-6" />
                    Add Health Data
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center gap-2"
                    onClick={() => navigate("/symptoms")}
                  >
                    <User className="h-6 w-6" />
                    Log Symptoms
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center gap-2"
                    onClick={() => navigate("/reports")}
                  >
                    <Calendar className="h-6 w-6" />
                    View Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* AI Risk Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  AI Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RiskIndicator 
                  disease="Diabetes" 
                  risk={riskScores.diabetes} 
                  color="warning"
                />
                <RiskIndicator 
                  disease="Heart Disease" 
                  risk={riskScores.heartDisease} 
                  color="destructive"
                />
                <RiskIndicator 
                  disease="Alzheimer's" 
                  risk={riskScores.alzheimer} 
                  color="success"
                />
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Blood pressure recorded</span>
                    <span className="text-muted-foreground">{vitals.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily medication taken</span>
                    <span className="text-muted-foreground">8 hours ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Exercise logged</span>
                    <span className="text-muted-foreground">1 day ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Health Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Stay hydrated! Aim for 8 glasses of water daily to support heart health and maintain optimal blood pressure.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;