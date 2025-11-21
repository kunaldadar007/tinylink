import { PrismaClient } from '@prisma/client';

declare global {
  // allow global prisma during dev to avoid multiple instances
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

function genCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let s = '';
  for (let i = 0; i < length; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

function ensureValidUrl(url: string) {
  try {
    // allow relative? spec requires full URL — validate absolute only
    const u = new URL(url);
    return u.toString();
  } catch {
    throw new Error('INVALID_URL');
  }
}

export async function createLink({ url, code }: { url: string; code?: string }) {
  const safeUrl = ensureValidUrl(url);

  let finalCode = code?.trim();
  if (finalCode) {
    if (!CODE_REGEX.test(finalCode)) throw new Error('INVALID_CODE');
    const existing = await prisma.link.findUnique({ where: { code: finalCode } });
    if (existing) throw new Error('CODE_EXISTS');
  } else {
    // generate until unique (rare collision)
    let attempts = 0;
    do {
      finalCode = genCode(6);
      const exists = await prisma.link.findUnique({ where: { code: finalCode } });
      if (!exists) break;
      attempts++;
    } while (attempts < 5);
  }

  const created = await prisma.link.create({
    data: {
      code: finalCode!,
      url: safeUrl,
    },
  });

  return created;
}

export async function getLinks() {
  return prisma.link.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getLinkByCode(code: string) {
  return prisma.link.findUnique({ where: { code } });
}

export async function deleteLink(code: string) {
  // will throw if not found
  return prisma.link.delete({ where: { code } });
}

export async function incrementClick(code: string) {
  return prisma.link.update({
    where: { code },
    data: {
      clicks: { increment: 1 },
      lastClicked: new Date(),
    },
  });
}

export { prisma };