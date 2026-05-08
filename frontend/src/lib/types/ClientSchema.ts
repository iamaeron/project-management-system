import { z } from "zod";

export const ClientSchema = z.object({
  name: z.string().min(5, { error: "Please fill in a valid name." }),
  email: z.email({ pattern: z.regexes.html5Email }),
});
