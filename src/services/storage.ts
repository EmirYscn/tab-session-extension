export type SyncStorage = {
  sessions: Sessions[];
};

export type Sessions = {
  name: string;
  urls: string[];
};

export type SyncStorageKeys = keyof SyncStorage;

export async function setSessions(sessions: Sessions[]): Promise<void> {
  const vals: SyncStorage = {
    sessions,
  };

  return new Promise((resolve) => {
    chrome.storage.sync.set(vals, () => resolve());
  });
}

export function getSessions(): Promise<Sessions[]> {
  const keys: SyncStorageKeys[] = ["sessions"];
  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, (res: SyncStorage) => {
      resolve(res.sessions ?? []);
    });
  });
}
