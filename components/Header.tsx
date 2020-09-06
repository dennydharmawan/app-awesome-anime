import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AcUnitRounded } from "@material-ui/icons";

import theme from "../constants/theme";

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  offset: theme.mixins.toolbar,
});

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar className={classes.root}>
        <Toolbar>
          <AcUnitRounded />
          <Typography>PokeDex</Typography>
          <AcUnitRounded />
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
};

export default Header;
