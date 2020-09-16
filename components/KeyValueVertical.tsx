import React from "react";

import { Box, makeStyles, Typography } from "@material-ui/core";

type Props = {
  keyAs: string | null | undefined;
  value: string | null | undefined;
};

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const KeyValueVertical = (prop: Props) => {
  const { keyAs, value } = prop;
  const classes = useStyles();

  if (!keyAs || !value) return null;

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="medium">{keyAs}</Typography>
      <Typography variant="light">{value}</Typography>
    </Box>
  );
};

export default KeyValueVertical;
