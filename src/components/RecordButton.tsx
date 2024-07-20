import { useSpeech, SpeechRecognition } from "$/context/SpeechContext"

interface RecordButtonProps {
  onRecordedValue: () => void
}

export function RecordButton(props: RecordButtonProps) {
  const { speech, setSpeech, setOutput, output, setRecording } = useSpeech()

  return (
    <div>
      <button
        oncontextmenu={(e) => e.preventDefault()}
        className={`custom-shadow rounded-full bg-[#9f2121] border-white border-4 w-12 h-12 ${
          !!speech ? "active" : ""
        }`}
        onpointerdown={() => {
          const newSpeech = new SpeechRecognition()
          newSpeech.continuous = true
          newSpeech.interimResults = true
          newSpeech.start()
          newSpeech.addEventListener("result", (event) => {
            const output = Array.from(event.results)
              .map((result) => result[0].transcript)
              .filter(Boolean)
              .join(" ")
              .trim()

            setOutput(output === "" ? null : output)
          })
          newSpeech.addEventListener("start", () => {
            setSpeech(newSpeech)
            setRecording(true)
          })
          newSpeech.addEventListener("end", () => {
            setSpeech(null)
            setRecording(false)
            if (output !== null) {
              props.onRecordedValue()
            }
          })
        }}
        onpointerup={() => speech?.abort()}
        onpointerleave={() => speech?.abort()}
      ></button>
    </div>
  )
}
