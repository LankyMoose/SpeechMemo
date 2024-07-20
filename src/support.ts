import { signal } from "kaioken"

export const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )

export const isBrave =
  "brave" in navigator &&
  typeof navigator["brave"] === "object" &&
  !!navigator["brave"] &&
  "isBrave" in navigator["brave"]

export const isBraveDesktop = isBrave && !isMobile

export const microphonePermissionState = signal<PermissionState>("prompt")

navigator.permissions
  .query(
    // @ts-ignore
    { name: "microphone" }
  )
  .then(function (permissionStatus) {
    console.log(permissionStatus.state) // granted, denied, prompt
    microphonePermissionState.value = permissionStatus.state

    permissionStatus.onchange = function () {
      microphonePermissionState.value = this.state
      console.log(this.state)
    }
  })
