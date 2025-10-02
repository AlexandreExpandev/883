import { useCounter } from '@/domain/counter';
import { Button } from '@/core/components/Button';
import { useEffect } from 'react';

/**
 * @page HomePage
 * @summary The main page of the application where the counter is displayed and controlled.
 * @domain counter
 * @type page-component
 * @category functional
 */
export const HomePage = () => {
  const { value, status, isLoading, isMutating, start, pause, reset } = useCounter();

  useEffect(() => {
    if (value === 10) {
      // Feature [ID: 5] Finalizar ao Atingir 10
      // The backend handles the 'finished' state, so we just reflect it.
      console.log('Counter reached 10 and finished!');
    }
  }, [value]);

  const isRunning = status === 'running';
  const isFinished = status === 'finished';

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Contador de 1 a 10</h1>
      <div className="my-8">
        <p className="text-lg mb-2">Número Atual:</p>
        {/* Feature [ID: 2] Exibir Número Atual */}
        <div className="text-9xl font-bold text-blue-600">{isLoading ? '...' : value}</div>
      </div>
      <div className="space-x-4">
        {/* Feature [ID: 1] Iniciar Contagem */}
        <Button onClick={start} disabled={isRunning || isFinished || isMutating} size="lg">
          {status === 'paused' && value > 0 ? 'Continuar' : 'Iniciar'}
        </Button>
        {/* Feature [ID: 3] Pausar Contagem */}
        <Button
          onClick={pause}
          disabled={!isRunning || isFinished || isMutating}
          variant="secondary"
          size="lg"
        >
          Pausar
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
