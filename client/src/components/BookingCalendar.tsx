import { useState, useMemo } from "react";
import {
  format,
  addDays,
  startOfDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
} from "date-fns";
import { ChevronUp, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TIME_SLOTS_24 = [
  "09:00","09:30","10:00","10:30","11:00","11:30",
  "12:00","12:30","13:00","13:30","14:00","14:30",
  "15:00","15:30","16:00","16:30","17:00","17:30",
  "18:00","18:30","19:00","19:30","20:00","20:30",
  "21:00","21:30","22:00","22:30",
];

function to12h(t: string) {
  const [hStr, m] = t.split(":");
  const h = parseInt(hStr, 10);
  const suffix = h < 12 ? "AM" : "PM";
  const hour = h % 12 || 12;
  return `${hour}:${m} ${suffix}`;
}

function isAvailable(date: Date): boolean {
  const tomorrow = addDays(startOfDay(new Date()), 1);
  return date >= tomorrow && date.getDay() !== 0;
}

function firstAvailable(): Date {
  let d = addDays(startOfDay(new Date()), 1);
  while (!isAvailable(d)) d = addDays(d, 1);
  return d;
}

export default function BookingCalendar() {
  const initial = firstAvailable();
  const [viewMonth, setViewMonth] = useState(
    new Date(initial.getFullYear(), initial.getMonth(), 1)
  );
  const [selected, setSelected] = useState<Date>(initial);
  const [fmt, setFmt] = useState<"12h" | "24h">("24h");
  const [timeIndex, setTimeIndex] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const calDays = useMemo(() => {
    const ms = startOfMonth(viewMonth);
    const me = endOfMonth(viewMonth);
    return eachDayOfInterval({
      start: startOfWeek(ms, { weekStartsOn: 0 }),
      end: endOfWeek(me, { weekStartsOn: 0 }),
    });
  }, [viewMonth]);

  const displayTimes = fmt === "12h" ? TIME_SLOTS_24.map(to12h) : TIME_SLOTS_24;
  const currentTime = displayTimes[timeIndex];

  const selectDay = (d: Date) => {
    if (!isAvailable(d)) return;
    setSelected(d);
    setTimeIndex(0);
  };

  const stepTime = (dir: 1 | -1) => {
    setTimeIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return TIME_SLOTS_24.length - 1;
      if (next >= TIME_SLOTS_24.length) return 0;
      return next;
    });
  };

  const reset = () => {
    const f = firstAvailable();
    setViewMonth(new Date(f.getFullYear(), f.getMonth(), 1));
    setSelected(f);
    setTimeIndex(0);
    setConfirmed(false);
  };

  if (confirmed) {
    return (
      <div
        style={{ background: "#18181b", borderRadius: "12px" }}
        className="flex flex-col items-center justify-center min-h-[420px] text-center p-10"
        data-testid="booking-confirmed"
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6" style={{ background: "#27272a" }}>
          <Check className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-white text-xl font-bold mb-2">You're booked!</h3>
        <p style={{ color: "#a1a1aa" }} className="text-sm">
          {format(selected, "EEEE, MMMM d")} at {currentTime}
        </p>
        <p className="text-xs mt-4 max-w-xs leading-relaxed" style={{ color: "#52525b" }}>
          We'll reach out to confirm the details. Looking forward to speaking with you.
        </p>
        <button
          onClick={reset}
          className="mt-8 text-xs underline underline-offset-2 transition-colors"
          style={{ color: "#52525b" }}
          data-testid="button-book-another"
        >
          Book another slot
        </button>
      </div>
    );
  }

  return (
    <div
      style={{ background: "#18181b", borderRadius: "12px", color: "#ffffff", fontFamily: "'Inter', -apple-system, sans-serif" }}
      className="w-full max-w-[380px]"
      data-testid="booking-calendar"
    >
      <div style={{ padding: "24px" }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1.2rem", margin: 0, fontWeight: 700 }}>
            {format(viewMonth, "MMMM")}{" "}
            <span style={{ color: "#a1a1aa", fontWeight: 400 }}>{format(viewMonth, "yyyy")}</span>
          </h2>
          <div style={{ display: "flex", gap: "12px", color: "#52525b", fontSize: "1rem", userSelect: "none" }}>
            <button
              onClick={() => setViewMonth(subMonths(viewMonth, 1))}
              style={{ color: "#52525b", background: "none", border: "none", cursor: "pointer", padding: "0 2px", fontSize: "1rem", lineHeight: 1 }}
              className="hover:text-white transition-colors"
              data-testid="button-prev-month"
            >
              &#8249;
            </button>
            <button
              onClick={() => setViewMonth(addMonths(viewMonth, 1))}
              style={{ color: "#52525b", background: "none", border: "none", cursor: "pointer", padding: "0 2px", fontSize: "1rem", lineHeight: 1 }}
              className="hover:text-white transition-colors"
              data-testid="button-next-month"
            >
              &#8250;
            </button>
          </div>
        </div>

        {/* ── Days grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px", textAlign: "center" }}>

          {/* Day name headers */}
          {DAY_HEADERS.map((d) => (
            <div
              key={d}
              style={{ color: "#a1a1aa", fontSize: "0.75rem", fontWeight: 700, paddingBottom: "12px", textTransform: "uppercase" }}
            >
              {d}
            </div>
          ))}

          {/* Day cells */}
          {calDays.map((day, i) => {
            const inMonth = isSameMonth(day, viewMonth);
            const avail = isAvailable(day);
            const sel = isSameDay(day, selected);
            const todayDay = isToday(day);
            const muted = !avail || !inMonth;

            let bg = "transparent";
            let color = "#3f3f46";
            let fontWeight = 400;
            let cursor = "default";

            if (sel) {
              bg = "#ffffff";
              color = "#000000";
              fontWeight = 700;
              cursor = "pointer";
            } else if (avail && inMonth) {
              bg = "#27272a";
              color = "#ffffff";
              fontWeight = 600;
              cursor = "pointer";
            }

            return (
              <div
                key={i}
                onClick={() => selectDay(day)}
                data-testid={`day-${format(day, "yyyy-MM-dd")}`}
                style={{
                  aspectRatio: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  cursor,
                  fontSize: "0.95rem",
                  fontWeight,
                  transition: "all 0.2s",
                  position: "relative",
                  background: bg,
                  color,
                }}
                className={cn(
                  avail && inMonth && !sel ? "hover:bg-[#3f3f46]" : ""
                )}
              >
                {format(day, "d")}
                {todayDay && !sel && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "6px",
                      width: "4px",
                      height: "4px",
                      background: "white",
                      borderRadius: "50%",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* ── Footer ── */}
        <div style={{ marginTop: "24px", borderTop: "1px solid #27272a", paddingTop: "20px" }}>

          {/* Date label + 12h/24h toggle */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <strong style={{ fontSize: "0.95rem" }}>
              {format(selected, "EEE d")}
            </strong>
            <div
              style={{
                fontSize: "12px",
                background: "#121212",
                padding: "4px 10px",
                borderRadius: "4px",
                border: "1px solid #27272a",
                display: "flex",
                gap: "6px",
                userSelect: "none",
              }}
            >
              {(["12h", "24h"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFmt(f)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    color: fmt === f ? "#ffffff" : "#52525b",
                    fontWeight: fmt === f ? 700 : 400,
                    fontSize: "12px",
                    transition: "color 0.15s",
                  }}
                  data-testid={`toggle-${f}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Time box */}
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "100%",
                border: "1px solid #27272a",
                padding: "12px 48px 12px 12px",
                textAlign: "center",
                borderRadius: "8px",
                background: "transparent",
                color: "white",
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
              data-testid="time-display"
            >
              {currentTime}
            </div>
            <div style={{ position: "absolute", right: "10px", display: "flex", flexDirection: "column", gap: "2px" }}>
              <button
                onClick={() => stepTime(-1)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#a1a1aa", padding: "2px", display: "flex", alignItems: "center" }}
                className="hover:text-white transition-colors"
                data-testid="button-time-up"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => stepTime(1)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#a1a1aa", padding: "2px", display: "flex", alignItems: "center" }}
                className="hover:text-white transition-colors"
                data-testid="button-time-down"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Confirm button */}
          <button
            onClick={() => setConfirmed(true)}
            style={{
              width: "100%",
              marginTop: "12px",
              padding: "12px",
              borderRadius: "8px",
              background: "#ffffff",
              color: "#000000",
              fontSize: "0.9rem",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            className="hover:bg-zinc-200"
            data-testid="button-confirm-booking"
          >
            Confirm — {format(selected, "MMM d")} at {currentTime}
          </button>
        </div>

      </div>
    </div>
  );
}
