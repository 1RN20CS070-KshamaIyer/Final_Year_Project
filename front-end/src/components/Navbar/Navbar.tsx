import { TabList, Tab, Subtitle2, Button } from "@fluentui/react-components";
import { NavLink, Outlet } from "react-router-dom";
import { useStyles } from './Navbar.styles';
import { useAuth } from '../../hooks/AuthProvider';

const Navbar = () => {
    const styles = useStyles();
    const auth = useAuth();

    return (
        <div>
            <div className={styles.root}>
                <Subtitle2>Personalised Learning</Subtitle2>
                <div className={styles.tabGroup}>
                    <TabList>
                        <Tab value="tab2"><NavLink style={{ textDecoration: 'none' }} className={styles.tab} to="/">Home</NavLink></Tab>
                        <Tab value="tab3"><NavLink style={{ textDecoration: 'none' }} className={styles.tab} to="/about">About</NavLink></Tab>
                        <Tab value="tab4"><NavLink style={{ textDecoration: 'none' }} className={styles.tab} to="/contact">Contact</NavLink></Tab>
                    </TabList>
                    <Button appearance="subtle" size="medium" onClick={auth.logOut}>Logout</Button>
                </div>
            </div>
            <Outlet />
        </div>


    )
}

export default Navbar