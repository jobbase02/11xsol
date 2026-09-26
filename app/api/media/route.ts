import { NextRequest, NextResponse } from "next/server";
import { getImageUrl, getImageUrls } from "@/lib/media";

// GET /api/media?path=projects/jobbase.webp
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json({ error: "Missing 'path' query parameter" }, { status: 400 });
  }

  const url = await getImageUrl(path);
  return NextResponse.json(
    { path, url },
    {
      headers: {
        "Cache-Control": "public, s-maxage=604800, stale-while-revalidate=86400",
      },
    }
  );
}

// POST /api/media { paths: ["projects/jobbase.webp", "saas.webp"] }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const paths = Array.isArray(body?.paths) ? body.paths : [];

    if (paths.length === 0) {
      return NextResponse.json({ error: "No paths provided" }, { status: 400 });
    }

    const mapping = await getImageUrls(paths);
    return NextResponse.json(
      { mapping },
      {
        headers: {
          "Cache-Control": "public, s-maxage=604800, stale-while-revalidate=86400",
        },
      }
    );
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
