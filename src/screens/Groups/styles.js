import { StyleSheet } from 'react-native';

import { colors } from '../../styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    noData: {
        flex: 1,
        alignContent: 'center',
        margin: 50,
        backgroundColor: colors.background
    },
    noDataText: {
        justifyContent: 'center',
        alignItems: 'center'
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