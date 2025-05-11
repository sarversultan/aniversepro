import { db, auth } from '../firebase';
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

// Get discussions by category (with optional pagination)
export async function getDiscussionsByCategory(category: string, pageLimit = 20, cursor?: any) {
  let q = query(
    collection(db, 'discussions'),
    where('category', '==', category),
    orderBy('createdAt', 'desc'),
    limit(pageLimit)
  );
  if (cursor) q = query(q, startAfter(cursor));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Get recent discussions (across all categories)
export async function getRecentDiscussions(pageLimit = 10) {
  const q = query(collection(db, 'discussions'), orderBy('createdAt', 'desc'), limit(pageLimit));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Get a single discussion by ID
export async function getDiscussionById(id: string) {
  const ref = doc(db, 'discussions', id);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// Add a new discussion (auth required)
export async function addDiscussion({ title, content, category, username }: { title: string, content: string, category: string, username: string }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const docRef = await addDoc(collection(db, 'discussions'), {
    title,
    content,
    category,
    createdAt: serverTimestamp(),
    createdBy: user.uid,
    username,
    replies: 0,
  });
  return docRef.id;
}

// Add a reply to a discussion (auth required)
export async function addReply(discussionId: string, { content, username }: { content: string, username: string }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const ref = collection(db, 'discussions', discussionId, 'replies');
  const docRef = await addDoc(ref, {
    content,
    createdAt: serverTimestamp(),
    createdBy: user.uid,
    username,
  });
  // Optionally increment replies count
  // ...
  return docRef.id;
}

// Get replies for a discussion (with optional pagination)
export async function getReplies(discussionId: string, pageLimit = 20, cursor?: any) {
  let q = query(
    collection(db, 'discussions', discussionId, 'replies'),
    orderBy('createdAt', 'asc'),
    limit(pageLimit)
  );
  if (cursor) q = query(q, startAfter(cursor));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
} 