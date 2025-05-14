"use client";

import { useQuery } from "@tanstack/react-query";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const getTodos = async (): Promise<Todo[]> => {
  try{
    const res = await fetch("http://localhost:8080/todos");
    if (!res.ok) {
      throw new Error(`APIエラー: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (isLoading) return <div>読み込み中...</div>;
  if (isError) return <div>エラーが発生しました: {error.message}</div>;
  if (!data || data.length === 0) return <div>データがありません</div>;

  return (
    <div>
      {data.map((todo) => (
        <div
          key={todo.id}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <input type="checkbox" checked={todo.completed} readOnly />
          <span>{todo.title}</span>
          <span style={{ color: "#000", fontSize: 12 }}>id: {todo.id}</span>
        </div>
      ))}
    </div>
  );
}
