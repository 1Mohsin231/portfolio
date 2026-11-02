import { ImageResponse } from "next/og";

export const alt = "Mohsin Baba | Senior Frontend & Full-Stack Architect";
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
          justifyContent: "space-between",
          backgroundColor: "#020617",
          padding: "54px 64px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          border: "2px solid rgba(16, 185, 129, 0.4)",
        }}
      >
        {/* Subtle Ambient Grid / Corner Accents */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.04) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(16, 185, 129, 0.05) 2%, transparent 0%)",
            backgroundSize: "100px 100px",
            display: "flex",
          }}
        />

        {/* Ambient Top Glow */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            left: "200px",
            width: "500px",
            height: "300px",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
            display: "flex",
          }}
        />

        {/* Top Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Brand Logo & Telemetry */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #10b981, #06b6d4)",
                color: "#020617",
                fontSize: "22px",
                fontWeight: 900,
                letterSpacing: "1px",
              }}
            >
              MB
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  color: "#f8fafc",
                  fontSize: "18px",
                  fontWeight: 800,
                  letterSpacing: "2px",
                }}
              >
                MOHSIN BABA<span style={{ color: "#10b981" }}>.</span>
              </span>
              <span
                style={{
                  color: "#10b981",
                  fontSize: "11px",
                  fontWeight: 600,
                  fontFamily: "monospace",
                  letterSpacing: "1px",
                }}
              >
                PROD.v3 // ALL SYSTEMS NOMINAL
              </span>
            </div>
          </div>

          {/* Right Status Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              color: "#34d399",
              fontSize: "13px",
              fontFamily: "monospace",
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: "#10b981",
                display: "flex",
              }}
            />
            <span>LATENCY: 18ms • ACTIVE PROTOCOL</span>
          </div>
        </div>

        {/* Center Hero Information */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginTop: "16px",
          }}
        >
          {/* Role Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              alignSelf: "flex-start",
              padding: "6px 16px",
              borderRadius: "9999px",
              backgroundColor: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              color: "#34d399",
              fontSize: "13px",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: "1.5px",
            }}
          >
            <span>[</span>
            <span>SENIOR FRONTEND & FULL-STACK ARCHITECT</span>
            <span>]</span>
          </div>

          {/* Main Name Heading */}
          <div
            style={{
              display: "flex",
              fontSize: "64px",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-1.5px",
              lineHeight: 1.05,
            }}
          >
            MOHSIN BABA
          </div>

          {/* Bio Headline */}
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              color: "#94a3b8",
              maxWidth: "960px",
              lineHeight: 1.45,
            }}
          >
            Architecting sub-second Next.js 16 & React 19 web applications, resilient MERN
            distributed microservices, and high-concurrency systems scaling to 10× traffic surges.
          </div>
        </div>

        {/* Impact Metrics Row / Bento Chips */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            width: "100%",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "16px 20px",
              borderRadius: "16px",
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <span
              style={{
                color: "#10b981",
                fontSize: "26px",
                fontWeight: 900,
                fontFamily: "monospace",
              }}
            >
              10×
            </span>
            <span style={{ color: "#e2e8f0", fontSize: "12px", fontWeight: 700 }}>
              Traffic Surge Scaled
            </span>
            <span style={{ color: "#64748b", fontSize: "11px", marginTop: "2px" }}>
              Zero-Downtime Pipeline
            </span>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "16px 20px",
              borderRadius: "16px",
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <span
              style={{
                color: "#06b6d4",
                fontSize: "26px",
                fontWeight: 900,
                fontFamily: "monospace",
              }}
            >
              -40%
            </span>
            <span style={{ color: "#e2e8f0", fontSize: "12px", fontWeight: 700 }}>
              Page Load Reduction
            </span>
            <span style={{ color: "#64748b", fontSize: "11px", marginTop: "2px" }}>
              Sub-second Core Web Vitals
            </span>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "16px 20px",
              borderRadius: "16px",
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <span
              style={{
                color: "#a855f7",
                fontSize: "26px",
                fontWeight: 900,
                fontFamily: "monospace",
              }}
            >
              99.9%
            </span>
            <span style={{ color: "#e2e8f0", fontSize: "12px", fontWeight: 700 }}>
              Uptime Resilience
            </span>
            <span style={{ color: "#64748b", fontSize: "11px", marginTop: "2px" }}>
              Failover & Circuit Breakers
            </span>
          </div>

          <div
            style={{
              flex: 1.2,
              display: "flex",
              flexDirection: "column",
              padding: "16px 20px",
              borderRadius: "16px",
              backgroundColor: "rgba(16, 185, 129, 0.08)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
            }}
          >
            <span
              style={{
                color: "#34d399",
                fontSize: "14px",
                fontWeight: 800,
                fontFamily: "monospace",
                letterSpacing: "1px",
              }}
            >
              CORE STACK
            </span>
            <span style={{ color: "#f8fafc", fontSize: "13px", fontWeight: 700, marginTop: "4px" }}>
              Next.js 16 • React 19 • TypeScript
            </span>
            <span style={{ color: "#94a3b8", fontSize: "11px", marginTop: "2px" }}>
              Node.js • Redux Toolkit • Tailwind
            </span>
          </div>
        </div>

        {/* Footer Meta Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <span
              style={{
                color: "#34d399",
                fontSize: "14px",
                fontFamily: "monospace",
                fontWeight: 700,
              }}
            >
              https://mohsinbaba.dev
            </span>
            <span style={{ color: "#475569", fontSize: "14px" }}>•</span>
            <span
              style={{
                color: "#94a3b8",
                fontSize: "13px",
                fontFamily: "monospace",
              }}
            >
              1mohsinbaba@gmail.com
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#e2e8f0",
              fontSize: "12px",
              fontFamily: "monospace",
            }}
          >
            <span style={{ color: "#10b981" }}>●</span>
            <span>AVAILABLE FOR SENIOR & LEAD ROLES</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

