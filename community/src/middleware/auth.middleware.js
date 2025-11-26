import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authMiddleware = async (req, res, next) => {
  const { sessionID } = req.cookies || {};
  if (!sessionID) return res.unAuthorized("로그인이 필요합니다");

  const session = await prisma.sessions.findUnique({
    where: {
      session_id: sessionID,
    },
  });
  if (!session) return res.unAuthorized("유효하지 않습니다!");
  if (new Date(session.expires_at) < new Date()) {
    await prisma.sessions.delete({
      where: {
        session_id: sessionID,
      },
    });

    return res.unAuthorized();
  }

  req.user = session.user_id;
  next();
};
