import clsx from "clsx";
import { ElementType, ReactNode } from "react";

import Box, { BoxProps } from "@material-ui/core/Box";
import { experimentalStyled } from "@material-ui/core/styles";

const BoxGridWrap = experimentalStyled(Box)(({ theme }) => ({
  padding: theme.grid.gridGap,
}));

type BoxGridProps = BoxProps & {
  minColumnWidth?: string;
  gridGap?: string;
  numberOfColumns?: string;
};

const internalProps = ['minColumnWidth', 'gridGap', 'numberOfColumns'];

const BoxGrid = experimentalStyled(
  (props: BoxProps) => {
    const { className, ...otherProps } = props;

    return (
      <Box className={clsx([props.className, 'box-grid'])} {...otherProps} />
    );
  },
  {
    shouldForwardProp: (prop) => {
      if (typeof prop === 'string') {
        return !internalProps.includes(prop);
      }

      return true;
    },
  }
)<BoxGridProps>(({ theme, minColumnWidth, gridGap, numberOfColumns }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${numberOfColumns || 'auto-fit'}, minmax(${
    minColumnWidth || theme.grid.minColumnWidth
  }, 1fr))`,
  gridGap: gridGap || theme.grid.gridGap,

  '& + .box-grid': {
    marginTop: gridGap || theme.grid.gridGap,
  },
}));

export { BoxGridWrap, BoxGrid };
