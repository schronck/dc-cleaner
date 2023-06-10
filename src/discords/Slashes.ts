/* eslint-disable class-methods-use-this */

import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Guard, Slash, SlashOption } from "discordx";
import { ping } from "../commands";
import Moderator from "../guards/Moderator";
import DB from "../utils/db";
import logger from "../utils/logger";

@Discord()
abstract class Slashes {
  @Slash({
    name: "ping",
    description: "Get the latency of the bot and the Discord API."
  })
  ping(interaction: CommandInteraction): void {
    logger.verbose(
      `/ping command was used by ${interaction.user.username}#${interaction.user.discriminator}`
    );
    interaction
      .reply({ content: ping(interaction.createdTimestamp), ephemeral: true })
      .catch(logger.error);
  }

  @Guard(Moderator)
  @Slash({ name: "blacklist", description: "Add a word to the blacklist." })
  blacklist(
    @SlashOption({
      name: "word",
      type: ApplicationCommandOptionType.String,
      required: true,
      description: "the word to be added to the blacklist"
    })
    word: string,
    interaction: CommandInteraction
  ): void {
    if (DB.containsWord(word.toLowerCase())) {
      interaction
        .reply({
          content: `The word "${word}" already exists on the blacklist`,
          ephemeral: true
        })
        .catch(logger.error);
    } else {
      DB.saveWord(word);

      interaction
        .reply({
          content: `The word "${word}" has been added to the blacklist`,
          ephemeral: true
        })
        .catch(logger.error);
    }
  }

  @Guard(Moderator)
  @Slash({
    name: "whitelist",
    description: "Remove a word from the blacklist."
  })
  whitelist(
    @SlashOption({
      name: "word",
      type: ApplicationCommandOptionType.String,
      required: true,
      description: "the word to be removed from the blacklist"
    })
    word: string,
    interaction: CommandInteraction
  ): void {
    if (DB.containsWord(word.toLowerCase())) {
      DB.removeWord(word);

      interaction
        .reply({
          content: `The word "${word}" has been removed from the blacklist`,
          ephemeral: true
        })
        .catch(logger.error);
    } else {
      interaction
        .reply({
          content: `The word "${word}" does not exist on the blacklist`,
          ephemeral: true
        })
        .catch(logger.error);
    }
  }

  @Guard(Moderator)
  @Slash({ name: "list", description: "Show all words from the blacklist." })
  list(interaction: CommandInteraction): void {
    const list = DB.getWords();

    if (list.length) {
      interaction
        .reply({
          content: list.join("\n"),
          ephemeral: true
        })
        .catch(logger.error);
    } else {
      interaction
        .reply({
          content: "The blacklist is empty",
          ephemeral: true
        })
        .catch(logger.error);
    }
  }
}

export default Slashes;
