/**
 * Persist the selected content layout on the document element.
 */
export function updateContentLayout(layout: string): void {
  if (typeof document !== "undefined") {
    document.documentElement.dataset.contentLayout = layout;
  }
}
