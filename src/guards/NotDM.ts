import { ArgsOf, GuardFunction, SimpleCommandMessage } from "discordx";

const NotDM: GuardFunction<
  ArgsOf<"messageCreate"> | SimpleCommandMessage
> = async (message, _, next) => {
  if (
    message instanceof SimpleCommandMessage
      ? message?.message.inGuild()
      : message[0].inGuild()
  ) {
    await next();
  }
};

export default NotDM;
