import { useSpeech } from "$/context/SpeechContext"

export function RecordButton() {
  const { speech, startSpeechRecognition } = useSpeech()

  return (
    <div>
      <button
        oncontextmenu={(e) => e.preventDefault()}
        className={`custom-shadow rounded-full bg-[#9f2121] border-white border-4 w-12 h-12 ${
          !!speech ? "active" : ""
        }`}
        onpointerdown={startSpeechRecognition}
        onpointerup={() => speech?.abort()}
        onpointerleave={() => speech?.abort()}
      ></button>
    </div>
  )
}
