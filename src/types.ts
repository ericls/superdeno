// deno-lint-ignore-file no-explicit-any

export interface ConnLike extends Partial<Deno.Conn> {
  readonly localAddr: Deno.Addr;
  readonly remoteAddr: Deno.Addr;
}

export interface RequestHandlerLike {
  (
    req: any,
    connLike?: ConnLike,
  ): Promise<any> | Promise<void> | any | void;
}

export interface LegacyServerLike {
  listener: Deno.Listener;
  close(): void;
}

export interface NativeServerLike {
  readonly addrs: Deno.Addr[];
  listenAndServe(): Promise<void>;
  close(): void;
}

export type ServerLike = LegacyServerLike | NativeServerLike;

export interface ListenerLike {
  listen(addr: string): ServerLike;
}
