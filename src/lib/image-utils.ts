/**
 * Utility to convert any browser image file (PNG, JPG, WebP, etc.) to an optimized WebP
 * preserving high resolution and aspect ratio while minimizing byte size.
 */
export async function convertToWebP(
  file: File,
  quality = 0.88,
  maxDimension = 2560
): Promise<{
  file: File;
  originalSize: number;
  compressedSize: number;
  savingsPercent: number;
}> {
  // SVGs and GIFs should be kept as-is to preserve vectors or frame animations
  if (file.type === "image/svg+xml" || file.type === "image/gif") {
    return {
      file,
      originalSize: file.size,
      compressedSize: file.size,
      savingsPercent: 0,
    };
  }

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        // Maintain full aspect ratio, capping max dimension to 2560px for sanity
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve({
            file,
            originalSize: file.size,
            compressedSize: file.size,
            savingsPercent: 0,
          });
          return;
        }

        // Draw image with high quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve({
                file,
                originalSize: file.size,
                compressedSize: file.size,
                savingsPercent: 0,
              });
              return;
            }

            const cleanBase = file.name.replace(/\.[^/.]+$/, "");
            const convertedFileName = `${cleanBase}.webp`;
            const webpFile = new File([blob], convertedFileName, {
              type: "image/webp",
              lastModified: Date.now(),
            });

            const originalSize = file.size;
            const compressedSize = webpFile.size;
            const savingsPercent =
              originalSize > compressedSize
                ? Math.round(
                    ((originalSize - compressedSize) / originalSize) * 100
                  )
                : 0;

            resolve({
              file: webpFile,
              originalSize,
              compressedSize,
              savingsPercent,
            });
          },
          "image/webp",
          quality
        );
      };

      img.onerror = () => {
        resolve({
          file,
          originalSize: file.size,
          compressedSize: file.size,
          savingsPercent: 0,
        });
      };

      img.src = event.target?.result as string;
    };

    reader.onerror = () => {
      resolve({
        file,
        originalSize: file.size,
        compressedSize: file.size,
        savingsPercent: 0,
      });
    };

    reader.readAsDataURL(file);
  });
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
