import clsx from "clsx";
import { ElementType, ReactNode } from "react";

import Box, { BoxProps } from "@material-ui/core/Box";
import { experimentalStyled as styled } from "@material-ui/core/styles";

const FlexGridWrap = styled(Box)(({ theme }) => ({
  padding: theme.grid.gridGap,
}));

type FlexGridProps = BoxProps & {
  minColumnWidth?: string;
  gridGap?: string;
};

const internalProps = ['minColumnWidth', 'gridGap'];

const FlexGrid = styled(
  (props: FlexGridProps) => {
    const { className, ...otherProps } = props;

    return (
      <Box className={clsx([props.className, 'flex-grid'])} {...otherProps} />
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
)<FlexGridProps>(({ theme, minColumnWidth, gridGap }) => ({
  display: 'flex',
  justifyContent: 'space-around',

  '& > *': {
    flex: '0 1 100%',

    '&:not(:first-of-type)': {
      marginLeft: gridGap || theme.grid.gridGap,
    },
  },

  [`@media (max-width: calc(${
    minColumnWidth || theme.grid.minColumnWidth
  } * 3))`]: {
    flexWrap: 'wrap',

    ' & > *': {
      margin: `${gridGap || theme.grid.gridGap} 0 0 !important`,
    },
  },

  [`@media (min-width: calc(${
    minColumnWidth || theme.grid.minColumnWidth
  } * 3))`]: {
    '& + .flex-grid': {
      marginTop: gridGap || theme.grid.gridGap,
    },
  },
}));

export { FlexGridWrap, FlexGrid };
