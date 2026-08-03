// 서버는 LocalDateTime을 시간대 표기 없이 내려준다 ("2026-08-03T05:11:47.706059").
// 값은 UTC이므로 Z를 붙여 UTC로 파싱한 뒤 한국 시간(UTC+9)으로 옮긴다.
const toKST = (originalDate) => {
  const utc = new Date(`${originalDate}Z`);
  if (Number.isNaN(utc.getTime())) return null;

  return new Date(utc.getTime() + 9 * 60 * 60 * 1000);
};

// YYYY-MM-DD
export const DateFormat = (originalDate) => {
  if (!originalDate) return originalDate;

  const kst = toKST(originalDate);
  if (!kst) return originalDate.split("T")[0];

  return kst.toISOString().split("T")[0];
};

// YYYY-MM-DD HH:mm
export const DateTimeFormat = (originalDate) => {
  if (!originalDate) return originalDate;

  const kst = toKST(originalDate);
  if (!kst) return originalDate.replace("T", " ").slice(0, 16);

  return kst.toISOString().replace("T", " ").slice(0, 16);
};
