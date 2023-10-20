const URL = import.meta.env.VITE_BACKEND_URL;
const VERSION = import.meta.env.VITE_BACKEND_URL_VERSION;

export const endPoints = {
    products: {
        getProducts: `${URL}${VERSION}/products/`,
        getSearchProducts: (product) =>`${URL}${VERSION}/products/?search=${product}`,
        getFilterProducts:`${URL}${VERSION}/products/?exclude=true`, 
        updateProduct: (id) =>`${URL}${VERSION}/products/${id}/`,
        deleteProduct:(id) => `${URL}${VERSION}/products/${id}/`
    },
    providers: {
        getProviders: `${URL}${VERSION}/providers/`,
        updateProviders: (id) =>`${URL}${VERSION}/providers/${id}/`,
        deleteProviders:(id) => `${URL}${VERSION}/providers/${id}/`
    },
    quotations: {
        getQuotations:  (idProduct) => `${URL}${VERSION}/products/${idProduct}/quotations/`,
        deleteQuotations:(idQuotation, idProduct) => `${URL}${VERSION}/products/${idProduct}/quotations/${idQuotation}/`
    },
    marks: {
        getMarks: `${URL}${VERSION}/marks/`,
        updateMarks: (id) =>`${URL}${VERSION}/marks/${id}/`,
        deleteMarks:(id) => `${URL}${VERSION}/marks/${id}/`
    },
    models: {
        getModels: `${URL}${VERSION}/models/`,
        updateModels: (id) =>`${URL}${VERSION}/models/${id}/`,
        deleteModels:(id) => `${URL}${VERSION}/models/${id}/`
    },
    categories: {
        getCategories: `${URL}${VERSION}/categories/`,
        updateCategories: (id) =>`${URL}${VERSION}/categories/${id}/`,
        deleteCategories:(id) => `${URL}${VERSION}/categories/${id}/`
    }
};