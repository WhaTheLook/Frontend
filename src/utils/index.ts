import { TIME_UNITS, TIMEOUT_ERROR } from "@/constants";

export function replaceHistory(state: object, dest: string) {
  history.replaceState(state, "", dest);
}

export function getLocalStorageItem(key: string) {
  return localStorage.getItem(key);
}

export function setLocalStorageItem(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function removeLocalStorageItem(key: string) {
  localStorage.removeItem(key);
}

export function getImageURL(file: File) {
  return URL.createObjectURL(file);
}

export function isTimeoutError(error: Error) {
  return error.message.includes(TIMEOUT_ERROR);
}

export function calculateDaysAgo(inputDate: string) {
  const now = Date.now();
  const inputDateTime = new Date(inputDate).getTime();
  const timeDiff = now - inputDateTime;

  const units = [
    { label: '년', value: Math.floor(timeDiff / TIME_UNITS.year) },
    { label: '달', value: Math.floor(timeDiff / TIME_UNITS.month) },
    { label: '주', value: Math.floor(timeDiff / TIME_UNITS.week) },
    { label: '일', value: Math.floor(timeDiff / TIME_UNITS.day) },
    { label: '시간', value: Math.floor(timeDiff / TIME_UNITS.hour) },
    { label: '분', value: Math.floor(timeDiff / TIME_UNITS.minute) },
    { label: '초', value: Math.floor(timeDiff / TIME_UNITS.second) },
  ];

  for (const unit of units) {
    if (unit.value > 0) {
      return `${unit.value}${unit.label} 전`;
    }
  }

  return "방금 전";
}

export async function urlToFile(url: string, filename: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: "image/png" });
}