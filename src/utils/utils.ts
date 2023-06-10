/* eslint-disable import/prefer-default-export */

import config from "../config";
import Main from "../Main";

const isModerator = (guildId: string, userId: string): boolean =>
  !!Main.client.guilds.cache
    .find((g) => g.id === guildId)
    ?.members.cache.find((u) => u.id === userId)
    ?.roles.cache.find((r) => r.id === config.roleId);

export { isModerator };
