import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { v6 } from "uuid";

const prisma = new PrismaClient();

export const createpost = async (req, res) => {
  const { title, content } = req.body;
  const sessionID = req.cookies.sessionId;

  const session = await prisma.users.findUnique({
    where: { session_id: sessionID },
  });
  if (!session) {
    return res.unAuthorized("유효하지 않습니다!");
  }

  await prisma.posts.create({
    data: {
      title,
      content,
      author_id: session.user_id,
    },
  });
  res.success("게시글 작성 완료!");
};

// export const login = async (req, res) => {};

// export const logout = async (req, res) => {};

// export const getMe = async (req, res) => {};
