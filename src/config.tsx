import { init } from '@instantdb/react';

import type { Character } from '@/lib/types';

export const db = init<{
    characters: Character;
}>({ appId: import.meta.env.VITE_INSTANT_APP_ID }
);