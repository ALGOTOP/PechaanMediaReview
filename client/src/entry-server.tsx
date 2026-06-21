import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";

export { routes } from "./routes.config";

export function render(url: string) {
  const staticLocationHook = () =>
    [url, () => {}] as [string, (path: string) => void];

  return renderToString(
    <Router hook={staticLocationHook}>
      <App />
    </Router>
  );
}
