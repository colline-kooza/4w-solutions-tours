import type { Team } from "@prisma/client";

export type TeamMember = Team;

export type BriefTeamMember = {
  id: string;
  name: string;
  nickname: string | null;
  position: string;
  image: string | null;
  bio: string | null;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TeamCreateProps = {
  name: string;
  nickname?: string;
  position: string;
  image?: string;
  bio?: string;
  status?: boolean;
};

export type TeamUpdateProps = {
  name?: string;
  nickname?: string;
  position?: string;
  image?: string;
  bio?: string;
  status?: boolean;
};
