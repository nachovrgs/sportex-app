import { StyleSheet } from 'react-native';

import { colors, sizes } from '../../styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 200,
        margin: 22,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius:10,
        borderWidth: 1,
        borderColor: colors.borders,
        elevation: 1,
    },
    sidebar: {
        flex: 1,
        backgroundColor: colors.bar_rank_2,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    mainInfo: {
        flex: 20,
        padding: 10,
        flexDirection: 'column',
    },
    sideInfo: {
        flex: 5,
        padding: 10,
    },
    head: {
        flex: 1,
        flexDirection: 'row',
    },
    timeContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 30,
    },
    time: {
        flex: 1,
        fontSize: sizes.medium,
        color: colors.text,
        marginLeft: 10,
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        flex: 1,
        fontSize: sizes.medium,
        color: colors.text
    },
    location: {
        flex: 1,
        fontSize: sizes.small,
        color: colors.text
    },
    locationContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    fill: {
        flex: 1,
        fontSize: sizes.medium,
        color: colors.text
    },
    fillContainer: {
        flex: 1,
        marginTop: 30,
        alignItems: 'flex-end',
    },
    eventImage: {
        height: 25,
        width: 25
    },
});