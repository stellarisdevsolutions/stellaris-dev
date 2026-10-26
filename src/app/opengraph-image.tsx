import { ImageResponse } from "next/og";

export const alt = "Kano Dev | Desarrollo Web de Alto Rendimiento & Sistemas a Medida";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
          backgroundImage:
            "radial-gradient(circle at 12% 12%, rgba(230, 255, 42, 0.15) 0%, transparent 45%), radial-gradient(circle at 88% 88%, rgba(12, 70, 81, 0.08) 0%, transparent 45%)",
          padding: "54px 70px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#0C4651",
          border: "12px solid #E6F0F2",
        }}
      >
        {/* Top Floating Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            backgroundColor: "#0C4651",
            borderRadius: "999px",
            padding: "14px 28px",
            boxShadow: "0 10px 25px -5px rgba(12, 70, 81, 0.25)",
            border: "1px solid #145C6A",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#E6FF2A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Star SVG */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#0C4651"
              >
                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
              </svg>
            </div>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "-0.5px",
              }}
            >
              Kano Dev
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                padding: "6px 16px",
                borderRadius: "999px",
                backgroundColor: "rgba(230, 255, 42, 0.15)",
                color: "#E6FF2A",
                border: "1px solid rgba(230, 255, 42, 0.3)",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              Estudio de Software & Web
            </span>
          </div>
        </div>

        {/* Central Hero Block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "18px",
            maxWidth: "980px",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "58px",
                fontWeight: 800,
                color: "#0C4651",
                letterSpacing: "-1.5px",
                lineHeight: 1.1,
              }}
            >
              Somos
            </span>
            <span
              style={{
                fontSize: "58px",
                fontWeight: 900,
                color: "#0C4651",
                backgroundColor: "#E6FF2A",
                padding: "4px 22px",
                borderRadius: "16px",
                letterSpacing: "-1.5px",
                boxShadow: "0 8px 20px -3px rgba(230, 255, 42, 0.4)",
              }}
            >
              Kano Dev,
            </span>
          </div>

          <h1
            style={{
              fontSize: "54px",
              fontWeight: 900,
              color: "#0C4651",
              letterSpacing: "-1.5px",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Desarrollo Web & Software de Alto Rendimiento
          </h1>

          <p
            style={{
              fontSize: "22px",
              fontWeight: 400,
              color: "#4A6B72",
              margin: "6px 0 0 0",
              lineHeight: 1.45,
              maxWidth: "840px",
            }}
          >
            Diseñamos y programamos sitios web modernos, tiendas online y sistemas a medida que
            convierten visitas en clientes.
          </p>
        </div>

        {/* Bottom Feature Badges & Domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1.5px solid #E6F0F2",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {[
              "Carga < 0.8s",
              "Next.js 16 & React 19",
              "E-Commerce & SaaS",
              "100% Adaptable",
            ].map((chip) => (
              <div
                key={chip}
                style={{
                  padding: "8px 16px",
                  borderRadius: "999px",
                  backgroundColor: "#F0F7F8",
                  color: "#0C4651",
                  fontSize: "14px",
                  fontWeight: 600,
                  border: "1px solid #D1E5E8",
                }}
              >
                {chip}
              </div>
            ))}
          </div>

          <div
            style={{
              fontSize: "20px",
              fontWeight: 800,
              color: "#0C4651",
              letterSpacing: "0.5px",
            }}
          >
            kanodev.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
