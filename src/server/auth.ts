import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { promises as fs } from "fs";
import path from "path";

type User = {
  id: string;
  email: string;
  passwordHash: string; // format: salt:hash (base64)
  createdAt: string;
};

type Sessions = Record<string, { userId: string; createdAt: string }>;

const dataDir = path.join(process.cwd(), "src", "data", "auth");
const usersFile = path.join(dataDir, "users.json");
const sessionsFile = path.join(dataDir, "sessions.json");

async function ensureDataFiles() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(usersFile);
  } catch {
    await fs.writeFile(usersFile, JSON.stringify([], null, 2), "utf8");
  }
  try {
    await fs.access(sessionsFile);
  } catch {
    await fs.writeFile(sessionsFile, JSON.stringify({}, null, 2), "utf8");
  }
}

async function readUsers(): Promise<User[]> {
  await ensureDataFiles();
  const raw = await fs.readFile(usersFile, "utf8");
  try {
    return JSON.parse(raw) as User[];
  } catch {
    return [];
  }
}

async function writeUsers(users: User[]) {
  await ensureDataFiles();
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2), "utf8");
}

async function readSessions(): Promise<Sessions> {
  await ensureDataFiles();
  const raw = await fs.readFile(sessionsFile, "utf8");
  try {
    return JSON.parse(raw) as Sessions;
  } catch {
    return {};
  }
}

async function writeSessions(sessions: Sessions) {
  await ensureDataFiles();
  await fs.writeFile(sessionsFile, JSON.stringify(sessions, null, 2), "utf8");
}

function hashPassword(password: string, salt?: Buffer) {
  const actualSalt = salt ?? randomBytes(16);
  const hash = scryptSync(password, actualSalt, 64);
  return `${actualSalt.toString("base64")}:${hash.toString("base64")}`;
}

function verifyPassword(password: string, stored: string) {
  const [saltB64, hashB64] = stored.split(":");
  if (!saltB64 || !hashB64) return false;
  const salt = Buffer.from(saltB64, "base64");
  const expected = Buffer.from(hashB64, "base64");
  const got = scryptSync(password, salt, expected.length);
  return timingSafeEqual(expected, got);
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function createUser(email: string, password: string) {
  const users = await readUsers();
  const nEmail = normalizeEmail(email);
  if (users.some((u) => u.email === nEmail)) {
    throw new Error("Email already registered");
  }
  const id = randomBytes(8).toString("hex");
  const passwordHash = hashPassword(password);
  const user: User = { id, email: nEmail, passwordHash, createdAt: new Date().toISOString() };
  users.push(user);
  await writeUsers(users);
  return user;
}

export async function getUserByEmail(email: string) {
  const users = await readUsers();
  return users.find((u) => u.email === normalizeEmail(email)) ?? null;
}

export async function verifyLogin(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (!user) return null;
  const ok = verifyPassword(password, user.passwordHash);
  return ok ? user : null;
}

export async function createSession(userId: string) {
  const sessions = await readSessions();
  const token = randomBytes(32).toString("hex");
  sessions[token] = { userId, createdAt: new Date().toISOString() };
  await writeSessions(sessions);
  return token;
}

export async function deleteSession(token: string) {
  const sessions = await readSessions();
  if (sessions[token]) {
    delete sessions[token];
    await writeSessions(sessions);
  }
}

export async function getUserIdForToken(token: string | undefined) {
  if (!token) return null;
  const sessions = await readSessions();
  return sessions[token]?.userId ?? null;
}

