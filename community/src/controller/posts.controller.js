import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { v6 } from "uuid";

const prisma = new PrismaClient();
export const createpost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user;
  await prisma.posts.create({
    data: {
      title,
      content,
      author_id: userId,
      created_at: new Date(),
      updated_at: new Date(),
      users: {
        connect: { id: userId }, // ★ 관계 테이블 연결
      },
    },
  });
  res.success("게시글 작성 완료!");
};

// export const login = async (req, res) => {};

// export const logout = async (req, res) => {};

// export const getMe = async (req, res) => {};
