export function setInfoToLocalStorage(key: string, value: any): void {
  localStorage.setItem(key, value);
}

export function getInfoFromLocalStorage(key: string): any {
  return localStorage.getItem(key);
}

export function removeInfoFromLocalStorage(key: string): void {
  localStorage.removeItem(key);
}
