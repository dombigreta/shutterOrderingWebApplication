import React from 'react';
import Alert from 'react-bootstrap/Alert';


const globalStyle = {
                    marginTop:'0.9rem',
                    marginBottom:'0.9rem',
                    padding:'0.2rem',
                    fontSize:'0.9rem'
                } 
export const NoOrdersToShowComponent = () => 
                            (<Alert style={globalStyle} variant={'danger'}>
                                No Orders to show
                            </Alert>)

export const InfoMessageComponent = (props) => 
                            (<Alert style={globalStyle} variant={'info'}>
                                {props.message}
                            </Alert>)

export const ErrorMessageComponent = (props) => 
                                (<Alert style={globalStyle}  variant={'danger'}>
                                    {props.message}
                                    </Alert>)