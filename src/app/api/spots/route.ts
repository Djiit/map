import { NextRequest, NextResponse } from "next/server";

import { getData } from "@/services/overpass";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const bboxParam = request.nextUrl.searchParams.get("bbox");
  if (!bboxParam) {
    return NextResponse.json(
      { error: "Missing bbox query parameter (south,west,north,east)." },
      { status: 400 },
    );
  }

  const bbox = bboxParam.split(",").map(Number.parseFloat);
  if (
    bbox.length !== 4 ||
    bbox.some(Number.isNaN) ||
    bbox[0] > bbox[2] ||
    bbox[1] > bbox[3]
  ) {
    return NextResponse.json(
      { error: "Invalid bbox query parameter (south,west,north,east)." },
      { status: 400 },
    );
  }

  try {
    const elements = await getData(bbox as [number, number, number, number]);
    return NextResponse.json(
      elements.map((e: any) => ({
        id: e.id,
        position: [e.lat, e.lon],
        content: e.tags?.name,
      })),
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch spots." },
      { status: 500 },
    );
  }
}
