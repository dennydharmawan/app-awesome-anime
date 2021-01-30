import { FallbackProps } from "react-error-boundary";

import { Button } from "@material-ui/core";

import Layout from "./Layout";
import Link from "./Link";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Layout>
      <div role="alert">
        There was an error:{' '}
        <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
        <Button
          variant="contained"
          component={Link as React.ElementType}
          href="/"
          onClick={resetErrorBoundary}
        >
          Go to homepage
        </Button>
      </div>
    </Layout>
  );
}

export default ErrorFallback;
