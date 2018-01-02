import React from 'react';
import renderHTML from 'react-render-html';

export default (props) => {
    //constructor(props){ super(props) }
    
    return (
            <div> 
                {props.mail?renderHTML(props.mail):''}
            </div>
        
    )

}



    