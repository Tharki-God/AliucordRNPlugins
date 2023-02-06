import {
  Forms,
  ReactNative,
  URLOpener,
  React,
  Styles,
  Constants,
} from "aliucord/metro";

const { FormRow, FormSection, FormSwitchRow, FormIcon, FormText } = Forms;
const { ScrollView, View } = ReactNative;
import { defaultSettings } from "../lib/consts.jsx";
import ShowNames from "../index.jsx";
const PluginInstance = () => ShowNames.instance;

export const Settings = () => {
  const [shouldPatchRoleValue, shouldPatchRoleSetter] = React.useState(
    PluginInstance().settings.get(
      "shouldPatchRole",
      defaultSettings.shouldPatchRole
    )
  );
  return (
    <>
      <ScrollView>
          <FormSwitchRow
            {...{
              label: "Role color",
              subLabel:
                "Whether to change the role color. Normally the member color gets patched directly. (It may cause performance issues.)",
              value: shouldPatchRoleValue,
              onValueChange: (value) => {
                shouldPatchRoleSetter(value);
                PluginInstance().settings.set("shouldPatchRole", value);
              },
            }}
          />
      </ScrollView>
    </>
  );
};
