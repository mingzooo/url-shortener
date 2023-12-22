import { customAlphabet } from "nanoid";

export default (host: string) => {
  const nanoid = customAlphabet("1234567890abcdefghi", 8);
  const shortCode = nanoid();
  return {
    shortCode,
    shortUrl: `http://${host}/${shortCode}`,
  }
}