import { ImageResponse } from "next/og";

export const alt = "Stellaris Dev | Desarrollo Web de Alto Rendimiento & Sistemas a Medida";
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
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0B0C10",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(255, 83, 42, 0.22) 0%, transparent 50%), radial-gradient(circle at 15% 85%, rgba(255, 83, 42, 0.12) 0%, transparent 40%)",
          padding: "70px 80px",
          fontFamily: "sans-serif",
          color: "white",
          border: "8px solid #181920",
        }}
      >
        {/* Top Bar / Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              backgroundColor: "#FF532A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 35px rgba(255, 83, 42, 0.6)",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: "#ffffff",
              }}
            />
          </div>
          <span
            style={{
              fontSize: "32px",
              fontWeight: 800,
              letterSpacing: "-0.5px",
              color: "#ffffff",
            }}
          >
            Stellaris Dev
          </span>
          <span
            style={{
              marginLeft: "12px",
              padding: "6px 14px",
              borderRadius: "999px",
              backgroundColor: "rgba(255, 83, 42, 0.15)",
              color: "#FF532A",
              fontSize: "14px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              border: "1px solid rgba(255, 83, 42, 0.3)",
            }}
          >
            Solutions
          </span>
        </div>

        {/* Central Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "980px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-2px",
              margin: 0,
              color: "#FFFFFF",
            }}
          >
            Desarrollo Web de Alto Rendimiento & Sistemas a Medida
          </h1>
          <p
            style={{
              fontSize: "26px",
              fontWeight: 400,
              lineHeight: 1.4,
              color: "#A1A1AA",
              margin: 0,
            }}
          >
            Diseñamos y programamos aplicaciones web ultrarrápidas, tiendas online y software que
            convierten visitas en clientes.
          </p>
        </div>

        {/* Bottom Bar: Tech Stack & Domain */}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "28px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {["Next.js", "React", "PostgreSQL", "Tailwind CSS", "Resend"].map((tech) => (
              <div
                key={tech}
                style={{
                  padding: "8px 18px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "#D4D4D8",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          <div
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#FF532A",
              letterSpacing: "0.5px",
            }}
          >
            tiendastellaris.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
