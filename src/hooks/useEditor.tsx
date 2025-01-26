import { useState, useEffect, useRef } from "react";
import { generateClient } from "aws-amplify/api";
import type { Schema } from '@/../../amplify/data/resource';
import { diffWords, Change } from "diff";
import { useRoom } from "./useRoom";
import { useAuth } from "./useAuth";

const client = generateClient<Schema>({
  authMode: 'userPool',
});

export const useEditor = () => {
  const { rooms } = useRoom(); 
  const { data } = useAuth();
  const [recruitment, setRecruitment] = useState<Schema["Recruitment"]["type"][]>([]);
  const [codes, setCodes] = useState<Schema["RealTimeCode"]["type"][]>([]);
  const [currentCode, setCurrentCode] = useState<string>("");
  const [codeHistory, setCodeHistory] = useState<{
    added: string;
    removed: string;
    timestamp: string;
  }[]>([]);

  const previousCode = useRef<string>("");
  const roomId = rooms.length > 0 ? rooms[0].id : "room-id-placeholder"; 

  useEffect(() => {
    const fetchRecruitments = async () => {
      const { data: sessionItems } = await client.models.Recruitment.list({});
      setRecruitment(sessionItems || []);
    };

    const fetchCodes = async () => {
      const { data: codeItems } = await client.models.RealTimeCode.list({});
      setCodes(codeItems || []);
    };

    fetchRecruitments();
    fetchCodes();
  }, []);

  const calculateDiff = (oldText: string, newText: string) => {
    const diffs: Change[] = diffWords(oldText, newText);

    let added = "";
    let removed = "";

    diffs.forEach((part: Change) => {
      if (part.added) added += part.value;
      if (part.removed) removed += part.value;
    });

    return { added, removed };
  };

  const addCode = async () => {
    if (!currentCode.trim()) {
      alert("コードを入力してください！");
      return;
    }

    const { added, removed } = calculateDiff(previousCode.current, currentCode);
    const timestamp = new Date().toLocaleString();

    setCodeHistory((prev) => [
      ...prev,
      { added, removed, timestamp },
    ]);

    previousCode.current = currentCode;

    await client.models.RealTimeCode.create({
      id: roomId, 
      content: [currentCode],
      lastModiedBy: data?.name, 
    });
  };

  return {
    recruitment,
    codes,
    currentCode,
    codeHistory,
    setCurrentCode,
    addCode,
  };
};
