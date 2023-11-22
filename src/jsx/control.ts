import { createSignal } from 'solid-js';

const [from, setFrom] = createSignal(-1);
const [id, setId] = createSignal(-1);

export {
  from,
  setFrom,
  id,
  setId,
};