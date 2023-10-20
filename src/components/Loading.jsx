
const Loading = () => {
    return (
        <div className='flex w-full mb-4 mt-4 px-4 justify-center gap-2'>
            <span className="border-gray-300 h-6 w-6 animate-spin rounded-full border-2 border-t-skin-base"></span>
            <span className="text-gray-500">Cargando...</span>
        </div>
    );
};

export default Loading;
