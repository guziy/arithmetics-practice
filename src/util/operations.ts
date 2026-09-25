import { 
    all_operations_text_labels, 
    all_operations_symbols, 
    all_operations_ids
} from "./constants";



interface Operation {
    id: string;
    label: string;
    symbol: string;
}

const operations: Operation[] = []

export function get_operations(){
    /**
     * initialize operations objects
     */
    let op: Operation;

    if (operations.length == 0){
        for (const op_id of all_operations_ids){
            op = {
                id: op_id, 
                label: all_operations_text_labels[op_id],
                symbol: all_operations_symbols[op_id],
            }
            operations.push(op)
        }
    
    }
    return operations;
}





