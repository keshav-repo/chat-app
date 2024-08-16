function isObjectEmpty(obj: Object | null | undefined) {
  return obj == null || Object.keys(obj).length === 0;
}
export default {
  isObjectEmpty,
};
