import { SpeechRecognition, useSpeech } from "./SpeechContext"

export const RecordButton = () => {
  const { speech, setSpeech, setOutput, setFinished } = useSpeech()

  const handleRecordingEnd = () => {
    if (!speech) return
    speech.abort()
    setFinished(true)
  }

  return (
    <div>
      <button
        oncontextmenu={(e) => e.preventDefault()}
        className={`rounded-full bg-red-500 border-white border-4 w-12 h-12 ${
          !!speech ? "active" : ""
        }`}
        onpointerdown={() => {
          if (speech) {
            return handleRecordingEnd()
          }
          setFinished(false)
          const newSpeech = new SpeechRecognition()
          newSpeech.continuous = true
          newSpeech.interimResults = true
          newSpeech.start()
          newSpeech.addEventListener("result", (event) => {
            setOutput(
              Array.from(event.results)
                .map((result) => result[0].transcript)
                .filter(Boolean)
                .join(" ")
            )
          })
          newSpeech.addEventListener("start", () => setSpeech(newSpeech))
          newSpeech.addEventListener("end", () => setSpeech(null))
        }}
        onpointerup={handleRecordingEnd}
        onpointerleave={handleRecordingEnd}
      ></button>
    </div>
  )
}
