import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Alert = z.infer<typeof AlertSchema>;
export const AlertSchema = z.object({
  website_url: z.string(),
  type: z.string(),
  description: z.string(),
});
