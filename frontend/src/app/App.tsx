import { AppProviders } from './providers';
import { AppRouter } from './router';

/**
 * @component App
 * @summary The root component of the application that composes providers and the router.
 * @domain core
 * @type ui-component
 * @category layout
 */
function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;
