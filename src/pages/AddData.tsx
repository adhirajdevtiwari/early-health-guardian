import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddData = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    heartRate: "",
    systolicBP: "",
    diastolicBP: "",
    bloodSugar: "",
    weight: "",
    temperature: "",
    sleepHours: "",
    exerciseMinutes: "",
    mood: "",
    symptoms: "",
    medications: "",
    notes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock data storage - in real app, this would send to backend
    const existingData = JSON.parse(localStorage.getItem("healthData") || "[]");
    const newEntry = {
      ...formData,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString()
    };
    
    existingData.push(newEntry);
    localStorage.setItem("healthData", JSON.stringify(existingData));
    
    toast({
      title: "Health Data Saved",
      description: "Your health information has been recorded successfully.",
      variant: "default"
    });
    
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">Add Health Data</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Vital Signs */}
          <Card>
            <CardHeader>
              <CardTitle>Vital Signs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                  <Input
                    id="heartRate"
                    type="number"
                    placeholder="72"
                    value={formData.heartRate}
                    onChange={(e) => handleInputChange("heartRate", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="systolicBP">Systolic BP (mmHg)</Label>
                  <Input
                    id="systolicBP"
                    type="number"
                    placeholder="120"
                    value={formData.systolicBP}
                    onChange={(e) => handleInputChange("systolicBP", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="diastolicBP">Diastolic BP (mmHg)</Label>
                  <Input
                    id="diastolicBP"
                    type="number"
                    placeholder="80"
                    value={formData.diastolicBP}
                    onChange={(e) => handleInputChange("diastolicBP", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bloodSugar">Blood Sugar (mg/dL)</Label>
                  <Input
                    id="bloodSugar"
                    type="number"
                    placeholder="95"
                    value={formData.bloodSugar}
                    onChange={(e) => handleInputChange("bloodSugar", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="165"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature (°F)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    placeholder="98.6"
                    value={formData.temperature}
                    onChange={(e) => handleInputChange("temperature", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lifestyle Data */}
          <Card>
            <CardHeader>
              <CardTitle>Lifestyle & Wellness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sleepHours">Sleep Hours</Label>
                  <Input
                    id="sleepHours"
                    type="number"
                    step="0.5"
                    placeholder="8"
                    value={formData.sleepHours}
                    onChange={(e) => handleInputChange("sleepHours", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="exerciseMinutes">Exercise (minutes)</Label>
                  <Input
                    id="exerciseMinutes"
                    type="number"
                    placeholder="30"
                    value={formData.exerciseMinutes}
                    onChange={(e) => handleInputChange("exerciseMinutes", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mood">Mood</Label>
                  <Select value={formData.mood} onValueChange={(value) => handleInputChange("mood", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your mood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                      <SelectItem value="very-poor">Very Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Symptoms & Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Symptoms & Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="symptoms">Current Symptoms</Label>
                <Textarea
                  id="symptoms"
                  placeholder="Describe any symptoms you're experiencing today..."
                  value={formData.symptoms}
                  onChange={(e) => handleInputChange("symptoms", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="medications">Medications Taken</Label>
                <Textarea
                  id="medications"
                  placeholder="List medications taken today..."
                  value={formData.medications}
                  onChange={(e) => handleInputChange("medications", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any other health-related observations..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Save Health Data
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddData;