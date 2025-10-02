import { Server as SocketIOServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import { logger } from '../utils/logger';
import { CounterDisplay } from '../services/counter/counterTypes';

/**
 * @summary
 * Socket.io service for real-time communication
 */
class SocketService {
  private io: SocketIOServer | null = null;
  private userSockets: Map<number, string[]> = new Map();

  /**
   * @summary
   * Initializes the Socket.io server
   *
   * @param httpServer - HTTP server instance
   */
  initialize(httpServer: HttpServer): void {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: '*', // In production, restrict to your frontend domain
        methods: ['GET', 'POST'],
      },
    });

    this.io.on('connection', (socket) => {
      logger.info(`Socket connected: ${socket.id}`);

      // Handle user subscription to counter updates
      socket.on('subscribe', (userId: number) => {
        if (!userId) return;

        // Store the socket ID for this user
        const userSocketIds = this.userSockets.get(userId) || [];
        userSocketIds.push(socket.id);
        this.userSockets.set(userId, userSocketIds);

        logger.info(`User ${userId} subscribed to counter updates via socket ${socket.id}`);
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        logger.info(`Socket disconnected: ${socket.id}`);

        // Remove the socket ID from all user mappings
        this.userSockets.forEach((socketIds, userId) => {
          const updatedSocketIds = socketIds.filter((id) => id !== socket.id);
          if (updatedSocketIds.length === 0) {
            this.userSockets.delete(userId);
          } else {
            this.userSockets.set(userId, updatedSocketIds);
          }
        });
      });
    });

    logger.info('Socket.io server initialized');
  }

  /**
   * @summary
   * Emits a counter update event to all connected clients for a specific user
   *
   * @param userId - User identifier
   * @param counterData - Counter data to emit
   */
  emitCounterUpdate(userId: number, counterData: CounterDisplay): void {
    if (!this.io) {
      logger.error('Socket.io server not initialized');
      return;
    }

    const socketIds = this.userSockets.get(userId);
    if (!socketIds || socketIds.length === 0) {
      // No connected clients for this user
      return;
    }

    // Emit to all sockets associated with this user
    socketIds.forEach((socketId) => {
      this.io?.to(socketId).emit('counter_update', counterData);
    });

    logger.debug(`Emitted counter update to user ${userId}`, { counterData });
  }
}

export const socketService = new SocketService();
