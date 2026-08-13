import { aramaVerileri } from "@/lib/arama";

export const dynamic = "force-static";

export function GET() {
  return Response.json(aramaVerileri());
}