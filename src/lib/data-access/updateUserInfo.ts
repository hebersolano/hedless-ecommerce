import { members } from "@wix/members";
import { wixClientT } from "../wixClientServer";

export default async function updateUserInfo(
  wixClient: wixClientT,
  id: string,
  data: members.UpdateMember,
) {
  try {
    const res = await wixClient.members.updateMember(id, data);
    console.log("update user res:", res);
  } catch (error) {
    console.log(error);
  }
}
