//проверка на целое положительное число
export function isPositiveNumber(value) {
  const num = Number(value);
  // проверяем, что num - целое, конечное число и > 0
  return Number.isFinite(num) && Number.isInteger(num) && num > 0;
}