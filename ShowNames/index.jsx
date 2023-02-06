import manifest from "./manifest.json";
import { Plugin } from "aliucord/entities";
import {GuildMemberStore, GuildPrototype} from "./lib/requiredModules.jsx";
import {defaultSettings} from "./lib/consts.jsx";
import * as ColorUtils from "./lib/ColorUtils.jsx";
import { SettingsPage } from "./Components/Settings.jsx";

export default class ShowNames extends Plugin {
    instance;
    constructor(manifest){
        super(manifest);
        ShowNames.instance = this;
    }
    start() {
        this.applyPatches();
    }
    applyPatches(){
        this.patcher.after(GuildMemberStore, "getMember", (ctx, component) => {
            this.changeColor(component);
        });
        this.patcher.after(GuildPrototype.prototype, "getRole", (ctx, component) => {
            this.changeColor(component);
        });
    }
    changeColor(item)  {
        if (!item?.colorString) return;
        const backgroundColor = ColorUtils.getBackgroundColor();
        const difference = ColorUtils.getDifference(backgroundColor, item.colorString);
        if (difference > this.settings.get("colorThreshold", defaultSettings.colorThreshold)) return;
        const changePercent = Math.floor(
          ((this.settings.get("percentage", defaultSettings.percentage) - difference) / 100) * 255,
        );
        item.colorString = ColorUtils.makeColorVisible(item.colorString, changePercent);
      }
      stop(){
        this.patcher.unpatchAll();
      }
      getSettingsPage() {
        return <SettingsPage />;
    }
}