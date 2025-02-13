import { config } from "dotenv";
import { drizzle } from 'drizzle-orm/neon-http';
// import { applications, jobs } from "./schema";
// import { seed } from "drizzle-seed";
config({ path: ".env" }); // or .env.local


// async function main() {
export const db = drizzle(process.env.DATABASE_URL!);
// await seed(db,{jobs,applications})
// }
// /
// main()