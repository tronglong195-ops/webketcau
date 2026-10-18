export interface ProgressState {
  completedSections: Record<string, boolean>; // key: 'tap1-c4-4.1'
  lastVisited: string;
}

const STORAGE_KEY = 'webketcau_learning_progress';

export function getProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completedSections: {}, lastVisited: '/' };
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Lỗi khi đọc progress từ localStorage:', e);
    return { completedSections: {}, lastVisited: '/' };
  }
}

export function markSectionComplete(sectionKey: string, completed: boolean = true): void {
  try {
    const cur = getProgress();
    cur.completedSections[sectionKey] = completed;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cur));
  } catch (e) {
    console.warn('Lỗi khi ghi progress vào localStorage:', e);
  }
}

export function setLastVisited(path: string): void {
  try {
    const cur = getProgress();
    cur.lastVisited = path;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cur));
  } catch (e) {
    console.warn('Lỗi khi lưu lastVisited vào localStorage:', e);
  }
}
