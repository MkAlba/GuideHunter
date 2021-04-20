
import { useContext } from 'react';
import { AuthContext } from '../../components/contexts/AuthStore';
import { Link } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react'






function UsersProfile() {


    const { user } = useContext(AuthContext)
    console.log(user)






    return (

        <div className="container">
            <div className="main-body">

                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src={user?.avatar} alt="Admin" className="rounded-circle" width="150" />
                                    <div className="mt-3">
                                        <h4>{user?.userName}</h4>
                                        <p className="text-secondary mb-1">Full Stack Developer</p>
                                        <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>

                                        {user?.role === 'user' && <Link
                                            to="/form-guide">
                                            <button className="btn btn-outline-primary me-2"> Are you a professional guide? </button>
                                        </Link>}


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mt-3">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">






                                    <Link
                                        to="/messages"
                                    >
                                        <h6 className="mb-0">
                                            <Icon name="envelope outline" size="big" /></h6>
                                    </Link>

                                    <span className="text-secondary">Messages</span>


                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <Link
                                        to={{
                                            pathname: `/create-tour`,
                                            state: { user }


                                        }}>
                                        {user?.role === 'guide' &&  <>
                                        <Icon
                                        name="map"
                                        size="large">
                                        </Icon>

                                        <span style={{justifyContent: "center"}}>Create a Tour?</span>
                                        </>
                                        }
                                    </Link>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokewidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                                    <span className="text-secondary">@bootdey</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokewidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                                    <span className="text-secondary">bootdey</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokewidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                                    <span className="text-secondary">bootdey</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8">

                        <h3 className="text-center">User Details</h3>
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Username</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {user?.userName}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Email</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {user?.email}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Phone</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {user?.telephone}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Mobile</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        (320) 380-4539
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Address</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        Bay Area, San Francisco, CA
                                    </div>
                                </div>
                            </div>


                        </div>
                        <Link

                            to={{
                                pathname: `/form-user/${user.id}`,
                                state: { user }


                            }}>
                            <div className="text-center">
                                <Button as='div' labelPosition='left'>
                                    <Button basic
                                        centered
                                        size='medium'

                                        color='brown'>
                                        <Icon name='address book' />
                                    Edit
                                </Button>
                                    <Label as='a' basic color='black' pointing='left'>
                                        User Details
                                </Label>
                                </Button>
                            </div>
                        </Link>
                        {user?.role === 'guide' &&

                            <>
                                <h3 className="text-center">Guide Details</h3>
                                <div className="card mb-3">

                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Username</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {user?.userName}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {user?.email}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Phone</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {user?.telephone}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Mobile</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                (320) 380-4539
                                    </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Address</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                Bay Area, San Francisco, CA
                                    </div>
                                        </div>
                                    </div>
                                </div>
                                <Link to={`/form-guide/${user.id}`}>
                                    <div className="text-center">
                                        <Button
                                            as='div' labelPosition='left'>
                                            <Button basic
                                                centered
                                                size='medium'
                                                color='brown'>
                                                <Icon name='address book' />
                                            Edit
                                        </Button>
                                            <Label as='a' basic color='black' pointing='left'>
                                                Guide Details
                                        </Label>
                                        </Button>
                                    </div>
                                </Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersProfile