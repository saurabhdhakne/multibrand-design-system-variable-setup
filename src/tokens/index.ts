import { tokens, type TokenName } from './generated/tokens';

export * from './generated/tokens';

/** `token('color/action/primary')` -> `'var(--color-action-primary)'`, type-checked against the Figma export. */
export const token = (name: TokenName) => tokens[name].var;
