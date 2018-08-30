import React from 'react'

const Notification = ({ type, message }) => {

    if (message === null) {

    // Element <div> must exists when adding class with transition and opacity 0
    // Or CSS won't animate transition and nothing shows

      return (
        <div></div>
      )

    } else {

        return (
            <div className={type}>
                <h2>{message}</h2>
            </div>
        )
    }

  }

  export default Notification