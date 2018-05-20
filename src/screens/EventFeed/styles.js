import { StyleSheet } from 'react-native';

import { colors } from '../../styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    loaderContainer: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    eventList: {
        flex: 1
    }
});