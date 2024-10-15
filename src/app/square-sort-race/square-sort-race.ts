export enum SquareColor {
  BLUE,
  CYAN,
  GREEN,
  MAGENTA,
  NONE,
  RED,
  YELLOW,
}

export type MoveDirection = 'up' | 'down' | 'left' | 'right';

export const INITIAL_BOARD = [
  SquareColor.NONE,
  SquareColor.BLUE,
  SquareColor.BLUE,
  SquareColor.BLUE,
  SquareColor.BLUE,
  SquareColor.CYAN,
  SquareColor.CYAN,
  SquareColor.CYAN,
  SquareColor.CYAN,
  SquareColor.GREEN,
  SquareColor.GREEN,
  SquareColor.GREEN,
  SquareColor.GREEN,
  SquareColor.MAGENTA,
  SquareColor.MAGENTA,
  SquareColor.MAGENTA,
  SquareColor.MAGENTA,
  SquareColor.RED,
  SquareColor.RED,
  SquareColor.RED,
  SquareColor.RED,
  SquareColor.YELLOW,
  SquareColor.YELLOW,
  SquareColor.YELLOW,
  SquareColor.YELLOW,
];

export const SQUARE_COLOR_CLASS = {
  [SquareColor.BLUE]: 'from-blue-300 to-blue-400',
  [SquareColor.CYAN]: 'from-cyan-300 to-cyan-400',
  [SquareColor.GREEN]: 'from-green-300 to-green-400',
  [SquareColor.NONE]: 'from-transparent to-transparent !border-none !shadow-none',
  [SquareColor.MAGENTA]: 'from-fuchsia-300 to-fuchsia-400',
  [SquareColor.RED]: 'from-red-300 to-red-400',
  [SquareColor.YELLOW]: 'from-yellow-300 to-yellow-400',
};