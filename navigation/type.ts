// navigation/types.ts

export type RootStackParamList = {
    Movies: undefined;
    TVShows: undefined;
    Search: undefined;
    ShowScreen: { id: number; type: 'movie' | 'tv' };
  };
  