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
    head: {
        flex:1,
        flexDirection: 'row',
    },
    timeContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    time: {
        flex: 1,
        fontSize: 20,
        color: colors.text,
        marginLeft: 10,
    },
    locationContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },
    eventImage: {
        height:25,
        width: 25
    },
    info: {
        flex:1,
        flexDirection: 'row',
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        flex: 1,
        fontSize: 20,
        color: colors.text
    },
});