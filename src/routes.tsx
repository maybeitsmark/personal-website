import { lazy } from 'react';

const projects = [
  { name: 'TriangleTrailStatus', path: 'triangle-trail-status' },
  { name: 'SmartPalette', path: 'smart-palette' },
  { name: 'AmbieSense', path: 'ambie-sense' },
  { name: 'AudioVisualizer', path: 'audio-visualizer' },
  { name: 'LifesAGame', path: 'lifes-a-game' },
  { name: 'CardinalPride', path: 'cardinal-pride' },
  { name: 'Jobzen', path: 'jobzen' },
  { name: 'Affinity', path: 'affinity' },
  { name: 'FuckYou', path: 'fuck-you-sign' },
  { name: 'BoulderParks', path: 'boulder-parks' },
  { name: 'Nihilism', path: 'nihilism' },
  { name: 'SpotifyRewards', path: 'spotify-account-rewards' },
]

export const projectRoutes = projects.map(({ name, path }) => {
  const Component = lazy(() => import(`./pages/projects/${name}`))
  return { path, element: <Component /> }
});