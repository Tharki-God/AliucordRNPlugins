import { Forms, ReactNative, URLOpener, React, Styles, Constants } from "aliucord/metro";
import { getAssetId } from "aliucord/utils";

const { FormRow, FormSection, FormIcon, FormText } = Forms;
const { ScrollView, View } = ReactNative;

const styles = Styles.createThemedStyleSheet({
    description: {
        marginLeft: 12,
        marginRight: 12,
        color: Styles.ThemeColorMap.TEXT_NORMAL,
    },

    title: {
        fontSize: 16,
        color: Styles.ThemeColorMap.TEXT_NORMAL,
        fontFamily: Constants.Fonts.PRIMARY_BOLD,
        marginBottom: 10
    }
});

export const SettingsPage = () => {
    return (<>
        <ScrollView>
            <FormSection title="Custom Background" android_noDivider={true}>
                <View {...{
                  style: styles.title
                }}>
                    <FormText style={styles.title}>
                        Test Settings
                    </FormText>       
                        
                
                </View>
            </FormSection>
        </ScrollView>
    </>)
}