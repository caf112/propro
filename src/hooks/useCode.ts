import { generateClient } from "aws-amplify/api";
import { useQuery } from "@tanstack/react-query";
import { Schema } from '@/../amplify/data/resource';

const client = generateClient<Schema>({
    authMode: 'userPool',
});

// Custom hook for fetching codes, stages, blanks, and scores
export const useCode = () => {
    // Fetch stages
    const stagesQuery = useQuery({
        queryKey: ["stages"],
        queryFn: async () => {
            const { data: stagesData, errors } = await client.models.Stage.list({});
            if (errors) {
                throw new Error(`Failed to fetch stages: ${errors}`);
            }
            return stagesData;
        },
    });

    // Fetch codes
    const codesQuery = useQuery({
        queryKey: ["codes"],
        queryFn: async () => {
            const { data: codesData, errors } = await client.models.Code.list({});
            if (errors) {
                throw new Error(`Failed to fetch codes: ${errors}`);
            }
            return codesData;
        },
    });

    // Fetch blanks
    const blanksQuery = useQuery({
        queryKey: ["blanks"],
        queryFn: async () => {
            const { data: blanksData, errors } = await client.models.Blanks.list({});
            if (errors) {
                throw new Error(`Failed to fetch blanks: ${errors}`);
            }
            return blanksData;
        },
    });

    // Fetch scores
    const scoresQuery = useQuery({
        queryKey: ["scores"],
        queryFn: async () => {
            const { data: scoresData, errors } = await client.models.Score.list({});
            if (errors) {
                throw new Error(`Failed to fetch scores: ${errors}`);
            }
            return scoresData;
        },
    });

    const addScore = async (stageId: string, newScore: number) => {
        try {
            // 現在のステージのスコア数を取得
            const { data: currentScores, errors: scoreErrors } = await client.models.Score.list({
                filter: { scoreId: { eq: stageId } },
            });

            if (scoreErrors) {
                throw new Error(`Failed to fetch scores for stage ${stageId}: ${scoreErrors}`);
            }

            // スコア数に基づいて attempt を計算
            const attempt = currentScores.length + 1;

            // 新しいスコアを追加
            const { data: scoreData, errors } = await client.models.Score.create({
                scoreId: stageId,
                score: newScore,
                attempt,
            });

            if (errors) {
                throw new Error(`Failed to add score: ${errors}`);
            }

            console.log("Score successfully added:", scoreData);
            return scoreData;
        } catch (error) {
            console.error("Error in addScore:", error);
            throw error;
        }
    }

    return {
        stages: stagesQuery.data || [],
        codes: codesQuery.data || [],
        blanks: blanksQuery.data || [],
        scores: scoresQuery.data || [],
        isLoading: stagesQuery.isLoading || codesQuery.isLoading || blanksQuery.isLoading || scoresQuery.isLoading,
        error: stagesQuery.error || codesQuery.error || blanksQuery.error || scoresQuery.error,
        addScore,
    };
};
