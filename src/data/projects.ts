// Aggregates individual project data modules into a single lookup object and derives corresponding card metadata for rendering
// https://github.com/maybeitsmark 
// 2026

import { NihilismData } from "./nihilism";
import { BoulderParksData } from "./boulder_parks";
import { Hang10Data } from "./hang_10"
import { FuckYouSignData } from "./fuck_you_sign";
import { AffinityData } from "./affinity";
import { RegenCardData } from "./regen_card";
import { JobZenData } from "./jobzen";
import { StaySleepyData } from "./staysleepy";
import { SpotifyRewardsData } from "./spotify_rewards";

export const projects = {
  "nihilism": NihilismData,
  "boulder-parks": BoulderParksData,
  "hang-10": Hang10Data,
  "stay-sleepy": StaySleepyData,
  "fuck-you-sign": FuckYouSignData,
  "spotify-account-rewards": SpotifyRewardsData,
  "regen-card": RegenCardData,
  "affinity": AffinityData,
  "job-zen": JobZenData,
} as const;

export const projectCards = Object.values(projects).map((project) => ({
  id: project.slug,
  name: project.title,
  description: project.description,
  image: project.thumbnail,
  tags: project.tags,
  externalUrl: project.externalUrl,
}));
