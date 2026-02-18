import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// {
//   "data": [
//     {
//       "id": "17918195224117851"
//     },
//     {
//       "id": "17895695668004550"
//     },
//     {
//       "id": "17899305451014820"
//     },
//     {
//       "id": "17896450804038745"
//     },
//     {
//       "id": "17881042411086627"
//     },
//     {
//       "id": "17869102915168123"
//     }
//   ],
//   "paging": {
//     "cursors": {
//       "before": "QVFIUkdGRXA2eHNNTUs4T1ZAXNGFxQTAtd3U4QjBLd1B2NXRMM1NkcnhqRFdBcEUzSDVJZATFoLWtXMWZAGU2VrRTk2RHVtTVlDckI2NjN0UERFa2JrUk4yMW13",
//       "after": "QVFIUmlwbnFsM3N2cV9lZAFdCa0hDeV9qMVliT0VuMmJyNENxZA180c0t6VjFQVEJaTE9XV085aU92OUFLNFB6Szd2amo5aV9rTlVBcnNlWmEtMzYxcE1HSFR3"
//     }
//   }
// }

export type UserMedia = {
    data: { id: string }[];
    paging: {
        cursors: {
            before: string;
            after: string;
        };
    };
};

export type UserMediaStore = {
    userMedia: UserMedia | null;
    setUserMedia: (newUserMedia: UserMedia) => void;
};

export const useUserMedia = create<UserMediaStore>()(
    devtools(set => ({
        userMedia: null as UserMedia | null,
        setUserMedia: (newUserMedia: UserMedia) => set({ userMedia: newUserMedia }),
    }))
);
