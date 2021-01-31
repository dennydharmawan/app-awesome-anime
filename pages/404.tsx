import { Box, Button, Typography } from "@material-ui/core";

import Layout from "../components/Layout";
import Link from "../components/Link";

const notFound = () => {
  return (
    <Layout>
      <Box role="alert" sx={{ display: 'grid', placeItems: 'center' }}>
        <Box sx={{ width: '50%' }}>
          <Typography variant="h5" gutterBottom>
            404 - PAGE NOT FOUND
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Oops... The page you are looking for might have been removed, had
            its name changed, or is temporarily unavailable.
          </Typography>

          <Button
            variant="contained"
            component={Link as React.ElementType}
            href="/"
          >
            Go to homepage
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default notFound;
