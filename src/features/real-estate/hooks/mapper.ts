export const mapperTrafficsText = (traffics: string[] | undefined) => {
  if (!traffics) return ''
  return traffics.join('\n')
}
