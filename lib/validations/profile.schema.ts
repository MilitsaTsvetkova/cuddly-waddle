import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(5).max(50),
  username: z.string().min(5).max(50),
  portfolioWebsite: z.string().url(),
  location: z.string().min(5).max(50),
  bio: z.string().min(10).max(150),
});
