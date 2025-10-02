import { useCounter } from '@/domain/counter';
import { Button } from '@/core/components/Button';
import { cn } from '@/core/utils/cn';

/**
 * @page HomePage
 * @summary The main page of the application where the counter is displayed and controlled.
 * @domain counter
 * @type page-component
 * @category functional
 */
export const HomePage = () => {
  const { value, status, isFinalCount, isLoading, isMutating, start, pause, reset } = useCounter();

  const getStartButtonLabel = () => {
    switch (status) {
      case 'em_andamento':
        return 'Contando...';
      case 'pausado':
        return 'Continuar';
      case 'parado':
      case 'finalizado':
      default:
        return 'Iniciar';
    }
  };

  const isStartButtonDisabled = status === 'em_andamento' || isMutating;
  const isPauseButtonDisabled = status !== 'em_andamento' || isMutating;
  const isResetButtonDisabled = isMutating;

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Contador de 1 a 10</h1>
      <div className="my-8">
        <p className="text-lg mb-2">Número Atual:</p>
        <div
          className={cn('text-9xl font-bold transition-colors duration-300', {
            'text-blue-600': !isFinalCount,
            'text-green-500': isFinalCount,
          })}
        >
          {isLoading ? '...' : value}
        </div>
      </div>
      <div className="space-x-4">
        <Button onClick={start} disabled={isStartButtonDisabled} size="lg">
          {getStartButtonLabel()}
        </Button>
        <Button onClick={pause} disabled={isPauseButtonDisabled} variant="secondary" size="lg">
          Pausar
        </Button>
        <Button onClick={reset} disabled={isResetButtonDisabled} variant="destructive" size="lg">
          Reiniciar
        </Button>
      </div>
      {status === 'finalizado' && (
        <p className="mt-6 text-2xl text-green-500 font-semibold">Contagem finalizada!</p>
      )}
    </div>
  );
};
