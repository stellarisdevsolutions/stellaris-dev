import { seedDatabase } from "./service";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

async function runSeed() {
  console.log("🌱 Starting Stellaris DB Seeding...");
  const result = await seedDatabase();
  if (result.success) {
    console.log("✅", result.message);
  } else {
    console.error("❌", result.message);
  }
  process.exit(result.success ? 0 : 1);
}

runSeed();
