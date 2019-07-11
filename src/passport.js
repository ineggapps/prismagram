import { prisma } from "../generated/prisma-client";

import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import "./env";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
      //or you could create a new account
    }
  } catch (error) {
    return done(error, false);
  }
};

export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();

//JWT
/*
composed with json format

1. header
2. payload (token information)
3. hash (1+2) value

base6 for encryption
permition information about resouces
identify users with only JWT Token using secret key saved in the server.

ref:
https://www.youtube.com/watch?v=MUUqogMpGiA

comment:
옛날에는 한 사람이 여러 개의 기기를 소유하고 사용하는 경우는 드물었습니다. 그러나 요새는 개인이 집 PC, 회사 PC, 스마트폰, 태블릿 등 다양한 디바이스를 사용하고 다니는 세상입니다. 이런 이유로 자신의 계정을 이용하여 로그인된 디바이스의 목록을 관리할 수 있는 편의 기능을 제공해달라는 고객의 요구사항이 있을 수 있습니다. 더는 필요가 없어진 디바이스를 강제로 로그아웃을 시킨다던가 아니면 디바이스 전체를 로그아웃시키는 기능이 필요할 수 있죠. (이 기능은 구글도 완벽하지 않음) 토큰을 Reset 한다라고도 볼 수 있는데. 이것을 JWT 토큰 기반으로 구현해야 한다면 발급된 토큰을 유효기간과 무관하게 원할 때 아무 떄나 무효화시킬 수 있어야 한다고 보는데요. DB 병목을 완전히 제거하면서 구현하기는 어려울 거 같다는 생각이 듭니다. 으 아이디어 생각하느라 머리가 아프네요.
*/
