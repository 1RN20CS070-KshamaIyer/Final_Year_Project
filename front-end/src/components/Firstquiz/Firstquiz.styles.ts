import { makeStyles, tokens, shorthands } from '@fluentui/react-components';


export const useStyles = makeStyles({
    root: {
        height: '80%',
        width: '60%',
        backgroundColor: tokens.colorNeutralBackground1,
        boxShadow: tokens.shadow16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...shorthands.margin('10%', '18%', '10%', '18%'),
        ...shorthands.padding('2%'),
        ...shorthands.gap('32px')
    },
    body: {
        backgroundColor:tokens.colorBrandBackground2,
        ...shorthands.borderRadius(tokens.borderRadiusXLarge),
        width:'80%',
        ...shorthands.padding('2%'),
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('32px')

    },
    choice:{
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('8px'),
    },
    question:{
        display: 'flex',
        flexDirection: 'column',
    },
    quiz:{
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('16px')
    },
    button:{
        alignItems: 'left',
        width:'70%'
    }
})