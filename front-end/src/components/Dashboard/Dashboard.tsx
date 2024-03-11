import { Button } from '@fluentui/react-components';
import { useAuth } from '../../hooks/AuthProvider';


const Dashboard = () => {
  const auth = useAuth();

  return (
    <div>
      <Button onClick={auth.logOut}>Logout</Button>
    </div>
  )
}

export default Dashboard