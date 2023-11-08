
export const capitalLetter = ( str ) => { 
    if(str){
        return str[0].toUpperCase() + str.substring(1);
    }
};

export const converterPrice = (price) =>{
    if(price){
        var result = price?.toLocaleString({
            style: "currency",
            currency: "CLP"
        });

        return result.replaceAll(',', '.');  
    }
};