import React from 'react';
import Alert from 'react-bootstrap/Alert';

export const NoOrdersToShowComponent = () => 
                            (<Alert variant={'danger'}>
                                No Orders to show
                            </Alert>)
export const InfoMessageComponent = ({props}) => 
                            (
                            <Alert variant={'info'}>
                                {this.props.message}
                            </Alert>
                            )