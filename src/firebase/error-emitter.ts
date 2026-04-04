import { EventEmitter } from 'events';

// It is critical that this is a single shared instance.
// Do not create new instances of this in other files.
export const errorEmitter = new EventEmitter();
