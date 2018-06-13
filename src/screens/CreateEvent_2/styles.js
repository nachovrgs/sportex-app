import { StyleSheet } from 'react-native';

import { colors, sizes } from '../../styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    formContainer: {
        flex: 5,
        padding: 60,
    },
    calendarContainer: {
        flex: 5,
        alignSelf: 'center',
    },
    selectorContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1
    },
    calendarIcon: {
        width: 40,
        height: 40,
    },
    dateTimeText: {
        fontSize: sizes.large,
        marginTop: 20,
    },
    buttonContainer: {
        flex: 1,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 65
    }
});