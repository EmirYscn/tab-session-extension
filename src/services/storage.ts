export type LocalStorage = {
  sessions?: Session[];
  options?: LocalStorageOptions;
};

export type Session = {
  id: string;
  name: string;
  tabs: Tab[];
  isPinned: boolean;
  tags?: string[];
  date: string;
};

export type Tab = {
  id: string;
  icon: string;
  title: string;
  url: string;
};

export type LocalStorageOptions = {
  isDark: boolean;
  sort?: SortTypes;
};

export type SortTypes = "date-asc" | "date-desc" | "tab-asc" | "tab-desc";

export type LocalStorageKeys = keyof LocalStorage;

export const defaultOptions: LocalStorageOptions = {
  isDark: false,
  sort: "date-desc",
};

export async function setSessionsStorage(sessions: Session[]): Promise<void> {
  const vals: LocalStorage = {
    sessions,
  };

  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => resolve());
  });
}

export function getSessionsStorage(): Promise<Session[]> {
  const keys: LocalStorageKeys[] = ["sessions"];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: { [key: string]: any }) => {
      resolve(res.sessions ?? []);
    });
  });
}

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  const vals: LocalStorage = {
    options,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys[] = ["options"];

  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: { [key: string]: any }) => {
      resolve(res.options ?? defaultOptions);
    });
  });
}
