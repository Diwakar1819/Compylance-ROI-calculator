// ROI Calculation Logic - Following the PRD specifications

// Internal Constants (Server-Side Only)
const AUTOMATED_COST_PER_INVOICE = 0.20;
const ERROR_RATE_AUTO = 0.001; // 0.1%
const TIME_SAVED_PER_INVOICE = 8; // minutes
const MIN_ROI_BOOST_FACTOR = 1.1;

export interface ScenarioInput {
  scenario_name: string;
  monthly_invoice_volume: number;
  num_ap_staff: number;
  avg_hours_per_invoice: number;
  hourly_wage: number;
  error_rate_manual: number; // percentage
  error_cost: number;
  time_horizon_months: number;
  one_time_implementation_cost: number;
}

export interface CalculationResult {
  // Core metrics
  labor_cost_manual: number;
  auto_cost: number;
  error_savings: number;
  monthly_savings: number;
  cumulative_savings: number;
  net_savings: number;
  payback_months: number;
  roi_percentage: number;
  
  // Additional insights
  time_saved_hours: number;
  productivity_gain: number;
  break_even_point: number;
  
  // Chart data
  monthlySavingsData: Array<{ month: number; manual: number; automated: number; savings: number }>;
  cumulativeSavingsData: Array<{ month: number; savings: number }>;
}

export function calculateROI(input: ScenarioInput): CalculationResult {
  // 1. Manual labor cost per month
  const labor_cost_manual = 
    input.num_ap_staff * 
    input.hourly_wage * 
    input.avg_hours_per_invoice * 
    input.monthly_invoice_volume;

  // 2. Automation cost per month
  const auto_cost = input.monthly_invoice_volume * AUTOMATED_COST_PER_INVOICE;

  // 3. Error savings
  const manual_errors = input.monthly_invoice_volume * (input.error_rate_manual / 100);
  const auto_errors = input.monthly_invoice_volume * ERROR_RATE_AUTO;
  const error_savings = (manual_errors - auto_errors) * input.error_cost;

  // 4. Monthly savings (before boost)
  let monthly_savings = (labor_cost_manual + error_savings) - auto_cost;

  // 5. Apply bias factor
  monthly_savings = monthly_savings * MIN_ROI_BOOST_FACTOR;

  // 6. Cumulative & ROI
  const cumulative_savings = monthly_savings * input.time_horizon_months;
  const net_savings = cumulative_savings - input.one_time_implementation_cost;
  const payback_months = monthly_savings > 0 
    ? input.one_time_implementation_cost / monthly_savings 
    : 0;
  const roi_percentage = input.one_time_implementation_cost > 0
    ? (net_savings / input.one_time_implementation_cost) * 100
    : 0;

  // Additional calculations
  const time_saved_hours = 
    (input.monthly_invoice_volume * TIME_SAVED_PER_INVOICE) / 60;
  const productivity_gain = 
    ((labor_cost_manual - auto_cost) / labor_cost_manual) * 100;
  const break_even_point = payback_months;

  // Generate chart data
  const monthlySavingsData = [];
  const cumulativeSavingsData = [];
  
  for (let month = 1; month <= Math.min(input.time_horizon_months, 36); month++) {
    monthlySavingsData.push({
      month,
      manual: labor_cost_manual,
      automated: auto_cost,
      savings: monthly_savings,
    });
    
    cumulativeSavingsData.push({
      month,
      savings: monthly_savings * month - input.one_time_implementation_cost,
    });
  }

  return {
    labor_cost_manual,
    auto_cost,
    error_savings,
    monthly_savings,
    cumulative_savings,
    net_savings,
    payback_months,
    roi_percentage,
    time_saved_hours,
    productivity_gain,
    break_even_point,
    monthlySavingsData,
    cumulativeSavingsData,
  };
}

export function formatCurrency(amount: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatPercentage(num: number, decimals: number = 1): string {
  return `${num.toFixed(decimals)}%`;
}
