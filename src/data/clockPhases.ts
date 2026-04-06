export interface ClockTheme {
  key: string;
  value: {
    main: string;
    shadow: string;
    hand: {
      center: string;
      second: string;
      minute: string;
      hour: string;
    };
    numbers: string;
    marks: string;
    clockFace: string;
    background: string;
  };
}

export const clockPhases: ClockTheme[] = [
  {
    key: "Theme 1",
    value: {
      main: "bg-slate-300 text-slate-800",
      shadow: "shadow-xl shadow-slate-400",
      hand: {
        center: "bg-yellow-300",
        second: "bg-yellow-300",
        minute: "bg-red-600",
        hour: "bg-slate-700 dark:bg-white",
      },
      numbers: "bg-black",
      marks:
        "border-slate-700 text-slate-700 dark:border-white dark:text-white border-t-6 border-solid",
      clockFace: "bg-blue-100 dark:bg-blue-950",
      background: "bg-blue-50 dark:bg-blue-950",
    },
  },
  {
    key: "Theme 2",
    value: {
      main: "bg-slate-300 text-slate-800",
      shadow: "shadow-xl shadow-slate-400",
      hand: {
        center: "bg-yellow-500",
        second: "bg-yellow-500",
        minute: "bg-black",
        hour: "bg-red-600",
      },
      numbers: "bg-black",
      marks: "border-black text-black border-t-6 border-solid",
      clockFace: "bg-white dark:bg-white/50",
      background: "bg-slate-50 dark:bg-slate-900",
    },
  },
  {
    key: "Theme 3",
    value: {
      main: "bg-slate-300 text-slate-800",
      shadow: "shadow-xl shadow-slate-400",
      hand: {
        center: "bg-orange-500 dark:bg-red-600",
        second: "bg-orange-500 dark:bg-red-600",
        minute: "bg-stone-800 dark:bg-black",
        hour: "bg-stone-800 dark:bg-black",
      },
      numbers: "bg-black",
      marks:
        "border-stone-600 text-stone-600 dark:border-black dark:text-black border-t-6 border-solid",
      clockFace: "bg-amber-50 dark:bg-white",
      background: "bg-rose-50 dark:bg-stone-900",
    },
  },
  {
    key: "Theme 4",
    value: {
      main: "bg-slate-300 text-slate-800",
      shadow: "shadow-xl shadow-slate-400",
      hand: {
        center: "bg-amber-500",
        second: "bg-amber-500",
        minute: "bg-blue-900 dark:bg-amber-400",
        hour: "bg-blue-900 dark:bg-amber-400",
      },
      numbers: "bg-black",
      marks:
        "border-blue-900 text-blue-900 dark:border-amber-400 dark:text-amber-400 border-t-6 border-solid",
      clockFace: "bg-slate-200 dark:bg-slate-800",
      background: "bg-slate-100 dark:bg-slate-900",
    },
  },
  {
    key: "Theme 5",
    value: {
      main: "bg-slate-300 text-slate-800",
      shadow: "shadow-xl shadow-slate-400",
      hand: {
        center: "bg-stone-400",
        second: "bg-stone-400",
        minute: "bg-stone-800 dark:bg-stone-300",
        hour: "bg-stone-800 dark:bg-stone-300",
      },
      numbers: "bg-black",
      marks:
        "border-stone-500 text-stone-500 dark:border-stone-400 dark:text-stone-400 border-t-6 border-solid",
      clockFace: "bg-stone-100 dark:bg-stone-800",
      background: "bg-stone-50 dark:bg-stone-900",
    },
  },
];
