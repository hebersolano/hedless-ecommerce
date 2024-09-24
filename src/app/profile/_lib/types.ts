import { members } from "@wix/members";

export type Member =
  | (members.Member & members.MemberNonNullableFields)
  | undefined;
