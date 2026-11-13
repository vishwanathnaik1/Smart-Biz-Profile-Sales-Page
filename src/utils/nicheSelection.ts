import { NICHES_DATA, type NicheData, type NicheId } from "../data/nichesData";

export const DEFAULT_NICHE_ID: NicheId = "tarot";

export function getNicheById(id: string): NicheData {
  return NICHES_DATA.find((niche) => niche.id === id) ?? NICHES_DATA[0];
}

export function getAllNicheIds(): NicheId[] {
  return NICHES_DATA.map((niche) => niche.id);
}
