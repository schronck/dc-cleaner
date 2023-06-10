import { CommandInteraction } from "discord.js";
import { GuardFunction } from "discordx";
import { isModerator } from "../utils/utils";

const Moderator: GuardFunction<CommandInteraction> = async (
  message,
  _,
  next
) => {
  if (await isModerator(message.guildId, message.user.id)) {
    await next();
  }
};

export default Moderator;
