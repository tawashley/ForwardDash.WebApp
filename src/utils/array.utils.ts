/**
 * Checks if `element` exists in `array`.
 *
 * @param array The array to check
 * @param element The value to locate in the array
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function inArray(array: any[], element: any): boolean {
    return array.indexOf(element) !== -1
}
