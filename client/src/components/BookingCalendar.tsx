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
import { Check, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const SLOTS_PER_PAGE = 4;

const DAY_HEADERS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTH_ABBR = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

const TIME_SLOTS_24 = [
  "00:00","00:15","00:30","00:45",
  "09:00","09:15","09:30","09:45",
  "10:00","10:15","10:30","10:45",
  "11:00","11:15","11:30","11:45",
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
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [slotOffset, setSlotOffset] = useState(0);

  const calDays = useMemo(() => {
    const ms = startOfMonth(viewMonth);
    const me = endOfMonth(viewMonth);
    return eachDayOfInterval({
      start: startOfWeek(ms, { weekStartsOn: 0 }),
      end: endOfWeek(me, { weekStartsOn: 0 }),
    });
  }, [viewMonth]);

  const displayTimes = fmt === "12h" ? TIME_SLOTS_24.map(to12h) : TIME_SLOTS_24;

  const selectDay = (d: Date) => {
    if (!isAvailable(d)) return;
    setSelected(d);
    setSelectedTime(null);
    setSlotOffset(0);
  };

  const reset = () => {
    const f = firstAvailable();
    setViewMonth(new Date(f.getFullYear(), f.getMonth(), 1));
    setSelected(f);
    setSelectedTime(null);
    setConfirmed(false);
  };

  if (confirmed) {
    return (
      <div
        style={{ background: "#18181b", borderRadius: "12px" }}
        className="flex flex-col items-center justify-center min-h-[420px] text-center p-10"
        data-testid="booking-confirmed"
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
          style={{ background: "#3f3f46" }}
        >
          <Check className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-white text-xl font-bold mb-2">You're booked!</h3>
        <p style={{ color: "#a1a1aa" }} className="text-sm">
          {format(selected, "EEEE, MMMM d")} at {selectedTime}
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
      style={{
        background: "#18181b",
        borderRadius: "12px",
        color: "#ffffff",
        fontFamily: "'Inter', -apple-system, sans-serif",
        padding: "24px",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
      }}
      className="w-full max-w-[360px]"
      data-testid="booking-calendar"
    >
      {/* ── Month header ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "20px",
          borderBottom: "1px solid #27272a",
        }}
      >
        <h2 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>
          {format(viewMonth, "MMMM")}
          <span style={{ color: "#a1a1aa", fontWeight: 500, marginLeft: "4px" }}>
            {format(viewMonth, "yyyy")}
          </span>
        </h2>
        <div
          style={{
            color: "#52525b",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "8px",
            userSelect: "none",
            display: "flex",
            gap: "0",
          }}
        >
          <button
            onClick={() => setViewMonth(subMonths(viewMonth, 1))}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#52525b",
              fontSize: "18px",
              lineHeight: 1,
              padding: "0 2px",
            }}
            className="hover:text-white transition-colors"
            data-testid="button-prev-month"
          >
            &#8249;
          </button>
          <button
            onClick={() => setViewMonth(addMonths(viewMonth, 1))}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#52525b",
              fontSize: "18px",
              lineHeight: 1,
              padding: "0 2px",
            }}
            className="hover:text-white transition-colors"
            data-testid="button-next-month"
          >
            &#8250;
          </button>
        </div>
      </div>

      {/* ── Weekday headers ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
          padding: "20px 0",
          borderBottom: "1px solid #27272a",
        }}
      >
        {DAY_HEADERS.map((d) => (
          <span
            key={d}
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#a1a1aa",
              letterSpacing: "0.05em",
            }}
          >
            {d}
          </span>
        ))}
      </div>

      {/* ── Calendar grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "6px",
          paddingTop: "20px",
          textAlign: "center",
        }}
      >
        {calDays.map((day, i) => {
          const inMonth = isSameMonth(day, viewMonth);
          const avail = isAvailable(day);
          const sel = isSameDay(day, selected);
          const todayDay = isToday(day);
          const showMonthLabel = !inMonth && avail && format(day, "d") === "1";

          let bg = "transparent";
          let color = "#a1a1aa";
          let fontWeight: number = 500;
          let cursor = "default";

          if (sel) {
            bg = "#ffffff";
            color = "#000000";
            fontWeight = 700;
            cursor = "pointer";
          } else if (avail && inMonth) {
            bg = "#3f3f46";
            color = "#ffffff";
            fontWeight = 600;
            cursor = "pointer";
          } else if (avail && !inMonth) {
            bg = "#3f3f46";
            color = "#ffffff";
            fontWeight = 600;
            cursor = "pointer";
          }

          return (
            <div
              key={i}
              onClick={() => selectDay(day)}
              data-testid={`day-${format(day, "yyyy-MM-dd")}`}
              className={cn(
                (avail && !sel) ? "hover:bg-[#52525b]" : ""
              )}
              style={{
                aspectRatio: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                cursor,
                fontSize: "14px",
                fontWeight,
                transition: "background-color 0.2s",
                position: "relative",
                background: bg,
                color,
              }}
            >
              {showMonthLabel && (
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    lineHeight: 1,
                    marginBottom: "2px",
                    color: "#a1a1aa",
                  }}
                >
                  {MONTH_ABBR[day.getMonth()]}
                </span>
              )}
              <span>{format(day, "d")}</span>
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

      {/* ── Time section ── */}
      <div
        style={{
          marginTop: "24px",
          paddingTop: "24px",
          borderTop: "1px solid #27272a",
        }}
      >
        {/* Date label + 12h/24h toggle */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <div style={{ fontSize: "16px" }}>
            <strong style={{ fontWeight: 700 }}>{format(selected, "EEE")}</strong>{" "}
            <span style={{ fontWeight: 500 }}>{format(selected, "d")}</span>
          </div>

          {/* Pill toggle */}
          <div
            style={{
              display: "flex",
              background: "#121212",
              border: "1px solid #27272a",
              borderRadius: "20px",
              padding: "2px",
              userSelect: "none",
            }}
          >
            {(["12h", "24h"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFmt(f)}
                style={{
                  fontSize: "12px",
                  padding: "4px 8px",
                  borderRadius: "16px",
                  fontWeight: 500,
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  color: fmt === f ? "#ffffff" : "#a1a1aa",
                  transition: "color 0.15s",
                }}
                data-testid={`toggle-${f}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Time slots list with chevron navigation */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {/* Up chevron */}
          <button
            onClick={() => setSlotOffset((o) => Math.max(0, o - SLOTS_PER_PAGE))}
            disabled={slotOffset === 0}
            data-testid="button-slots-up"
            style={{
              background: "none",
              border: "none",
              cursor: slotOffset === 0 ? "default" : "pointer",
              color: slotOffset === 0 ? "#3f3f46" : "#a1a1aa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px 0",
              transition: "color 0.15s",
            }}
            className={slotOffset === 0 ? "" : "hover:text-white"}
          >
            <ChevronUp size={20} />
          </button>

          {/* Visible slots */}
          {displayTimes.slice(slotOffset, slotOffset + SLOTS_PER_PAGE).map((t, i) => (
            <button
              key={slotOffset + i}
              onClick={() => setSelectedTime(t)}
              data-testid={`time-slot-${slotOffset + i}`}
              className="transition-colors"
              style={{
                width: "100%",
                padding: "14px 12px",
                border: "none",
                borderRadius: "12px",
                background: selectedTime === t ? "#ffffff" : "#1c1c1e",
                color: selectedTime === t ? "#000000" : "#ffffff",
                fontSize: "15px",
                fontWeight: selectedTime === t ? 700 : 500,
                textAlign: "center",
                cursor: "pointer",
                flexShrink: 0,
                letterSpacing: "0.01em",
              }}
            >
              {t}
            </button>
          ))}

          {/* Down chevron */}
          <button
            onClick={() =>
              setSlotOffset((o) =>
                Math.min(displayTimes.length - SLOTS_PER_PAGE, o + SLOTS_PER_PAGE)
              )
            }
            disabled={slotOffset >= displayTimes.length - SLOTS_PER_PAGE}
            data-testid="button-slots-down"
            style={{
              background: "none",
              border: "none",
              cursor:
                slotOffset >= displayTimes.length - SLOTS_PER_PAGE
                  ? "default"
                  : "pointer",
              color:
                slotOffset >= displayTimes.length - SLOTS_PER_PAGE
                  ? "#3f3f46"
                  : "#a1a1aa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px 0",
              transition: "color 0.15s",
            }}
            className={
              slotOffset >= displayTimes.length - SLOTS_PER_PAGE
                ? ""
                : "hover:text-white"
            }
          >
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Confirm button — only when a time is selected */}
        {selectedTime && (
          <button
            onClick={() => setConfirmed(true)}
            data-testid="button-confirm-booking"
            className="hover:bg-zinc-200 transition-colors"
            style={{
              width: "100%",
              marginTop: "16px",
              padding: "12px",
              borderRadius: "8px",
              background: "#ffffff",
              color: "#000000",
              fontSize: "14px",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
            }}
          >
            Confirm — {format(selected, "MMM d")} at {selectedTime}
          </button>
        )}
      </div>
    </div>
  );
}
