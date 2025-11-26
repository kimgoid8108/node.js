import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { v6 } from "uuid";

const prisma = new PrismaClient();
export const createUser = async (req, res) => {
  const { email, password, nickname } = req.body;

  const cryptPW = await bcrypt.hash(password, 10);

  const checkEmail = await prisma.users.findUnique({ where: { email } });

  const checkNickname = await prisma.users.findFirst({ where: { nickname } });

  if (checkEmail) {
    return res.boom.badRequest("이미 존재하는 이메일입니다!");
  }

  if (checkNickname) {
    return res.boom.badRequest("이미 존재하는 닉네임입니다!");
  }

  await prisma.users.create({
    data: {
      email,
      password: cryptPW,
      nickname,
      created_at: new Date(),
    },
  });
  res.success("회원가입 완료!");
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.users.findUnique({ where: { email: email } });
  if (!user)
    return res.boom.badRequest("email 또는 password를 다시 입력하세요!");
  const result = await bcrypt.compare(password, user.password);
  if (!result)
    return res.boom.badRequest("email 또는 password를 다시 입력하세요!");

  const uuid = v6();
  const created_at = new Date();
  const expires_at = new Date(created_at.getTime() + 1000 * 60 * 3);

  await prisma.sessions.create({
    data: {
      session_id: uuid,
      user_id: user.id,
      created_at,
      expires_at,
    },
  });
  res.cookie("sessionID", uuid, {
    httpOnly: true,
    maxAge: 1000 * 60 * 3, // 3분
  });

  res.success({
    userId: user.id,
    email,
    nickname: user.nickname,
  });
};

export const logout = async (req, res) => {
  const sessionID = req.cookies.sessionId;

  res.clearCookie("sessionID", {
    httpOnly: true,
  });

  return res.success("로그아웃 완료!");
};

export const getMe = async (req, res) => {
  const userId = req.user;

  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      nickname: true,
      created_at: true,
    },
  });

  return res.success("로그인된 사용자 정보입니다.", user);
};
