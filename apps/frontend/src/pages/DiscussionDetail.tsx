import React from 'react';
import { motion } from 'framer-motion';

interface ReplyType {
  id: number;
  user: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  replies: ReplyType[];
}

function Reply({ reply, depth = 0 }: { reply: ReplyType; depth?: number }) {
  return (
    <div className={`flex gap-4 mb-6 ml-${depth * 6}`}> {/* Indent nested replies */}
      <img src={reply.avatar || '/src/assets/aniverse-logo.svg'} alt={reply.user} className="w-10 h-10 rounded-full object-cover border border-primary/30 bg-background" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-primary">@{reply.user}</span>
          <span className="text-xs text-muted-foreground">{reply.time}</span>
        </div>
        <div className="text-base text-foreground mb-2">{reply.content}</div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <button className="hover:text-primary transition">👍 {reply.likes}</button>
          <button className="hover:text-primary transition">Reply</button>
        </div>
        {reply.replies && reply.replies.length > 0 && (
          <div className="mt-4">
            {reply.replies.map((r: ReplyType) => (
              <Reply key={r.id} reply={r} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const DiscussionDetail: React.FC = () => {
  // TODO: Connect to backend API for post, replies, and similar threads
  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 py-12">
      {/* Main Thread */}
      <div className="lg:col-span-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="bg-card/80 rounded-2xl shadow-xl border border-primary/20 p-8 mb-8"
        >
          {/* TODO: Render post from backend */}
        </motion.div>
        {/* Replies */}
        <div className="space-y-6">
          {/* TODO: Render replies from backend */}
        </div>
      </div>
      {/* AniBot Suggestions Panel */}
      <aside className="bg-card/80 rounded-2xl shadow-xl border border-accent/30 p-6 flex flex-col gap-4 h-fit">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🤖</span>
          <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AniBot Suggestions</span>
        </div>
        <div className="space-y-3">
          {/* TODO: Render similar threads from backend */}
        </div>
      </aside>
    </div>
  );
};

export default DiscussionDetail; 