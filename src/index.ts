import { RaidsStates } from "./raids-states.js";

const rs = RaidsStates.instance();

if (typeof window !== 'undefined') {
    // Adds global RaidsStates instance to browser window object
    (window as any).RaidsStates = rs;
} else {
    // Adds global RaidsStates to node js
    (global as any).RaidsStates = rs;
}

export default rs;