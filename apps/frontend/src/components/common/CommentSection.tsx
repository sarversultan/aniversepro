import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { User } from '../../types/auth';
import { toast } from 'react-hot-toast';
import { ThumbsUp, ThumbsDown, MoreVertical, Flag } from 'lucide-react';

interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: Date;
  upvotes: number;
  downvotes: number;
  replies: Comment[];
  userVote?: 'up' | 'down' | null;
  isLiked?: boolean;
  isDisliked?: boolean;
}

interface CommentSectionProps {
  contentType: 'anime' | 'manga' | 'news';
  contentId: string;
  user: User | null;
  onCommentSubmit: (content: string, parentId?: string) => Promise<void>;
  onLike: (commentId: string) => Promise<void>;
  onDislike: (commentId: string) => Promise<void>;
  onReport: (commentId: string) => Promise<void>;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  contentType,
  contentId,
  user,
  onCommentSubmit,
  onLike,
  onDislike,
  onReport,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'top'>('newest');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [visibleComments, setVisibleComments] = useState(5);
  const [lastCommentTime, setLastCommentTime] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        // TODO: Connect to backend API
        const response = await fetch(`/api/comments?type=${contentType}&id=${contentId}`);
        const data = await response.json();
        setComments(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load comments');
        setLoading(false);
      }
    };

    fetchComments();
  }, [contentType, contentId]);

  const handleTyping = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 500) {
      toast.error('Comment cannot exceed 500 characters');
      return;
    }
    setNewComment(value);
    setIsTyping(true);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  }, []);

  const handleSubmit = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to comment');
      return;
    }

    try {
      // TODO: Connect to backend API
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentType,
          contentId,
          content: newComment,
          parentId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      const newCommentData = await response.json();
      
      if (parentId) {
        setComments(prevComments => 
          prevComments.map(comment => 
            comment.id === parentId
              ? { ...comment, replies: [...comment.replies, newCommentData] }
              : comment
          )
        );
      } else {
        setComments(prevComments => [newCommentData, ...prevComments]);
      }

      setNewComment('');
      toast.success('Comment posted successfully');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to post comment');
    }
  };

  const handleVote = (commentId: string, vote: 'up' | 'down') => {
    setComments(prevComments =>
      prevComments.map(comment => {
        if (comment.id === commentId) {
          const newVote = comment.userVote === vote ? null : vote;
          const upvoteChange = newVote === 'up' ? 1 : (comment.userVote === 'up' ? -1 : 0);
          const downvoteChange = newVote === 'down' ? 1 : (comment.userVote === 'down' ? -1 : 0);

          return {
            ...comment,
            upvotes: comment.upvotes + upvoteChange,
            downvotes: comment.downvotes + downvoteChange,
            userVote: newVote,
            isLiked: newVote === 'up',
            isDisliked: newVote === 'down',
          };
        }
        return comment;
      })
    );
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'newest') {
      return b.timestamp.getTime() - a.timestamp.getTime();
    }
    return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
  });

  const visibleCommentsList = sortedComments.slice(0, visibleComments);

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-destructive bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          ref={textareaRef}
          value={newComment}
          onChange={handleTyping}
          placeholder={`Add a comment about this ${contentType}...`}
          className="w-full bg-background/50 text-foreground rounded-xl p-4 resize-none min-h-[100px] max-h-[200px] border border-primary/20 focus:border-primary/40 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          rows={3}
          disabled={isSubmitting || isTyping}
        />
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {isTyping ? 'Typing...' : `${newComment.length}/500 characters`}
          </span>
          <div className="flex gap-4">
            {replyingTo && (
              <button
                type="button"
                onClick={() => setReplyingTo(null)}
                className="text-sm text-muted-foreground hover:text-primary transition"
              >
                Cancel Reply
              </button>
            )}
            <button
              type="submit"
              disabled={!newComment.trim() || !user || isSubmitting || isTyping}
              className="px-6 py-2 bg-imperial rounded-xl text-alabaster font-semibold shadow hover:bg-imperial/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </div>
      </form>

      {/* Sort Options */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-muted-foreground">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'newest' | 'top')}
          className="bg-background/50 text-foreground rounded-xl px-4 py-2 border border-primary/20 focus:border-primary/40 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        >
          <option value="newest">Newest</option>
          <option value="top">Top Voted</option>
        </select>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        <AnimatePresence>
          {visibleCommentsList.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-card/80 backdrop-blur-lg rounded-2xl p-6 border border-ash shadow-lg"
            >
              {/* Main Comment */}
              <div className="flex gap-4">
                <img
                  src={comment.avatar}
                  alt={comment.username}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-primary">{comment.username}</span>
                    <span className="text-sm text-muted-foreground">
                      {formatTimestamp(comment.timestamp)}
                    </span>
                  </div>
                  <p className="text-foreground mb-4">{comment.content}</p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleVote(comment.id, 'up')}
                        className={`p-1 rounded-lg transition ${
                          comment.userVote === 'up'
                            ? 'text-primary'
                            : 'text-muted-foreground hover:text-primary'
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <span className="text-sm">{comment.upvotes - comment.downvotes}</span>
                      <button
                        onClick={() => handleVote(comment.id, 'down')}
                        className={`p-1 rounded-lg transition ${
                          comment.userVote === 'down'
                            ? 'text-primary'
                            : 'text-muted-foreground hover:text-primary'
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <button
                      onClick={() => setReplyingTo(comment.id)}
                      className="text-sm text-muted-foreground hover:text-primary transition"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="mt-6 pl-14 space-y-6">
                  {comment.replies.map((reply) => (
                    <motion.div
                      key={reply.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-background/50 rounded-xl p-4 border border-primary/10"
                    >
                      <div className="flex gap-4">
                        <img
                          src={reply.avatar}
                          alt={reply.username}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-primary">{reply.username}</span>
                            <span className="text-sm text-muted-foreground">
                              {formatTimestamp(reply.timestamp)}
                            </span>
                          </div>
                          <p className="text-foreground">{reply.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Report Menu */}
              <div className="mt-4 flex items-center space-x-4">
                <button
                  onClick={() => setShowReportMenu(showReportMenu === comment.id ? null : comment.id)}
                  className="text-sm text-muted-foreground hover:text-primary transition"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>
                {showReportMenu === comment.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                    <button
                      onClick={() => {
                        onReport(comment.id);
                        setShowReportMenu(null);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Flag className="h-4 w-4 mr-2" />
                      Report
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Load More Button */}
        {visibleComments < sortedComments.length && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setVisibleComments(prev => prev + 5)}
            className="w-full py-3 bg-primary/10 text-primary rounded-xl font-semibold hover:bg-primary/20 transition"
          >
            Load More Comments
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default CommentSection; 