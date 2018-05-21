import { StyleSheet } from 'react-native';

import { colors } from '../../styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        height: 200,
        padding: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderBottomColor: colors.borders,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});