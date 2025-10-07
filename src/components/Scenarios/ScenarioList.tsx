import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Eye, TrendingUp, Calendar } from "lucide-react";
import { formatCurrency, formatPercentage } from "@/lib/roiCalculations";
import { format } from "date-fns";

interface Scenario {
  id: string;
  scenario_name: string;
  monthly_savings: number;
  roi_percentage: number;
  payback_months: number;
  created_at: string;
}

interface ScenarioListProps {
  scenarios: Scenario[];
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ScenarioList({ scenarios, onView, onDelete }: ScenarioListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
  };

  if (scenarios.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No saved scenarios yet</h3>
          <p className="text-muted-foreground text-center">
            Calculate your first ROI scenario and save it to view it here
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Saved Scenarios</CardTitle>
          <CardDescription>View and manage your ROI calculations</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scenarios.map((scenario) => (
          <Card key={scenario.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-lg">{scenario.scenario_name}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {format(new Date(scenario.created_at), "MMM d, yyyy")}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Monthly Savings</span>
                  <span className="font-semibold text-secondary">
                    {formatCurrency(scenario.monthly_savings)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">ROI</span>
                  <span className="font-semibold text-primary">
                    {formatPercentage(scenario.roi_percentage)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Payback</span>
                  <span className="font-semibold">
                    {scenario.payback_months.toFixed(1)} months
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => onView(scenario.id)}
                  className="flex-1"
                  variant="outline"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button
                  onClick={() => handleDelete(scenario.id)}
                  variant="destructive"
                  size="icon"
                  disabled={deletingId === scenario.id}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
