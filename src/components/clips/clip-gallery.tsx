"use client";

import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";

import { ClipCard } from "@/components/clips/clip-card";
import { filterClips } from "@/lib/clip-utils";
import { clips } from "@/data/clips";
import { ClipCategory } from "@/types";

export function ClipGallery() {
  const anchor1 = useComboboxAnchor();
  const anchor2 = useComboboxAnchor();
  const [inputFilter, setInputFilter] = useState("");
  const [gameFilter, setGameFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  const filteredClips = useMemo(() => {
    return filterClips(clips, {
      search: inputFilter,
      games: gameFilter,
      categories: categoryFilter,
    });
  }, [inputFilter, gameFilter, categoryFilter]);

  const possibleGames = [...new Set(clips.map((c) => c.game))];
  const possibleCategories: ClipCategory[] = ["bugs", "funny", "highlights"];

  return (
    <div>
      <div className="flex flex-col gap-4 mb-5 lg:flex-row">
        <Input
          value={inputFilter}
          placeholder="Search for a Clip..."
          onChange={(e) => setInputFilter(e.target.value)}
        />
        <div className="flex flex-col gap-1 md:flex-row items-start">
          <Combobox
            items={possibleGames}
            multiple
            value={gameFilter}
            onValueChange={setGameFilter}
          >
            <ComboboxChips ref={anchor1} className="w-full max-w-xs">
              <ComboboxValue>
                {gameFilter.map((item) => (
                  <ComboboxChip key={item}>{item}</ComboboxChip>
                ))}
              </ComboboxValue>
              <ComboboxChipsInput placeholder="Filter by Game(s)" />
            </ComboboxChips>
            <ComboboxContent anchor={anchor1}>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>

          <Combobox
            items={possibleCategories}
            multiple
            value={categoryFilter}
            onValueChange={setCategoryFilter}
          >
            <ComboboxChips ref={anchor2} className="w-full max-w-xs">
              <ComboboxValue>
                {categoryFilter.map((item) => (
                  <ComboboxChip key={item}>{item}</ComboboxChip>
                ))}
              </ComboboxValue>
              <ComboboxChipsInput placeholder="Filter by Category" />
            </ComboboxChips>
            <ComboboxContent anchor={anchor2}>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-10 justify-items-center">
        {filteredClips.map((clip) => (
          <li key={clip.id}>
            <ClipCard clip={clip} />
          </li>
        ))}
      </ul>
    </div>
  );
}
