import { Button, Display } from '@fluentui/react-components';
import { useStyles } from './Homepage.styles';
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  return (
    <div className={styles.root}>
      <div className={styles.display}>
        <div>
          <Display >Personalised Learning</Display>
          <br />
          <Display >Platform</Display>
        </div>
        <div className={styles.button}>
          <Button appearance="subtle" size="large" onClick={()=>{navigate("/signup")}}>Sign Up</Button>
          <Button appearance="subtle" size="large" onClick={()=>{navigate("/login")}}>Log In</Button>
        </div>
      </div>
    </div>
  )
}

export default Homepage