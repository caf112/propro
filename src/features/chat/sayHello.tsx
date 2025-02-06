import type { Schema } from "amplify/data/resource";
import { Amplify } from "aws-amplify"
import { generateClient } from "aws-amplify/api";
import outputs from "@/../amplify_outputs.json"
import { useEffect, useState } from "react";

Amplify.configure(outputs)

const client = generateClient<Schema>()


export const SayHello = () => {
    const [response, setResponse] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("client.queries:\n", client.queries)
                console.log("client.queries.chatWebSocket:\n", client.queries?.chatWebSocket)

                const result = client.queries.chatWebSocket({
                    name: "Amplify",
                });

                console.log("API Response:", result)

                if (result && typeof (await result).data === "string") {
                    setResponse((await result).data);
                } else {
                    console.warn("Unexpected response type:", result);
                    setResponse("無効なレスポンス");
                }
            } catch (error) {
                console.error("error\n", error)
                setResponse("エラー発生")
            }
        }

        fetchData()
    }, [])
    
  return (
    <div>
        <h1>Chat WebSocket</h1>
        <p>{response ?? "読みこみちゅ..."} </p>
    </div>
  )
}
