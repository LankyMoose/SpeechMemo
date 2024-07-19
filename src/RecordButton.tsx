import { SpeechRecognition, useSpeech } from "./SpeechContext"

interface RecordButtonProps {
  onRecordedValue: () => void
}

export const RecordButton = (props: RecordButtonProps) => {
  const { speech, setSpeech, setOutput, output, setFinished } = useSpeech()

  const handleRecordingEnd = () => {
    if (!speech) return
    speech.abort()
    setFinished(true)
    if (output !== null && output.trim() !== "") {
      props.onRecordedValue()
    }
  }

  return (
    <div>
      <button
        oncontextmenu={(e) => e.preventDefault()}
        className={`rounded-full bg-[#9f2121] border-white border-4 w-12 h-12 ${
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
