import { makeStyles, tokens, shorthands } from '@fluentui/react-components';


export const useStyles = makeStyles({
    root: {
        height: '10%',
        width: '100 %',
        display: 'flex',
        alignItems: 'center', 
        ...shorthands.padding('0px', '5%'),
        ...shorthands.gap('70%')
    },
    tabGroup:{
        display: 'flex',
        alignItems: 'center', 
    },
    tab: {
        color: tokens.colorNeutralForeground1
    }
}
)