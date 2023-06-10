/* eslint-disable no-unused-vars */
import * as dotenv from "dotenv";

dotenv.config();

const discordToken = process.env.DISCORD_TOKEN;
const roleId = process.env.ROLE_ID;
const gmChannelId = process.env.GM_CHANNEL_ID;

if (!discordToken) {
  throw new Error(
    "You need to specify the bot's DISCORD_TOKEN in the .env file."
  );
}

export default {
  discordToken,
  gmChannelId,
  roleId
};
