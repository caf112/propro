import { useCode } from "@/hooks/useCode";
import { Loader } from "@aws-amplify/ui-react";

export const TestGame = () => {
    const { data } = useCode();
    
    
  return (
    <div>
        <div>testgame</div>
        {data ? (
            <div>
                {data.map((code: any) => (
                    <div key={code.id}>
                        <h2>{code.title}</h2>
                        <p>{code.description}</p>
                    </div>
                ))}
            </div>
        ): (
            <Loader />
        )}
    </div>
  )
}

export default TestGame