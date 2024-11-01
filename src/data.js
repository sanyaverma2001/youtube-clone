export const API_KEY = 'AIzaSyA_iiJPpyxbb8pAZzDldY50J_Beo-qhHFQ';
export const value_converter=(value)=>{
    if(value>=10000000)
    {
        return Math.floor(value/1000000)+"M";
    }
    else if(value>=1000)
    {
        return Math.floor(value/1000000)+"M";
    }
    else{
        return value;
    }
}