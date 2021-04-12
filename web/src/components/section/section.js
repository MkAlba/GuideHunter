import React from 'react'


function Section({ title, children }) {
    return (
      <section className=" container ">
        <h3 className=" text-center" >{title}</h3>
        {children}
      </section>
    );
  }
  
  export default Section;