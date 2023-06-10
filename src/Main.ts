import { importx } from "@discordx/importer";
import {
  GatewayIntentBits,
  MessageComponentInteraction,
  Partials
} from "discord.js";
import { Client } from "discordx";
import config from "./config";
import DB from "./utils/db";
import logger from "./utils/logger";

class Main {
  public static client: Client;

  public static async start(): Promise<void> {
    await DB.init();

    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessageReactions
      ],
      partials: [Partials.Message, Partials.Channel, Partials.Reaction]
    });

    this.client.on("ready", async () => {
      await this.client.initApplicationCommands();
    });

    this.client.on("messageCreate", (message) => {
      try {
        if (!message.author.bot) {
          this.client.executeCommand(message);
        }
      } catch (error) {
        logger.error(`messageCreate error - ${error.message}`);
      }
    });

    this.client.on("interactionCreate", (interaction) => {
      if (
        interaction instanceof MessageComponentInteraction &&
        interaction.customId?.startsWith("discordx@pagination@")
      ) {
        return;
      }
      this.client.executeInteraction(interaction);
    });

    await importx(`${__dirname}/discords/*.{ts,js}`);

    this.client.login(config.discordToken);
  }
}

Main.start();

export default Main;
