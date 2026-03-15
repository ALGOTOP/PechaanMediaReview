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
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const DAY_HEADERS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTH_ABBR = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

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
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
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

  const selectDay = (d: Date) => {
    if (!isAvailable(d)) return;
    setSelected(d);
    setSelectedTime(null);
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
        className="bg-[#111111] rounded-2xl flex flex-col items-center justify-center min-h-[540px] text-center p-10"
        data-testid="booking-confirmed"
      >
        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6">
          <Check className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-white text-xl font-bold mb-2">You're booked!</h3>
        <p className="text-zinc-400 text-sm">
          {format(selected, "EEEE, MMMM d")} at {selectedTime}
        </p>
        <p className="text-zinc-600 text-xs mt-4 max-w-xs leading-relaxed">
          We'll reach out to confirm the details. Looking forward to speaking with you.
        </p>
        <button
          onClick={reset}
          className="mt-8 text-zinc-600 hover:text-zinc-400 text-xs underline underline-offset-2 transition-colors"
        >
          Book another slot
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#111111] rounded-2xl overflow-hidden" data-testid="booking-calendar">

      {/* ── Month header ── */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <span className="text-white font-bold text-[15px]">
          {format(viewMonth, "MMMM")}{" "}
          <span className="text-zinc-500 font-medium">{format(viewMonth, "yyyy")}</span>
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMonth(subMonths(viewMonth, 1))}
            className="w-7 h-7 flex items-center justify-center text-zinc-500 hover:text-zinc-200 transition-colors rounded-md hover:bg-white/5"
            data-testid="button-prev-month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMonth(addMonths(viewMonth, 1))}
            className="w-7 h-7 flex items-center justify-center text-zinc-500 hover:text-zinc-200 transition-colors rounded-md hover:bg-white/5"
            data-testid="button-next-month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* divider */}
      <div className="border-t border-[#222222]" />

      {/* ── Day-of-week headers ── */}
      <div className="grid grid-cols-7 px-4 pt-3 pb-2">
        {DAY_HEADERS.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-semibold tracking-[0.1em] text-zinc-600 uppercase"
          >
            {d}
          </div>
        ))}
      </div>

      {/* ── Calendar grid ── */}
      <div className="grid grid-cols-7 px-3 pb-4 gap-y-1">
        {calDays.map((day, i) => {
          const inMonth = isSameMonth(day, viewMonth);
          const avail = isAvailable(day);
          const sel = isSameDay(day, selected);
          const todayDay = isToday(day);
          const outside = !inMonth;

          return (
            <div key={i} className="flex flex-col items-center justify-end h-11">
              {/* Outside-month abbreviation */}
              {outside && avail && (
                <span className="text-[8px] font-semibold text-zinc-600 leading-none mb-0.5">
                  {MONTH_ABBR[day.getMonth()]}
                </span>
              )}

              <button
                onClick={() => selectDay(day)}
                disabled={!avail}
                className={cn(
                  "w-9 h-9 rounded-xl text-[13px] font-medium transition-all duration-100 relative",
                  sel
                    ? "bg-white text-zinc-900 font-bold"
                    : avail
                    ? "bg-[#272727] text-zinc-200 hover:bg-[#323232]"
                    : "bg-transparent text-zinc-700 cursor-default"
                )}
                data-testid={`day-${format(day, "yyyy-MM-dd")}`}
              >
                {format(day, "d")}
                {todayDay && !sel && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-white" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* divider */}
      <div className="border-t border-[#222222]" />

      {/* ── Date label + 12h/24h toggle ── */}
      <div className="flex items-center justify-between px-5 py-4">
        <span className="text-white font-bold text-sm">
          {format(selected, "EEE")}{" "}
          <span className="font-bold">{format(selected, "d")}</span>
        </span>
        <div className="flex items-center bg-[#1c1c1c] rounded-full p-[3px] gap-px">
          {(["12h", "24h"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFmt(f)}
              className={cn(
                "px-3 py-[5px] rounded-full text-[11px] font-semibold transition-all duration-150",
                fmt === f
                  ? "bg-[#3a3a3a] text-white"
                  : "text-zinc-600 hover:text-zinc-300"
              )}
              data-testid={`toggle-${f}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* divider */}
      <div className="border-t border-[#1e1e1e]" />

      {/* ── Time slots ── */}
      <div className="px-4 py-4 flex flex-col gap-2 max-h-72 overflow-y-auto">
        {displayTimes.map((t, i) => (
          <button
            key={i}
            onClick={() => setSelectedTime(t)}
            className={cn(
              "w-full py-3 rounded-xl text-[13px] font-medium transition-all duration-100",
              selectedTime === t
                ? "bg-white text-zinc-900"
                : "bg-[#1a1a1a] text-zinc-300 border border-[#2a2a2a] hover:border-[#3a3a3a] hover:text-white"
            )}
            data-testid={`time-slot-${i}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Confirm button ── */}
      {selectedTime && (
        <div className="px-4 pb-4">
          <button
            onClick={() => setConfirmed(true)}
            className="w-full py-3 rounded-xl bg-white text-zinc-900 text-sm font-bold hover:bg-zinc-100 transition-colors"
            data-testid="button-confirm-booking"
          >
            Confirm {format(selected, "MMM d")} at {selectedTime}
          </button>
        </div>
      )}
    </div>
  );
}
