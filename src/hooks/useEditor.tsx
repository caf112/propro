import { useState, useEffect, useRef } from "react";
import { generateClient } from "aws-amplify/api";
import type { Schema } from '@/../../amplify/data/resource';
import { diffWords, Change } from "diff";

const client = generateClient<Schema>({
  authMode: 'userPool',
});

export const useEditor = () => {
  const [recruitment, setRecruitment] = useState<Schema["Recruitment"]["type"][]>([]);
  const [codes, setCodes] = useState<Schema["RealTimeCode"]["type"][]>([]);
  const [currentCode, setCurrentCode] = useState<string>("");
  const [codeHistory, setCodeHistory] = useState<{
    added: string;
    removed: string;
    timestamp: string;
  }[]>([]);

  const previousCode = useRef<string>("");

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
      id: "ee6bbeab-3fd0-4266-b089-95b8f8e69883",
      content: [currentCode],
      language: "javascript",
      lastModiedBy: "currentUser", // data.nameから取得
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
