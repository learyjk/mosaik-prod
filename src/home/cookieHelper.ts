/**
 * Set a cookie.
 * @param cname The name of the cookie to set.
 * @param cvalue The value to set for the cookie.
 * @param exdays The number of days until the cookie expires.
 */
export function setCookie(cname: string, cvalue: string, milliseconds: number) {
  const d = new Date();
  d.setTime(d.getTime() + milliseconds);
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * Get a cookie by name.
 * @param name The name of the cookie to get.
 * @returns The value of the cookie.
 * @see https://stackoverflow.com/a/25490531/104380
 */
export function getCookie(name: string) {
  return (
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() ||
    null
  );
}

/**
 * Remove a cookie by setting it to an empty value and setting its expiration date in the past.
 * @param name The name of the cookie to remove.
 */
export function removeCookie(name: string) {
  document.cookie = name + "=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
