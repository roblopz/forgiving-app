import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

export type MuiStyleRecord = { [key: string]: SxProps<Theme> };

export function createStyles<S extends MuiStyleRecord>(
  styles: S
): { [key in keyof S]: S[key] } {
  return styles;
}