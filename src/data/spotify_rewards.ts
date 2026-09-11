// Spotify Rewards Study Data
// https://github.com/maybeitsmark 
// 2026     

import title from '@/assets/images/SpotifyRewards/title.png';
import background from '@/assets/images/SpotifyRewards/background.png';
import why from '@/assets/images/SpotifyRewards/why.png';
import two_stories from '@/assets/images/SpotifyRewards/two_stories.png';
import job_to_be_done from '@/assets/images/SpotifyRewards/job_to_be_done.png';
import these from '@/assets/images/SpotifyRewards/thesis.png';
import account_rewards from '@/assets/images/SpotifyRewards/account_rewards.png';
import account_rewards_2 from '@/assets/images/SpotifyRewards/account_rewards_2.png';
import supporting_features from '@/assets/images/SpotifyRewards/supporting_features.png';
import currently_playing from '@/assets/images/SpotifyRewards/currently_playing.png';
import notifications from '@/assets/images/SpotifyRewards/notifications.png';
import pin_items from '@/assets/images/SpotifyRewards/pin_items.png';
import marketing from '@/assets/images/SpotifyRewards/marketing.png';
import thumbnail from '@/assets/images/SpotifyRewards/thumbnail.png';

export const SpotifyRewardsData: any = {
  title: "Spotify Account Rewards",
  description: "A study examining how Spotify could provide rewards to users",
  theme: {
    background: {
      color1: "#464646",
      color2: "#000000",
      intensity: 0.65,
    },
  },
  tech: "Figma",
  slug: "spotify-account-rewards",
  thumbnail: thumbnail,
  tags: ["UX Research", "Figma", "Visual Design"],
  sections: [
    {
      id: "title",
      type: "image",
      src: title,
      alt: "Title slide",
    },
    {
      id: "background",
      type: "image",
      src: background,
      alt: "Background slide",
    },
    {
      id: "why",
      type: "image",
      src: why,
      alt: "Why slide",
    },
    {
      id: "two_stories",
      type: "image",
      src: two_stories,
      alt: "Two stories slide",
    },
    {
      id: "job_to_be_done",
      type: "image",
      src: job_to_be_done,
      alt: "Job to be done slide",
    },
    {
      id: "these",
      type: "image",
      src: these,
      alt: "Thesis slide",
    },
    {
      id: "account_rewards",
      type: "image",
      src: account_rewards,
      alt: "Account rewards slide",
    },
    {
      id: "account_rewards_2",
      type: "image",
      src: account_rewards_2,
      alt: "Account rewards 2 slide",
    },
    {
      id: "supporting_features",
      type: "image",
      src: supporting_features,
      alt: "Supporting features slide",
    },
    {
      id: "currently_playing",
      type: "image",
      src: currently_playing,
      alt: "Currently playing slide",
    },
    {
      id: "notifications",
      type: "image",
      src: notifications,
      alt: "Notifications slide",
    },
    {
      id: "pin_items",
      type: "image",
      src: pin_items,
      alt: "Pin items slide",
    },
    {
      id: "marketing",
      type: "image",
      src: marketing,
      alt: "Marketing slide",
    },
  ],
};