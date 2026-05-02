import { Router, Request, Response } from "express";

const router = Router();

// --- Types & Interfaces ---

export interface FCCChallengeData {
    id: string;
    block: string;
    blockLabel: string;
    challengeType: number;
    title: string;
    order: number;
    superBlock: string;
    dashedName: string;
    blockLayout: string;
    chapter: string | null;
    module: string | null;
}

export interface FCCChallengeNode {
    challenge: FCCChallengeData;
}

export interface AppDataResponse {
    result: {
        data: {
            allChallengeNode: {
                nodes: FCCChallengeNode[];
            };
        };
    };
}

export interface UserCompletedChallenge {
    id: string;
    completedDate: number;
    files: unknown[];
    solution?: string;
    githubLink?: string;
    challengeType?: number;
}

export interface UserProfileResponse {
    entities: {
        user: {
            [username: string]: {
                completedChallenges: UserCompletedChallenge[];
            };
        };
    };
    result: string;
}

export interface BlockInfo {
    blockName: string;
    blockLabel: string;
    superBlock: string;
    moduleName: string | null;
    totalChallenges: number;
    challengeIds: Set<string>;
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

// --- State ---

const blocksMap: Record<string, BlockInfo> = {};

// --- Initialization ---

async function loadChallenges(): Promise<void> {
    try {
        const superblocks = [
            'python-v9',
            'back-end-development-and-apis-v9',
            'javascript-v9',
            'responsive-web-design-v9'
        ];

        const fetchPromises = superblocks.map(async (sb) => {
            const url = `https://www.freecodecamp.org/page-data/learn/${sb}/page-data.json`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    console.warn(`Failed to fetch ${sb} data: ${response.statusText}`);
                    return null;
                }
                return await response.json();
            } catch (err) {
                console.warn(`Error fetching ${sb}:`, err);
                return null;
            }
        });

        const results = await Promise.all(fetchPromises);
        let allNodes: any[] = [];
        let fetchedSuccessfully = false;

        for (const data of results) {
            if (data && data.result && data.result.data && data.result.data.allChallengeNode) {
                allNodes = allNodes.concat(data.result.data.allChallengeNode.nodes);
                fetchedSuccessfully = true;
            }
        }

        if (!fetchedSuccessfully) {
            console.warn("Warning: Failed to fetch any superblock data.");
            console.warn("Falling back to local server/challenges.json mock data...");
            
            const fs = await import("fs/promises");
            const path = await import("path");
            const filePath = path.join(process.cwd(), "server", "challenges.json");
            const fileContent = await fs.readFile(filePath, "utf-8");
            const mockData = JSON.parse(fileContent);
            if (mockData && mockData.result && mockData.result.data && mockData.result.data.allChallengeNode) {
                allNodes = mockData.result.data.allChallengeNode.nodes;
            }
        }

        for (const node of allNodes) {
            const challenge = node.challenge;
            if (!challenge || !challenge.block) continue;
            
            const blockKey = challenge.block;

            if (!blocksMap[blockKey]) {
                blocksMap[blockKey] = {
                    blockName: challenge.block,
                    blockLabel: challenge.blockLabel,
                    superBlock: challenge.superBlock,
                    moduleName: challenge.module || null,
                    totalChallenges: 0,
                    challengeIds: new Set<string>()
                };
            }

            if (challenge.id) {
                blocksMap[blockKey].challengeIds.add(challenge.id);
            }
            blocksMap[blockKey].totalChallenges = blocksMap[blockKey].challengeIds.size;
        }

        console.log(`Loaded ${Object.keys(blocksMap).length} challenge blocks successfully.`);
    } catch (error) {
        console.error("Error loading challenges on startup:", error);
    }
}

// Load the challenges on startup to ease the requests on the API
loadChallenges();

// --- Routes ---

router.get("/get-user-challenges/:username", async (req: Request, res: Response) => {
    const { username } = req.params as { username: string };

    try {
        // 1. Fetch user profile data
        const profileUrl = `https://api.freecodecamp.org/users/get-public-profile?username=${encodeURIComponent(username)}`;
        const response = await fetch(profileUrl);

        if (!response.ok) {
            res.status(response.status).json({ error: "Failed to fetch user data" });
            return;
        }

        const userData = (await response.json()) as UserProfileResponse;

        // Check if user exists
        if (!userData.entities.user || !userData.entities.user[userData.result]) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const userProfile = userData.entities.user[userData.result];
        const completedChallenges = userProfile.completedChallenges || [];

        // 2. Aggregate user completions by block
        // We will initialize a copy of block data for this user
        const aggregatedBlocks: Record<string, BlockCompletionData> = {};

        for (const [blockKey, blockInfo] of Object.entries(blocksMap)) {
            aggregatedBlocks[blockKey] = {
                blockName: blockInfo.blockName,
                blockLabel: blockInfo.blockLabel,
                superBlock: blockInfo.superBlock,
                moduleName: blockInfo.moduleName,
                totalChallenges: blockInfo.totalChallenges,
                completedCount: 0,
                completionPercentage: 0,
                started: false,
                completedChallenges: []
            };
        }

        // Process each completed challenge
        for (const completed of completedChallenges) {
            // Find which block this challenge belongs to
            for (const [blockKey, blockInfo] of Object.entries(blocksMap)) {
                if (blockInfo.challengeIds.has(completed.id)) {
                    const userBlock = aggregatedBlocks[blockKey];
                    userBlock.completedChallenges.push(completed);
                    userBlock.completedCount++;
                    break; // A challenge belongs to only one block
                }
            }
        }

        // Calculate percentages and finalize the output format
        const output: Record<string, BlockCompletionData> = {};

        for (const [blockKey, blockData] of Object.entries(aggregatedBlocks)) {
            // Optional: Only include blocks with completed challenges, or all blocks?
            // We will include all blocks so the client can see overall progress
            if (blockData.totalChallenges > 0) {
                blockData.completionPercentage = parseFloat(
                    ((blockData.completedCount / blockData.totalChallenges) * 100).toFixed(2)
                );
            } else {
                blockData.completionPercentage = 0;
            }

            blockData.started = blockData.completedCount > 0;
            output[blockKey] = blockData;
        }

        res.json(output);

    } catch (error) {
        console.error("Error processing user challenges:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;