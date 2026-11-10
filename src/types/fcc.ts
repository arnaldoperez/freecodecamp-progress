export interface UserCompletedChallenge {
  id: string;
  completedDate: number;
  files: unknown[];
  solution?: string;
  githubLink?: string;
  challengeType?: number;
}

export interface FCCUserProfile {
  username?: string;
  name?: string;
  about?: string;
  picture?: string;
  location?: string;
  points?: number;
  joinDate?: string;
  completedChallenges: UserCompletedChallenge[];
}

export interface FCCUserProfileResponse {
  entities?: {
    user?: {
      [username: string]: FCCUserProfile;
    };
  };
  result?: string;
}

export interface BlockInfo {
  blockName: string;
  blockLabel: string;
  superBlock: string;
  moduleName: string | null;
  totalChallenges: number;
  challengeIds: string[];
}

export interface BlockCompletionData {
  blockName: string;
  blockLabel: string;
  superBlock: string;
  moduleName: string | null;
  totalChallenges: number;
  completedCount: number;
  completionPercentage: number;
  started: boolean;
  completedChallenges: UserCompletedChallenge[];
}

export interface ParsedFCCSummary {
  totalCurriculumChallenges: number;
  totalUserCompleted: number;
  totalBlocks: number;
  blocksStarted: number;
  blocksCompleted: number;
  overallPercentage: number;
}

export interface ParsedFCCResult {
  username: string;
  profile?: {
    name?: string;
    about?: string;
    picture?: string;
    location?: string;
    points?: number;
  };
  summary: ParsedFCCSummary;
  blocks: Record<string, BlockCompletionData>;
}
