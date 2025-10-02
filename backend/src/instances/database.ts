import sql from 'mssql';
import { config } from '../config';
import { logger } from '../utils/logger';

/**
 * @summary
 * Database connection pool singleton
 */
class Database {
  private static instance: Database;
  private pool: sql.ConnectionPool | null = null;
  private connecting: Promise<sql.ConnectionPool> | null = null;

  private constructor() {}

  /**
   * @summary
   * Gets the singleton instance
   */
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  /**
   * @summary
   * Gets the connection pool, creating it if necessary
   */
  public async getPool(): Promise<sql.ConnectionPool> {
    if (this.pool) {
      return this.pool;
    }

    if (this.connecting) {
      return this.connecting;
    }

    this.connecting = new Promise<sql.ConnectionPool>(async (resolve, reject) => {
      try {
        const pool = new sql.ConnectionPool({
          server: config.database.host,
          port: config.database.port,
          user: config.database.user,
          password: config.database.password,
          database: config.database.database,
          options: config.database.options,
        });

        this.pool = await pool.connect();
        logger.info('Database connection established');
        resolve(this.pool);
      } catch (error) {
        logger.error('Failed to connect to database', { error });
        reject(error);
      } finally {
        this.connecting = null;
      }
    });

    return this.connecting;
  }

  /**
   * @summary
   * Closes the connection pool
   */
  public async closePool(): Promise<void> {
    if (this.pool) {
      await this.pool.close();
      this.pool = null;
      logger.info('Database connection closed');
    }
  }
}

export const database = Database.getInstance();
