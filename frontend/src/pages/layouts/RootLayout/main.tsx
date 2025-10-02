import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '@/core/contexts/auth';
import { Button } from '@/core/components/Button';
import { useAuthFlow } from '@/domain/auth';

/**
 * @component RootLayout
 * @summary The main layout for the application, including header and main content area.
 * @domain core
 * @type layout-component
 * @category layout
 */
export const RootLayout = () => {
  const { isAuthenticated } = useAuth();
  const { handleLogout } = useAuthFlow();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Contador App
          </Link>
          {isAuthenticated && (
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          )}
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-100 dark:bg-gray-800 py-4 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Contador de 1 a 10. All rights reserved.</p>
      </footer>
    </div>
  );
};
