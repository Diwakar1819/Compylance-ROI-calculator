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
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-success text-secondary-foreground shadow-success border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Monthly Savings</CardTitle>
              <DollarSign className="h-5 w-5 opacity-90" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(results.monthly_savings)}</div>
            <p className="text-xs mt-1 opacity-90">
              Recurring monthly benefit
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-primary text-primary-foreground shadow-primary border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">ROI Percentage</CardTitle>
              <TrendingUp className="h-5 w-5 opacity-90" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatPercentage(results.roi_percentage)}</div>
            <p className="text-xs mt-1 opacity-90">
              Return on investment
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-accent text-accent-foreground shadow-accent border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Payback Period</CardTitle>
              <Clock className="h-5 w-5 opacity-90" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatNumber(results.payback_months, 1)} mo</div>
            <p className="text-xs mt-1 opacity-90">
              Time to break even
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-primary/50 border-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
              <Target className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{formatCurrency(results.net_savings)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total over time horizon
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        {/* Cumulative Savings Chart */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Cumulative Savings Over Time</CardTitle>
            <CardDescription>Real-time visualization of accumulating savings</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={results.cumulativeSavingsData}>
                <defs>
                  <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(145 70% 45%)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(145 70% 45%)" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 20%)" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(215 20% 65%)"
                  label={{ value: 'Month', position: 'insideBottom', offset: -5, fill: 'hsl(215 20% 65%)' }} 
                />
                <YAxis 
                  stroke="hsl(215 20% 65%)"
                  label={{ value: 'Savings (₹)', angle: -90, position: 'insideLeft', fill: 'hsl(215 20% 65%)' }} 
                />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: 'hsl(217 33% 12%)', border: '1px solid hsl(217 33% 20%)', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="savings" stroke="hsl(145 70% 45%)" strokeWidth={2} fillOpacity={1} fill="url(#colorSavings)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Cost Comparison */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Monthly Cost Comparison</CardTitle>
            <CardDescription>Manual vs. Automated costs over 12 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={results.monthlySavingsData.slice(0, 12)}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 20%)" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(215 20% 65%)"
                  label={{ value: 'Month', position: 'insideBottom', offset: -5, fill: 'hsl(215 20% 65%)' }} 
                />
                <YAxis 
                  stroke="hsl(215 20% 65%)"
                  label={{ value: 'Cost (₹)', angle: -90, position: 'insideLeft', fill: 'hsl(215 20% 65%)' }} 
                />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: 'hsl(217 33% 12%)', border: '1px solid hsl(217 33% 20%)', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="manual" fill="hsl(0 72% 51%)" name="Manual Cost" radius={[8, 8, 0, 0]} />
                <Bar dataKey="automated" fill="hsl(145 70% 45%)" name="Automated Cost" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Detailed Breakdown</CardTitle>
          <CardDescription>Complete financial and performance analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-lg text-secondary">Cost Analysis</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Manual Labor Cost (Monthly)</span>
                  <span className="font-semibold">{formatCurrency(results.labor_cost_manual)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Automation Cost (Monthly)</span>
                  <span className="font-semibold">{formatCurrency(results.auto_cost)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Error Savings (Monthly)</span>
                  <span className="font-semibold text-secondary">{formatCurrency(results.error_savings)}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-gradient-success/10 px-3 rounded-lg mt-2">
                  <span className="font-semibold text-secondary">Net Monthly Savings</span>
                  <span className="font-bold text-secondary text-lg">{formatCurrency(results.monthly_savings)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-lg text-accent">Performance Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Time Saved (Monthly)</span>
                  <span className="font-semibold">{formatNumber(results.time_saved_hours, 1)} hours</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Productivity Gain</span>
                  <span className="font-semibold text-secondary">{formatPercentage(results.productivity_gain)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Break-Even Point</span>
                  <span className="font-semibold">{formatNumber(results.break_even_point, 1)} months</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-gradient-accent/10 px-3 rounded-lg mt-2">
                  <span className="font-semibold text-accent">Total ROI</span>
                  <span className="font-bold text-accent text-lg">{formatPercentage(results.roi_percentage)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        {onSave && (
          <Button onClick={onSave} variant="outline" size="lg" className="border-border/50">
            <Save className="mr-2 h-5 w-5" />
            Save Scenario
          </Button>
        )}
        {onDownload && (
          <Button onClick={onDownload} className="bg-gradient-accent shadow-accent border-0" size="lg">
            <Download className="mr-2 h-5 w-5" />
            Generate HTML Report
          </Button>
        )}
      </div>
    </div>
  );
}
