import React, { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatFeed({ messages, address }: { messages: any[], address?: string }) {
  const endRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-80 md:h-[480px] overflow-y-auto bg-white/4 border border-white/8 rounded-2xl p-5 space-y-4 scrollbar-thin scrollbar-thumb-arc-500/40">
      {messages.length === 0 ? (
        <div className="text-center text-gray-400">No messages yet — be the first!</div>
      ) : (
        messages.map((m, i) => (
          <MessageBubble key={i} m={m} isMine={m.sender === address} />
        ))
      )}
      <div ref={endRef} />
    </div>
  );
}
