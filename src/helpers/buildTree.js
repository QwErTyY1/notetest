export const makeTree = (dataset) => {
    let hashTable = Object.create(null)
    dataset.forEach((aData, serial_index) => hashTable[aData.id] = {...aData, serial_index, children: []})
    let dataTree = [];
    let note_text = {};
    dataset.forEach(aData => {

        if (aData.parent_id) {
            hashTable[aData.parent_id].children.push(hashTable[aData.id]);
        } else {
            dataTree.push(hashTable[aData.id])
        }
        note_text[aData.id] = '';
    })

    return dataTree;
};


export const insert = (arr, index, newItem) => [

    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index)
]


export const removeNotes = (id, arr, isBranchRemove = false) => {
    let del = (Array.isArray(id)) ? id : [id]
    let newArr = []
    arr.forEach((obj) => {
        if (isBranchRemove) {
            switch (true) {
                case del.includes(obj.parent_id):
                    del.push(obj.id)
                    break;
                default:
                    newArr.push(obj)
            }
        } else {
            switch (true) {
                case del.includes(obj.id):
                    break;
                case del.includes(obj.parent_id):
                    del.push(obj.id)
                    break;
                default:
                    newArr.push(obj)
            }
        }
    })
    if (arr.length !== newArr.length) {
        newArr = removeNotes(del, newArr, isBranchRemove)
    }
    return newArr
}

export const arrayMoveNotes = (arr, old_index, new_index) => {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
};