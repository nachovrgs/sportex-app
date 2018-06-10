import { StyleSheet } from 'react-native';

import { colors, sizes } from '../../styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.1)'
    },
    formContainer: {
        flex: 1,
        padding: 60,
    },
    calendarContainer: {
        flex: 5,
        alignItems:'center' ,
    },
    selectorContainer: {
        flexDirection: 'column',
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
        flex: 1
    },
    createButtonContainer: {
        marginTop: 10,
        backgroundColor: colors.button,
        paddingVertical: 15,
    },
    createButtonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
    },
});