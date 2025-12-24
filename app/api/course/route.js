
import { addTest, getTest } from "@/controller/testcontroller";

export async function POST(req) {
  return addTest(req);
}
export async function GET()
{
    return getTest();
}