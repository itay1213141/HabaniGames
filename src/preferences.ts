import { z } from "zod";

const Preferences = z.object({
  gamesPath: z.string(),
});

type Preference = keyof z.infer<typeof Preferences>;

export const getPreference = (preference: Preference) => {
  const preferences = Preferences.parse({
    gamesPath: "C:/WebGames", // TODO: replace with file read later or tauri-settings module
  });

  return preferences[preference];
};
