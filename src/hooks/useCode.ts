import { useQuery } from "@tanstack/react-query";

export const useCode = () => {
    const codeQuery = useQuery({
        queryKey: ["codes"],
        queryFn: async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/comments');
                
                if (!response.ok) {
                    throw new Error(`HTTPエラー: ${response.status}`);
                }
                
                const codes = await response.json();
                return codes; 
            } catch (error) {
                console.error("コード取得エラー\n", error);
                throw error; 
            }
        }
    });

    return { ...codeQuery };
};
