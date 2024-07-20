export const storage = {
  prefix: "SpeechMemo:",
  get(key: string) {
    return localStorage.getItem(this.prefix + key)
  },
  set(key: string, val: string) {
    localStorage.setItem(this.prefix + key, val)
  },
}
