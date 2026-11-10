import type {
  BlockCompletionData,
  BlockInfo,
  FCCUserProfile,
  ParsedFCCResult,
  UserCompletedChallenge
} from '../types/fcc.ts';
import curriculumData from '../data/curriculumBlocks.json';

const curriculumBlocks = curriculumData as Record<string, BlockInfo>;

// Inverted index for O(1) lookup of challengeId -> blockName
const challengeIdToBlockMap = new Map<string, string>();
for (const [blockKey, blockInfo] of Object.entries(curriculumBlocks)) {
  for (const id of blockInfo.challengeIds) {
    if (!challengeIdToBlockMap.has(id)) {
      challengeIdToBlockMap.set(id, blockKey);
    }
  }
}

/**
 * Extracts the user profile and completed challenges from various JSON structures.
 */
export function extractUserProfile(data: any): { username: string; profile: FCCUserProfile } {
  if (!data || typeof data !== 'object') {
    throw new Error('El JSON proporcionado no es un objeto válido.');
  }

  // 1. Standard format: { entities: { user: { [username]: { completedChallenges: [...] } } }, result: 'username' }
  if (data.entities && data.entities.user) {
    const username = data.result || Object.keys(data.entities.user)[0];
    const profile = data.entities.user[username];
    if (profile) {
      return {
        username: profile.username || username || 'Usuario de freeCodeCamp',
        profile: {
          ...profile,
          completedChallenges: Array.isArray(profile.completedChallenges) ? profile.completedChallenges : []
        }
      };
    }
  }

  // 2. Direct user profile object: { username: '...', completedChallenges: [...] }
  if (Array.isArray(data.completedChallenges)) {
    return {
      username: data.username || 'Usuario de freeCodeCamp',
      profile: {
        username: data.username || 'Usuario de freeCodeCamp',
        name: data.name,
        about: data.about,
        picture: data.picture,
        location: data.location,
        points: data.points,
        completedChallenges: data.completedChallenges
      }
    };
  }

  // 3. User object nested: { user: { completedChallenges: [...] } }
  if (data.user && Array.isArray(data.user.completedChallenges)) {
    return {
      username: data.user.username || 'Usuario de freeCodeCamp',
      profile: data.user
    };
  }

  throw new Error('No se encontraron desafíos completados (completedChallenges) en el JSON proporcionado.');
}

/**
 * Parses user completed challenges and aggregates them into curriculum blocks.
 */
export function parseFCCUserData(
  rawData: any,
  options: { skipUnstarted?: boolean } = {}
): ParsedFCCResult {
  const { username, profile } = extractUserProfile(rawData);
  const userCompleted = profile.completedChallenges || [];

  // Initialize aggregated blocks
  const aggregatedBlocks: Record<string, BlockCompletionData> = {};
  for (const [blockKey, blockInfo] of Object.entries(curriculumBlocks)) {
    aggregatedBlocks[blockKey] = {
      blockName: blockInfo.blockName,
      blockLabel: blockInfo.blockLabel || blockInfo.blockName.replace(/-/g, ' '),
      superBlock: blockInfo.superBlock,
      moduleName: blockInfo.moduleName,
      totalChallenges: blockInfo.totalChallenges,
      completedCount: 0,
      completionPercentage: 0,
      started: false,
      completedChallenges: []
    };
  }

  // Set to avoid duplicates if user has completed a challenge multiple times
  const processedChallengeIds = new Set<string>();
  const unmappedCompleted: UserCompletedChallenge[] = [];

  for (const completed of userCompleted) {
    if (!completed || !completed.id || processedChallengeIds.has(completed.id)) {
      continue;
    }
    processedChallengeIds.add(completed.id);

    const blockKey = challengeIdToBlockMap.get(completed.id);
    if (blockKey && aggregatedBlocks[blockKey]) {
      aggregatedBlocks[blockKey].completedChallenges.push(completed);
      aggregatedBlocks[blockKey].completedCount++;
    } else {
      unmappedCompleted.push(completed);
    }
  }

  // If there are legacy or uncategorized challenges, add a dedicated block so no progress is missed
  if (unmappedCompleted.length > 0) {
    const unmappedKey = 'legacy-or-other-challenges';
    aggregatedBlocks[unmappedKey] = {
      blockName: unmappedKey,
      blockLabel: 'Desafíos Legacy / No clasificados',
      superBlock: 'legacy-other',
      moduleName: 'legacy',
      totalChallenges: unmappedCompleted.length,
      completedCount: unmappedCompleted.length,
      completionPercentage: 100,
      started: true,
      completedChallenges: unmappedCompleted
    };
  }

  // Calculate percentages and statistics
  let totalCurriculumChallenges = 0;
  let blocksStarted = 0;
  let blocksCompleted = 0;
  const filteredBlocks: Record<string, BlockCompletionData> = {};

  for (const [blockKey, blockData] of Object.entries(aggregatedBlocks)) {
    totalCurriculumChallenges += blockData.totalChallenges;
    
    if (blockData.totalChallenges > 0) {
      const pct = (blockData.completedCount / blockData.totalChallenges) * 100;
      blockData.completionPercentage = parseFloat(Math.min(pct, 100).toFixed(2));
    } else {
      blockData.completionPercentage = 0;
    }

    blockData.started = blockData.completedCount > 0;

    if (blockData.started) {
      blocksStarted++;
    }
    if (blockData.totalChallenges > 0 && blockData.completedCount >= blockData.totalChallenges) {
      blocksCompleted++;
    }

    if (options.skipUnstarted && !blockData.started) {
      continue;
    }

    filteredBlocks[blockKey] = blockData;
  }

  const overallPercentage = totalCurriculumChallenges > 0
    ? parseFloat(((processedChallengeIds.size / totalCurriculumChallenges) * 100).toFixed(2))
    : 0;

  return {
    username,
    profile: {
      name: profile.name,
      about: profile.about,
      picture: profile.picture,
      location: profile.location,
      points: profile.points
    },
    summary: {
      totalCurriculumChallenges,
      totalUserCompleted: processedChallengeIds.size,
      totalBlocks: Object.keys(aggregatedBlocks).length,
      blocksStarted,
      blocksCompleted,
      overallPercentage
    },
    blocks: filteredBlocks
  };
}
