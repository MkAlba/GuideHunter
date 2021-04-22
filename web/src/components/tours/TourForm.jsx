import React from 'react'
import { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import {
    Button,
    Form,
    Divider,
    TextArea,
    Grid,
    Image,
    Container,
    Message

} from 'semantic-ui-react'
import { AuthContext } from './../contexts/AuthStore';
import { create, update } from '../../services/tours-service';
import { categories } from '../../constantsWeb'

const validations = {

    title: (value) => {
        let message;
        if (!value) {
            message = 'Title is required';
        } else if (value && value.length < 5) {
            message = 'Title needs at least 5 characters'
        }
        return message;
    },

    price: (value) => {
        let message;
        if (!value) {
            message = 'A rate is required';
        }
        return message;
    },

    start: (value) => {
        let message;
        if (!value) {
            message = 'Start date is required';
        }
        return message;
    },

    duration: (value) => {
        let message;
        if (!value) {
            message = 'A duration is required';
        }
        return message;
    },

    description: (value) => {
        let message;
        if (!value) {
            message = 'Description is required';
        } else if (value && value.length < 10) {
            message = 'Description needs at least 10 characters'
        }
        return message;
    }
}


function TourForm({ tour: tourToEdit = {} }) {

    const history = useHistory();
    const { user } = useContext(AuthContext)


    const [state, setState] = useState({

        tour: {
            title: '',
            category: [...categories],
            price: '',
            start: '',
            owner: '',
            duration: '',
            description: '',
            comments: '',
            ...tourToEdit
        },

        errors: {
            title: validations.title(tourToEdit.title),
            price: validations.price(tourToEdit.price),
            start: validations.start(tourToEdit.start),
            duration: validations.duration(tourToEdit.duration),
            description: validations.description(tourToEdit.description),

        },

        touch: {},

    })



    const handleChange = (event, result) => {
        let { name, value } = result || event.target;

        if (event.target.files) {

            value = event.target.files[0]
        }

        setState(state => {
            return {
                ...state,
                tour: {
                    ...state.tour,
                    [name]: value,
                },
                errors: {
                    ...state.errors,
                    [name]: validations[name] && validations[name](value),
                }
            }
        })
    }


    const handleSubmit = async (event) => {

        event.preventDefault();
        console.log(event)
        if (isValid()) {
            try {

                const tourData = { ...state.tour };


                tourData.category = tourData.category.filter(type => type.show).map(item => item.name)

                tourData.category = tourData.category.map(category => category.trim()) || [];

                tourData.owner = user.id

                const tour = tourData.id ? await update(tourData) : await create(tourData);
                history.push(`/tours`);

            }


            catch (error) {
                const { message, errors } = error.response?.data || error;

                setState(state => ({
                    ...state,
                    errors: {
                        ...errors,
                        title: !errors && message
                    },
                    touch: {
                        ...errors,
                        title: !errors && message
                    }
                }));
            }
        }
    }

    const handleItemClick = (event, data, i) => {
        const { category } = state.tour;

        category[i].show = !category[i].show;

        setState(state => {

            return {
                ...state,
                category
            }
        });
    };


    const onFileChange = (event) => {
        console.log(event)
        setState(state => {

            return {
                ...state,
                tour: {
                    ...state.tour,
                    images: event.target.files
                }
            }
        })
    }


    const handleBlur = (event) => {
        const { name } = event.target;
        setState(state => ({
            ...state,
            touch: {
                ...state.touch,
                [name]: true
            }
        }));
    }

    const isValid = () => {

        const { errors } = state;

        return !Object.keys(errors).some(error => errors[error]);
    }



    const { tour, errors, touch } = state

    console.log(state)

    return (

  <Container>
            <Grid celled='internally'  >
            <Grid.Row>

                <Grid.Column
                    centered
                    width={7}>
                    <Form >
                        <Form.Group widths='equal'>
                            <Form.Input
                                name="title"
                                type="text"
                                value={tour.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                label='ROUTE NAME'
                                placeholder='Route Name......'
                            />

                        </Form.Group>

                        <Form.Group inline>

                            <label>CATEGORY: </label>

                            <div>
                                {tour.category.map((item, i) => (
                                    <div key={i}>
                                        <Form.Checkbox
                                            name={item.name}
                                            onChange={(e, v) => handleItemClick(e, v, i)}
                                            value={item.show}
                                            defaultChecked={item.show}
                                            label={item.displayValue}
                                        />
                                    </div>
                                ))}
                            </div>

                        </Form.Group>

                        <Form.Input
                            name="description"
                            type="text"
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={tour.description}
                            control={TextArea}
                            rows={6}
                            label='What will you visit??'
                            placeholder='Tell us more about your Tour...'
                        />


                        <Form.Group>
                            <Form.Input
                                name="duration"
                                type="number"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                fluid
                                min="30.00"
                                step="5.00"
                                label='How many minutes aprox...'
                                value={tour.duration}
                                placeholder='In minutes'
                            />


                            <Form.Input
                                name="price"
                                type="number"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                //value={tour.price}
                                required
                                fluid
                                min="30.00"
                                step="5.00"
                                label='How much it cost?'
                                placeholder='€'


                            />
                        </Form.Group>

                        <Form.Input
                            name="comments"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            control={TextArea}
                            rows={3}
                            label='Comment'
                            value={tour.comments}
                            placeholder='Any other information?'
                        />


                        <div className="input-group mb-2">
                            <span className="input-group-text"><i className="fa fa-clock-o fa-fw"></i></span>

                            <span className="input-group-text">Select a day</span>
                            <input type="datetime-local" name="start" className={`form-control ${(touch.start && errors.start) ? 'is-invalid' : ''}`} placeholder="dd/mm/yyyy hh:mm"
                                value={tour.start} onBlur={handleBlur} onChange={handleChange} />
                            {touch.start && errors.start && <div className="invalid-feedback">{errors.start}</div>}
                        </div>

                        <label htmlFor="hidden-new-files" className="ui icon button">
                            <i className="cloud icon"></i>
    Open File
  </label>
                        <input type="file" name="images" id="hidden-new-files" onChange={onFileChange} multiple style={{ display: "none" }} />
                        

                        <Message
                            success
                            header='Form Completed'
                            content="Tour finished!!"
                        />
                        <Form.Input onClick={handleSubmit} color="secondary" control={Button}>Submit</Form.Input>
                    </Form>
                </Grid.Column>
                </Grid.Row>

                <Grid celled='internally'>
                    <Grid />
                    {!tour?.id ?
                        
                            <div>
                                <Grid.Column width={4}>
                                    <Image size="small" src='https://react.semantic-ui.com/images/wireframe/image.png' />

                                </Grid.Column>
                                <Divider />

                                <Grid.Column width={4}>
                                    <Image size="small" src='https://react.semantic-ui.com/images/wireframe/image.png' />

                                </Grid.Column   ><Divider />
                                <Grid.Column width={4}>
                                <Image size="small" src='https://react.semantic-ui.com/images/wireframe/image.png' />
                                </Grid.Column>
                            </div>
                        
                        :
                        <div>
                            <Image src={tour.images[0]} />
                            <Divider />
                            <Image src={tour.images[1]} />
                            <Divider />
                            <Image src={tour.images[2]} />
                        </div>

                    }







                </Grid>



            </Grid>
            </Container>
    )
}

export default TourForm;


