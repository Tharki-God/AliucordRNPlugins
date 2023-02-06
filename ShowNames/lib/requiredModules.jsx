import * as Metro from "aliucord/metro";
import * as Utils from "./utils.jsx";

export const { UnsyncedUserSettingsStore, ThemeStore, GuildMemberStore } = Metro;
 
export const ThemeColorMap = Metro.getByProps("CHAT_BACKGROUND");

export const {default: GuildPrototype} = Metro.getModule(m => Utils.prototypeChecker(m, ["getRole", "getIconURL"]));
