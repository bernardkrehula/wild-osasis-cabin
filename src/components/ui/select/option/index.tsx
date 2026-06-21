import './index.css';

const Option = ({name, content}) => {
    return(
        <option className='option' value={name}>{content}</option> 
    )
}
export default Option;