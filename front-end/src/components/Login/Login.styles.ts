import { makeStyles, tokens, shorthands } from '@fluentui/react-components';


export const useStyles = makeStyles({
    root: {
        height: '80%',
        width: '60%',
        backgroundColor: tokens.colorNeutralBackground1,
        boxShadow: tokens.shadow16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'left',
        ...shorthands.margin('5%', '18%', '5%', '18%'),
        ...shorthands.padding('2%'),
        ...shorthands.gap('32px')
    },
    header: {
        height: '10%'
    },
    h2: {
        height: '24px',
        ...shorthands.margin(0),
    },
    p: {
        height: '20px',
        width: '100%',
        ...shorthands.margin(0),
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('32px'),
        ...shorthands.flex(1),

    },
    formContainer: {
        width: '100%',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('16px'),
    },
    button: {
        ...shorthands.margin('5%', '0%'),
        backgroundColor: tokens.colorBrandBackgroundInvertedHover,
        borderBlockColor: tokens.colorBrandBackgroundInvertedHover,
        boxShadow: tokens.shadow4,

    },
    card: {
        ...shorthands.padding('2%', '10%'),
        boxShadow: tokens.shadow4,
        alignItems: 'center'
    },
    success: {
        backgroundColor: tokens.colorStatusSuccessBackground1,
        color: tokens.colorStatusSuccessForeground1,
    },
    error: {
        backgroundColor: tokens.colorStatusDangerBackground1,
        color: tokens.colorStatusDangerForeground1,
    }
}
)