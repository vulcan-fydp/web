export enum GameConsole {
  ALL = "ALL",
  SWITCH = "SWITCH",
}

export function getGameConsoleName(gameConsole: GameConsole): string {
  switch (gameConsole) {
    case GameConsole.ALL:
      return "All Consoles";
    case GameConsole.SWITCH:
      return "Nintendo Switch";
  }
}

export const GAME_CONSOLE_DISPLAY_ORDER = [GameConsole.SWITCH, GameConsole.ALL];
