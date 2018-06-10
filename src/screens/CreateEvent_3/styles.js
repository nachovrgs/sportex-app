import { StyleSheet } from 'react-native';

import { colors, sizes } from '../../styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.1)'
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