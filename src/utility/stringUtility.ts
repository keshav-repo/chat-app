function isStringEmpty(str: string | null | undefined): boolean {
  return !str || str.trim().length === 0;
}
function stringLen(str: string): Number {
  return str.length;
}
export default {
  isStringEmpty,
  stringLen,
};
