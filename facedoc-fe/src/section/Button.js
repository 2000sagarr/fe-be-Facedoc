import PropTypes from 'prop-types'

const Button = ({color , text, onclick}) => {
  return (
    <div>
        <button 
            onClick={onclick}  
            style={{backgroundColor:color}} 
            className='btn'>{text}
        </button>
    </div>
  )
}

Button.defaultProps={
    color: 'steelblue',
    text : 'Add',
}

Button.propTypes={
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onclick: PropTypes.func,
}

export default Button