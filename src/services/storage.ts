export type LocalStorage = {
  sessions: Session[];
};

export type Session = {
  id: string;
  name: string;
  tabs: Tab[];
};

export type Tab = {
  icon: string;
  title: string;
  url: string;
};

export type SyncStorageKeys = keyof LocalStorage;

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
  const keys: SyncStorageKeys[] = ["sessions"];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: { [key: string]: any }) => {
      resolve(res.sessions ?? []);
    });
  });
}
