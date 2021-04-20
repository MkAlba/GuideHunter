import React from 'react'
import { useState } from 'react';
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

import { create, update } from '../../services/tours-service'


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


    const [state, setState] = useState({

        tour: {
            title: '',
            category: [
                { name: "modernism", value: "modernism", show: false, displayValue: " Modernism" },
                { name: "gothic", value: "gothic", show: false, displayValue: " Gothic " },
                { name: "gastronomic", value: "gastronomic", show: false, displayValue: " Gastronomic " }
            ],
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



    const handleChange = (event, result) => {       let { name, value } = result || event.target;

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


 /*   async function onClick(e) {
        e.preventDefault()
                                   
          history.replace(`/home`)}
    
    



*/


    const handleSubmit = async (event) => {

        console.log(event)
        console.log(state)
        event.preventDefault();

        if (isValid()) {
            try {
                const tourData = { ...state.tour };
                tourData.category = tourData.category.map(category => category.trim()) || [];
                const tour = tourData.id ? await update(tourData) : await create(tourData);
                history.push(`/tours/${tour.id}`);
            } catch (error) {
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
        console.log('bbbbbbbbbbbbbbb')
        const { errors } = state;

        console.log(errors)

        return !Object.keys(errors).some(error => errors[error]);
    }

    const { tour, errors, touch } = state
    console.log(tour)
    return (

        <Container>
            <Grid celled='internally' mobile={16} tablet={8} computer={4}>
                <Grid.Row>
                    <Grid.Column
                        width={4}
                        verticalAlign='middle'>
                        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                        <Divider />
                        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                        <Divider />
                        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />



                    </Grid.Column>


                    <Grid.Column width={10}>
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

                            <Message
                                success
                                header='Form Completed'
                                content="Tour finished!!"
                            />
                            <Form.Input  onClick = {handleSubmit} control={Button}>Submit</Form.Input>
                        </Form>
                    </Grid.Column>

                </Grid.Row>



            </Grid>
        </Container>
    )
}



export default TourForm;

/* <Form.Group inline>

                                <label>CATEGORY: </label>
                                <Form.Field>
                                <Radio

                                    name="category"
                                    toggle
                                    label='Modernism'
                                    value='Modernism'
                                    checked={tour.category === 'Modernism'}
                                    onChange={handleChange}
                                />
                                </Form.Field>


                                <Form.Field>
                                <Checkbox

                                    name="category"
                                    label='Gothic'
                                    toggle
                                    value='Gothic'
                                    checked={tour.category === 'Gothic'}
                                    onChange={handleChange}
                                />
                                </Form.Field>
                                <Form.Field
                                    control={Radio}
                                    label='Gastronomic'

                                    value={tour.category}
                                    checked={tour.category === 'Gastronomic'}
                                    onChange={handleChange}
                                />
                                <Form.Field
                                    control={Radio}
                                    label='Sea Side'

                                    value={tour.category}
                                    checked={tour.category === 'Sea Side'}
                                    onChange={handleChange}
                                />

                            </Form.Group>
                            <Form.Group inline>
                            <Form.Field
                                    control={Radio}
                                    label='Sport'
                                    toggle
                                    value={tour.category}
                                    checked={tour.category === 'Sport'}
                                    onChange={handleChange}
                                />
                                <Form.Field
                                    control={Radio}
                                    label='Cultural'
                                    value={tour.category}
                                    checked={tour.category === 'Cultural'}
                                    onChange={handleChange}
                                />

                                <Form.Field
                                    control={Radio}
                                    label='Museums'
                                    value={tour.category}
                                    checked={tour.category === 'Museums'}
                                    onChange={handleChange}
                                />
                                <Form.Field
                                    control={Radio}
                                    label='Family'
                                    value={tour.category}
                                    checked={tour.category === 'Family'}
                                    onChange={handleChange}
                                />
                                <Form.Field
                                    control={Radio}
                                    label='City Center'
                                    value={tour.category}
                                    checked={tour.category === 'City Center'}
                                    onChange={handleChange}
                                />

                            </Form.Group>

                            */
