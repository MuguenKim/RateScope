/**
 * Update the active theme mode by toggling the `dark` class on the document element.
 */
export function updateThemeMode(mode: string): void {
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }
}

/**
 * Persist the selected theme preset on the document element.
 */
export function updateThemePreset(preset: string): void {
  if (typeof document !== "undefined") {
    document.documentElement.dataset.themePreset = preset;
  }
}
