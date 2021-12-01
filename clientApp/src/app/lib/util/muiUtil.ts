import { SystemStyleObject } from "@mui/system";
import { Theme } from '@mui/material/styles';
import { appTheme } from 'src/app/styles/muiTheme';

export function makeSxProps(
  styles: SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>)
): SystemStyleObject<Theme>  {
  if (typeof styles === 'function')
    return styles(appTheme);
  else return styles;
}