export type AuthEventType = "token-refresh-success" | "token-refresh-failed";

export interface AuthEventPayload {
  "token-refresh-success": { accessToken: string; expiresIn: number };
  "token-refresh-failed": { reason?: string };
}

type Listener<T> = (payload: T) => void;

class AuthEventEmitter {
  private listeners: {
    [K in AuthEventType]?: Set<Listener<AuthEventPayload[K]>>;
  } = {};

  emit<T extends AuthEventType>(event: T, payload: AuthEventPayload[T]): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      eventListeners.forEach((listener) => {
        listener(payload);
      });
    }
  }

  on<T extends AuthEventType>(
    event: T,
    listener: Listener<AuthEventPayload[T]>,
  ): this {
    if (!this.listeners[event]) {
      this.listeners[event] = new Set() as any;
    }
    (this.listeners[event] as any).add(listener);
    return this;
  }

  off<T extends AuthEventType>(
    event: T,
    listener: Listener<AuthEventPayload[T]>,
  ): this {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      (eventListeners as Set<Listener<AuthEventPayload[T]>>).delete(listener);
    }
    return this;
  }

  removeAllListeners<T extends AuthEventType>(event?: T): this {
    if (event) {
      delete this.listeners[event];
    } else {
      this.listeners = {};
    }
    return this;
  }
}

export const authEvents = new AuthEventEmitter();
