import manifest from "./manifest.json";
import { Plugin } from "aliucord/entities";
import { React, Navigation, DiscordNavigator } from "aliucord/metro";
import {GuildMemberStore, GuildPrototype} from "./lib/requiredModules.jsx";
import {defaultSettings} from "./lib/consts.jsx";
import * as ColorUtils from "./lib/ColorUtils.jsx";
import { Settings } from "./Components/Settings.jsx";
const { default: Navigator, getRenderCloseButton } = DiscordNavigator;
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
            if (this.settings.get("shouldPatchRole", defaultSettings.shouldPatchRole))
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
      SettingsModal() {       
        return (
            <Navigator
                initialRouteName="ShowNamesSettings"
                goBackOnBackPress={true}
                screens={{
                    ShowNamesSettings: {
                        title: "ShowNames Settings",
                        headerLeft: getRenderCloseButton(() => Navigation.pop()),
                        render: Settings
                    },                   
                }}
            />
        );
        
    }
}