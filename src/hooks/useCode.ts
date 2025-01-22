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

    return {
        stages: stagesQuery.data || [],
        codes: codesQuery.data || [],
        blanks: blanksQuery.data || [],
        scores: scoresQuery.data || [],
        isLoading: stagesQuery.isLoading || codesQuery.isLoading || blanksQuery.isLoading || scoresQuery.isLoading,
        error: stagesQuery.error || codesQuery.error || blanksQuery.error || scoresQuery.error,
    };
};
