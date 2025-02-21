export type LocalStorage = {
  sessions?: Session[];
  options?: LocalStorageOptions;
};

export type Session = {
  id: string;
  name: string;
  tabs: Tab[];
};

export type Tab = {
  id: string;
  icon: string;
  title: string;
  url: string;
};

export type LocalStorageOptions = {
  isDark: boolean;
};

export type LocalStorageKeys = keyof LocalStorage;

// const initialState: Session[] = [
//   {
//     name: "Tue 19 2025",
//     tabs: [{ icon: "lala", url: "lala" }],
//   },
//   {
//     name: "Tue 15 2025",
//     tabs: [{ icon: "lala", url: "lala" }],
//   },
//   {
//     name: "Tue 10 2025",
//     tabs: [{ icon: "lala", url: "lala" }],
//   },
// ];

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
      resolve(res.options ?? { isDark: true });
    });
  });
}
