import { StyleSheet } from 'react-native';

import { colors } from '../../styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        flex: 1,
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100
    },
    title: {
        marginTop: 10,
        textAlign: 'center',
        opacity: 0.9,
        color: colors.text
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
    loginButton: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
    },
    register: {
        margin: 15,
        textAlign: 'center'
    }
});