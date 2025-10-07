-- Create scenarios table for storing ROI calculations
CREATE TABLE public.scenarios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scenario_name TEXT NOT NULL,
  monthly_invoice_volume INTEGER NOT NULL,
  num_ap_staff INTEGER NOT NULL,
  avg_hours_per_invoice DECIMAL(10,4) NOT NULL,
  hourly_wage DECIMAL(10,2) NOT NULL,
  error_rate_manual DECIMAL(5,2) NOT NULL,
  error_cost DECIMAL(10,2) NOT NULL,
  time_horizon_months INTEGER NOT NULL,
  one_time_implementation_cost DECIMAL(12,2) DEFAULT 0,
  
  -- Calculated results
  monthly_savings DECIMAL(12,2),
  cumulative_savings DECIMAL(12,2),
  net_savings DECIMAL(12,2),
  payback_months DECIMAL(10,2),
  roi_percentage DECIMAL(10,2),
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.scenarios ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (no authentication required as per PRD)
CREATE POLICY "Public access to scenarios" 
ON public.scenarios 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX idx_scenarios_created_at ON public.scenarios(created_at DESC);
CREATE INDEX idx_scenarios_name ON public.scenarios(scenario_name);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_scenarios_updated_at
BEFORE UPDATE ON public.scenarios
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create reports table for tracking report downloads
CREATE TABLE public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scenario_id UUID REFERENCES public.scenarios(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  downloaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for reports
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Create policy for public access
CREATE POLICY "Public access to reports" 
ON public.reports 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create index for reports
CREATE INDEX idx_reports_email ON public.reports(email);
CREATE INDEX idx_reports_downloaded_at ON public.reports(downloaded_at DESC);