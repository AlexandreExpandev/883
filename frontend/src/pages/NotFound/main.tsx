import { Link } from 'react-router-dom';

/**
 * @page NotFoundPage
 * @summary A 404 Not Found page.
 * @domain core
 * @type page-component
 * @category error-handling
 */
export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">Page Not Found</p>
      <Link to="/" className="mt-6 text-blue-500 hover:underline">
        Go back home
      </Link>
    </div>
  );
};
