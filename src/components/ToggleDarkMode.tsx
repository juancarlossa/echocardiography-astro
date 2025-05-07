import useDarkMode from "@/hooks/useDarkMode";
import { Switch } from "./ui/switch";

export function ToggleDarkMode () {
  const { toggleDarkMode, isDarkMode } = useDarkMode()

  function handleToggle () {
    toggleDarkMode()


  }
  return (
    <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} className="rotate-90" />
  )
}