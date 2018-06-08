import { StyleSheet } from 'react-native';

import { colors } from '../../styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    formContainer: {
        flex: 1,
        padding: 60,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: colors.text,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        marginTop: 10,
        backgroundColor: colors.button,
        paddingVertical: 15,
    },
    createButton: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
    },
});