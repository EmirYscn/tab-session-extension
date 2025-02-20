export function formatString(str: string, allowedChar: number = 12) {
  if (str.length < allowedChar) return str;

  let newString = str.slice(0, allowedChar);
  newString += "...";

  return str.length > 10 ? newString : str;
}
