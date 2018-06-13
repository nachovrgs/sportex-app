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
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
    },
    textInput: {
        color: colors.text,
        paddingHorizontal: 20,
    },
    dateInput: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
        alignSelf: 'center'
    },
    calendarIcon: {
        width: 20,
        height: 20,
    },
    dateTimeText: {
        fontSize: sizes.medium,
        color: colors.text,
    },
});