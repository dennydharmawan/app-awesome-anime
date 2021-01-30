import { Box, Button, Typography } from "@material-ui/core";

import Layout from "../components/Layout";
import Link from "../components/Link";

const notFound = () => {
  return (
    <Layout>
      <Box role="alert" sx={{ display: 'grid', placeItems: 'center' }}>
        <Box sx={{ width: '50%' }}>
          <Typography variant="subtitle1" gutterBottom>
            Oops... the page you're looking for is not found. It seems you've
            found something that used to exist, or you spelled something wrong.
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            Could you double check that URL?
          </Typography>

          <Button
            variant="contained"
            component={Link as React.ElementType}
            href="/"
          >
            Return Home
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default notFound;
