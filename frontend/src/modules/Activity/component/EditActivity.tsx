import { useLocation } from 'react-router';
import ActivityForm from './ActivityForm';

export default function EditActivity() {
  const { state } = useLocation();
  return <ActivityForm method="put" activity={state} />;
}
