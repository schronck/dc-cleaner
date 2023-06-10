/* eslint-disable class-methods-use-this */

import { Message } from "discord.js";
import { Discord, Guard, On } from "discordx";
import config from "../config";
import NotDM from "../guards/NotDM";
import DB from "../utils/db";
import logger from "../utils/logger";
import { isModerator } from "../utils/utils";

@Discord()
abstract class Events {
  @On({ event: "ready" })
  onReady(): void {
    logger.info("Bot logged in.");
  }

  @On({ event: "messageCreate" })
  @Guard(NotDM)
  async onPublicMessage([message]: [Message]): Promise<void> {
    if (
      message.channelId === config.gmChannelId &&
      message.content.toLowerCase().match(/^(g(m|n)|hi)$/)
    ) {
      return;
    }

    if (
      DB.containsWord(message.content.toLowerCase()) &&
      !isModerator(message.guildId, message.author.id)
    ) {
      try {
        await message.delete();
        logger.verbose("Another one");
      } catch (err) {
        logger.error(err.message);
      }
    }
  }
}

export default Events;
