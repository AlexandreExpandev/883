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

  const isRunning = status === 'running';
  const isPaused = status === 'paused';
  const isFinished = isFinalCount;

  const handlePrimaryAction = () => {
    if (isRunning) {
      pause();
    } else {
      // This handles 'paused', 'stopped', and 'finished' states.
      // The button is disabled for 'finished', so this won't be called in that state.
      start();
    }
  };

  const getPrimaryButtonLabel = () => {
    if (isRunning) return 'Pausar';
    if (isPaused) return 'Retomar';
    return 'Iniciar';
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Contador de 1 a 10</h1>
      <div className="my-8">
        <p className="text-lg mb-2">Número Atual:</p>
        {/* Feature [ID: 2] Exibir Número Atual */}
        <div
          className={cn('text-9xl font-bold transition-colors duration-300', {
            'text-blue-600': !isFinished,
            'text-green-500': isFinished, // Destaque Visual de Finalização
          })}
        >
          {isLoading ? '...' : value}
        </div>
      </div>
      <div className="space-x-4">
        {/* Feature [ID: 1, 3] Iniciar/Pausar/Retomar Contagem */}
        <Button
          onClick={handlePrimaryAction}
          disabled={isFinished || isMutating}
          variant={isRunning ? 'secondary' : 'default'}
          size="lg"
        >
          {getPrimaryButtonLabel()}
        </Button>

        {/* Feature [ID: 4] Reiniciar Contagem */}
        <Button onClick={reset} disabled={isMutating} variant="destructive" size="lg">
          Reiniciar
        </Button>
      </div>
      {isFinished && (
        <p className="mt-6 text-2xl text-green-500 font-semibold">Contagem finalizada!</p>
      )}
    </div>
  );
};
