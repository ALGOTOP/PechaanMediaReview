import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { format, addDays, startOfDay } from "date-fns";

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

function to12h(t: string) {
  const [hStr, m] = t.split(":");
  const h = parseInt(hStr, 10);
  const period = h < 12 ? "AM" : "PM";
  const hour = h % 12 || 12;
  return `${hour}:${m} ${period}`;
}

const isSunday = (d: Date) => d.getDay() === 0;
const tomorrow = startOfDay(addDays(new Date(), 1));

export default function BookingCalendar() {
  const [selected, setSelected] = useState<Date | undefined>();
  const [fmt, setFmt] = useState<"12h" | "24h">("24h");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const displayTimes = fmt === "12h" ? TIME_SLOTS.map(to12h) : TIME_SLOTS;

  const reset = () => {
    setConfirmed(false);
    setSelected(undefined);
    setSelectedTime(null);
  };

  if (confirmed && selected && selectedTime) {
    return (
      <div className="bg-zinc-900 rounded-2xl p-10 flex flex-col items-center justify-center min-h-[520px] text-center">
        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6">
          <Check className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-white text-2xl font-bold mb-2">You're booked!</h3>
        <p className="text-zinc-300 text-sm mb-1">
          {format(selected, "EEEE, MMMM d")} at {selectedTime}
        </p>
        <p className="text-zinc-500 text-xs mt-3 max-w-xs leading-relaxed">
          We'll reach out to confirm the details. Looking forward to speaking
          with you.
        </p>
        <button
          onClick={reset}
          className="mt-8 text-zinc-500 hover:text-zinc-300 text-xs underline underline-offset-2 transition-colors"
        >
          Book another slot
        </button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden" data-testid="booking-calendar">
      {/* ── Calendar ── */}
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={(day) => {
          setSelected(day);
          setSelectedTime(null);
        }}
        disabled={[{ before: tomorrow }, isSunday]}
        showOutsideDays
        className="p-5 pb-4"
        classNames={{
          months: "w-full",
          month: "w-full",
          caption: "flex justify-between items-center mb-5",
          caption_label: "text-white font-semibold text-sm tracking-wide",
          nav: "flex items-center gap-1.5",
          nav_button:
            "w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-150",
          nav_button_previous: "relative",
          nav_button_next: "relative",
          table: "w-full border-collapse",
          head_row: "grid grid-cols-7 mb-2",
          head_cell:
            "text-zinc-500 text-[10px] font-bold tracking-[0.12em] text-center uppercase py-1",
          row: "grid grid-cols-7 gap-1 mb-1",
          cell: "flex items-center justify-center",
          day: "w-9 h-9 rounded-xl text-[13px] font-medium transition-all duration-150 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white",
          day_selected:
            "!bg-white !text-zinc-900 font-bold hover:!bg-zinc-100",
          day_today: "ring-1 ring-zinc-500",
          day_disabled:
            "!bg-transparent !text-zinc-700 cursor-not-allowed hover:!bg-transparent hover:!text-zinc-700",
          day_outside:
            "!bg-transparent !text-zinc-700 opacity-30 hover:!bg-transparent",
          day_hidden: "invisible",
        }}
        components={{
          IconLeft: () => <ChevronLeft className="w-3.5 h-3.5" />,
          IconRight: () => <ChevronRight className="w-3.5 h-3.5" />,
        }}
      />

      {/* ── Time section ── */}
      {selected && (
        <div className="border-t border-zinc-800">
          {/* Selected day + 12h/24h pill */}
          <div className="flex items-center justify-between px-5 py-3">
            <span className="text-white text-sm font-semibold">
              {format(selected, "EEE d")}
            </span>
            <div className="flex items-center bg-zinc-800 rounded-full p-[3px] gap-[2px]">
              {(["12h", "24h"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFmt(f)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-200 ${
                    fmt === f
                      ? "bg-zinc-600 text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                  data-testid={`toggle-${f}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Time slots */}
          <div className="px-5 pb-4 grid grid-cols-2 gap-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-700">
            {displayTimes.map((t, i) => (
              <button
                key={i}
                onClick={() => setSelectedTime(t)}
                className={`py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 ${
                  selectedTime === t
                    ? "bg-white text-zinc-900"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                }`}
                data-testid={`time-slot-${i}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Confirm button */}
          {selectedTime && (
            <div className="px-5 pb-5">
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
      )}
    </div>
  );
}
