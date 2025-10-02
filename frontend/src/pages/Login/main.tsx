import { useAuthFlow } from '@/domain/auth';
import { Button } from '@/core/components/Button';
import { Input } from '@/core/components/Input';
import { FormEvent } from 'react';

/**
 * @page LoginPage
 * @summary Page for user authentication.
 * @domain auth
 * @type page-component
 * @category authentication
 */
export const LoginPage = () => {
  const { handleLogin, isLoading, error } = useAuthFlow();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    handleLogin({ email, password });
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email
          </label>
          <Input id="email" name="email" type="email" required placeholder="user@example.com" />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            Password
          </label>
          <Input id="password" name="password" type="password" required />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
};
