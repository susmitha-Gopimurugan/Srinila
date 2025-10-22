const LS_KEY = "enrolledUsers_demo";

export function readEnrolled() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function writeEnrolled(list) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}
