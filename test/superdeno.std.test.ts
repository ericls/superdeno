import { assertEquals, Server } from "../deps.ts";
import { describe, it } from "./utils.ts";
import { superdeno } from "../mod.ts";
import { ConnLike } from "../src/types.ts";

describe("std: superdeno", () => {
  it("std: superdeno(server): should support `superdeno(server)`", async () => {
    const server = new Server({
      port: 0,
      handler() {
        return new Response("hello");
      },
    });

    await superdeno(server)
      .get("/")
      .expect("hello");
  });

  it("std: superdeno(server): should support `superdeno(server.Handler)`", async () => {
    let expectedConnInfo: ConnLike | undefined = undefined;
    function handler(_req: Request, connInfo?: ConnLike) {
      expectedConnInfo = connInfo;
      return new Response("hello");
    }

    await superdeno(handler)
      .get("/")
      .expect("hello");
    assertEquals(Boolean(expectedConnInfo), true);
  });

  it("std: superdeno(url): should support `superdeno(url)`", async () => {
    const server = new Server({
      port: 0,
      handler() {
        return new Response("hello");
      },
    });

    const serverPromise = server.listenAndServe();
    const address = server.addrs[0] as Deno.NetAddr;
    const url = `http://127.0.0.1:${address.port}`;

    await superdeno(url)
      .get("/")
      .expect("hello");

    server.close();
    await serverPromise;
  });
});
