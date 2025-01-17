import { useSearchParams } from "react-router-dom"


export const useStageParams = () => {
    const [searchParams] = useSearchParams();
    const stage = searchParams.get('stage');
    const stageNumber = stage ? parseInt(stage) : null;
    
    return {stage, stageNumber}
}

