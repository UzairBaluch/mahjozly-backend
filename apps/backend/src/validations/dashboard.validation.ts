import { z } from 'zod';

// Optional dashboard window — defaults to “now → +30d” in the service if omitted.
const dashboardOverviewQuerySchema = z.object({
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
});

export type DashboardOverviewQueryInput = z.infer<typeof dashboardOverviewQuerySchema>;

export { dashboardOverviewQuerySchema };
