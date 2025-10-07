import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, IndianRupee } from "lucide-react";
import { ScenarioInput } from "@/lib/roiCalculations";

const formSchema = z.object({
  scenario_name: z.string().min(1, "Scenario name is required").max(100),
  monthly_invoice_volume: z.number().min(1, "Must be at least 1").max(1000000),
  num_ap_staff: z.number().min(1, "Must be at least 1").max(1000),
  avg_hours_per_invoice: z.number().min(0.01, "Must be greater than 0").max(24),
  hourly_wage: z.number().min(1, "Must be at least 1").max(10000),
  error_rate_manual: z.number().min(0, "Must be 0 or greater").max(100, "Cannot exceed 100%"),
  error_cost: z.number().min(0, "Must be 0 or greater").max(1000000),
  time_horizon_months: z.number().min(1, "Must be at least 1 month").max(120),
  one_time_implementation_cost: z.number().min(0, "Must be 0 or greater").max(100000000),
});

interface CalculatorFormProps {
  onCalculate: (data: ScenarioInput) => void;
  initialData?: Partial<ScenarioInput>;
}

export function CalculatorForm({ onCalculate, initialData }: CalculatorFormProps) {
  const form = useForm<ScenarioInput>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      scenario_name: "My Scenario",
      monthly_invoice_volume: 2000,
      num_ap_staff: 3,
      avg_hours_per_invoice: 0.17,
      hourly_wage: 500,
      error_rate_manual: 0.5,
      error_cost: 2000,
      time_horizon_months: 36,
      one_time_implementation_cost: 500000,
    },
  });

  const onSubmit = (data: ScenarioInput) => {
    onCalculate(data);
  };

  return (
    <Card className="shadow-primary animate-fade-in">
      <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-2">
          <Calculator className="h-6 w-6" />
          <CardTitle>ROI Calculator</CardTitle>
        </div>
        <CardDescription className="text-primary-foreground/90">
          Enter your business metrics to calculate potential savings
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Scenario Name */}
          <div className="space-y-2">
            <Label htmlFor="scenario_name">Scenario Name</Label>
            <Input
              id="scenario_name"
              {...form.register("scenario_name")}
              placeholder="e.g., Q4 2024 Pilot"
            />
            {form.formState.errors.scenario_name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.scenario_name.message}
              </p>
            )}
          </div>

          {/* Invoice Volume */}
          <div className="space-y-2">
            <Label htmlFor="monthly_invoice_volume">Monthly Invoice Volume</Label>
            <Input
              id="monthly_invoice_volume"
              type="number"
              {...form.register("monthly_invoice_volume", { valueAsNumber: true })}
              placeholder="2000"
            />
            {form.formState.errors.monthly_invoice_volume && (
              <p className="text-sm text-destructive">
                {form.formState.errors.monthly_invoice_volume.message}
              </p>
            )}
          </div>

          {/* Staff Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="num_ap_staff">Number of AP Staff</Label>
              <Input
                id="num_ap_staff"
                type="number"
                {...form.register("num_ap_staff", { valueAsNumber: true })}
                placeholder="3"
              />
              {form.formState.errors.num_ap_staff && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.num_ap_staff.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourly_wage" className="flex items-center gap-1">
                <IndianRupee className="h-4 w-4" />
                Hourly Wage
              </Label>
              <Input
                id="hourly_wage"
                type="number"
                {...form.register("hourly_wage", { valueAsNumber: true })}
                placeholder="500"
              />
              {form.formState.errors.hourly_wage && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.hourly_wage.message}
                </p>
              )}
            </div>
          </div>

          {/* Time per Invoice */}
          <div className="space-y-2">
            <Label htmlFor="avg_hours_per_invoice">Average Hours per Invoice</Label>
            <Input
              id="avg_hours_per_invoice"
              type="number"
              step="0.01"
              {...form.register("avg_hours_per_invoice", { valueAsNumber: true })}
              placeholder="0.17 (10 minutes)"
            />
            <p className="text-sm text-muted-foreground">Enter in hours (e.g., 0.17 = 10 minutes)</p>
            {form.formState.errors.avg_hours_per_invoice && (
              <p className="text-sm text-destructive">
                {form.formState.errors.avg_hours_per_invoice.message}
              </p>
            )}
          </div>

          {/* Error Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="error_rate_manual">Manual Error Rate (%)</Label>
              <Input
                id="error_rate_manual"
                type="number"
                step="0.1"
                {...form.register("error_rate_manual", { valueAsNumber: true })}
                placeholder="0.5"
              />
              {form.formState.errors.error_rate_manual && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.error_rate_manual.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="error_cost" className="flex items-center gap-1">
                <IndianRupee className="h-4 w-4" />
                Cost per Error
              </Label>
              <Input
                id="error_cost"
                type="number"
                {...form.register("error_cost", { valueAsNumber: true })}
                placeholder="2000"
              />
              {form.formState.errors.error_cost && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.error_cost.message}
                </p>
              )}
            </div>
          </div>

          {/* Time Horizon */}
          <div className="space-y-2">
            <Label htmlFor="time_horizon_months">Projection Period (Months)</Label>
            <Input
              id="time_horizon_months"
              type="number"
              {...form.register("time_horizon_months", { valueAsNumber: true })}
              placeholder="36"
            />
            {form.formState.errors.time_horizon_months && (
              <p className="text-sm text-destructive">
                {form.formState.errors.time_horizon_months.message}
              </p>
            )}
          </div>

          {/* Implementation Cost */}
          <div className="space-y-2">
            <Label htmlFor="one_time_implementation_cost" className="flex items-center gap-1">
              <IndianRupee className="h-4 w-4" />
              One-Time Implementation Cost (Optional)
            </Label>
            <Input
              id="one_time_implementation_cost"
              type="number"
              {...form.register("one_time_implementation_cost", { valueAsNumber: true })}
              placeholder="500000"
            />
            {form.formState.errors.one_time_implementation_cost && (
              <p className="text-sm text-destructive">
                {form.formState.errors.one_time_implementation_cost.message}
              </p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-primary"
            size="lg"
          >
            <Calculator className="mr-2 h-5 w-5" />
            Calculate ROI
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
