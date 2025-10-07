import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, DollarSign, Target, Download, Save } from "lucide-react";
import { CalculationResult } from "@/lib/roiCalculations";
import { formatCurrency, formatNumber, formatPercentage } from "@/lib/roiCalculations";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";

interface ResultsDisplayProps {
  results: CalculationResult;
  onSave?: () => void;
  onDownload?: () => void;
}

export function ResultsDisplay({ results, onSave, onDownload }: ResultsDisplayProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-success text-secondary-foreground shadow-success">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Monthly Savings</CardTitle>
              <DollarSign className="h-5 w-5 opacity-90" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(results.monthly_savings)}</div>
            <p className="text-xs mt-1 opacity-90">
              Every month after implementation
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-primary text-primary-foreground shadow-primary">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Payback Period</CardTitle>
              <Clock className="h-5 w-5 opacity-90" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(results.payback_months, 1)} months</div>
            <p className="text-xs mt-1 opacity-90">
              Time to recover investment
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-accent text-accent-foreground shadow-accent">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">ROI</CardTitle>
              <TrendingUp className="h-5 w-5 opacity-90" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(results.roi_percentage)}</div>
            <p className="text-xs mt-1 opacity-90">
              Return on investment
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
              <Target className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{formatCurrency(results.net_savings)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total savings over period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cumulative Savings Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Cumulative Savings Over Time</CardTitle>
            <CardDescription>See how your savings accumulate month by month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={results.cumulativeSavingsData}>
                <defs>
                  <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(138 76% 35%)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(138 76% 35%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Savings (₹)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Area type="monotone" dataKey="savings" stroke="hsl(138 76% 35%)" fillOpacity={1} fill="url(#colorSavings)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Cost Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Cost Comparison</CardTitle>
            <CardDescription>Manual processing vs. automated solution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={results.monthlySavingsData.slice(0, 12)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Cost (₹)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="manual" fill="hsl(0 84% 60%)" name="Manual Cost" />
                <Bar dataKey="automated" fill="hsl(138 76% 35%)" name="Automated Cost" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Breakdown</CardTitle>
          <CardDescription>Complete analysis of your ROI calculation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Cost Analysis</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Manual Labor Cost (Monthly)</span>
                  <span className="font-semibold">{formatCurrency(results.labor_cost_manual)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Automation Cost (Monthly)</span>
                  <span className="font-semibold">{formatCurrency(results.auto_cost)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Error Savings (Monthly)</span>
                  <span className="font-semibold text-secondary">{formatCurrency(results.error_savings)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b bg-muted/50 px-2 rounded">
                  <span className="font-semibold">Net Monthly Savings</span>
                  <span className="font-bold text-primary">{formatCurrency(results.monthly_savings)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Performance Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Time Saved (Monthly)</span>
                  <span className="font-semibold">{formatNumber(results.time_saved_hours, 1)} hours</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Productivity Gain</span>
                  <span className="font-semibold text-secondary">{formatPercentage(results.productivity_gain)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Break-Even Point</span>
                  <span className="font-semibold">{formatNumber(results.break_even_point, 1)} months</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b bg-muted/50 px-2 rounded">
                  <span className="font-semibold">Total ROI</span>
                  <span className="font-bold text-accent">{formatPercentage(results.roi_percentage)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        {onSave && (
          <Button onClick={onSave} variant="outline" size="lg">
            <Save className="mr-2 h-5 w-5" />
            Save Scenario
          </Button>
        )}
        {onDownload && (
          <Button onClick={onDownload} className="bg-gradient-accent shadow-accent" size="lg">
            <Download className="mr-2 h-5 w-5" />
            Download Report
          </Button>
        )}
      </div>
    </div>
  );
}
