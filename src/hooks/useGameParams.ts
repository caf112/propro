import { useSearchParams } from "react-router-dom"

export const useModeParams = () => {
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode');
    if (!mode) {
        return console.log('mode is mull')
    }
    return {mode}
}


export const useStageParams = () => {
    const [searchParams] = useSearchParams();
    const stage = searchParams.get('stage');
    const stageNumber = stage ? parseInt(stage) : null;
    
    return {stage, stageNumber}
}

