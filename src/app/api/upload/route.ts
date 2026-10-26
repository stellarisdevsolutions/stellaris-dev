import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/app/admin/actions";

export async function POST(request: Request): Promise<NextResponse> {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const rawFilename = searchParams.get("filename") || `upload-${Date.now()}.webp`;
  // Sanitize filename to prevent directory traversal
  const filename = rawFilename.replace(/[^a-zA-Z0-9._-]/g, "_");

  // Validate allowed image extensions
  const ALLOWED_EXTS = [".webp", ".png", ".jpg", ".jpeg", ".svg", ".ico", ".gif"];
  const isAllowedExt = ALLOWED_EXTS.some((ext) => filename.toLowerCase().endsWith(ext));
  if (!isAllowedExt) {
    return NextResponse.json(
      { error: "Formato no permitido. Solo se permiten imágenes (.webp, .png, .jpg, .jpeg, .svg, .gif, .ico)." },
      { status: 400 }
    );
  }

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
    const contentType = filename.endsWith(".webp")
      ? "image/webp"
      : filename.endsWith(".svg")
      ? "image/svg+xml"
      : undefined;

    const blob = await put(`stellaris/${filename}`, request.body, {
      access: "public",
      addRandomSuffix: true,
      ...(contentType ? { contentType } : {}),
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
