import { render } from 'solid-js/web';
import { App } from './test';

import 'virtual:uno.css';

export * from './game';
export * from './generator';
export * from './screen';
export * from './validator';

if (import.meta.env.MODE === 'development') {
  render(
    () => <App />,
    document.getElementById('root')!,
  );
}