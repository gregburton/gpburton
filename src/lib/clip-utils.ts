import type { Clip } from "@/types";

type ClipFilters = {
  search: string;
  games: string[];
  categories: string[];
};

export function filterClips(clips: Clip[], filters: ClipFilters): Clip[] {
  const query = filters.search.trim().toLowerCase();

  return clips.filter((clip) => {
    const searchableText = [
      clip.title,
      clip.description ?? "",
      clip.game,
      ...clip.tags,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = !query || searchableText.includes(query);

    const matchesGame =
      filters.games.length === 0 || filters.games.includes(clip.game);

    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(clip.category);

    return matchesSearch && matchesGame && matchesCategory;
  });
}
