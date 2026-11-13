import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { User } from "firebase/auth";
import {
  clearGoogleAccessToken,
  getGoogleAccessToken,
  googleSignIn,
  googleSignOut,
  initGoogleAuth,
} from "../utils/googleAuth";
import {
  SheetsApiError,
  fetchBackendSheetConfig,
  saveBackendSheetConfig,
  submitFormToBackend,
  type ConnectedSheetConfig,
  type FormSubmissionEntry,
} from "../utils/googleSheets";

const SHEET_CONFIG_STORAGE_KEY = "sbp_connected_sheet_v1";

export interface SheetSyncResult {
  synced: boolean;
}

interface GoogleSheetsContextValue {
  user: User | null;
  accessToken: string | null;
  needsAuth: boolean;
  isSigningIn: boolean;
  authError: string | null;
  connection: ConnectedSheetConfig | null;
  sheetsModalOpen: boolean;
  openSheetsModal: () => void;
  closeSheetsModal: () => void;
  signIn: () => Promise<string | null>;
  signOut: () => Promise<void>;
  saveConnection: (config: ConnectedSheetConfig) => void;
  clearConnection: () => void;
  syncFormSubmission: (entry: FormSubmissionEntry) => Promise<SheetSyncResult>;
}

const GoogleSheetsContext = createContext<GoogleSheetsContextValue | null>(null);

function loadStoredConnection(): ConnectedSheetConfig | null {
  try {
    const raw = window.localStorage.getItem(SHEET_CONFIG_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConnectedSheetConfig>;
    if (
      parsed.spreadsheetId &&
      parsed.spreadsheetTitle &&
      parsed.sheetTitle &&
      parsed.spreadsheetUrl
    ) {
      return {
        spreadsheetId: parsed.spreadsheetId,
        spreadsheetTitle: parsed.spreadsheetTitle,
        sheetTitle: parsed.sheetTitle,
        spreadsheetUrl: parsed.spreadsheetUrl,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function GoogleSheetsProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(() => getGoogleAccessToken());
  const [needsAuth, setNeedsAuth] = useState<boolean>(true);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [connection, setConnection] = useState<ConnectedSheetConfig | null>(() =>
    typeof window !== "undefined" ? loadStoredConnection() : null,
  );
  const [sheetsModalOpen, setSheetsModalOpen] = useState<boolean>(false);
  const backendAvailableRef = useRef<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = initGoogleAuth(
      (authedUser, token) => {
        setUser(authedUser);
        setAccessToken(token);
        setNeedsAuth(false);
        setAuthError(null);
      },
      (signedInUserWithoutToken) => {
        setUser(signedInUserWithoutToken);
        setAccessToken(null);
        setNeedsAuth(true);
      },
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    void fetchBackendSheetConfig()
      .then((backendConfig) => {
        backendAvailableRef.current = true;
        if (backendConfig) {
          setConnection(backendConfig);
        }
      })
      .catch(() => {
        backendAvailableRef.current = false;
      });
  }, []);

  const signIn = useCallback(async (): Promise<string | null> => {
    setIsSigningIn(true);
    setAuthError(null);
    try {
      const result = await googleSignIn();
      setUser(result.user);
      setAccessToken(result.accessToken);
      setNeedsAuth(false);
      return result.accessToken;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not sign in with Google.";
      setAuthError(message);
      return null;
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    setAuthError(null);
    await googleSignOut();
    setUser(null);
    setAccessToken(null);
    setNeedsAuth(true);
  }, []);

  const saveConnection = useCallback((config: ConnectedSheetConfig) => {
    setConnection(config);
    try {
      window.localStorage.setItem(SHEET_CONFIG_STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Storage restricted
    }
    void saveBackendSheetConfig(config).catch(() => {
      // Non-blocking backend sync
    });
  }, []);

  const clearConnection = useCallback(() => {
    setConnection(null);
    try {
      window.localStorage.removeItem(SHEET_CONFIG_STORAGE_KEY);
    } catch {
      // Storage restricted
    }
    void saveBackendSheetConfig(null).catch(() => {
      // Non-blocking backend sync
    });
  }, []);

  const syncFormSubmission = useCallback(
    async (entry: FormSubmissionEntry): Promise<SheetSyncResult> => {
      const token = getGoogleAccessToken() || accessToken;
      try {
        const res = await submitFormToBackend(entry, {
          accessToken: token,
          sheetConfig: connection,
          skipBackendProbe: backendAvailableRef.current === false,
        });
        return { synced: res.syncedToSheet };
      } catch (err) {
        if (err instanceof SheetsApiError && err.status === 401) {
          clearGoogleAccessToken();
          setAccessToken(null);
          setNeedsAuth(true);
        }
        return { synced: false };
      }
    },
    [accessToken, connection],
  );

  return (
    <GoogleSheetsContext.Provider
      value={{
        user,
        accessToken,
        needsAuth,
        isSigningIn,
        authError,
        connection,
        sheetsModalOpen,
        openSheetsModal: () => setSheetsModalOpen(true),
        closeSheetsModal: () => setSheetsModalOpen(false),
        signIn,
        signOut: handleSignOut,
        saveConnection,
        clearConnection,
        syncFormSubmission,
      }}
    >
      {children}
    </GoogleSheetsContext.Provider>
  );
}

export function useGoogleSheets() {
  const ctx = useContext(GoogleSheetsContext);
  if (!ctx) {
    throw new Error("useGoogleSheets must be used within GoogleSheetsProvider.");
  }
  return ctx;
}

