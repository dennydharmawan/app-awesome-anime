import { Box } from "@material-ui/core";

//https://moderncss.dev/solutions-to-replace-the-12-column-grid/
const grid = () => {
  const gridGap = '2rem';
  const minColWidth = '15rem';

  return (
    <Box // grid-wrap
      sx={{
        padding: gridGap,
        fontSize: '1.6rem',
      }}
    >
      <Box
        className="grid"
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(${minColWidth}, 1fr))`,
          gridGap: '2rem',
          '&:hover': {
            backgroundColor: 'red',
            opacity: [0.9, 0.8, 0.7],
          },
          '& + .grid': {
            marginTop: '16rem',
          },
        }}
      >
        <span>4-col 1</span>
        <span>4-col 2</span>
        <span>4-col 3</span>
      </Box>

      <Box
        className="grid"
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(${minColWidth}, 1fr))`,
          gridGap: '2rem',
          '& + .grid': {
            marginTop: '16rem',
          },
        }}
      >
        <span>4-col 1</span>
        <span>4-col 2</span>
        <span>4-col 3</span>
      </Box>
    </Box>
  );
};

export default grid;
