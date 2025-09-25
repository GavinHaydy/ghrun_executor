import { v4 as uuidv4 } from 'uuid';

export const generateUid = (startString?: string) => {
    if (startString){
        return startString + uuidv4();
    }else {
        return uuidv4();
    }

}