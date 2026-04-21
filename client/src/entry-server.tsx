import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import Home from "@/pages/Home";

const staticLocationHook = () =>
  ["/", () => {}] as [string, (path: string) => void];

export function render() {
  return renderToString(
    <QueryClientProvider client={queryClient}>
      <Router hook={staticLocationHook}>
        <Home />
      </Router>
    </QueryClientProvider>
  );
}
