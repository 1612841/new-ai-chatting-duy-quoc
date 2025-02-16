export const safeParseJsonType = <T extends {}>(data: string): T => {
  return JSON.parse(data)
}