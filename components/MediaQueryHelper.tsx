import { Paper } from "@material-ui/core";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import useMediaQuery from "@material-ui/core/useMediaQuery";

type BreakpointOrNull = Breakpoint | null;

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: '12px',
    left: '55px',
    backgroundColor: 'black',
    padding: '5.5px',
    color: '#fff',
  },
}));

/**
 * Be careful using this hook. It only works because the number of
 * breakpoints in theme is static. It will break once you change the number of
 * breakpoints. See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
 */
function useWidth() {
  const theme: Theme = useTheme();
  const keys: Breakpoint[] = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

function MediaQueryHelper() {
  const classes = useStyles();

  const width = useWidth();
  return <Paper className={classes.root}>{`width: ${width}`}</Paper>;
}

export default MediaQueryHelper;
