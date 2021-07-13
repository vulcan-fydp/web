import { Room, User } from "graphql";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { SessionQuery, useSessionQuery } from "./session.generated";

interface SessionContextValue {
  user: SessionQuery["user"] | undefined;
  room: Room | undefined;
}

const sessionContext = createContext<SessionContextValue>({
  user: undefined,
  room: undefined,
});

export const SessionContext: React.FC = ({ children }) => {
  const { data } = useSessionQuery({});
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    if (data) {
      setHasLoadedOnce(true);
    }
  }, [data, setHasLoadedOnce]);

  // Block further rendering until we load the session. Some routes are conditional
  // based on session type so we need to identify who we are before we can continue.
  if (!hasLoadedOnce) {
    return null;
  }

  return (
    <sessionContext.Provider
      value={{ user: data?.user ?? undefined, room: undefined }}
    >
      {children}
    </sessionContext.Provider>
  );
};

export const useSession = () => useContext(sessionContext);
