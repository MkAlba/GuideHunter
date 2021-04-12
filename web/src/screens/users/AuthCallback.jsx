import { useContext, useEffect } from "react";
import { useHistory } from "react-router"
import { AuthContext } from "../../components/contexts/AuthStore"
import { profile } from "../../services/users.service"

function AuthCallback() {
  const { onUserChange, user, isAuthenticated } = useContext(AuthContext)
  const { replace } = useHistory()

  useEffect(() => {
    async function fetch() {
      const user = await profile()

      onUserChange(user)
    }

    fetch()
  }, [onUserChange])

  useEffect(() => {
      if (user) {
     isAuthenticated()
      replace('/guides')
    }
  }, [user, replace])

  return null
}

export default AuthCallback