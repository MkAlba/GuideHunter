import { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router';
import GuideForm from '../../components/guides/guide-form/GuideForm';
import { AuthContext } from '../../components/contexts/AuthStore';

import guidesService from '../../services/guides-service';

function GuideEdit() {

  const params = useParams();
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [guide, setGuide] = useState();

  useEffect(() => {
    async function fetchGuide() {
      const { id } = params;
      const guide = await guidesService.detail(id);
      if (!isUnmounted) {
        if (user?.id !== guide.id) {
          history.push('/403')
        } else {

          setGuide(guide);
        }
      }
    }

    let isUnmounted = false;
    fetchGuide();
    return () => {
      isUnmounted = true;
    }
  }, [params, history, user]);

  if (!guide) {
    return null;
  }

  return (
    <GuideForm guide={guide} />
  )
}

export default GuideEdit;