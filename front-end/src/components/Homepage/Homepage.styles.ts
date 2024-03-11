import { makeStyles, shorthands } from '@fluentui/react-components';


export const useStyles = makeStyles({
    root: {
        backgroundImage: "url(/heroimage4.jpg)",
        backgroundRepeat: 'no-repeat',
        width:'100%',
        height:'93vh',
        display:'flex',
        flexDirection:'column'
    },
    display: {
        display:'flex',
        flexDirection:'column',
        ...shorthands.padding('15%', '0%','0%','15%'),
        ...shorthands.gap('64px')
    },
    button: {
        display:'flex',
        flexDirection:'row',
        ...shorthands.gap('32px')
    },
}
)