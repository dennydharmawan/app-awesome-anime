import {
  cloneElement,
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useRef,
  useState
} from "react";

import { ClickAwayListener, Grow, Paper, Popper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

type PopperMenuContextType = {
  anchorRef: RefObject<HTMLButtonElement>;
  arrowRef: HTMLSpanElement | null;
  setArrowRef: Dispatch<SetStateAction<HTMLSpanElement | null>>;
  open: boolean;
  handleToggle: () => void;
  handleClose: (event: React.MouseEvent<EventTarget>) => void;
};

const PopperMenuContext = createContext<PopperMenuContextType | null>(null);
PopperMenuContext.displayName = 'PopperMenuContext';

function usePopperMenu() {
  const context = useContext(PopperMenuContext);

  if (!context) {
    throw new Error('usePopperMenu must be used within <PopperMenu>');
  }

  return context;
}

const useStyles = makeStyles({
  popper: {
    zIndex: 1,
    '&[data-popper-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.71em',
      '&::before': {
        transformOrigin: '0 100%',
      },
    },
    '&[data-popper-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.71em',
      '&::before': {
        transformOrigin: '100% 0',
      },
    },
    '&[data-popper-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.71em',
      height: '1em',
      width: '0.71em',
      '&::before': {
        transformOrigin: '100% 100%',
      },
    },
    '&[data-popper-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.71em',
      height: '1em',
      width: '0.71em',
      '&::before': {
        transformOrigin: '0 0',
      },
    },
  },
  arrow: {
    overflow: 'hidden',
    position: 'absolute',
    width: '1em',
    height: '0.71em' /* = width / sqrt(2) = (length of the hypotenuse) */,
    boxSizing: 'border-box',
    color: '#fff',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: '100%',
      height: '100%',
      backgroundColor: 'currentColor',
      transform: 'rotate(45deg)',
    },
  },
});

function PopperMenu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [arrowRef, setArrowRef] = useState<HTMLSpanElement | null>(null);

  const handleToggle = () => {
    console.log('test');
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <PopperMenuContext.Provider
      value={{
        anchorRef,
        arrowRef,
        setArrowRef,
        open,
        handleToggle,
        handleClose,
      }}
    >
      {children}
    </PopperMenuContext.Provider>
  );
}

function PopperMenuButton({ children }: { children: ReactElement }) {
  const { anchorRef, handleToggle } = usePopperMenu();

  const props = {
    edge: 'start',
    color: 'inherit',
    ref: anchorRef,
    ['aria-haspopup']: 'true',
    ['aria-label']: 'menu',
    onClick: handleToggle,
  };

  return cloneElement(children, { ...props });
}

function PopperMenuContent({ children }: { children: ReactNode }) {
  const classes = useStyles();
  const {
    open,
    anchorRef,
    arrowRef,
    setArrowRef,
    handleClose,
  } = usePopperMenu();

  return (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role="menu"
      transition
      disablePortal
      className={classes.popper}
      modifiers={[
        {
          name: 'flip',
          enabled: true,
          options: {
            altBoundary: true,
            rootBoundary: 'document',
            padding: 16,
          },
        },
        {
          name: 'preventOverflow',
          enabled: true,
          options: {
            padding: 16,
          },
        },
        {
          name: 'arrow',
          enabled: true,
          options: {
            element: arrowRef,
          },
        },
      ]}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom' ? 'center top' : 'center bottom',
          }}
        >
          <Paper
            sx={{
              backgroundColor: '#fff',
              color: '#000',
              boxShadow:
                '0 10px 20px hsla(0, 0%, 0.0000%, .15), 0 3px 6px hsla(0, 0%, 0.0000%, .10)',
            }}
          >
            <span className={classes.arrow} ref={setArrowRef} />
            <ClickAwayListener onClickAway={handleClose}>
              {children}
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}

export { PopperMenu, PopperMenuButton, PopperMenuContent };
