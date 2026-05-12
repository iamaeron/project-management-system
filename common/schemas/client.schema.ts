import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(5, { error: "Please fill in a valid name." }),
  email: z.email({ pattern: z.regexes.html5Email }),
});

export type ClientSchemaData = z.infer<typeof clientSchema>;
