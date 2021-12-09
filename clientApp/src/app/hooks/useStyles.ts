import { DependencyList, useMemo } from 'react';
import { MuiStyleRecord } from '@lib/util/muiUtil';

const constDeps: DependencyList = [];

export function useStyles<S extends MuiStyleRecord, P>(
  getStyles: (props: P) => S, 
  props: P, 
  deps = constDeps
): { [key in keyof S]: S[key] } {
  return useMemo(() => getStyles(props), deps);
}