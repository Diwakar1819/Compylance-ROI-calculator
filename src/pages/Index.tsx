import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, History, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculatorForm } from "@/components/Calculator/CalculatorForm";
import { ResultsDisplay } from "@/components/Calculator/ResultsDisplay";
import { ScenarioList } from "@/components/Scenarios/ScenarioList";
import { calculateROI, ScenarioInput, CalculationResult } from "@/lib/roiCalculations";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const [activeTab, setActiveTab] = useState("calculator");
  const [currentResults, setCurrentResults] = useState<CalculationResult | null>(null);
  const [currentInput, setCurrentInput] = useState<ScenarioInput | null>(null);
  const [scenarios, setScenarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = async () => {
    try {
      const { data, error } = await supabase
        .from("scenarios")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setScenarios(data || []);
    } catch (error) {
      console.error("Error loading scenarios:", error);
      toast.error("Failed to load scenarios");
    }
  };

  const handleCalculate = (input: ScenarioInput) => {
    const results = calculateROI(input);
    setCurrentResults(results);
    setCurrentInput(input);
    // Don't change tab - keep it real-time
  };

  const handleSaveScenario = async () => {
    if (!currentInput || !currentResults) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("scenarios").insert({
        ...currentInput,
        monthly_savings: currentResults.monthly_savings,
        cumulative_savings: currentResults.cumulative_savings,
        net_savings: currentResults.net_savings,
        payback_months: currentResults.payback_months,
        roi_percentage: currentResults.roi_percentage,
      });

      if (error) throw error;

      toast.success("Scenario saved successfully!");
      loadScenarios();
      setActiveTab("scenarios");
    } catch (error) {
      console.error("Error saving scenario:", error);
      toast.error("Failed to save scenario");
    } finally {
      setLoading(false);
    }
  };

  const handleViewScenario = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("scenarios")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      const input: ScenarioInput = {
        scenario_name: data.scenario_name,
        monthly_invoice_volume: data.monthly_invoice_volume,
        num_ap_staff: data.num_ap_staff,
        avg_hours_per_invoice: Number(data.avg_hours_per_invoice),
        hourly_wage: Number(data.hourly_wage),
        error_rate_manual: Number(data.error_rate_manual),
        error_cost: Number(data.error_cost),
        time_horizon_months: data.time_horizon_months,
        one_time_implementation_cost: Number(data.one_time_implementation_cost),
      };

      const results = calculateROI(input);
      setCurrentInput(input);
      setCurrentResults(results);
      setActiveTab("results");
    } catch (error) {
      console.error("Error loading scenario:", error);
      toast.error("Failed to load scenario");
    }
  };

  const handleDeleteScenario = async (id: string) => {
    try {
      const { error } = await supabase.from("scenarios").delete().eq("id", id);

      if (error) throw error;

      toast.success("Scenario deleted successfully");
      loadScenarios();
    } catch (error) {
      console.error("Error deleting scenario:", error);
      toast.error("Failed to delete scenario");
    }
  };

  const handleGenerateReport = () => {
    if (!currentInput || !currentResults) return;

    const reportHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ROI Analysis Report - ${currentInput.scenario_name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #0f1419 0%, #16213e 100%); color: #e0e0e0; padding: 40px 20px; }
    .container { max-width: 1000px; margin: 0 auto; background: #1a2332; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%); padding: 40px; color: white; }
    .header h1 { font-size: 32px; margin-bottom: 8px; }
    .header .date { opacity: 0.9; font-size: 14px; }
    .content { padding: 40px; }
    .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 40px; }
    .metric-card { background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%); padding: 24px; border-radius: 12px; border-left: 4px solid; }
    .metric-card.primary { border-color: #ff6b35; }
    .metric-card.success { border-color: #10b981; }
    .metric-card.accent { border-color: #3dd9de; }
    .metric-card.info { border-color: #06b6d4; }
    .metric-label { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.7; margin-bottom: 8px; }
    .metric-value { font-size: 28px; font-weight: bold; margin-bottom: 4px; }
    .metric-desc { font-size: 13px; opacity: 0.6; }
    .section { margin-bottom: 40px; }
    .section-title { font-size: 20px; margin-bottom: 20px; color: #ff6b35; border-bottom: 2px solid #2d3748; padding-bottom: 8px; }
    .detail-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
    .detail-group { background: #2d3748; padding: 24px; border-radius: 12px; }
    .detail-group h4 { font-size: 16px; margin-bottom: 16px; color: #10b981; }
    .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #374151; }
    .detail-row:last-child { border-bottom: none; }
    .detail-row .label { opacity: 0.7; }
    .detail-row .value { font-weight: 600; }
    .highlight { background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%); padding: 24px; border-radius: 12px; margin: 30px 0; }
    .highlight h3 { margin-bottom: 12px; font-size: 18px; }
    .highlight p { opacity: 0.95; line-height: 1.6; }
    .input-section { background: #2d3748; padding: 24px; border-radius: 12px; margin-bottom: 30px; }
    .input-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; }
    .input-item { padding: 12px; background: #1a202c; border-radius: 8px; }
    .input-item .label { font-size: 12px; opacity: 0.7; margin-bottom: 4px; }
    .input-item .value { font-size: 16px; font-weight: 600; color: #3dd9de; }
    .footer { text-align: center; padding: 30px; background: #1a202c; color: #6b7280; font-size: 14px; }
    @media print { body { background: white; } .container { box-shadow: none; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 ROI Analysis Report</h1>
      <div class="date">Generated on ${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}</div>
      <h2 style="margin-top: 16px; font-size: 24px;">${currentInput.scenario_name}</h2>
    </div>
    
    <div class="content">
      <div class="metrics">
        <div class="metric-card success">
          <div class="metric-label">Monthly Savings</div>
          <div class="metric-value">₹${currentResults.monthly_savings.toLocaleString('en-IN')}</div>
          <div class="metric-desc">Recurring savings every month</div>
        </div>
        <div class="metric-card primary">
          <div class="metric-label">Payback Period</div>
          <div class="metric-value">${currentResults.payback_months.toFixed(1)} mo</div>
          <div class="metric-desc">Time to recover investment</div>
        </div>
        <div class="metric-card accent">
          <div class="metric-label">ROI</div>
          <div class="metric-value">${currentResults.roi_percentage.toFixed(1)}%</div>
          <div class="metric-desc">Return on investment</div>
        </div>
        <div class="metric-card info">
          <div class="metric-label">Net Savings</div>
          <div class="metric-value">₹${currentResults.net_savings.toLocaleString('en-IN')}</div>
          <div class="metric-desc">Total savings over ${currentInput.time_horizon_months} months</div>
        </div>
      </div>

      <div class="highlight">
        <h3>💡 Key Insight</h3>
        <p>By automating invoice processing, you'll save <strong>₹${currentResults.monthly_savings.toLocaleString('en-IN')}</strong> every month and recover your initial investment in just <strong>${currentResults.payback_months.toFixed(1)} months</strong>. Over ${currentInput.time_horizon_months} months, your total net savings will reach <strong>₹${currentResults.net_savings.toLocaleString('en-IN')}</strong>.</p>
      </div>

      <div class="section">
        <h3 class="section-title">Input Parameters</h3>
        <div class="input-section">
          <div class="input-grid">
            <div class="input-item">
              <div class="label">Monthly Invoice Volume</div>
              <div class="value">${currentInput.monthly_invoice_volume.toLocaleString('en-IN')}</div>
            </div>
            <div class="input-item">
              <div class="label">AP Staff</div>
              <div class="value">${currentInput.num_ap_staff}</div>
            </div>
            <div class="input-item">
              <div class="label">Hours per Invoice</div>
              <div class="value">${currentInput.avg_hours_per_invoice}</div>
            </div>
            <div class="input-item">
              <div class="label">Hourly Wage</div>
              <div class="value">₹${currentInput.hourly_wage.toLocaleString('en-IN')}</div>
            </div>
            <div class="input-item">
              <div class="label">Manual Error Rate</div>
              <div class="value">${currentInput.error_rate_manual}%</div>
            </div>
            <div class="input-item">
              <div class="label">Error Cost per Invoice</div>
              <div class="value">₹${currentInput.error_cost.toLocaleString('en-IN')}</div>
            </div>
            <div class="input-item">
              <div class="label">Implementation Cost</div>
              <div class="value">₹${currentInput.one_time_implementation_cost.toLocaleString('en-IN')}</div>
            </div>
            <div class="input-item">
              <div class="label">Time Horizon</div>
              <div class="value">${currentInput.time_horizon_months} months</div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">Detailed Analysis</h3>
        <div class="detail-grid">
          <div class="detail-group">
            <h4>💰 Cost Analysis</h4>
            <div class="detail-row">
              <span class="label">Manual Labor Cost (Monthly)</span>
              <span class="value">₹${currentResults.labor_cost_manual.toLocaleString('en-IN')}</span>
            </div>
            <div class="detail-row">
              <span class="label">Automation Cost (Monthly)</span>
              <span class="value">₹${currentResults.auto_cost.toLocaleString('en-IN')}</span>
            </div>
            <div class="detail-row">
              <span class="label">Error Savings (Monthly)</span>
              <span class="value" style="color: #10b981;">₹${currentResults.error_savings.toLocaleString('en-IN')}</span>
            </div>
            <div class="detail-row" style="background: rgba(255, 107, 53, 0.1); padding: 12px; border-radius: 8px; margin-top: 8px;">
              <span class="label" style="font-weight: 600;">Net Monthly Savings</span>
              <span class="value" style="color: #ff6b35; font-size: 18px;">₹${currentResults.monthly_savings.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div class="detail-group">
            <h4>📈 Performance Metrics</h4>
            <div class="detail-row">
              <span class="label">Time Saved (Monthly)</span>
              <span class="value">${currentResults.time_saved_hours.toFixed(1)} hours</span>
            </div>
            <div class="detail-row">
              <span class="label">Productivity Gain</span>
              <span class="value" style="color: #10b981;">${currentResults.productivity_gain.toFixed(1)}%</span>
            </div>
            <div class="detail-row">
              <span class="label">Break-Even Point</span>
              <span class="value">${currentResults.break_even_point.toFixed(1)} months</span>
            </div>
            <div class="detail-row" style="background: rgba(61, 217, 222, 0.1); padding: 12px; border-radius: 8px; margin-top: 8px;">
              <span class="label" style="font-weight: 600;">Total ROI</span>
              <span class="value" style="color: #3dd9de; font-size: 18px;">${currentResults.roi_percentage.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">Recommendations</h3>
        <div style="background: #2d3748; padding: 24px; border-radius: 12px; line-height: 1.8;">
          <p style="margin-bottom: 12px;">✅ <strong>Strong ROI Case:</strong> With a payback period of ${currentResults.payback_months.toFixed(1)} months, this investment will quickly deliver returns.</p>
          <p style="margin-bottom: 12px;">✅ <strong>Significant Savings:</strong> Monthly savings of ₹${currentResults.monthly_savings.toLocaleString('en-IN')} will compound over time.</p>
          <p style="margin-bottom: 12px;">✅ <strong>Efficiency Gains:</strong> Automation will free up ${currentResults.time_saved_hours.toFixed(1)} hours per month for strategic work.</p>
          <p>✅ <strong>Error Reduction:</strong> Eliminating manual errors will save ₹${currentResults.error_savings.toLocaleString('en-IN')} monthly.</p>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>This report was generated using the ROI Calculator for Invoice Automation</p>
      <p style="margin-top: 8px; opacity: 0.7;">© ${new Date().getFullYear()} - All calculations are estimates based on provided inputs</p>
    </div>
  </div>
</body>
</html>
    `;

    // Create a blob and download link
    const blob = new Blob([reportHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ROI-Report-${currentInput.scenario_name.replace(/[^a-z0-9]/gi, '-')}-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Report downloaded!", {
      description: "Check your downloads folder for the HTML report",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Invoice ROI Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time ROI analysis for invoice automation. Built for Indian businesses with INR currency.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md mx-auto">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Saved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="animate-fade-in-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
              <Card className="shadow-accent border-border/50 transition-all hover:shadow-accent/50 hover:border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    Input Parameters
                  </CardTitle>
                  <CardDescription>
                    Enter your metrics and see real-time ROI calculations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CalculatorForm onCalculate={handleCalculate} initialData={currentInput || undefined} />
                </CardContent>
              </Card>

              <div className="space-y-6">
                {currentResults ? (
                  <ResultsDisplay 
                    results={currentResults}
                    onSave={handleSaveScenario}
                    onDownload={handleGenerateReport}
                  />
                ) : (
                  <Card className="shadow-accent border-border/50 transition-all hover:border-accent/30">
                    <CardContent className="pt-6">
                      <div className="text-center py-12 text-muted-foreground animate-float">
                        <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Enter your data to see real-time ROI analysis</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="animate-fade-in-up">
            <Card className="max-w-6xl mx-auto border-border/50 transition-all hover:border-accent/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5 text-accent" />
                  Saved Scenarios
                </CardTitle>
                <CardDescription>
                  View and manage your previously calculated ROI scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScenarioList 
                  scenarios={scenarios}
                  onView={handleViewScenario}
                  onDelete={handleDeleteScenario}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
