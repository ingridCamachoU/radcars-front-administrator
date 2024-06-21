import noFound from '../../assets/amico.svg'

const NotFoundIndex = () => {
    return (
        <div className='flex justify-center items-center mt-10 pt-8'>
            <img src={noFound} alt='No found' className='w-6/12' />
        </div>
    );
}

export default NotFoundIndex;
