import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, BarChart3, IndianRupee } from "lucide-react";
import { CalculatorForm } from "@/components/Calculator/CalculatorForm";
import { ResultsDisplay } from "@/components/Calculator/ResultsDisplay";
import { ScenarioList } from "@/components/Scenarios/ScenarioList";
import { ReportModal } from "@/components/Reports/ReportModal";
import { calculateROI, ScenarioInput, CalculationResult } from "@/lib/roiCalculations";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const [activeTab, setActiveTab] = useState("calculator");
  const [currentResults, setCurrentResults] = useState<CalculationResult | null>(null);
  const [currentInput, setCurrentInput] = useState<ScenarioInput | null>(null);
  const [scenarios, setScenarios] = useState<any[]>([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
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
    setActiveTab("results");
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

  const handleGenerateReport = async (email: string) => {
    if (!currentInput || !currentResults) return;

    try {
      // First save the scenario if not already saved
      const { data: scenarioData, error: scenarioError } = await supabase
        .from("scenarios")
        .insert({
          ...currentInput,
          monthly_savings: currentResults.monthly_savings,
          cumulative_savings: currentResults.cumulative_savings,
          net_savings: currentResults.net_savings,
          payback_months: currentResults.payback_months,
          roi_percentage: currentResults.roi_percentage,
        })
        .select()
        .single();

      if (scenarioError) throw scenarioError;

      // Record the report download
      const { error: reportError } = await supabase.from("reports").insert({
        scenario_id: scenarioData.id,
        email: email,
      });

      if (reportError) throw reportError;

      // In a real implementation, this would trigger a backend function to generate and email the PDF
      // For now, we'll just show a success message
      toast.success("Report request received!", {
        description: "Your detailed ROI report will be emailed to you shortly.",
      });
    } catch (error) {
      console.error("Error generating report:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <IndianRupee className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  ROI Calculator
                </h1>
                <p className="text-sm text-muted-foreground">
                  Invoicing Automation for Indian Businesses
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="calculator" className="gap-2">
              <Calculator className="h-4 w-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="results" className="gap-2" disabled={!currentResults}>
              <BarChart3 className="h-4 w-4" />
              Results
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="gap-2">
              <IndianRupee className="h-4 w-4" />
              Saved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="max-w-4xl mx-auto">
            <CalculatorForm onCalculate={handleCalculate} initialData={currentInput || undefined} />
          </TabsContent>

          <TabsContent value="results">
            {currentResults && (
              <div className="max-w-7xl mx-auto">
                <ResultsDisplay
                  results={currentResults}
                  onSave={handleSaveScenario}
                  onDownload={() => setIsReportModalOpen(true)}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="scenarios">
            <div className="max-w-7xl mx-auto">
              <ScenarioList
                scenarios={scenarios}
                onView={handleViewScenario}
                onDelete={handleDeleteScenario}
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Report Modal */}
      {currentInput && (
        <ReportModal
          open={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          onSubmit={handleGenerateReport}
          scenarioName={currentInput.scenario_name}
        />
      )}
    </div>
  );
};

export default Index;
