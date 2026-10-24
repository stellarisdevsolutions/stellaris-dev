import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/app/admin/actions";

export async function POST(request: Request): Promise<NextResponse> {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename") || `upload-${Date.now()}.png`;

  if (!request.body) {
    return NextResponse.json({ error: "No se proporcionó ningún archivo." }, { status: 400 });
  }

  const hasBlobToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  if (!hasBlobToken) {
    return NextResponse.json(
      {
        error:
          "Vercel Blob no está conectado aún (falta BLOB_READ_WRITE_TOKEN en .env.local). Puedes activarlo en la pestaña Storage de Vercel.",
      },
      { status: 503 }
    );
  }

  try {
    const blob = await put(`stellaris/${filename}`, request.body, {
      access: "public",
      addRandomSuffix: true,
    });

    return NextResponse.json({
      url: blob.url,
      downloadUrl: blob.downloadUrl,
      pathname: blob.pathname,
      contentType: blob.contentType,
    });
  } catch (error: any) {
    console.error("Error subiendo a Vercel Blob:", error);
    return NextResponse.json(
      { error: error?.message || "Error al subir el archivo a Vercel Blob" },
      { status: 500 }
    );
  }
}
