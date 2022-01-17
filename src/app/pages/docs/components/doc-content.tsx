import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouteMatch, useLocation } from "react-router-dom";
import { idify } from "./idify";

interface DocContentContextType {
  setTitle: (titleNode: HTMLHeadingElement) => void;
  pushSubtitle: (subtitle: HTMLHeadingElement) => void;
  title?: {
    text: string;
    id: string;
  };
  subtitles: {
    text: string;
    id: string;
  }[];
  focusedId?: string;
}

const DocContentContext = React.createContext<DocContentContextType>({
  setTitle: () => {},
  pushSubtitle: () => {},
  subtitles: [],
});

const NAVBAR_HEIGHT = 0;

function getFocusedId(els: HTMLHeadingElement[]): string | undefined {
  if (els.length === 0) {
    return undefined;
  }

  for (let i = els.length - 1; i > 0; i--) {
    if (els[i].offsetTop < window.scrollY + NAVBAR_HEIGHT + 5) {
      return els[i].id;
    }
  }

  return els[0].id;
}

function readNode(el: HTMLElement): { text: string; id: string } {
  const text = el.innerText;

  return {
    text,
    id: idify(text),
  };
}

export const DocContentContextProvider: React.FC = ({ children }) => {
  const [content, setContent] = useState<
    Pick<DocContentContextType, "title" | "subtitles">
  >({
    subtitles: [],
  });

  const [focusedId, setFocusedId] = useState<string>();

  const headingsRef = useRef<HTMLHeadingElement[]>([]);

  const setTitle = useCallback<DocContentContextType["setTitle"]>(
    (titleEl) => {
      setContent({
        title: readNode(titleEl),
        subtitles: [],
      });
      headingsRef.current = [titleEl];
    },
    [setContent, headingsRef]
  );

  const pushSubtitle = useCallback<DocContentContextType["pushSubtitle"]>(
    (subtitleEl) => {
      setContent((existingContent) => ({
        title: existingContent.title,
        subtitles: [...existingContent.subtitles, readNode(subtitleEl)],
      }));
      headingsRef.current.push(subtitleEl);
    },
    [setContent, headingsRef]
  );

  const value = useMemo<DocContentContextType>(
    () => ({
      setTitle,
      pushSubtitle,
      ...content,
      focusedId,
    }),
    [setTitle, pushSubtitle, content, focusedId]
  );

  useEffect(() => {
    const onScroll = () => {
      setFocusedId(getFocusedId(headingsRef.current));
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [headingsRef]);

  return (
    <DocContentContext.Provider value={value}>
      {children}
    </DocContentContext.Provider>
  );
};

export const useDocTitle = () => {
  const { setTitle } = useContext(DocContentContext);

  const maybeSetTitle = useCallback(
    (title: HTMLHeadingElement | null) => {
      if (title) {
        setTitle(title);
      }
    },
    [setTitle]
  );

  return maybeSetTitle;
};

export const useDocSubtitle = () => {
  const { pushSubtitle } = useContext(DocContentContext);

  const maybePushSubtitle = useCallback(
    (subtitle: HTMLHeadingElement | null) => {
      if (subtitle) {
        pushSubtitle(subtitle);
      }
    },
    [pushSubtitle]
  );

  return maybePushSubtitle;
};

export const useDocContent = () => {
  const { title, subtitles, focusedId } = useContext(DocContentContext);

  return { title, subtitles, focusedId };
};
